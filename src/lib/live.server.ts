import { randomBytes } from "node:crypto";
import type { Figure } from "@/data/figure";
import { UNITS } from "@/data/units";
import { getSql } from "@/lib/db";
import { rosterPerson } from "@/lib/class-roster.server";
import { sessionAccount } from "@/lib/chat.server";
import { choiceDeck } from "@/lib/tug-deck";
import { isTeacherAccount } from "@/lib/teacher-account";

type Card = {
  stem: string;
  choices: string[];
  answer: number;
  why: string;
  unitName: string;
  figure?: Figure;
};

export type LiveQuestion = {
  stem: string;
  choices: string[];
  unitName: string;
  figure?: Figure;
};

export type LivePlayer = { account: string; name: string; score: number; me: boolean };

export type LiveView = {
  id: string;
  host: boolean;
  phase: "lobby" | "question" | "reveal" | "podium";
  qi: number;
  total: number;
  seconds: number;
  leftMs: number;
  players: LivePlayer[];
  answered: number;
  correctCount: number | null;
  myChoice: number | null;
  myPoints: number | null;
  question: LiveQuestion | null;
  answer: number | null;
  why: string;
};

export type LivePeek = { id: string; phase: LiveView["phase"]; players: number; host: boolean } | null;

type GameRow = {
  id: string;
  host: string;
  topics: string;
  qcount: number;
  seconds: number;
  seed: number;
  phase: string;
  qi: number;
  question_ms: unknown;
};

const decks = new Map<string, Card[]>();

function asNumber(value: unknown): number {
  const n = typeof value === "bigint" ? Number(value) : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function deckFor(seed: number, topics: string, count: number): Card[] {
  const key = `${seed}|${count}|${topics}`;
  const hit = decks.get(key);
  if (hit) return hit;
  const ids = topics.split(",").filter(Boolean);
  const cards: Card[] = [];
  for (const item of choiceDeck(seed, ids)) {
    const question = item.question;
    if (question.kind !== "choice") continue;
    cards.push({
      stem: question.stem,
      choices: question.choices,
      answer: question.answer,
      why: question.why,
      unitName: item.unitName,
      figure: question.figure,
    });
    if (cards.length >= count) break;
  }
  decks.set(key, cards);
  return cards;
}

async function labelOf(account: string): Promise<string> {
  const person = rosterPerson(account);
  const seat = person?.name ?? account;
  const sql = await getSql();
  const rows = await sql<{ display_name: string }>`SELECT display_name FROM chat_profiles WHERE account = ${account}`;
  const custom = rows[0]?.display_name.trim().slice(0, 12) ?? "";
  if (!custom || custom === seat) return seat;
  return `${custom} · ${seat}`.slice(0, 24);
}

async function openGame(): Promise<GameRow | null> {
  const sql = await getSql();
  const rows = await sql<GameRow>`
    SELECT id, host, topics, qcount, seconds, seed, phase, qi, question_ms
    FROM live_games
    WHERE phase <> 'closed'
    ORDER BY created_at DESC
    LIMIT 1
  `;
  return rows[0] ?? null;
}

async function gameById(id: string): Promise<GameRow | null> {
  const sql = await getSql();
  const rows = await sql<GameRow>`
    SELECT id, host, topics, qcount, seconds, seed, phase, qi, question_ms
    FROM live_games WHERE id = ${id} LIMIT 1
  `;
  return rows[0] ?? null;
}

async function tick(game: GameRow): Promise<GameRow> {
  if (game.phase !== "question") return game;
  const started = asNumber(game.question_ms);
  if (!started || Date.now() < started + game.seconds * 1000) return game;
  const sql = await getSql();
  await sql`UPDATE live_games SET phase = 'reveal' WHERE id = ${game.id} AND phase = 'question'`;
  return (await gameById(game.id)) ?? game;
}

async function present(game: GameRow, account: string): Promise<LiveView> {
  const current = await tick(game);
  const sql = await getSql();
  const players = await sql<{ account: string; name: string; score: number }>`
    SELECT account, name, score FROM live_players WHERE game_id = ${current.id}
  `;
  const ranked = players
    .map((row) => ({ account: row.account, name: row.name, score: asNumber(row.score), me: row.account === account }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "zh-HK"));
  const cards = deckFor(asNumber(current.seed), current.topics, asNumber(current.qcount));
  const card = cards[asNumber(current.qi)] ?? null;
  const phase = current.phase === "question" || current.phase === "reveal" || current.phase === "podium" ? current.phase : "lobby";
  const show = phase === "question" || phase === "reveal";
  const answers = show
    ? await sql<{ account: string; choice: number; correct: boolean; points: number }>`
        SELECT account, choice, correct, points FROM live_answers WHERE game_id = ${current.id} AND qi = ${asNumber(current.qi)}
      `
    : [];
  const mine = answers.find((row) => row.account === account);
  const started = asNumber(current.question_ms);
  const leftMs = phase === "question" && started ? Math.max(0, started + asNumber(current.seconds) * 1000 - Date.now()) : 0;
  return {
    id: current.id,
    host: current.host === account,
    phase,
    qi: asNumber(current.qi),
    total: cards.length,
    seconds: asNumber(current.seconds),
    leftMs,
    players: ranked,
    answered: answers.length,
    correctCount: phase === "reveal" ? answers.filter((row) => row.correct).length : null,
    myChoice: mine ? asNumber(mine.choice) : null,
    myPoints: phase === "reveal" && mine ? asNumber(mine.points) : null,
    question: show && card ? { stem: card.stem, choices: card.choices, unitName: card.unitName, figure: card.figure } : null,
    answer: phase === "reveal" && card ? card.answer : null,
    why: phase === "reveal" && card ? card.why : "",
  };
}

async function requireAccount(token: string): Promise<string | null> {
  const account = await sessionAccount(token);
  if (!account || !rosterPerson(account)) return null;
  return account;
}

export async function peekLive(token: string): Promise<{ ok: true; game: LivePeek } | { ok: false; error: string }> {
  const account = await requireAccount(token);
  if (!account) return { ok: false, error: "請先登入。" };
  const game = await openGame();
  if (!game || game.phase === "closed") return { ok: true, game: null };
  const sql = await getSql();
  const rows = await sql<{ count: number }>`SELECT COUNT(*)::int AS count FROM live_players WHERE game_id = ${game.id}`;
  const phase = game.phase === "question" || game.phase === "reveal" || game.phase === "podium" ? game.phase : "lobby";
  return { ok: true, game: { id: game.id, phase, players: asNumber(rows[0]?.count), host: game.host === account } };
}

export async function createLive(
  token: string,
  topics: string[],
  count: number,
  seconds: number,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const account = await requireAccount(token);
  if (!account) return { ok: false, error: "請先登入。" };
  if (!isTeacherAccount(account)) return { ok: false, error: "只有老師可以開搶答。" };
  if (![5, 10, 15].includes(count)) return { ok: false, error: "請選題數。" };
  if (![10, 20, 30].includes(seconds)) return { ok: false, error: "請選每題秒數。" };
  const picked = [...new Set(topics.filter((id) => UNITS.some((unit) => unit.id === id)))];
  if (!picked.length) return { ok: false, error: "先選課題。" };
  const seed = (randomBytes(4).readUInt32BE(0) & 0x7fffffff) || 1;
  const cards = deckFor(seed, picked.join(","), count);
  if (!cards.length) return { ok: false, error: "這個範圍沒有選擇題。" };
  const sql = await getSql();
  await sql`UPDATE live_games SET phase = 'closed' WHERE phase <> 'closed'`;
  let id = "";
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const next = String(1000 + (randomBytes(2).readUInt16BE(0) % 9000));
    const taken = await sql<{ id: string }>`SELECT id FROM live_games WHERE id = ${next} AND phase <> 'closed' LIMIT 1`;
    if (taken.length) continue;
    id = next;
    break;
  }
  if (!id) return { ok: false, error: "暫時開不到場，再試一次。" };
  await sql`
    INSERT INTO live_games (id, host, topics, qcount, seconds, seed, phase, qi)
    VALUES (${id}, ${account}, ${picked.join(",")}, ${cards.length}, ${seconds}, ${seed}, 'lobby', 0)
  `;
  const body = `搶答開始了，號碼 ${id}。到「搶答」頁加入。`.slice(0, 80);
  try {
    await sql`INSERT INTO chat_messages (account, body, room_id) VALUES (${account}, ${body}, 'hall')`;
  } catch {
    // The game still opens if the hall notice cannot be sent.
  }
  return { ok: true, id };
}

export async function joinLive(token: string, pin: string): Promise<{ ok: true; view: LiveView } | { ok: false; error: string }> {
  const account = await requireAccount(token);
  if (!account) return { ok: false, error: "請先登入。" };
  const id = pin.replace(/\D/g, "").slice(0, 4);
  const game = await gameById(id);
  if (!game || game.phase === "closed") return { ok: false, error: "找不到這場比賽。" };
  if (game.host === account) return { ok: true, view: await present(game, account) };
  if (isTeacherAccount(account)) return { ok: false, error: "老師負責開場，不用加入。" };
  const name = await labelOf(account);
  const sql = await getSql();
  await sql`
    INSERT INTO live_players (game_id, account, name)
    VALUES (${game.id}, ${account}, ${name})
    ON CONFLICT (game_id, account) DO UPDATE SET name = EXCLUDED.name
  `;
  const fresh = await gameById(game.id);
  if (!fresh) return { ok: false, error: "找不到這場比賽。" };
  return { ok: true, view: await present(fresh, account) };
}

export async function syncLive(token: string, pin: string): Promise<{ ok: true; view: LiveView } | { ok: false; error: string }> {
  const account = await requireAccount(token);
  if (!account) return { ok: false, error: "請先登入。" };
  const game = await gameById(pin.replace(/\D/g, "").slice(0, 4));
  if (!game || game.phase === "closed") return { ok: false, error: "這場比賽已結束。" };
  if (game.host !== account) {
    const sql = await getSql();
    const seat = await sql<{ account: string }>`SELECT account FROM live_players WHERE game_id = ${game.id} AND account = ${account} LIMIT 1`;
    if (!seat.length) return { ok: false, error: "請先加入這場比賽。" };
  }
  return { ok: true, view: await present(game, account) };
}

async function hostGame(token: string, pin: string): Promise<{ account: string; game: GameRow } | { error: string }> {
  const account = await requireAccount(token);
  if (!account || !isTeacherAccount(account)) return { error: "只有老師可以控制比賽。" };
  const game = await gameById(pin.replace(/\D/g, "").slice(0, 4));
  if (!game || game.host !== account || game.phase === "closed") return { error: "找不到這場比賽。" };
  return { account, game };
}

export async function startLive(token: string, pin: string): Promise<{ ok: true; view: LiveView } | { ok: false; error: string }> {
  const gate = await hostGame(token, pin);
  if ("error" in gate) return { ok: false, error: gate.error };
  const sql = await getSql();
  const seats = await sql<{ count: number }>`SELECT COUNT(*)::int AS count FROM live_players WHERE game_id = ${gate.game.id}`;
  if (asNumber(seats[0]?.count) < 1) return { ok: false, error: "等至少一位同學加入。" };
  await sql`
    UPDATE live_games SET phase = 'question', qi = 0, question_ms = ${Date.now()}
    WHERE id = ${gate.game.id} AND phase = 'lobby'
  `;
  const fresh = await gameById(gate.game.id);
  if (!fresh) return { ok: false, error: "找不到這場比賽。" };
  return { ok: true, view: await present(fresh, gate.account) };
}

export async function revealLive(token: string, pin: string): Promise<{ ok: true; view: LiveView } | { ok: false; error: string }> {
  const gate = await hostGame(token, pin);
  if ("error" in gate) return { ok: false, error: gate.error };
  const sql = await getSql();
  await sql`UPDATE live_games SET phase = 'reveal' WHERE id = ${gate.game.id} AND phase = 'question'`;
  const fresh = await gameById(gate.game.id);
  if (!fresh) return { ok: false, error: "找不到這場比賽。" };
  return { ok: true, view: await present(fresh, gate.account) };
}

export async function nextLive(token: string, pin: string): Promise<{ ok: true; view: LiveView } | { ok: false; error: string }> {
  const gate = await hostGame(token, pin);
  if ("error" in gate) return { ok: false, error: gate.error };
  const sql = await getSql();
  await sql`
    UPDATE live_games
    SET qi = qi + 1,
        phase = CASE WHEN qi + 1 >= qcount THEN 'podium' ELSE 'question' END,
        question_ms = ${Date.now()}
    WHERE id = ${gate.game.id} AND phase = 'reveal'
  `;
  const fresh = await gameById(gate.game.id);
  if (!fresh) return { ok: false, error: "找不到這場比賽。" };
  return { ok: true, view: await present(fresh, gate.account) };
}

export async function closeLive(token: string, pin: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const gate = await hostGame(token, pin);
  if ("error" in gate) return { ok: false, error: gate.error };
  const sql = await getSql();
  await sql`UPDATE live_games SET phase = 'closed' WHERE id = ${gate.game.id} AND phase <> 'closed'`;
  return { ok: true };
}

export async function answerLive(
  token: string,
  pin: string,
  choice: number,
): Promise<{ ok: true; view: LiveView } | { ok: false; error: string }> {
  const account = await requireAccount(token);
  if (!account) return { ok: false, error: "請先登入。" };
  if (isTeacherAccount(account)) return { ok: false, error: "老師不用作答。" };
  const game = await gameById(pin.replace(/\D/g, "").slice(0, 4));
  if (!game || game.phase === "closed") return { ok: false, error: "這場比賽已結束。" };
  const current = await tick(game);
  if (current.phase !== "question") {
    return { ok: true, view: await present(current, account) };
  }
  const cards = deckFor(asNumber(current.seed), current.topics, asNumber(current.qcount));
  const card = cards[asNumber(current.qi)];
  if (!card || !Number.isInteger(choice) || choice < 0 || choice >= card.choices.length) {
    return { ok: false, error: "這個選項不能用。" };
  }
  const sql = await getSql();
  const seat = await sql<{ account: string }>`SELECT account FROM live_players WHERE game_id = ${current.id} AND account = ${account} LIMIT 1`;
  if (!seat.length) return { ok: false, error: "請先加入這場比賽。" };
  const started = asNumber(current.question_ms);
  const limit = asNumber(current.seconds) * 1000;
  const ms = Math.max(0, Math.min(limit, Date.now() - started));
  const correct = choice === card.answer;
  const points = correct ? Math.round((1 - ms / limit / 2) * 1000) : 0;
  const qi = asNumber(current.qi);
  await sql`
    INSERT INTO live_answers (game_id, account, qi, choice, correct, points)
    VALUES (${current.id}, ${account}, ${qi}, ${choice}, ${correct}, ${points})
    ON CONFLICT (game_id, account, qi) DO UPDATE SET choice = EXCLUDED.choice, correct = EXCLUDED.correct, points = EXCLUDED.points
  `;
  await sql`
    UPDATE live_players
    SET score = COALESCE((SELECT SUM(points) FROM live_answers WHERE game_id = ${current.id} AND account = ${account}), 0)
    WHERE game_id = ${current.id} AND account = ${account}
  `;
  const fresh = await gameById(current.id);
  if (!fresh) return { ok: false, error: "這場比賽已結束。" };
  return { ok: true, view: await present(fresh, account) };
}
