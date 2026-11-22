import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tug.functions-z2KnLnKP.js
function tokenOf(input) {
	return String(input?.token ?? "").trim();
}
var tugCreate_createServerFn_handler = createServerRpc({
	id: "c143ec96728b821a2374a3af4ce0c05c359aa3e0dd8a1d8344c42ce0af1d23cc",
	name: "tugCreate",
	filename: "src/lib/tug.functions.ts"
}, (opts) => tugCreate.__executeServer(opts));
var tugCreate = createServerFn({ method: "POST" }).inputValidator((input) => {
	const raw = input;
	const topics = Array.isArray(raw?.topics) ? raw.topics.map((item) => String(item)).slice(0, 20) : [];
	const invites = Array.isArray(raw?.invites) ? raw.invites.map((item) => String(item)).slice(0, 3) : [];
	return {
		token: tokenOf(input),
		mode: String(raw?.mode ?? ""),
		minutes: Number(raw?.minutes ?? 0),
		topics,
		invites
	};
}).handler(tugCreate_createServerFn_handler, async ({ data }) => {
	const { createTugRoom } = await import("./tug.server-0oll-00R.mjs");
	return createTugRoom(data.token, data.mode, data.minutes, data.topics, data.invites);
});
var tugJoin_createServerFn_handler = createServerRpc({
	id: "0e812040936589de0879f96edbd48e649b56b8492829f314b98ad32cc0a75eb9",
	name: "tugJoin",
	filename: "src/lib/tug.functions.ts"
}, (opts) => tugJoin.__executeServer(opts));
var tugJoin = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8)
})).handler(tugJoin_createServerFn_handler, async ({ data }) => {
	const { joinTugRoom } = await import("./tug.server-0oll-00R.mjs");
	return joinTugRoom(data.token, data.roomId);
});
var tugSync_createServerFn_handler = createServerRpc({
	id: "afc78896024dc822924c65a2119d045426a95805ce76b5dabe139388c92b9b89",
	name: "tugSync",
	filename: "src/lib/tug.functions.ts"
}, (opts) => tugSync.__executeServer(opts));
var tugSync = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8)
})).handler(tugSync_createServerFn_handler, async ({ data }) => {
	const { syncTugRoom } = await import("./tug.server-0oll-00R.mjs");
	return syncTugRoom(data.token, data.roomId);
});
var tugStart_createServerFn_handler = createServerRpc({
	id: "f42a2f7ca971cd70514adc2a5382ee5eb67f6290a85395ec3143ee28ad7e86a4",
	name: "tugStart",
	filename: "src/lib/tug.functions.ts"
}, (opts) => tugStart.__executeServer(opts));
var tugStart = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8)
})).handler(tugStart_createServerFn_handler, async ({ data }) => {
	const { startTugRoom } = await import("./tug.server-0oll-00R.mjs");
	return startTugRoom(data.token, data.roomId);
});
var tugAnswer_createServerFn_handler = createServerRpc({
	id: "c3e04a0399022d73e035d27cb0dd0672c6a941bf3e25c8ea64b094ce501caffb",
	name: "tugAnswer",
	filename: "src/lib/tug.functions.ts"
}, (opts) => tugAnswer.__executeServer(opts));
var tugAnswer = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8),
	choice: Number(input?.choice ?? -1)
})).handler(tugAnswer_createServerFn_handler, async ({ data }) => {
	const { answerTug } = await import("./tug.server-0oll-00R.mjs");
	return answerTug(data.token, data.roomId, data.choice);
});
var tugReplay_createServerFn_handler = createServerRpc({
	id: "d4d00a7eea96cf9cd0d30c684bbd52a1f760dd50e609ba03f719816f9e1f2271",
	name: "tugReplay",
	filename: "src/lib/tug.functions.ts"
}, (opts) => tugReplay.__executeServer(opts));
var tugReplay = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8)
})).handler(tugReplay_createServerFn_handler, async ({ data }) => {
	const { replayTug } = await import("./tug.server-0oll-00R.mjs");
	return replayTug(data.token, data.roomId);
});
//#endregion
export { tugAnswer_createServerFn_handler, tugCreate_createServerFn_handler, tugJoin_createServerFn_handler, tugReplay_createServerFn_handler, tugStart_createServerFn_handler, tugSync_createServerFn_handler };
