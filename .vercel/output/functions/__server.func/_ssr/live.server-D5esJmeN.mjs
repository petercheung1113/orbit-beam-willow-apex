import { n as UNITS } from "./units-9gg8Qwt9.mjs";
import { n as isTeacherAccount } from "./teacher-account-BqPbmFfU.mjs";
import { t as getSql } from "./db-BsiyhNta.mjs";
import { rosterPerson } from "./class-roster.server-CIgXvlsE.mjs";
import { sessionAccount } from "./chat.server-ClhhNbD1.mjs";
import { n as choiceDeck } from "./tug-deck-Cx9iyKSe.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/live.server-D5esJmeN.js
var decks = /* @__PURE__ */ new Map();
function asNumber(value) {
	const n = typeof value === "bigint" ? Number(value) : Number(value);
	return Number.isFinite(n) ? n : 0;
}
function deckFor(seed, topics, count) {
	const key = `${seed}|${count}|${topics}`;
	const hit = decks.get(key);
	if (hit) return hit;
	const ids = topics.split(",").filter(Boolean);
	const cards = [];
	for (const item of choiceDeck(seed, ids)) {
		const question = item.question;
		if (question.kind !== "choice") continue;
		cards.push({
			stem: question.stem,
			choices: question.choices,
			answer: question.answer,
			why: question.why,
			unitName: item.unitName,
			figure: question.figure
		});
		if (cards.length >= count) break;
	}
	decks.set(key, cards);
	return cards;
}
async function labelOf(account) {
	const seat = rosterPerson(account)?.name ?? account;
	const custom = (await (await getSql())`SELECT display_name FROM chat_profiles WHERE account = ${account}`)[0]?.display_name.trim().slice(0, 12) ?? "";
	if (!custom || custom === seat) return seat;
	return `${custom} · ${seat}`.slice(0, 24);
}
async function openGame() {
	return (await (await getSql())`
    SELECT id, host, topics, qcount, seconds, seed, phase, qi, question_ms
    FROM live_games
    WHERE phase <> 'closed'
    ORDER BY created_at DESC
    LIMIT 1
  `)[0] ?? null;
}
async function gameById(id) {
	return (await (await getSql())`
    SELECT id, host, topics, qcount, seconds, seed, phase, qi, question_ms
    FROM live_games WHERE id = ${id} LIMIT 1
  `)[0] ?? null;
}
async function tick(game) {
	if (game.phase !== "question") return game;
	const started = asNumber(game.question_ms);
	if (!started || Date.now() < started + game.seconds * 1e3) return game;
	await (await getSql())`UPDATE live_games SET phase = 'reveal' WHERE id = ${game.id} AND phase = 'question'`;
	return await gameById(game.id) ?? game;
}
async function present(game, account) {
	const current = await tick(game);
	const sql = await getSql();
	const ranked = (await sql`
    SELECT account, name, score FROM live_players WHERE game_id = ${current.id}
  `).map((row) => ({
		account: row.account,
		name: row.name,
		score: asNumber(row.score),
		me: row.account === account
	})).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "zh-HK"));
	const cards = deckFor(asNumber(current.seed), current.topics, asNumber(current.qcount));
	const card = cards[asNumber(current.qi)] ?? null;
	const phase = current.phase === "question" || current.phase === "reveal" || current.phase === "podium" ? current.phase : "lobby";
	const show = phase === "question" || phase === "reveal";
	const answers = show ? await sql`
        SELECT account, choice, correct, points FROM live_answers WHERE game_id = ${current.id} AND qi = ${asNumber(current.qi)}
      ` : [];
	const mine = answers.find((row) => row.account === account);
	const started = asNumber(current.question_ms);
	const leftMs = phase === "question" && started ? Math.max(0, started + asNumber(current.seconds) * 1e3 - Date.now()) : 0;
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
		question: show && card ? {
			stem: card.stem,
			choices: card.choices,
			unitName: card.unitName,
			figure: card.figure
		} : null,
		answer: phase === "reveal" && card ? card.answer : null,
		why: phase === "reveal" && card ? card.why : ""
	};
}
async function requireAccount(token) {
	const account = await sessionAccount(token);
	if (!account || !rosterPerson(account)) return null;
	return account;
}
async function peekLive(token) {
	const account = await requireAccount(token);
	if (!account) return {
		ok: false,
		error: "請先登入。"
	};
	const game = await openGame();
	if (!game || game.phase === "closed") return {
		ok: true,
		game: null
	};
	const rows = await (await getSql())`SELECT COUNT(*)::int AS count FROM live_players WHERE game_id = ${game.id}`;
	const phase = game.phase === "question" || game.phase === "reveal" || game.phase === "podium" ? game.phase : "lobby";
	return {
		ok: true,
		game: {
			id: game.id,
			phase,
			players: asNumber(rows[0]?.count),
			host: game.host === account
		}
	};
}
async function createLive(token, topics, count, seconds) {
	const account = await requireAccount(token);
	if (!account) return {
		ok: false,
		error: "請先登入。"
	};
	if (!isTeacherAccount(account)) return {
		ok: false,
		error: "只有老師可以開搶答。"
	};
	if (![
		5,
		10,
		15
	].includes(count)) return {
		ok: false,
		error: "請選題數。"
	};
	if (![
		10,
		20,
		30
	].includes(seconds)) return {
		ok: false,
		error: "請選每題秒數。"
	};
	const picked = [...new Set(topics.filter((id) => UNITS.some((unit) => unit.id === id)))];
	if (!picked.length) return {
		ok: false,
		error: "先選課題。"
	};
	const seed = randomBytes(4).readUInt32BE(0) & 2147483647 || 1;
	const cards = deckFor(seed, picked.join(","), count);
	if (!cards.length) return {
		ok: false,
		error: "這個範圍沒有選擇題。"
	};
	const sql = await getSql();
	await sql`UPDATE live_games SET phase = 'closed' WHERE phase <> 'closed'`;
	let id = "";
	for (let attempt = 0; attempt < 8; attempt += 1) {
		const next = String(1e3 + randomBytes(2).readUInt16BE(0) % 9e3);
		if ((await sql`SELECT id FROM live_games WHERE id = ${next} AND phase <> 'closed' LIMIT 1`).length) continue;
		id = next;
		break;
	}
	if (!id) return {
		ok: false,
		error: "暫時開不到場，再試一次。"
	};
	await sql`
    INSERT INTO live_games (id, host, topics, qcount, seconds, seed, phase, qi)
    VALUES (${id}, ${account}, ${picked.join(",")}, ${cards.length}, ${seconds}, ${seed}, 'lobby', 0)
  `;
	const body = `搶答開始了，號碼 ${id}。到「搶答」頁加入。`.slice(0, 80);
	try {
		await sql`INSERT INTO chat_messages (account, body, room_id) VALUES (${account}, ${body}, 'hall')`;
	} catch {}
	return {
		ok: true,
		id
	};
}
async function joinLive(token, pin) {
	const account = await requireAccount(token);
	if (!account) return {
		ok: false,
		error: "請先登入。"
	};
	const game = await gameById(pin.replace(/\D/g, "").slice(0, 4));
	if (!game || game.phase === "closed") return {
		ok: false,
		error: "找不到這場比賽。"
	};
	if (game.host === account) return {
		ok: true,
		view: await present(game, account)
	};
	if (isTeacherAccount(account)) return {
		ok: false,
		error: "老師負責開場，不用加入。"
	};
	const name = await labelOf(account);
	await (await getSql())`
    INSERT INTO live_players (game_id, account, name)
    VALUES (${game.id}, ${account}, ${name})
    ON CONFLICT (game_id, account) DO UPDATE SET name = EXCLUDED.name
  `;
	const fresh = await gameById(game.id);
	if (!fresh) return {
		ok: false,
		error: "找不到這場比賽。"
	};
	return {
		ok: true,
		view: await present(fresh, account)
	};
}
async function syncLive(token, pin) {
	const account = await requireAccount(token);
	if (!account) return {
		ok: false,
		error: "請先登入。"
	};
	const game = await gameById(pin.replace(/\D/g, "").slice(0, 4));
	if (!game || game.phase === "closed") return {
		ok: false,
		error: "這場比賽已結束。"
	};
	if (game.host !== account) {
		if (!(await (await getSql())`SELECT account FROM live_players WHERE game_id = ${game.id} AND account = ${account} LIMIT 1`).length) return {
			ok: false,
			error: "請先加入這場比賽。"
		};
	}
	return {
		ok: true,
		view: await present(game, account)
	};
}
async function hostGame(token, pin) {
	const account = await requireAccount(token);
	if (!account || !isTeacherAccount(account)) return { error: "只有老師可以控制比賽。" };
	const game = await gameById(pin.replace(/\D/g, "").slice(0, 4));
	if (!game || game.host !== account || game.phase === "closed") return { error: "找不到這場比賽。" };
	return {
		account,
		game
	};
}
async function startLive(token, pin) {
	const gate = await hostGame(token, pin);
	if ("error" in gate) return {
		ok: false,
		error: gate.error
	};
	const sql = await getSql();
	if (asNumber((await sql`SELECT COUNT(*)::int AS count FROM live_players WHERE game_id = ${gate.game.id}`)[0]?.count) < 1) return {
		ok: false,
		error: "等至少一位同學加入。"
	};
	await sql`
    UPDATE live_games SET phase = 'question', qi = 0, question_ms = ${Date.now()}
    WHERE id = ${gate.game.id} AND phase = 'lobby'
  `;
	const fresh = await gameById(gate.game.id);
	if (!fresh) return {
		ok: false,
		error: "找不到這場比賽。"
	};
	return {
		ok: true,
		view: await present(fresh, gate.account)
	};
}
async function revealLive(token, pin) {
	const gate = await hostGame(token, pin);
	if ("error" in gate) return {
		ok: false,
		error: gate.error
	};
	await (await getSql())`UPDATE live_games SET phase = 'reveal' WHERE id = ${gate.game.id} AND phase = 'question'`;
	const fresh = await gameById(gate.game.id);
	if (!fresh) return {
		ok: false,
		error: "找不到這場比賽。"
	};
	return {
		ok: true,
		view: await present(fresh, gate.account)
	};
}
async function nextLive(token, pin) {
	const gate = await hostGame(token, pin);
	if ("error" in gate) return {
		ok: false,
		error: gate.error
	};
	await (await getSql())`
    UPDATE live_games
    SET qi = qi + 1,
        phase = CASE WHEN qi + 1 >= qcount THEN 'podium' ELSE 'question' END,
        question_ms = ${Date.now()}
    WHERE id = ${gate.game.id} AND phase = 'reveal'
  `;
	const fresh = await gameById(gate.game.id);
	if (!fresh) return {
		ok: false,
		error: "找不到這場比賽。"
	};
	return {
		ok: true,
		view: await present(fresh, gate.account)
	};
}
async function closeLive(token, pin) {
	const gate = await hostGame(token, pin);
	if ("error" in gate) return {
		ok: false,
		error: gate.error
	};
	await (await getSql())`UPDATE live_games SET phase = 'closed' WHERE id = ${gate.game.id} AND phase <> 'closed'`;
	return { ok: true };
}
async function answerLive(token, pin, choice) {
	const account = await requireAccount(token);
	if (!account) return {
		ok: false,
		error: "請先登入。"
	};
	if (isTeacherAccount(account)) return {
		ok: false,
		error: "老師不用作答。"
	};
	const game = await gameById(pin.replace(/\D/g, "").slice(0, 4));
	if (!game || game.phase === "closed") return {
		ok: false,
		error: "這場比賽已結束。"
	};
	const current = await tick(game);
	if (current.phase !== "question") return {
		ok: true,
		view: await present(current, account)
	};
	const card = deckFor(asNumber(current.seed), current.topics, asNumber(current.qcount))[asNumber(current.qi)];
	if (!card || !Number.isInteger(choice) || choice < 0 || choice >= card.choices.length) return {
		ok: false,
		error: "這個選項不能用。"
	};
	const sql = await getSql();
	if (!(await sql`SELECT account FROM live_players WHERE game_id = ${current.id} AND account = ${account} LIMIT 1`).length) return {
		ok: false,
		error: "請先加入這場比賽。"
	};
	const started = asNumber(current.question_ms);
	const limit = asNumber(current.seconds) * 1e3;
	const ms = Math.max(0, Math.min(limit, Date.now() - started));
	const correct = choice === card.answer;
	const points = correct ? Math.round((1 - ms / limit / 2) * 1e3) : 0;
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
	if (!fresh) return {
		ok: false,
		error: "這場比賽已結束。"
	};
	return {
		ok: true,
		view: await present(fresh, account)
	};
}
//#endregion
export { answerLive, closeLive, createLive, joinLive, nextLive, peekLive, revealLive, startLive, syncLive };
