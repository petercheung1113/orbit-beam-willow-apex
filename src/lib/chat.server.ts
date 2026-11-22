import { randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { hasProfanity, PROFANITY_ERROR } from "@/lib/profanity";
import { rosterChat, rosterPerson } from "@/lib/class-roster.server";
import { isBuiltinId } from "@/data/avatars";

export type ChatFile = { id: string; name: string; mime: string; size: number };

export type ChatMessage = {
  id: number;
  account: string;
  name: string;
  seat: string;
  body: string;
  at: number;
  file: ChatFile | null;
};

export type ChatMate = { account: string; name: string; seat: string; online: boolean };

export type ChatRoomInfo = { id: string; kind: "hall" | "direct" | "group"; title: string; members: string[] };

export type ChatPing = {
  id: number;
  roomId: string;
  account: string;
  name: string;
  seat: string;
  body: string;
  at: number;
  fileName: string | null;
};

export type StoredAvatar = { account: string; kind: "builtin" | "upload"; value: string };

function fileOf(row: { file_id: string | null; file_name: string | null; file_mime: string | null; file_size: unknown }): ChatFile | null {
  if (!row.file_id) return null;
  return {
    id: row.file_id,
    name: row.file_name || "檔案",
    mime: row.file_mime || "application/octet-stream",
    size: asNumber(row.file_size),
  };
}

function asNumber(value: unknown): number {
  const n = typeof value === "bigint" ? Number(value) : Number(value);
  return Number.isFinite(n) ? n : 0;
}

export async function openChatSession(account: string): Promise<string> {
  const token = randomBytes(24).toString("hex");
  const sql = await getSql();
  await sql`INSERT INTO chat_sessions (token, account, expires_at) VALUES (${token}, ${account}, now() + interval '14 days')`;
  return token;
}

async function accountFor(token: string): Promise<string | null> {
  if (!/^[a-f0-9]{48}$/.test(token)) return null;
  const sql = await getSql();
  const rows = await sql<{ account: string }>`
    SELECT account FROM chat_sessions WHERE token = ${token} AND expires_at > now()
  `;
  return rows[0]?.account ?? null;
}

export async function sessionAccount(token: string): Promise<string | null> {
  return accountFor(token);
}

export async function accountForChat(token: string, roomId: string): Promise<string | null> {
  const account = await accountFor(token);
  if (!account) return null;
  return (await allowed(account, roomId)) ? account : null;
}

function named(account: string, names: Map<string, string>): { account: string; name: string; seat: string } | null {
  const person = rosterPerson(account);
  if (!person) return null;
  return { account: person.account, seat: person.name, name: names.get(person.account) ?? person.name };
}

function withSeat(name: string, seat: string): string {
  return name === seat ? seat : `${name} · ${seat}`;
}

async function namesOf(): Promise<Map<string, string>> {
  const map = new Map(rosterChat().map((person) => [person.account, person.name]));
  const sql = await getSql();
  const rows = await sql<{ account: string; display_name: string }>`SELECT account, display_name FROM chat_profiles`;
  for (const row of rows) {
    const name = row.display_name.trim().slice(0, 12);
    if (name && map.has(row.account)) map.set(row.account, name);
  }
  return map;
}

async function roomsFor(account: string, names: Map<string, string>): Promise<ChatRoomInfo[]> {
  const sql = await getSql();
  const joined = await sql<{ id: string; kind: string; title: string }>`
    SELECT r.id, r.kind, r.title
    FROM chat_rooms r
    JOIN chat_members m ON m.room_id = r.id
    WHERE m.account = ${account}
    ORDER BY r.created_at
  `;
  const members = await sql<{ room_id: string; account: string }>`
    SELECT room_id, account FROM chat_members
    WHERE room_id IN (SELECT room_id FROM chat_members WHERE account = ${account})
  `;
  const byRoom = new Map<string, string[]>();
  for (const row of members) {
    const list = byRoom.get(row.room_id) ?? [];
    list.push(row.account);
    byRoom.set(row.room_id, list);
  }
  const rooms: ChatRoomInfo[] = [{ id: "hall", kind: "hall", title: "大堂", members: [] }];
  for (const row of joined) {
    const members = byRoom.get(row.id) ?? [];
    if (row.kind === "direct") {
      const other = members.find((item) => item !== account);
      const otherName = (other && names.get(other)) || "同學";
      const otherSeat = other ? (rosterPerson(other)?.name ?? other) : "同學";
      rooms.push({ id: row.id, kind: "direct", title: withSeat(otherName, otherSeat), members });
    } else if (row.kind === "group") {
      rooms.push({ id: row.id, kind: "group", title: row.title || "群組", members });
    }
  }
  return rooms;
}

async function allowed(account: string, roomId: string): Promise<boolean> {
  if (roomId === "hall") return true;
  if (!/^[\w:-]{3,48}$/.test(roomId)) return false;
  const sql = await getSql();
  const rows = await sql<{ account: string }>`
    SELECT account FROM chat_members WHERE room_id = ${roomId} AND account = ${account} LIMIT 1
  `;
  return Boolean(rows[0]);
}

export async function syncChat(token: string, roomId: string, after: number, rev: number): Promise<
  | { ok: false; error: "expired" }
  | { ok: true; rev: number; roomId: string; rooms: ChatRoomInfo[]; mates: ChatMate[]; messages: ChatMessage[]; pings: ChatPing[]; replace: boolean; avatars?: StoredAvatar[] }
> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  const sql = await getSql();
  await sql`DELETE FROM chat_sessions WHERE expires_at < now()`;
  await sql`
    INSERT INTO chat_presence (account, seen_at) VALUES (${account}, now())
    ON CONFLICT (account) DO UPDATE SET seen_at = now()
  `;
  await sql`DELETE FROM chat_presence WHERE seen_at < now() - interval '40 seconds'`;
  const present = await sql<{ account: string }>`SELECT account FROM chat_presence ORDER BY account`;
  const online = new Set(present.map((row) => row.account));
  const names = await namesOf();
  const mates = rosterChat().map((person) => ({
    account: person.account,
    seat: person.name,
    name: names.get(person.account) ?? person.name,
    online: online.has(person.account),
  }));
  const rooms = await roomsFor(account, names);
  const active = (await allowed(account, roomId)) ? roomId : "hall";
  const stamps = await sql<{ at: unknown }>`
    SELECT CAST(EXTRACT(EPOCH FROM updated_at) * 1000 AS BIGINT) AS at FROM chat_avatars
  `;
  const nextRev = stamps.reduce((max, row) => Math.max(max, asNumber(row.at)), 0);
  let avatars: StoredAvatar[] | undefined;
  if (nextRev !== rev) {
    const stored = await sql<{ account: string; kind: string; value: string }>`
      SELECT account, kind, value FROM chat_avatars
    `;
    avatars = [];
    for (const row of stored) {
      if (row.kind === "builtin" && isBuiltinId(row.value)) avatars.push({ account: row.account, kind: "builtin", value: row.value });
      else if (row.kind === "upload" && row.value.startsWith("data:image/jpeg;base64,")) avatars.push({ account: row.account, kind: "upload", value: row.value });
    }
  }
  const since = Number.isFinite(after) && after > 0 ? Math.floor(after) : 0;
  const head = await sql<{ id: unknown }>`SELECT COALESCE(MAX(id), 0) AS id FROM chat_messages WHERE room_id = ${active}`;
  const newest = asNumber(head[0]?.id);
  const replace = since > newest;
  const rows = !replace && since
    ? await sql<{ id: number; account: string; body: string; at: unknown; file_id: string | null; file_name: string | null; file_mime: string | null; file_size: unknown }>`
        SELECT id, account, body, file_id, file_name, file_mime, file_size,
               CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
        FROM chat_messages WHERE room_id = ${active} AND id > ${since} ORDER BY id ASC LIMIT 80
      `
    : await sql<{ id: number; account: string; body: string; at: unknown; file_id: string | null; file_name: string | null; file_mime: string | null; file_size: unknown }>`
        SELECT id, account, body, file_id, file_name, file_mime, file_size,
               CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
        FROM (
          SELECT id, account, body, file_id, file_name, file_mime, file_size, created_at
          FROM chat_messages WHERE room_id = ${active} ORDER BY id DESC LIMIT 40
        ) recent
        ORDER BY id ASC
      `;
  const messages = rows.flatMap((row) => {
    const mate = named(row.account, names);
    if (!mate) return [];
    return [{ id: asNumber(row.id), account: mate.account, name: mate.name, seat: mate.seat, body: row.body, at: asNumber(row.at), file: fileOf(row) }];
  });
  const pingRows = await sql<{ id: unknown; room_id: string; account: string; body: string; at: unknown; file_name: string | null }>`
    SELECT id, room_id, account, body, file_name,
           CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
    FROM chat_messages
    WHERE room_id = 'hall'
       OR room_id IN (SELECT room_id FROM chat_members WHERE account = ${account})
    ORDER BY id DESC
    LIMIT 80
  `;
  const pings = pingRows.flatMap((row) => {
    const mate = named(row.account, names);
    if (!mate) return [];
    return [{ id: asNumber(row.id), roomId: row.room_id, account: mate.account, name: mate.name, seat: mate.seat, body: row.body, at: asNumber(row.at), fileName: row.file_name }];
  });
  return { ok: true, rev: nextRev, roomId: active, rooms, mates, messages, pings, replace, avatars };
}

export async function sendChat(token: string, roomId: string, raw: string): Promise<
  { ok: false; error: string } | { ok: true; message: ChatMessage }
> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  const active = (await allowed(account, roomId)) ? roomId : "";
  if (!active) return { ok: false, error: "你不在這個聊天室。" };
  const names = await namesOf();
  const mate = named(account, names);
  if (!mate) return { ok: false, error: "expired" };
  const body = raw.replace(/\s+/g, " ").trim().slice(0, 80);
  if (!body) return { ok: false, error: "寫一句先。" };
  if (hasProfanity(body)) return { ok: false, error: PROFANITY_ERROR };
  const sql = await getSql();
  const last = await sql<{ at: unknown }>`
    SELECT CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
    FROM chat_messages WHERE account = ${account} ORDER BY id DESC LIMIT 1
  `;
  if (last[0] && Date.now() - asNumber(last[0].at) < 1200) return { ok: false, error: "講慢少少。" };
  const inserted = await sql<{ id: number; at: unknown }>`
    INSERT INTO chat_messages (account, body, room_id)
    VALUES (${account}, ${body}, ${active})
    RETURNING id, CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
  `;
  const row = inserted[0];
  if (!row) return { ok: false, error: "送唔出，再試一次。" };
  await dropOldMessages(active);
  await sql`
    INSERT INTO chat_presence (account, seen_at) VALUES (${account}, now())
    ON CONFLICT (account) DO UPDATE SET seen_at = now()
  `;
  return { ok: true, message: { id: asNumber(row.id), account: mate.account, name: mate.name, seat: mate.seat, body, at: asNumber(row.at), file: null } };
}

export async function publishFileMessage(
  token: string,
  roomId: string,
  file: ChatFile,
): Promise<{ ok: false; error: string } | { ok: true; message: ChatMessage }> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  const active = (await allowed(account, roomId)) ? roomId : "";
  if (!active) return { ok: false, error: "你不在這個聊天室。" };
  if (!/^[a-f0-9]{24}$/.test(file.id)) return { ok: false, error: "上傳失敗。" };
  if (hasProfanity(file.name)) return { ok: false, error: PROFANITY_ERROR };
  const names = await namesOf();
  const mate = named(account, names);
  if (!mate) return { ok: false, error: "expired" };
  const sql = await getSql();
  const existing = await sql<{ id: number; at: unknown }>`
    SELECT id, CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
    FROM chat_messages WHERE file_id = ${file.id} LIMIT 1
  `;
  if (existing[0]) {
    return {
      ok: true,
      message: {
        id: asNumber(existing[0].id),
        account: mate.account,
        name: mate.name,
        seat: mate.seat,
        body: "",
        at: asNumber(existing[0].at),
        file,
      },
    };
  }
  const inserted = await sql<{ id: number; at: unknown }>`
    INSERT INTO chat_messages (account, body, room_id, file_id, file_name, file_mime, file_size)
    VALUES (${account}, '', ${active}, ${file.id}, ${file.name}, ${file.mime}, ${file.size})
    RETURNING id, CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
  `;
  const row = inserted[0];
  if (!row) return { ok: false, error: "送唔出，再試一次。" };
  await dropOldMessages(active);
  return {
    ok: true,
    message: { id: asNumber(row.id), account: mate.account, name: mate.name, seat: mate.seat, body: "", at: asNumber(row.at), file },
  };
}

async function dropOldMessages(roomId: string): Promise<void> {
  const sql = await getSql();
  const old = await sql<{ file_id: string | null }>`
    SELECT file_id FROM chat_messages
    WHERE room_id = ${roomId} AND id <= (
      SELECT id FROM chat_messages WHERE room_id = ${roomId} ORDER BY id DESC OFFSET 80 LIMIT 1
    )
  `;
  await sql`
    DELETE FROM chat_messages
    WHERE room_id = ${roomId} AND id <= (
      SELECT id FROM chat_messages WHERE room_id = ${roomId} ORDER BY id DESC OFFSET 80 LIMIT 1
    )
  `;
  const { removeStoredFile } = await import("@/lib/chat-file-store.server");
  for (const row of old) {
    if (row.file_id) await removeStoredFile(row.file_id);
  }
}

export async function clearRoomHistory(token: string, roomId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  if (!(await allowed(account, roomId))) return { ok: false, error: "你不在這個聊天室。" };
  const sql = await getSql();
  const files = await sql<{ file_id: string | null }>`SELECT file_id FROM chat_messages WHERE room_id = ${roomId} AND file_id IS NOT NULL`;
  await sql`DELETE FROM chat_messages WHERE room_id = ${roomId}`;
  const { removeStoredFile } = await import("@/lib/chat-file-store.server");
  for (const row of files) {
    if (row.file_id) await removeStoredFile(row.file_id);
  }
  return { ok: true };
}

export async function openChatFile(token: string, fileId: string): Promise<
  { ok: false; error: string } | { ok: true; name: string; mime: string; size: number }
> {
  if (!/^[a-f0-9]{24}$/.test(fileId)) return { ok: false, error: "找不到檔案。" };
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  const sql = await getSql();
  const rows = await sql<{ room_id: string; file_name: string; file_mime: string; file_size: unknown }>`
    SELECT room_id, file_name, file_mime, file_size FROM chat_messages WHERE file_id = ${fileId} LIMIT 1
  `;
  const row = rows[0];
  if (!row) return { ok: false, error: "找不到檔案。" };
  if (!(await allowed(account, row.room_id))) return { ok: false, error: "你不在這個聊天室。" };
  return { ok: true, name: row.file_name, mime: row.file_mime, size: asNumber(row.file_size) };
}

function dmId(a: string, b: string): string {
  return `dm:${[a, b].sort().join(":")}`;
}

async function tellInvite(accounts: string[], title: string, body: string, tag: string) {
  try {
    const { pushInvite } = await import("@/lib/chat-push.server");
    await pushInvite(accounts, title, body, tag);
  } catch {
    /* the room still opens if a phone cannot be reached */
  }
}

export async function openDirect(token: string, other: string): Promise<{ ok: true; room: ChatRoomInfo } | { ok: false; error: string }> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  const mate = rosterPerson(other);
  if (!mate || mate.account === account) return { ok: false, error: "揀另一位同學。" };
  const names = await namesOf();
  const id = dmId(account, mate.account);
  const title = withSeat(names.get(mate.account) ?? mate.name, mate.name);
  const sql = await getSql();
  await sql`
    INSERT INTO chat_rooms (id, kind, title, created_by)
    VALUES (${id}, 'direct', ${title}, ${account})
    ON CONFLICT (id) DO NOTHING
  `;
  await sql`INSERT INTO chat_members (room_id, account) VALUES (${id}, ${account}) ON CONFLICT DO NOTHING`;
  await sql`INSERT INTO chat_members (room_id, account) VALUES (${id}, ${mate.account}) ON CONFLICT DO NOTHING`;
  const mine = names.get(account) ?? rosterPerson(account)?.name ?? "同學";
  await tellInvite([mate.account], "私聊邀請", `${mine} 邀請你傾偈`, `invite:${id}`);
  return { ok: true, room: { id, kind: "direct", title, members: [account, mate.account] } };
}

export async function openGroup(token: string, titleRaw: string, members: string[]): Promise<{ ok: true; room: ChatRoomInfo } | { ok: false; error: string }> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  const title = titleRaw.trim().slice(0, 12);
  if (!title) return { ok: false, error: "先寫群組名稱。" };
  if (hasProfanity(title)) return { ok: false, error: PROFANITY_ERROR };
  const picked = [...new Set(members.map((item) => rosterPerson(item)?.account).filter((item): item is string => Boolean(item && item !== account)))].slice(0, 12);
  if (picked.length < 1) return { ok: false, error: "至少再揀一位同學。" };
  const id = `g:${randomBytes(6).toString("hex")}`;
  const sql = await getSql();
  await sql`INSERT INTO chat_rooms (id, kind, title, created_by) VALUES (${id}, 'group', ${title}, ${account})`;
  await sql`INSERT INTO chat_members (room_id, account) VALUES (${id}, ${account})`;
  for (const member of picked) {
    await sql`INSERT INTO chat_members (room_id, account) VALUES (${id}, ${member}) ON CONFLICT DO NOTHING`;
  }
  const mine = (await namesOf()).get(account) ?? rosterPerson(account)?.name ?? "同學";
  await tellInvite(picked, "群組邀請", `${mine} 邀請你加入「${title}」`, `invite:${id}`);
  return { ok: true, room: { id, kind: "group", title, members: [account, ...picked] } };
}

export async function addGroupMembers(token: string, roomId: string, members: string[]): Promise<{ ok: true; room: ChatRoomInfo } | { ok: false; error: string }> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  if (!roomId.startsWith("g:")) return { ok: false, error: "這不是群組。" };
  if (!(await allowed(account, roomId))) return { ok: false, error: "你不在這個群組。" };
  const sql = await getSql();
  const rooms = await sql<{ kind: string; title: string }>`SELECT kind, title FROM chat_rooms WHERE id = ${roomId} LIMIT 1`;
  const room = rooms[0];
  if (!room || room.kind !== "group") return { ok: false, error: "這不是群組。" };
  const current = await sql<{ account: string }>`SELECT account FROM chat_members WHERE room_id = ${roomId}`;
  const have = new Set(current.map((row) => row.account));
  if (have.size >= 36) return { ok: false, error: "群組已滿。" };
  const picked = [
    ...new Set(members.map((item) => rosterPerson(item)?.account).filter((item): item is string => Boolean(item && item !== account && !have.has(item)))),
  ].slice(0, 36 - have.size);
  if (!picked.length) return { ok: false, error: "揀還未加入的同學。" };
  for (const member of picked) {
    await sql`INSERT INTO chat_members (room_id, account) VALUES (${roomId}, ${member}) ON CONFLICT DO NOTHING`;
  }
  const mine = (await namesOf()).get(account) ?? rosterPerson(account)?.name ?? "同學";
  await tellInvite(picked, "群組邀請", `${mine} 邀請你加入「${room.title || "群組"}」`, `invite:${roomId}`);
  return { ok: true, room: { id: roomId, kind: "group", title: room.title || "群組", members: [...have, ...picked] } };
}

export async function deleteGroup(token: string, roomId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  if (!roomId.startsWith("g:")) return { ok: false, error: "這不是群組。" };
  if (!(await allowed(account, roomId))) return { ok: false, error: "你不在這個群組。" };
  const sql = await getSql();
  const rooms = await sql<{ kind: string }>`SELECT kind FROM chat_rooms WHERE id = ${roomId} LIMIT 1`;
  if (rooms[0]?.kind !== "group") return { ok: false, error: "這不是群組。" };
  const files = await sql<{ file_id: string | null }>`SELECT file_id FROM chat_messages WHERE room_id = ${roomId} AND file_id IS NOT NULL`;
  await sql`DELETE FROM chat_messages WHERE room_id = ${roomId}`;
  await sql`DELETE FROM chat_members WHERE room_id = ${roomId}`;
  await sql`DELETE FROM chat_rooms WHERE id = ${roomId}`;
  const { removeStoredFile } = await import("@/lib/chat-file-store.server");
  for (const row of files) {
    if (row.file_id) await removeStoredFile(row.file_id);
  }
  return { ok: true };
}

export async function saveProfile(token: string, raw: string): Promise<{ ok: true; name: string } | { ok: false; error: string }> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  const name = raw.trim().slice(0, 12);
  if (!name) return { ok: false, error: "名字不可以空白。" };
  if (hasProfanity(name)) return { ok: false, error: PROFANITY_ERROR };
  const sql = await getSql();
  await sql`
    INSERT INTO chat_profiles (account, display_name, updated_at)
    VALUES (${account}, ${name}, now())
    ON CONFLICT (account) DO UPDATE SET display_name = ${name}, updated_at = now()
  `;
  return { ok: true, name };
}

export async function saveAvatar(token: string, kind: string, value: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  if (kind === "builtin") {
    if (!isBuiltinId(value)) return { ok: false, error: "沒有這個頭像。" };
  } else if (kind === "upload") {
    if (!value.startsWith("data:image/jpeg;base64,") || value.length > 60000) return { ok: false, error: "圖片太大，請換一張。" };
  } else {
    return { ok: false, error: "沒有這個頭像。" };
  }
  const sql = await getSql();
  await sql`
    INSERT INTO chat_avatars (account, kind, value, updated_at)
    VALUES (${account}, ${kind}, ${value}, now())
    ON CONFLICT (account) DO UPDATE SET kind = ${kind}, value = ${value}, updated_at = now()
  `;
  return { ok: true };
}
