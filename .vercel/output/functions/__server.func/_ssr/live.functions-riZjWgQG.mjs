import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live.functions-riZjWgQG.js
function tokenOf(input) {
	return String(input?.token ?? "").trim();
}
function pinOf(input) {
	return String(input?.pin ?? "").replace(/\D/g, "").slice(0, 4);
}
var livePeek_createServerFn_handler = createServerRpc({
	id: "e3d4ac3f3d5bf758169df4120142eee7b6a24fcce83721c51f0389d78b465ce1",
	name: "livePeek",
	filename: "src/lib/live.functions.ts"
}, (opts) => livePeek.__executeServer(opts));
var livePeek = createServerFn({ method: "POST" }).inputValidator((input) => ({ token: tokenOf(input) })).handler(livePeek_createServerFn_handler, async ({ data }) => {
	const { peekLive } = await import("./live.server-D5esJmeN.mjs");
	return peekLive(data.token);
});
var liveCreate_createServerFn_handler = createServerRpc({
	id: "2a0a86cf3156f008127c13014da7075d55d4610e495edd02e2e67068d1220f92",
	name: "liveCreate",
	filename: "src/lib/live.functions.ts"
}, (opts) => liveCreate.__executeServer(opts));
var liveCreate = createServerFn({ method: "POST" }).inputValidator((input) => {
	const raw = input;
	const topics = Array.isArray(raw?.topics) ? raw.topics.map((item) => String(item)).slice(0, 20) : [];
	return {
		token: tokenOf(input),
		topics,
		count: Number(raw?.count ?? 0),
		seconds: Number(raw?.seconds ?? 0)
	};
}).handler(liveCreate_createServerFn_handler, async ({ data }) => {
	const { createLive } = await import("./live.server-D5esJmeN.mjs");
	return createLive(data.token, data.topics, data.count, data.seconds);
});
var liveJoin_createServerFn_handler = createServerRpc({
	id: "fd1bb4c3b01405868ac4a3c42137a47bce2caeb7f7eb78a0421416283587d6ba",
	name: "liveJoin",
	filename: "src/lib/live.functions.ts"
}, (opts) => liveJoin.__executeServer(opts));
var liveJoin = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(liveJoin_createServerFn_handler, async ({ data }) => {
	const { joinLive } = await import("./live.server-D5esJmeN.mjs");
	return joinLive(data.token, data.pin);
});
var liveSync_createServerFn_handler = createServerRpc({
	id: "147c40826d0a0d35d7d560c146d804a87b0b6c6e7bd167380564d96409a9fed5",
	name: "liveSync",
	filename: "src/lib/live.functions.ts"
}, (opts) => liveSync.__executeServer(opts));
var liveSync = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(liveSync_createServerFn_handler, async ({ data }) => {
	const { syncLive } = await import("./live.server-D5esJmeN.mjs");
	return syncLive(data.token, data.pin);
});
var liveStart_createServerFn_handler = createServerRpc({
	id: "890444fd0cbd5ed3e433ea9b1b469b20a0f92b13bab5ce1dc0c5651c8c7f9a60",
	name: "liveStart",
	filename: "src/lib/live.functions.ts"
}, (opts) => liveStart.__executeServer(opts));
var liveStart = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(liveStart_createServerFn_handler, async ({ data }) => {
	const { startLive } = await import("./live.server-D5esJmeN.mjs");
	return startLive(data.token, data.pin);
});
var liveReveal_createServerFn_handler = createServerRpc({
	id: "9f24ffb046d44ea6d7836bdf6d0a4b1687c21ba6355308577b93c40fbc7a46a9",
	name: "liveReveal",
	filename: "src/lib/live.functions.ts"
}, (opts) => liveReveal.__executeServer(opts));
var liveReveal = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(liveReveal_createServerFn_handler, async ({ data }) => {
	const { revealLive } = await import("./live.server-D5esJmeN.mjs");
	return revealLive(data.token, data.pin);
});
var liveNext_createServerFn_handler = createServerRpc({
	id: "a6c82f023a167cc44ac4ac378d9d038fbd9d3fb1d86081fa991b435f8c6bd11d",
	name: "liveNext",
	filename: "src/lib/live.functions.ts"
}, (opts) => liveNext.__executeServer(opts));
var liveNext = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(liveNext_createServerFn_handler, async ({ data }) => {
	const { nextLive } = await import("./live.server-D5esJmeN.mjs");
	return nextLive(data.token, data.pin);
});
var liveClose_createServerFn_handler = createServerRpc({
	id: "baf23e13694eab7ee29c0e342e7614c3bcbb7185ba3592b102133fb45c6e9b42",
	name: "liveClose",
	filename: "src/lib/live.functions.ts"
}, (opts) => liveClose.__executeServer(opts));
var liveClose = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(liveClose_createServerFn_handler, async ({ data }) => {
	const { closeLive } = await import("./live.server-D5esJmeN.mjs");
	return closeLive(data.token, data.pin);
});
var liveAnswer_createServerFn_handler = createServerRpc({
	id: "b34b19ca2911d6195ca8074941480fb06f7dd5d570f24ce0544e4a2866263b83",
	name: "liveAnswer",
	filename: "src/lib/live.functions.ts"
}, (opts) => liveAnswer.__executeServer(opts));
var liveAnswer = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input),
	choice: Math.round(Number(input?.choice ?? -1))
})).handler(liveAnswer_createServerFn_handler, async ({ data }) => {
	const { answerLive } = await import("./live.server-D5esJmeN.mjs");
	return answerLive(data.token, data.pin, data.choice);
});
//#endregion
export { liveAnswer_createServerFn_handler, liveClose_createServerFn_handler, liveCreate_createServerFn_handler, liveJoin_createServerFn_handler, liveNext_createServerFn_handler, livePeek_createServerFn_handler, liveReveal_createServerFn_handler, liveStart_createServerFn_handler, liveSync_createServerFn_handler };
