import { t as createServerFn } from "./ssr.mjs";
import { h as createSsrRpc } from "./router-VNKMmnlx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.functions-Scv-njag.js
function cleanId(value) {
	return value.replace(/[^\w-]/g, "").slice(0, 64) || "guest";
}
function cleanName(value) {
	return value.trim().slice(0, 12) || "未命名同學";
}
createServerFn({ method: "GET" }).handler(createSsrRpc("b338ab14d5c5f956d4296a3804753936b62d6201655949d86f2e327cfd3e0b3c"));
createServerFn({ method: "POST" }).inputValidator((input) => ({ pin: String(input?.pin ?? "").trim().slice(0, 32) })).handler(createSsrRpc("cb441d256b17b3549e9562951ad2879a41de1f30c542446631dcf2964af4edbf"));
var teacherBoard = createServerFn({ method: "POST" }).inputValidator((input) => ({ token: String(input?.token ?? "").trim() })).handler(createSsrRpc("9fd79ab5bb08656b7bfb781239f6be03ecf36e082e2b578d87920e53812e50ee"));
var recordPractice = createServerFn({ method: "POST" }).inputValidator((input) => {
	if (!input || typeof input !== "object") throw new Error("紀錄不完整");
	const raw = input;
	const total = Math.round(Number(raw.total));
	const correct = Math.round(Number(raw.correct));
	const seconds = Math.round(Number(raw.seconds));
	if (!Number.isFinite(total) || total < 1 || total > 100) throw new Error("題數不正確");
	if (!Number.isFinite(correct) || correct < 0 || correct > total) throw new Error("答對數不正確");
	if (!Number.isFinite(seconds) || seconds < 0 || seconds > 7200) throw new Error("時間不正確");
	return {
		studentId: cleanId(String(raw.studentId ?? "")),
		name: cleanName(String(raw.name ?? "")),
		mode: raw.mode === "mock" ? "mock" : "practice",
		correct,
		total,
		seconds,
		topics: String(raw.topics ?? "").trim().slice(0, 240),
		breakdown: String(raw.breakdown ?? "").trim().slice(0, 2e3)
	};
}).handler(createSsrRpc("5339dd8e58c0ec08709ad40aaa85f2ebb5419aacb4f188880e3519717729a162"));
var recordTutor = createServerFn({ method: "POST" }).inputValidator((input) => {
	if (!input || typeof input !== "object") throw new Error("紀錄不完整");
	const raw = input;
	return {
		studentId: cleanId(String(raw.studentId ?? "")),
		name: cleanName(String(raw.name ?? "")),
		topic: String(raw.topic ?? "").trim().slice(0, 40),
		mode: raw.mode === "lesson" ? "lesson" : "chat",
		question: String(raw.question ?? "").trim().slice(0, 600),
		reply: String(raw.reply ?? "").trim().slice(0, 2e3)
	};
}).handler(createSsrRpc("577aa92e077030c1775a8a00782cf127c49459bbcd6ee3b687d6e17aa1427b04"));
//#endregion
export { recordTutor as n, teacherBoard as r, recordPractice as t };
