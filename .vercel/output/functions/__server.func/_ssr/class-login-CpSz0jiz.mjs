import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/class-login-CpSz0jiz.js
var signInStudent_createServerFn_handler = createServerRpc({
	id: "08d6da6613cba96178504344d1092677a5ed23eba816c276b0a9e542777e7821",
	name: "signInStudent",
	filename: "src/lib/class-login.ts"
}, (opts) => signInStudent.__executeServer(opts));
var signInStudent = createServerFn({ method: "POST" }).inputValidator((data) => ({
	account: String(data?.account ?? ""),
	password: String(data?.password ?? "")
})).handler(signInStudent_createServerFn_handler, async ({ data }) => {
	const { verifyStudent, verifyTeacher } = await import("./class-roster.server-CIgXvlsE.mjs");
	const person = await verifyStudent(data.account, data.password) ?? await verifyTeacher(data.account, data.password);
	if (!person) return { ok: false };
	let token = "";
	try {
		const { openChatSession } = await import("./chat.server-ClhhNbD1.mjs");
		token = await openChatSession(person.account);
	} catch {
		token = "";
	}
	return {
		ok: true,
		account: person.account,
		name: person.name,
		token
	};
});
var changePassword_createServerFn_handler = createServerRpc({
	id: "3ab47c73ab2d0d1fad7aabd5e6d7d1b073511132e08709033b049355b57ccfad",
	name: "changePassword",
	filename: "src/lib/class-login.ts"
}, (opts) => changePassword.__executeServer(opts));
var changePassword = createServerFn({ method: "POST" }).inputValidator((data) => ({
	token: String(data?.token ?? ""),
	current: String(data?.current ?? ""),
	next: String(data?.next ?? "")
})).handler(changePassword_createServerFn_handler, async ({ data }) => {
	const { sessionAccount } = await import("./chat.server-ClhhNbD1.mjs");
	const account = await sessionAccount(data.token);
	if (!account) return {
		ok: false,
		error: "請先登入。"
	};
	const { changeClassPassword } = await import("./class-roster.server-CIgXvlsE.mjs");
	return changeClassPassword(account, data.current, data.next);
});
//#endregion
export { changePassword_createServerFn_handler, signInStudent_createServerFn_handler };
