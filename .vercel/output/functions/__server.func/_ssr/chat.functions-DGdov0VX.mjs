import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat.functions-DGdov0VX.js
function tokenOf(input) {
	return String(input?.token ?? "").trim();
}
function roomOf(input) {
	return String(input?.roomId ?? "hall").trim() || "hall";
}
var chatSync_createServerFn_handler = createServerRpc({
	id: "a6162762f024aa43a67ffe12edb4f7a1c1aeb98a79388f0cdc6967f9e57586f2",
	name: "chatSync",
	filename: "src/lib/chat.functions.ts"
}, (opts) => chatSync.__executeServer(opts));
var chatSync = createServerFn({ method: "POST" }).inputValidator((input) => {
	const raw = input;
	const after = Number(raw?.after ?? 0);
	const rev = Number(raw?.rev ?? -1);
	return {
		token: tokenOf(input),
		roomId: roomOf(input),
		after: Number.isFinite(after) ? after : 0,
		rev: Number.isFinite(rev) ? rev : -1
	};
}).handler(chatSync_createServerFn_handler, async ({ data }) => {
	const { syncChat } = await import("./chat.server-ClhhNbD1.mjs");
	return syncChat(data.token, data.roomId, data.after, data.rev);
});
var chatSend_createServerFn_handler = createServerRpc({
	id: "af289ad3664fb333b04fcbecc2f44b0aac2ed987e221f08aa94b79046c2e66c1",
	name: "chatSend",
	filename: "src/lib/chat.functions.ts"
}, (opts) => chatSend.__executeServer(opts));
var chatSend = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: roomOf(input),
	body: String(input?.body ?? "")
})).handler(chatSend_createServerFn_handler, async ({ data }) => {
	const { sendChat } = await import("./chat.server-ClhhNbD1.mjs");
	return sendChat(data.token, data.roomId, data.body);
});
var chatClear_createServerFn_handler = createServerRpc({
	id: "b973373c76a5102df02c51b7378c0ed65795dfa9d9e94919e3548919dfa57336",
	name: "chatClear",
	filename: "src/lib/chat.functions.ts"
}, (opts) => chatClear.__executeServer(opts));
var chatClear = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: roomOf(input)
})).handler(chatClear_createServerFn_handler, async ({ data }) => {
	const { clearRoomHistory } = await import("./chat.server-ClhhNbD1.mjs");
	return clearRoomHistory(data.token, data.roomId);
});
var chatAvatar_createServerFn_handler = createServerRpc({
	id: "3d2cf2fa98ddd50394d62ae700cc341e71044a6f12434c2b7c8c023584aa9c43",
	name: "chatAvatar",
	filename: "src/lib/chat.functions.ts"
}, (opts) => chatAvatar.__executeServer(opts));
var chatAvatar = createServerFn({ method: "POST" }).inputValidator((input) => {
	const raw = input;
	return {
		token: tokenOf(input),
		kind: String(raw?.kind ?? ""),
		value: String(raw?.value ?? "")
	};
}).handler(chatAvatar_createServerFn_handler, async ({ data }) => {
	const { saveAvatar } = await import("./chat.server-ClhhNbD1.mjs");
	return saveAvatar(data.token, data.kind, data.value);
});
var chatProfile_createServerFn_handler = createServerRpc({
	id: "22644ec56907fcd960a2c3d208db21c9ff0eab50f69f827c6c97a1cb738983f0",
	name: "chatProfile",
	filename: "src/lib/chat.functions.ts"
}, (opts) => chatProfile.__executeServer(opts));
var chatProfile = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	name: String(input?.name ?? "")
})).handler(chatProfile_createServerFn_handler, async ({ data }) => {
	const { saveProfile } = await import("./chat.server-ClhhNbD1.mjs");
	return saveProfile(data.token, data.name);
});
var chatOpen_createServerFn_handler = createServerRpc({
	id: "738c3224c25a62bc53f60c89aa026fc923e9fcb0a64762a3938270487b0eaf84",
	name: "chatOpen",
	filename: "src/lib/chat.functions.ts"
}, (opts) => chatOpen.__executeServer(opts));
var chatOpen = createServerFn({ method: "POST" }).inputValidator((input) => {
	const raw = input;
	const members = Array.isArray(raw?.members) ? raw.members.map((item) => String(item)).slice(0, 12) : [];
	return {
		token: tokenOf(input),
		kind: raw?.kind === "group" ? "group" : "direct",
		with: String(raw?.with ?? ""),
		title: String(raw?.title ?? ""),
		members
	};
}).handler(chatOpen_createServerFn_handler, async ({ data }) => {
	if (data.kind === "group") {
		const { openGroup } = await import("./chat.server-ClhhNbD1.mjs");
		return openGroup(data.token, data.title, data.members);
	}
	const { openDirect } = await import("./chat.server-ClhhNbD1.mjs");
	return openDirect(data.token, data.with);
});
//#endregion
export { chatAvatar_createServerFn_handler, chatClear_createServerFn_handler, chatOpen_createServerFn_handler, chatProfile_createServerFn_handler, chatSend_createServerFn_handler, chatSync_createServerFn_handler };
