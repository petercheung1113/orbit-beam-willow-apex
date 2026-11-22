import { f as usePark } from "./router-VNKMmnlx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-iJdruc8c.js
function studentStamp() {
	const state = usePark.getState();
	if (state.student) return {
		studentId: state.student,
		name: state.nickname.trim().slice(0, 12) || state.student
	};
	const key = "park-session";
	let studentId = window.localStorage.getItem(key) ?? "";
	if (!/^[\w-]{4,64}$/.test(studentId)) {
		studentId = `s-${Math.random().toString(36).slice(2, 10)}`;
		window.localStorage.setItem(key, studentId);
	}
	const name = state.nickname.trim().slice(0, 12) || "未命名同學";
	return {
		studentId,
		name
	};
}
function topicBreakdown(rows) {
	const map = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const name = row.name.trim().slice(0, 40);
		if (!name) continue;
		const current = map.get(name) ?? {
			name,
			correct: 0,
			total: 0
		};
		current.total += 1;
		if (row.correct) current.correct += 1;
		map.set(name, current);
	}
	return JSON.stringify([...map.values()]).slice(0, 2e3);
}
//#endregion
export { topicBreakdown as n, studentStamp as t };
