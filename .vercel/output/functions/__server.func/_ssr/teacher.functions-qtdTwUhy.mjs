import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.functions-qtdTwUhy.js
function cleanId(value) {
	return value.replace(/[^\w-]/g, "").slice(0, 64) || "guest";
}
function cleanName(value) {
	return value.trim().slice(0, 12) || "未命名同學";
}
var teacherStatus_createServerFn_handler = createServerRpc({
	id: "b338ab14d5c5f956d4296a3804753936b62d6201655949d86f2e327cfd3e0b3c",
	name: "teacherStatus",
	filename: "src/lib/teacher.functions.ts"
}, (opts) => teacherStatus.__executeServer(opts));
var teacherStatus = createServerFn({ method: "GET" }).handler(teacherStatus_createServerFn_handler, async () => {
	const { classPinReady } = await import("./teacher.server-BSLaWIof.mjs");
	return { ready: await classPinReady() };
});
var teacherSetup_createServerFn_handler = createServerRpc({
	id: "cb441d256b17b3549e9562951ad2879a41de1f30c542446631dcf2964af4edbf",
	name: "teacherSetup",
	filename: "src/lib/teacher.functions.ts"
}, (opts) => teacherSetup.__executeServer(opts));
var teacherSetup = createServerFn({ method: "POST" }).inputValidator((input) => ({ pin: String(input?.pin ?? "").trim().slice(0, 32) })).handler(teacherSetup_createServerFn_handler, async ({ data }) => {
	const { saveTeacherPin } = await import("./teacher.server-BSLaWIof.mjs");
	return saveTeacherPin(data.pin);
});
var teacherBoard_createServerFn_handler = createServerRpc({
	id: "9fd79ab5bb08656b7bfb781239f6be03ecf36e082e2b578d87920e53812e50ee",
	name: "teacherBoard",
	filename: "src/lib/teacher.functions.ts"
}, (opts) => teacherBoard.__executeServer(opts));
var teacherBoard = createServerFn({ method: "POST" }).inputValidator((input) => ({ token: String(input?.token ?? "").trim() })).handler(teacherBoard_createServerFn_handler, async ({ data }) => {
	const { loadClassBoard } = await import("./teacher.server-BSLaWIof.mjs");
	return loadClassBoard(data.token);
});
var recordPractice_createServerFn_handler = createServerRpc({
	id: "5339dd8e58c0ec08709ad40aaa85f2ebb5419aacb4f188880e3519717729a162",
	name: "recordPractice",
	filename: "src/lib/teacher.functions.ts"
}, (opts) => recordPractice.__executeServer(opts));
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
}).handler(recordPractice_createServerFn_handler, async ({ data }) => {
	const { savePractice } = await import("./teacher.server-BSLaWIof.mjs");
	await savePractice(data);
	return { ok: true };
});
var recordTutor_createServerFn_handler = createServerRpc({
	id: "577aa92e077030c1775a8a00782cf127c49459bbcd6ee3b687d6e17aa1427b04",
	name: "recordTutor",
	filename: "src/lib/teacher.functions.ts"
}, (opts) => recordTutor.__executeServer(opts));
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
}).handler(recordTutor_createServerFn_handler, async ({ data }) => {
	const { logTutorTurn } = await import("./teacher.server-BSLaWIof.mjs");
	await logTutorTurn(data);
	return { ok: true };
});
//#endregion
export { recordPractice_createServerFn_handler, recordTutor_createServerFn_handler, teacherBoard_createServerFn_handler, teacherSetup_createServerFn_handler, teacherStatus_createServerFn_handler };
