import { o as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as usePark, m as signInStudent, o as finishNav, s as holdNav } from "./router-VNKMmnlx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BfIW693u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const hydrate = usePark((s) => s.hydrate);
	const ready = usePark((s) => s.ready);
	const student = usePark((s) => s.student);
	const remember = usePark((s) => s.signInStudent);
	const [account, setAccount] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (ready && student) navigate({ to: "/" });
	}, [
		navigate,
		ready,
		student
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center bg-[#f3eee4] px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "w-full max-w-[22rem] rounded-[1.75rem] border-[3px] border-ink bg-paper px-6 pt-8 pb-6 shadow-[8px_8px_0_#1c241c]",
			onSubmit: async (event) => {
				event.preventDefault();
				setPending(true);
				setError("");
				holdNav();
				try {
					const result = await signInStudent({ data: {
						account,
						password
					} });
					if (!result.ok) {
						setError("帳號或密碼不正確");
						finishNav();
						return;
					}
					remember(result.account, result.token, result.name);
					await navigate({ to: "/" });
					finishNav();
				} catch {
					setError("登入暫時失敗，請再試一次");
					finishNav();
				} finally {
					setPending(false);
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/park/login-fox.jpg",
					alt: "",
					className: "mx-auto size-24 rounded-full border-2 border-ink object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-center font-sans text-4xl font-bold tracking-wide text-ink",
					children: "登入"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-6 block text-sm font-bold",
					htmlFor: "account",
					children: "帳號"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "account",
					value: account,
					autoComplete: "username",
					onChange: (event) => setAccount(event.target.value),
					className: "mt-1 h-12 w-full rounded-full border-2 border-ink bg-[#f6f1e6] px-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-sm font-bold",
					htmlFor: "password",
					children: "密碼"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "password",
					type: "password",
					value: password,
					autoComplete: "current-password",
					onChange: (event) => setPassword(event.target.value),
					className: "mt-1 h-12 w-full rounded-full border-2 border-ink bg-[#f6f1e6] px-4"
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-sm font-bold text-coral",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					"data-nav": true,
					disabled: pending,
					className: "mt-5 h-14 w-full rounded-full bg-ink text-lg font-bold text-paper disabled:opacity-60",
					children: pending ? "進入中…" : "進入"
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
