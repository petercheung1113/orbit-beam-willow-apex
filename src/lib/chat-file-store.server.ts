import { randomBytes } from "node:crypto";
import { getSql } from "@/lib/db";
import { CHAT_FILE_CHUNK, CHAT_FILE_MAX } from "@/lib/chat-upload";

type Meta = {
  account: string;
  room_id: string;
  name: string;
  mime: string;
  size: number;
  received: number;
  next_idx: number;
  published: string | null;
};

function safeId(id: string): boolean {
  return /^[a-f0-9]{24}$/.test(id);
}

function asNumber(value: unknown): number {
  const n = typeof value === "bigint" ? Number(value) : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function asBytes(value: unknown): Uint8Array | null {
  if (!value) return null;
  if (value instanceof Uint8Array) return value;
  if (typeof value === "string") {
    const hex = value.startsWith("\\x") ? value.slice(2) : value;
    if (/^[0-9a-fA-F]+$/.test(hex) && hex.length % 2 === 0) return Uint8Array.from(Buffer.from(hex, "hex"));
  }
  return null;
}

export function cleanFileName(raw: string): string {
  const base = raw.split(/[/\\]/).pop() ?? "";
  const cleaned = base.replace(/[\u0000-\u001f]/g, "").trim().slice(0, 80);
  return cleaned || "檔案";
}

async function readMeta(id: string): Promise<Meta | null> {
  const sql = await getSql();
  const rows = await sql<Meta>`
    SELECT account, room_id, name, mime, size, received, next_idx, published
    FROM chat_uploads WHERE id = ${id}
  `;
  const row = rows[0];
  if (!row) return null;
  return { ...row, size: asNumber(row.size), received: asNumber(row.received), next_idx: asNumber(row.next_idx) };
}

export async function removeStoredFile(id: string): Promise<void> {
  if (!safeId(id)) return;
  const sql = await getSql();
  await sql`DELETE FROM chat_file_parts WHERE id = ${id}`;
  await sql`DELETE FROM chat_uploads WHERE id = ${id}`;
}

export async function appendChatChunk(input: {
  uploadId: string;
  account: string;
  roomId: string;
  name: string;
  mime: string;
  size: number;
  index: number;
  total: number;
  bytes: Buffer;
}): Promise<{ ok: true; uploadId: string; done: boolean; published?: unknown } | { ok: false; error: string }> {
  if (!Number.isInteger(input.size) || input.size <= 0) return { ok: false, error: "檔案是空的。" };
  if (input.size > CHAT_FILE_MAX) return { ok: false, error: "檔案不可超過 1GB。" };
  const total = Math.ceil(input.size / CHAT_FILE_CHUNK);
  if (input.total !== total || input.index < 0 || input.index >= total) return { ok: false, error: "上傳中斷，請再試一次。" };
  const expected = input.index === total - 1 ? input.size - input.index * CHAT_FILE_CHUNK : CHAT_FILE_CHUNK;
  if (input.bytes.length !== expected) return { ok: false, error: "上傳中斷，請再試一次。" };
  const sql = await getSql();
  let id = input.uploadId;
  if (!id) {
    if (input.index !== 0) return { ok: false, error: "上傳中斷，請再試一次。" };
    id = randomBytes(12).toString("hex");
    await sql`
      INSERT INTO chat_uploads (id, account, room_id, name, mime, size, received, next_idx)
      VALUES (${id}, ${input.account}, ${input.roomId}, ${input.name}, ${input.mime}, ${input.size}, 0, 0)
    `;
  } else if (!safeId(id)) {
    return { ok: false, error: "上傳中斷，請再試一次。" };
  }
  const meta = await readMeta(id);
  if (!meta) return { ok: false, error: "上傳中斷，請再試一次。" };
  if (meta.account !== input.account || meta.room_id !== input.roomId || meta.size !== input.size) {
    return { ok: false, error: "上傳中斷，請再試一次。" };
  }
  if (meta.published) {
    return { ok: true, uploadId: id, done: true, published: JSON.parse(meta.published) as unknown };
  }
  if (input.index === meta.next_idx - 1) return { ok: true, uploadId: id, done: meta.received === meta.size };
  if (input.index !== meta.next_idx) return { ok: false, error: "上傳中斷，請再試一次。" };
  await sql`INSERT INTO chat_file_parts (id, idx, bytes) VALUES (${id}, ${input.index}, ${input.bytes})`;
  const received = meta.received + input.bytes.length;
  await sql`
    UPDATE chat_uploads SET received = ${received}, next_idx = ${input.index + 1} WHERE id = ${id}
  `;
  return { ok: true, uploadId: id, done: received === input.size };
}

export async function sealUpload(_id: string): Promise<void> {
  // Parts already live in the database. Kept so a retried final request stays a no-op.
}

export async function rememberPublished(id: string, message: unknown): Promise<void> {
  if (!safeId(id)) return;
  const sql = await getSql();
  await sql`UPDATE chat_uploads SET published = ${JSON.stringify(message)} WHERE id = ${id}`;
}

export async function streamStoredFile(id: string): Promise<ReadableStream | null> {
  if (!safeId(id)) return null;
  const meta = await readMeta(id);
  if (!meta || meta.received !== meta.size) return null;
  let idx = 0;
  return new ReadableStream({
    async pull(controller) {
      const sql = await getSql();
      const rows = await sql<{ bytes: unknown }>`SELECT bytes FROM chat_file_parts WHERE id = ${id} AND idx = ${idx}`;
      const chunk = asBytes(rows[0]?.bytes);
      if (!chunk) {
        controller.close();
        return;
      }
      controller.enqueue(chunk);
      idx += 1;
    },
  });
}

export async function storedFileSize(id: string): Promise<number | null> {
  const meta = await readMeta(id);
  if (!meta || meta.received !== meta.size) return null;
  return meta.size;
}
