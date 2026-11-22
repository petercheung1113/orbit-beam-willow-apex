import { n as UNITS } from "./units-9gg8Qwt9.mjs";
import { r as MIXED_PAPER, t as EXAM_PAPERS } from "./exam-papers-C2c2V6pq.mjs";
import { t as PRACTICE_BANK } from "./practice-bank-GEsoUN4U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tug-deck-Cx9iyKSe.js
function unitName(id) {
	const unit = UNITS.find((item) => item.id === id);
	return {
		name: unit?.name ?? id,
		ride: unit?.ride ?? ""
	};
}
function add(list, seen, unitId, stem, choices, answer, why, figure) {
	const text = stem.trim();
	if (!text || seen.has(text) || choices.length < 2 || answer < 0 || answer >= choices.length) return;
	seen.add(text);
	const meta = unitName(unitId);
	list.push({
		id: `${unitId}-t${list.length}`,
		unitId,
		unitName: meta.name,
		ride: meta.ride,
		question: {
			kind: "choice",
			stem: text,
			choices,
			answer,
			why,
			figure
		}
	});
}
function sheetFor(unitIds) {
	const ids = unitIds.length ? unitIds : UNITS.map((unit) => unit.id);
	const wanted = new Set(ids);
	const list = [];
	const seen = /* @__PURE__ */ new Set();
	for (const id of ids) for (const item of PRACTICE_BANK[id] ?? []) add(list, seen, id, item.stem, item.choices, item.choices.indexOf(item.answer), item.why, item.figure);
	for (const paper of EXAM_PAPERS) {
		if (!wanted.has(paper.unitId)) continue;
		for (const item of paper.items) {
			if (item.kind !== "choice") continue;
			add(list, seen, paper.unitId, item.stem, item.choices, item.answer, item.why, item.figure);
		}
	}
	for (const item of MIXED_PAPER.items) {
		if (item.kind !== "choice" || !item.topic || !wanted.has(item.topic)) continue;
		add(list, seen, item.topic, item.stem, item.choices, item.answer, item.why, item.figure);
	}
	return list;
}
function nextRand(state) {
	return Math.imul(state, 1664525) + 1013904223 >>> 0;
}
function choiceDeck(seed, unitIds) {
	const list = sheetFor(unitIds);
	let state = seed >>> 0 || 1;
	for (let i = list.length - 1; i > 0; i -= 1) {
		state = nextRand(state);
		const j = state % (i + 1);
		const swap = list[i];
		list[i] = list[j];
		list[j] = swap;
	}
	for (const item of list) {
		const question = item.question;
		if (question.kind !== "choice" || question.choices.length < 2) continue;
		const choices = [...question.choices];
		let correct = question.answer;
		for (let i = choices.length - 1; i > 0; i -= 1) {
			state = nextRand(state);
			const j = Math.floor(state / 4294967296 * (i + 1));
			const swap = choices[i];
			choices[i] = choices[j];
			choices[j] = swap;
			if (correct === i) correct = j;
			else if (correct === j) correct = i;
		}
		question.choices = choices;
		question.answer = correct;
	}
	return list;
}
var SEAT_SALT = {
	red: [0, 104729],
	blue: [7919, 224737]
};
//#endregion
export { choiceDeck as n, SEAT_SALT as t };
