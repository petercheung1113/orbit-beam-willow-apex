import { randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { rosterPerson } from "@/lib/class-roster.server";
import { sessionAccount } from "@/lib/chat.server";
import { SEAT_SALT, choiceDeck } from "@/lib/tug-deck";
import { UNITS } from "@/data/units";

const QUESTION_MS = 30000;
const LIMIT = 10;
const PULL = 2;
const CODE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export type TugSeat = { account: string; side: "red" | "blue"; slot: 0 | 1; name: string; joined: boolean };

export type TugSnap = {
  tug: number;
  match: number;
  phase: "play" | "done";
  winner: "red" | "blue" | "tie" | null;
  red: [{ qi: number; left: number; misses: number; frozen: number }, { qi: number; left: number; misses: number; frozen: number }];
  blue: [{ qi: number; left: number; misses: number; frozen: number }, { qi: number; left: number; misses: number; frozen: number }];
  log: { id: number; side: "red" | "blue" | "both"; text: string; tag: string }[];
};

export type TugView = {
  id: string;
  host: string;
  mode: "duo" | "quad";
  minutes: number;
  topics: string[];
  seed: number;
  phase: "lobby" | "play" | "done";
  seats: TugSeat[];
  me: { side: "red" | "blue"; slot: 0 | 1 } | null;
  snap: TugSnap | null;
};

type AnswerRow = { side: string; slot: number; qi: number; correct: boolean; at: unknown };

function asTime(value: unknown): number {
  if (value instanceof Date) return value.getTime();
  const n = Number(value);
  return Number.isFinite(n) ? n : Date.parse(String(value));
}

function code(): string {
  const bytes = randomBytes(6);
  return [...bytes].map((byte) => CODE[byte % CODE.length]).join("");
}

async function labelOf(account: string): Promise<string> {
  const student = rosterPerson(account);
  const seat = student?.name ?? account;
  const sql = await getSql();
  const rows = await sql<{ display_name: string }>`SELECT display_name FROM chat_profiles WHERE account = ${account}`;
  const custom = rows[0]?.display_name.trim().slice(0, 12) ?? "";
  if (!custom || custom === seat) return seat;
  return `${custom} · ${seat}`.slice(0, 18);
}

function emptyPair(): TugSnap["red"] {
  return [
    { qi: 0, left: 30, misses: 0, frozen: 0 },
    { qi: 0, left: 30, misses: 0, frozen: 0 },
  ];
}

function derive(startedAt: number, minutes: number, seats: TugSeat[], answers: AnswerRow[], now: number): TugSnap {
  const end = startedAt + minutes * 60 * 1000;
  const named = new Map(seats.map((seat) => [`${seat.side}:${seat.slot}`, seat.name]));
  const ordered = [...answers].sort((a, b) => asTime(a.at) - asTime(b.at));
  let tug = 0;
  let closed = false;
  const log: TugSnap["log"] = [{ id: 0, side: "both", text: "拔河開始", tag: "開波" }];
  ordered.forEach((row, index) => {
    const at = asTime(row.at);
    if (closed || at > end) return;
    const side = row.side === "blue" ? "blue" : "red";
    if (row.correct) tug = Math.max(-LIMIT, Math.min(LIMIT, tug + (side === "red" ? -PULL : PULL)));
    const who = named.get(`${side}:${row.slot}`) ?? "同學";
    log.unshift({
      id: index + 1,
      side,
      text: row.correct ? `${who} 答對，拉向${side === "red" ? "紅" : "藍"}方` : `${who} 答錯 · 不拉繩`,
      tag: row.correct ? "答對" : "答錯",
    });
    if (tug <= -LIMIT || tug >= LIMIT) closed = true;
  });
  log.splice(12);
  const clockOf = (side: "red" | "blue", slot: 0 | 1) => {
    const mine = ordered.filter((row) => row.side === side && row.slot === slot).sort((a, b) => a.qi - b.qi);
    let cursor = startedAt;
    let qi = 0;
    for (const row of mine) {
      const at = asTime(row.at);
      if (row.qi !== qi || at > end) break;
      cursor = at;
      qi += 1;
    }
    const cap = Math.min(now, end);
    while (cursor + QUESTION_MS <= cap) {
      cursor += QUESTION_MS;
      qi += 1;
    }
    let streak = 0;
    let triggerAt = 0;
    for (const row of mine) {
      const at = asTime(row.at);
      if (at > end) break;
      if (triggerAt && at >= triggerAt + 5000) {
        streak = 0;
        triggerAt = 0;
      }
      if (row.correct) {
        streak = 0;
        triggerAt = 0;
      } else {
        streak += 1;
        if (streak >= 3) triggerAt = at;
      }
    }
    const frozen = triggerAt && streak >= 3 && now < triggerAt + 5000 ? Math.ceil((triggerAt + 5000 - now) / 1000) : 0;
    const left = now >= end ? 0 : Math.max(0, Math.ceil((cursor + QUESTION_MS - now) / 1000));
    return { qi, left, misses: streak >= 3 ? 0 : streak, frozen };
  };
  const red = emptyPair();
  const blue = emptyPair();
  red[0] = clockOf("red", 0);
  blue[0] = clockOf("blue", 0);
  red[1] = clockOf("red", 1);
  blue[1] = clockOf("blue", 1);
  const match = Math.max(0, Math.ceil((end - now) / 1000));
  const finished = closed || now >= end;
  const winner = tug <= -LIMIT ? "red" : tug >= LIMIT ? "blue" : finished ? (tug < 0 ? "red" : tug > 0 ? "blue" : "tie") : null;
  return { tug, match: finished ? 0 : match, phase: finished ? "done" : "play", winner, red, blue, log };
}

async function load(roomId: string): Promise<TugView | null> {
  const sql = await getSql();
  const rooms = await sql<{ id: string; host: string; mode: string; minutes: number; topics: string; seed: number; started_at: unknown }>`
    SELECT id, host, mode, minutes, topics, seed,
           CASE WHEN started_at IS NULL THEN NULL ELSE CAST(EXTRACT(EPOCH FROM started_at) * 1000 AS BIGINT) END AS started_at
    FROM tug_rooms WHERE id = ${roomId}
  `;
  const room = rooms[0];
  if (!room || (room.mode !== "duo" && room.mode !== "quad")) return null;
  const seats = await sql<{ account: string; side: string; slot: number; name: string; joined: boolean }>`
    SELECT account, side, slot, name, joined FROM tug_seats WHERE room_id = ${roomId} ORDER BY side, slot
  `;
  const parsed: TugSeat[] = seats.flatMap((seat) => {
    if ((seat.side !== "red" && seat.side !== "blue") || (seat.slot !== 0 && seat.slot !== 1)) return [];
    return [{ account: seat.account, side: seat.side, slot: seat.slot, name: seat.name, joined: Boolean(seat.joined) }];
  });
  const topics = room.topics.split(",").filter((id) => UNITS.some((unit) => unit.id === id));
  let snap: TugSnap | null = null;
  let phase: TugView["phase"] = "lobby";
  if (room.started_at) {
    const answers = await sql<AnswerRow>`
      SELECT side, slot, qi, correct, CAST(EXTRACT(EPOCH FROM at) * 1000 AS BIGINT) AS at FROM tug_answers WHERE room_id = ${roomId}
    `;
    snap = derive(asTime(room.started_at), room.minutes, parsed, answers, Date.now());
    phase = snap.phase;
  }
  return {
    id: room.id,
    host: room.host,
    mode: room.mode,
    minutes: room.minutes,
    topics,
    seed: room.seed,
    phase,
    seats: parsed,
    me: null,
    snap,
  };
}

export async function createTugRoom(
  token: string,
  mode: string,
  minutes: number,
  topics: string[],
  invites: string[],
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const host = await sessionAccount(token);
  if (!host || !rosterPerson(host)) return { ok: false, error: "請先進入聊天室。" };
  if (mode !== "duo" && mode !== "quad") return { ok: false, error: "請選二人或四人。" };
  if (![2, 3, 5].includes(minutes)) return { ok: false, error: "請選比賽時間。" };
  const pickedTopics = [...new Set(topics.filter((id) => UNITS.some((unit) => unit.id === id)))];
  if (!pickedTopics.length) return { ok: false, error: "先選課題。" };
  const need = mode === "duo" ? 1 : 3;
  const guests = [...new Set(invites.map((item) => rosterPerson(item)?.account).filter((item): item is string => Boolean(item && item !== host)))];
  if (guests.length !== need) return { ok: false, error: mode === "duo" ? "二人對戰要邀請 1 位同學。" : "四人對戰要邀請 3 位同學。" };
  const id = code();
  const seed = (randomBytes(4).readUInt32BE(0) & 0x7fffffff) || 1;
  const plan: { account: string; side: "red" | "blue"; slot: 0 | 1 }[] =
    mode === "duo"
      ? [
          { account: host, side: "red", slot: 0 },
          { account: guests[0]!, side: "blue", slot: 0 },
        ]
      : [
          { account: host, side: "red", slot: 0 },
          { account: guests[0]!, side: "red", slot: 1 },
          { account: guests[1]!, side: "blue", slot: 0 },
          { account: guests[2]!, side: "blue", slot: 1 },
        ];
  const sql = await getSql();
  await sql`
    INSERT INTO tug_rooms (id, host, mode, minutes, topics, seed)
    VALUES (${id}, ${host}, ${mode}, ${minutes}, ${pickedTopics.join(",")}, ${seed})
  `;
  for (const seat of plan) {
    const name = await labelOf(seat.account);
    await sql`
      INSERT INTO tug_seats (room_id, account, side, slot, name, joined)
      VALUES (${id}, ${seat.account}, ${seat.side}, ${seat.slot}, ${name}, ${seat.account === host})
    `;
  }
  const hostName = await labelOf(host);
  const body = `[[tug:${id}]] ${hostName}邀請你${mode === "duo" ? "二人" : "四人"}拔河`.slice(0, 80);
  await sql`INSERT INTO chat_messages (account, body, room_id) VALUES (${host}, ${body}, 'hall')`;
  for (const guest of guests) {
    const room = `dm:${[host, guest].sort().join(":")}`;
    await sql`
      INSERT INTO chat_rooms (id, kind, title, created_by)
      VALUES (${room}, 'direct', ${"拔河"}, ${host})
      ON CONFLICT (id) DO NOTHING
    `;
    await sql`INSERT INTO chat_members (room_id, account) VALUES (${room}, ${host}) ON CONFLICT DO NOTHING`;
    await sql`INSERT INTO chat_members (room_id, account) VALUES (${room}, ${guest}) ON CONFLICT DO NOTHING`;
    await sql`INSERT INTO chat_messages (account, body, room_id) VALUES (${host}, ${body}, ${room})`;
  }
  return { ok: true, id };
}

export async function joinTugRoom(token: string, roomId: string): Promise<{ ok: true; view: TugView } | { ok: false; error: string }> {
  const account = await sessionAccount(token);
  if (!account) return { ok: false, error: "請先進入聊天室。" };
  const view = await load(roomId);
  if (!view) return { ok: false, error: "找不到這個房間。" };
  const seat = view.seats.find((item) => item.account === account);
  if (!seat) return { ok: false, error: "你沒有被邀請。" };
  if (!seat.joined) {
    const sql = await getSql();
    await sql`UPDATE tug_seats SET joined = true WHERE room_id = ${roomId} AND account = ${account}`;
    seat.joined = true;
  }
  view.me = { side: seat.side, slot: seat.slot };
  return { ok: true, view };
}

export async function syncTugRoom(token: string, roomId: string): Promise<{ ok: true; view: TugView } | { ok: false; error: string }> {
  const account = await sessionAccount(token);
  if (!account) return { ok: false, error: "請先進入聊天室。" };
  const view = await load(roomId);
  if (!view) return { ok: false, error: "找不到這個房間。" };
  const seat = view.seats.find((item) => item.account === account);
  if (!seat) return { ok: false, error: "你沒有被邀請。" };
  view.me = { side: seat.side, slot: seat.slot };
  return { ok: true, view };
}

export async function startTugRoom(token: string, roomId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const account = await sessionAccount(token);
  if (!account) return { ok: false, error: "請先進入聊天室。" };
  const view = await load(roomId);
  if (!view) return { ok: false, error: "找不到這個房間。" };
  if (view.host !== account) return { ok: false, error: "只有房主可以開始。" };
  if (view.phase !== "lobby") return { ok: true };
  if (view.seats.some((seat) => !seat.joined)) return { ok: false, error: "還有同學未入房。" };
  const sql = await getSql();
  await sql`UPDATE tug_rooms SET started_at = now() WHERE id = ${roomId} AND started_at IS NULL`;
  return { ok: true };
}

export async function answerTug(token: string, roomId: string, choice: number): Promise<{ ok: true } | { ok: false; error: string }> {
  const account = await sessionAccount(token);
  if (!account) return { ok: false, error: "請先進入聊天室。" };
  const view = await load(roomId);
  const seat = view?.seats.find((item) => item.account === account);
  if (!view?.snap || !seat || view.phase !== "play") return { ok: false, error: "比賽還未開始。" };
  view.me = { side: seat.side, slot: seat.slot };
  const clock = view.snap[view.me.side][view.me.slot];
  if (clock.frozen > 0) return { ok: false, error: "連續答錯 3 題，請停 5 秒。" };
  const salt = SEAT_SALT[view.me.side][view.me.slot];
  const deck = choiceDeck(view.seed + salt, view.topics);
  const item = deck[clock.qi % Math.max(deck.length, 1)];
  if (!item || item.question.kind !== "choice") return { ok: false, error: "這題不能作答。" };
  if (!Number.isInteger(choice) || choice < 0 || choice >= item.question.choices.length) return { ok: false, error: "請選一個答案。" };
  const sql = await getSql();
  await sql`
    INSERT INTO tug_answers (room_id, side, slot, qi, correct)
    VALUES (${roomId}, ${view.me.side}, ${view.me.slot}, ${clock.qi}, ${choice === item.question.answer})
    ON CONFLICT DO NOTHING
  `;
  return { ok: true };
}

export async function replayTug(token: string, roomId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const account = await sessionAccount(token);
  if (!account) return { ok: false, error: "請先進入聊天室。" };
  const view = await load(roomId);
  if (!view) return { ok: false, error: "找不到這個房間。" };
  if (view.host !== account) return { ok: false, error: "只有房主可以再來一局。" };
  if (view.phase !== "done") return { ok: false, error: "這一局還未完。" };
  const seed = (randomBytes(4).readUInt32BE(0) & 0x7fffffff) || 1;
  const sql = await getSql();
  await sql`DELETE FROM tug_answers WHERE room_id = ${roomId}`;
  await sql`UPDATE tug_rooms SET seed = ${seed}, started_at = now() WHERE id = ${roomId}`;
  return { ok: true };
}
