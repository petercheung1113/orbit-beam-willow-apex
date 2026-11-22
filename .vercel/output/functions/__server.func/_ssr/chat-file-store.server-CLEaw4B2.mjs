import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as getSql } from "./db-BsiyhNta.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-file-store.server-CLEaw4B2.js
/** Each request stays small enough for the dev server. A 1GB file is many of these. */
var CHAT_FILE_CHUNK = 524288;
function formatBytes(size) {
	if (size < 1024) return `${size} B`;
	if (size < 1048576) return `${Math.ceil(size / 1024)} KB`;
	if (size < 1073741824) return `${(size / 1048576).toFixed(size < 10485760 ? 1 : 0)} MB`;
	return `${(size / 1073741824).toFixed(2)} GB`;
}
var chat_file_store_server_exports = /* @__PURE__ */ __exportAll({
	appendChatChunk: () => appendChatChunk,
	cleanFileName: () => cleanFileName,
	rememberPublished: () => rememberPublished,
	removeStoredFile: () => removeStoredFile,
	sealUpload: () => sealUpload,
	storedFileSize: () => storedFileSize,
	streamStoredFile: () => streamStoredFile
});
function safeId(id) {
	return /^[a-f0-9]{24}$/.test(id);
}
function asNumber(value) {
	const n = typeof value === "bigint" ? Number(value) : Number(value);
	return Number.isFinite(n) ? n : 0;
}
function asBytes(value) {
	if (!value) return null;
	if (value instanceof Uint8Array) return value;
	if (typeof value === "string") {
		const hex = value.startsWith("\\x") ? value.slice(2) : value;
		if (/^[0-9a-fA-F]+$/.test(hex) && hex.length % 2 === 0) return Uint8Array.from(Buffer.from(hex, "hex"));
	}
	return null;
}
function cleanFileName(raw) {
	return (raw.split(/[/\\]/).pop() ?? "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, 80) || "檔案";
}
async function readMeta(id) {
	const row = (await (await getSql())`
    SELECT account, room_id, name, mime, size, received, next_idx, published
    FROM chat_uploads WHERE id = ${id}
  `)[0];
	if (!row) return null;
	return {
		...row,
		size: asNumber(row.size),
		received: asNumber(row.received),
		next_idx: asNumber(row.next_idx)
	};
}
async function removeStoredFile(id) {
	if (!safeId(id)) return;
	const sql = await getSql();
	await sql`DELETE FROM chat_file_parts WHERE id = ${id}`;
	await sql`DELETE FROM chat_uploads WHERE id = ${id}`;
}
async function appendChatChunk(input) {
	if (!Number.isInteger(input.size) || input.size <= 0) return {
		ok: false,
		error: "檔案是空的。"
	};
	if (input.size > 1073741824) return {
		ok: false,
		error: "檔案不可超過 1GB。"
	};
	const total = Math.ceil(input.size / CHAT_FILE_CHUNK);
	if (input.total !== total || input.index < 0 || input.index >= total) return {
		ok: false,
		error: "上傳中斷，請再試一次。"
	};
	const expected = input.index === total - 1 ? input.size - input.index * CHAT_FILE_CHUNK : CHAT_FILE_CHUNK;
	if (input.bytes.length !== expected) return {
		ok: false,
		error: "上傳中斷，請再試一次。"
	};
	const sql = await getSql();
	let id = input.uploadId;
	if (!id) {
		if (input.index !== 0) return {
			ok: false,
			error: "上傳中斷，請再試一次。"
		};
		id = randomBytes(12).toString("hex");
		await sql`
      INSERT INTO chat_uploads (id, account, room_id, name, mime, size, received, next_idx)
      VALUES (${id}, ${input.account}, ${input.roomId}, ${input.name}, ${input.mime}, ${input.size}, 0, 0)
    `;
	} else if (!safeId(id)) return {
		ok: false,
		error: "上傳中斷，請再試一次。"
	};
	const meta = await readMeta(id);
	if (!meta) return {
		ok: false,
		error: "上傳中斷，請再試一次。"
	};
	if (meta.account !== input.account || meta.room_id !== input.roomId || meta.size !== input.size) return {
		ok: false,
		error: "上傳中斷，請再試一次。"
	};
	if (meta.published) return {
		ok: true,
		uploadId: id,
		done: true,
		published: JSON.parse(meta.published)
	};
	if (input.index === meta.next_idx - 1) return {
		ok: true,
		uploadId: id,
		done: meta.received === meta.size
	};
	if (input.index !== meta.next_idx) return {
		ok: false,
		error: "上傳中斷，請再試一次。"
	};
	await sql`INSERT INTO chat_file_parts (id, idx, bytes) VALUES (${id}, ${input.index}, ${input.bytes})`;
	const received = meta.received + input.bytes.length;
	await sql`
    UPDATE chat_uploads SET received = ${received}, next_idx = ${input.index + 1} WHERE id = ${id}
  `;
	return {
		ok: true,
		uploadId: id,
		done: received === input.size
	};
}
async function sealUpload(_id) {}
async function rememberPublished(id, message) {
	if (!safeId(id)) return;
	await (await getSql())`UPDATE chat_uploads SET published = ${JSON.stringify(message)} WHERE id = ${id}`;
}
async function streamStoredFile(id) {
	if (!safeId(id)) return null;
	const meta = await readMeta(id);
	if (!meta || meta.received !== meta.size) return null;
	let idx = 0;
	return new ReadableStream({ async pull(controller) {
		const chunk = asBytes((await (await getSql())`SELECT bytes FROM chat_file_parts WHERE id = ${id} AND idx = ${idx}`)[0]?.bytes);
		if (!chunk) {
			controller.close();
			return;
		}
		controller.enqueue(chunk);
		idx += 1;
	} });
}
async function storedFileSize(id) {
	const meta = await readMeta(id);
	if (!meta || meta.received !== meta.size) return null;
	return meta.size;
}
//#endregion
export { sealUpload as a, CHAT_FILE_CHUNK as c, rememberPublished as i, chat_file_store_server_exports as n, storedFileSize as o, cleanFileName as r, streamStoredFile as s, appendChatChunk as t, formatBytes as u };
