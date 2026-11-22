import { t as getSql } from "./db-BsiyhNta.mjs";
import { r as isBuiltinId } from "./avatars-_NsnOvHN.mjs";
import { n as hasProfanity, t as PROFANITY_ERROR } from "./profanity-BWxlDsA2.mjs";
import { rosterChat, rosterPerson } from "./class-roster.server-CIgXvlsE.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/chat.server-ClhhNbD1.js
function fileOf(row) {
	if (!row.file_id) return null;
	return {
		id: row.file_id,
		name: row.file_name || "檔案",
		mime: row.file_mime || "application/octet-stream",
		size: asNumber(row.file_size)
	};
}
function asNumber(value) {
	const n = typeof value === "bigint" ? Number(value) : Number(value);
	return Number.isFinite(n) ? n : 0;
}
async function openChatSession(account) {
	const token = randomBytes(24).toString("hex");
	await (await getSql())`INSERT INTO chat_sessions (token, account, expires_at) VALUES (${token}, ${account}, now() + interval '14 days')`;
	return token;
}
async function accountFor(token) {
	if (!/^[a-f0-9]{48}$/.test(token)) return null;
	return (await (await getSql())`
    SELECT account FROM chat_sessions WHERE token = ${token} AND expires_at > now()
  `)[0]?.account ?? null;
}
async function sessionAccount(token) {
	return accountFor(token);
}
async function accountForChat(token, roomId) {
	const account = await accountFor(token);
	if (!account) return null;
	return await allowed(account, roomId) ? account : null;
}
function named(account, names) {
	const person = rosterPerson(account);
	if (!person) return null;
	return {
		account: person.account,
		seat: person.name,
		name: names.get(person.account) ?? person.name
	};
}
function withSeat(name, seat) {
	return name === seat ? seat : `${name} · ${seat}`;
}
async function namesOf() {
	const map = new Map(rosterChat().map((person) => [person.account, person.name]));
	const rows = await (await getSql())`SELECT account, display_name FROM chat_profiles`;
	for (const row of rows) {
		const name = row.display_name.trim().slice(0, 12);
		if (name && map.has(row.account)) map.set(row.account, name);
	}
	return map;
}
async function roomsFor(account, names) {
	const sql = await getSql();
	const joined = await sql`
    SELECT r.id, r.kind, r.title
    FROM chat_rooms r
    JOIN chat_members m ON m.room_id = r.id
    WHERE m.account = ${account}
    ORDER BY r.created_at
  `;
	const members = await sql`
    SELECT room_id, account FROM chat_members
    WHERE room_id IN (SELECT room_id FROM chat_members WHERE account = ${account})
  `;
	const byRoom = /* @__PURE__ */ new Map();
	for (const row of members) {
		const list = byRoom.get(row.room_id) ?? [];
		list.push(row.account);
		byRoom.set(row.room_id, list);
	}
	const rooms = [{
		id: "hall",
		kind: "hall",
		title: "大堂",
		members: []
	}];
	for (const row of joined) {
		const members = byRoom.get(row.id) ?? [];
		if (row.kind === "direct") {
			const other = members.find((item) => item !== account);
			const otherName = other && names.get(other) || "同學";
			const otherSeat = other ? rosterPerson(other)?.name ?? other : "同學";
			rooms.push({
				id: row.id,
				kind: "direct",
				title: withSeat(otherName, otherSeat),
				members
			});
		} else if (row.kind === "group") rooms.push({
			id: row.id,
			kind: "group",
			title: row.title || "群組",
			members
		});
	}
	return rooms;
}
async function allowed(account, roomId) {
	if (roomId === "hall") return true;
	if (!/^[\w:-]{3,48}$/.test(roomId)) return false;
	const rows = await (await getSql())`
    SELECT account FROM chat_members WHERE room_id = ${roomId} AND account = ${account} LIMIT 1
  `;
	return Boolean(rows[0]);
}
async function syncChat(token, roomId, after, rev) {
	const account = await accountFor(token);
	if (!account) return {
		ok: false,
		error: "expired"
	};
	const sql = await getSql();
	await sql`DELETE FROM chat_sessions WHERE expires_at < now()`;
	await sql`
    INSERT INTO chat_presence (account, seen_at) VALUES (${account}, now())
    ON CONFLICT (account) DO UPDATE SET seen_at = now()
  `;
	await sql`DELETE FROM chat_presence WHERE seen_at < now() - interval '40 seconds'`;
	const present = await sql`SELECT account FROM chat_presence ORDER BY account`;
	const online = new Set(present.map((row) => row.account));
	const names = await namesOf();
	const mates = rosterChat().map((person) => ({
		account: person.account,
		seat: person.name,
		name: names.get(person.account) ?? person.name,
		online: online.has(person.account)
	}));
	const rooms = await roomsFor(account, names);
	const active = await allowed(account, roomId) ? roomId : "hall";
	const nextRev = (await sql`
    SELECT CAST(EXTRACT(EPOCH FROM updated_at) * 1000 AS BIGINT) AS at FROM chat_avatars
  `).reduce((max, row) => Math.max(max, asNumber(row.at)), 0);
	let avatars;
	if (nextRev !== rev) {
		const stored = await sql`
      SELECT account, kind, value FROM chat_avatars
    `;
		avatars = [];
		for (const row of stored) if (row.kind === "builtin" && isBuiltinId(row.value)) avatars.push({
			account: row.account,
			kind: "builtin",
			value: row.value
		});
		else if (row.kind === "upload" && row.value.startsWith("data:image/jpeg;base64,")) avatars.push({
			account: row.account,
			kind: "upload",
			value: row.value
		});
	}
	const since = Number.isFinite(after) && after > 0 ? Math.floor(after) : 0;
	const replace = since > asNumber((await sql`SELECT COALESCE(MAX(id), 0) AS id FROM chat_messages WHERE room_id = ${active}`)[0]?.id);
	return {
		ok: true,
		rev: nextRev,
		roomId: active,
		rooms,
		mates,
		messages: (!replace && since ? await sql`
        SELECT id, account, body, file_id, file_name, file_mime, file_size,
               CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
        FROM chat_messages WHERE room_id = ${active} AND id > ${since} ORDER BY id ASC LIMIT 80
      ` : await sql`
        SELECT id, account, body, file_id, file_name, file_mime, file_size,
               CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
        FROM (
          SELECT id, account, body, file_id, file_name, file_mime, file_size, created_at
          FROM chat_messages WHERE room_id = ${active} ORDER BY id DESC LIMIT 40
        ) recent
        ORDER BY id ASC
      `).flatMap((row) => {
			const mate = named(row.account, names);
			if (!mate) return [];
			return [{
				id: asNumber(row.id),
				account: mate.account,
				name: mate.name,
				seat: mate.seat,
				body: row.body,
				at: asNumber(row.at),
				file: fileOf(row)
			}];
		}),
		pings: (await sql`
    SELECT id, room_id, account, body, file_name,
           CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
    FROM chat_messages
    WHERE room_id = 'hall'
       OR room_id IN (SELECT room_id FROM chat_members WHERE account = ${account})
    ORDER BY id DESC
    LIMIT 80
  `).flatMap((row) => {
			const mate = named(row.account, names);
			if (!mate) return [];
			return [{
				id: asNumber(row.id),
				roomId: row.room_id,
				account: mate.account,
				name: mate.name,
				seat: mate.seat,
				body: row.body,
				at: asNumber(row.at),
				fileName: row.file_name
			}];
		}),
		replace,
		avatars
	};
}
async function sendChat(token, roomId, raw) {
	const account = await accountFor(token);
	if (!account) return {
		ok: false,
		error: "expired"
	};
	const active = await allowed(account, roomId) ? roomId : "";
	if (!active) return {
		ok: false,
		error: "你不在這個聊天室。"
	};
	const mate = named(account, await namesOf());
	if (!mate) return {
		ok: false,
		error: "expired"
	};
	const body = raw.replace(/\s+/g, " ").trim().slice(0, 80);
	if (!body) return {
		ok: false,
		error: "寫一句先。"
	};
	if (hasProfanity(body)) return {
		ok: false,
		error: PROFANITY_ERROR
	};
	const sql = await getSql();
	const last = await sql`
    SELECT CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
    FROM chat_messages WHERE account = ${account} ORDER BY id DESC LIMIT 1
  `;
	if (last[0] && Date.now() - asNumber(last[0].at) < 1200) return {
		ok: false,
		error: "講慢少少。"
	};
	const row = (await sql`
    INSERT INTO chat_messages (account, body, room_id)
    VALUES (${account}, ${body}, ${active})
    RETURNING id, CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
  `)[0];
	if (!row) return {
		ok: false,
		error: "送唔出，再試一次。"
	};
	await dropOldMessages(active);
	await sql`
    INSERT INTO chat_presence (account, seen_at) VALUES (${account}, now())
    ON CONFLICT (account) DO UPDATE SET seen_at = now()
  `;
	return {
		ok: true,
		message: {
			id: asNumber(row.id),
			account: mate.account,
			name: mate.name,
			seat: mate.seat,
			body,
			at: asNumber(row.at),
			file: null
		}
	};
}
async function publishFileMessage(token, roomId, file) {
	const account = await accountFor(token);
	if (!account) return {
		ok: false,
		error: "expired"
	};
	const active = await allowed(account, roomId) ? roomId : "";
	if (!active) return {
		ok: false,
		error: "你不在這個聊天室。"
	};
	if (!/^[a-f0-9]{24}$/.test(file.id)) return {
		ok: false,
		error: "上傳失敗。"
	};
	if (hasProfanity(file.name)) return {
		ok: false,
		error: PROFANITY_ERROR
	};
	const mate = named(account, await namesOf());
	if (!mate) return {
		ok: false,
		error: "expired"
	};
	const sql = await getSql();
	const existing = await sql`
    SELECT id, CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
    FROM chat_messages WHERE file_id = ${file.id} LIMIT 1
  `;
	if (existing[0]) return {
		ok: true,
		message: {
			id: asNumber(existing[0].id),
			account: mate.account,
			name: mate.name,
			seat: mate.seat,
			body: "",
			at: asNumber(existing[0].at),
			file
		}
	};
	const row = (await sql`
    INSERT INTO chat_messages (account, body, room_id, file_id, file_name, file_mime, file_size)
    VALUES (${account}, '', ${active}, ${file.id}, ${file.name}, ${file.mime}, ${file.size})
    RETURNING id, CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
  `)[0];
	if (!row) return {
		ok: false,
		error: "送唔出，再試一次。"
	};
	await dropOldMessages(active);
	return {
		ok: true,
		message: {
			id: asNumber(row.id),
			account: mate.account,
			name: mate.name,
			seat: mate.seat,
			body: "",
			at: asNumber(row.at),
			file
		}
	};
}
async function dropOldMessages(roomId) {
	const sql = await getSql();
	const old = await sql`
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
	const { removeStoredFile } = await import("./chat-file-store.server-CLEaw4B2.mjs").then((n) => n.n);
	for (const row of old) if (row.file_id) await removeStoredFile(row.file_id);
}
async function clearRoomHistory(token, roomId) {
	const account = await accountFor(token);
	if (!account) return {
		ok: false,
		error: "expired"
	};
	if (!await allowed(account, roomId)) return {
		ok: false,
		error: "你不在這個聊天室。"
	};
	const sql = await getSql();
	const files = await sql`SELECT file_id FROM chat_messages WHERE room_id = ${roomId} AND file_id IS NOT NULL`;
	await sql`DELETE FROM chat_messages WHERE room_id = ${roomId}`;
	const { removeStoredFile } = await import("./chat-file-store.server-CLEaw4B2.mjs").then((n) => n.n);
	for (const row of files) if (row.file_id) await removeStoredFile(row.file_id);
	return { ok: true };
}
async function openChatFile(token, fileId) {
	if (!/^[a-f0-9]{24}$/.test(fileId)) return {
		ok: false,
		error: "找不到檔案。"
	};
	const account = await accountFor(token);
	if (!account) return {
		ok: false,
		error: "expired"
	};
	const row = (await (await getSql())`
    SELECT room_id, file_name, file_mime, file_size FROM chat_messages WHERE file_id = ${fileId} LIMIT 1
  `)[0];
	if (!row) return {
		ok: false,
		error: "找不到檔案。"
	};
	if (!await allowed(account, row.room_id)) return {
		ok: false,
		error: "你不在這個聊天室。"
	};
	return {
		ok: true,
		name: row.file_name,
		mime: row.file_mime,
		size: asNumber(row.file_size)
	};
}
function dmId(a, b) {
	return `dm:${[a, b].sort().join(":")}`;
}
async function openDirect(token, other) {
	const account = await accountFor(token);
	if (!account) return {
		ok: false,
		error: "expired"
	};
	const mate = rosterPerson(other);
	if (!mate || mate.account === account) return {
		ok: false,
		error: "揀另一位同學。"
	};
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
	return {
		ok: true,
		room: {
			id,
			kind: "direct",
			title,
			members: [account, mate.account]
		}
	};
}
async function openGroup(token, titleRaw, members) {
	const account = await accountFor(token);
	if (!account) return {
		ok: false,
		error: "expired"
	};
	const title = titleRaw.trim().slice(0, 12);
	if (!title) return {
		ok: false,
		error: "先寫群組名稱。"
	};
	if (hasProfanity(title)) return {
		ok: false,
		error: PROFANITY_ERROR
	};
	const picked = [...new Set(members.map((item) => rosterPerson(item)?.account).filter((item) => Boolean(item && item !== account)))].slice(0, 12);
	if (picked.length < 1) return {
		ok: false,
		error: "至少再揀一位同學。"
	};
	const id = `g:${randomBytes(6).toString("hex")}`;
	const sql = await getSql();
	await sql`INSERT INTO chat_rooms (id, kind, title, created_by) VALUES (${id}, 'group', ${title}, ${account})`;
	await sql`INSERT INTO chat_members (room_id, account) VALUES (${id}, ${account})`;
	for (const member of picked) await sql`INSERT INTO chat_members (room_id, account) VALUES (${id}, ${member}) ON CONFLICT DO NOTHING`;
	return {
		ok: true,
		room: {
			id,
			kind: "group",
			title,
			members: [account, ...picked]
		}
	};
}
async function saveProfile(token, raw) {
	const account = await accountFor(token);
	if (!account) return {
		ok: false,
		error: "expired"
	};
	const name = raw.trim().slice(0, 12);
	if (!name) return {
		ok: false,
		error: "名字不可以空白。"
	};
	if (hasProfanity(name)) return {
		ok: false,
		error: PROFANITY_ERROR
	};
	await (await getSql())`
    INSERT INTO chat_profiles (account, display_name, updated_at)
    VALUES (${account}, ${name}, now())
    ON CONFLICT (account) DO UPDATE SET display_name = ${name}, updated_at = now()
  `;
	return {
		ok: true,
		name
	};
}
async function saveAvatar(token, kind, value) {
	const account = await accountFor(token);
	if (!account) return {
		ok: false,
		error: "expired"
	};
	if (kind === "builtin") {
		if (!isBuiltinId(value)) return {
			ok: false,
			error: "沒有這個頭像。"
		};
	} else if (kind === "upload") {
		if (!value.startsWith("data:image/jpeg;base64,") || value.length > 6e4) return {
			ok: false,
			error: "圖片太大，請換一張。"
		};
	} else return {
		ok: false,
		error: "沒有這個頭像。"
	};
	await (await getSql())`
    INSERT INTO chat_avatars (account, kind, value, updated_at)
    VALUES (${account}, ${kind}, ${value}, now())
    ON CONFLICT (account) DO UPDATE SET kind = ${kind}, value = ${value}, updated_at = now()
  `;
	return { ok: true };
}
//#endregion
export { accountForChat, clearRoomHistory, openChatFile, openChatSession, openDirect, openGroup, publishFileMessage, saveAvatar, saveProfile, sendChat, sessionAccount, syncChat };
