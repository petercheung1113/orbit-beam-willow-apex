import { o as __toESM } from "../_runtime.mjs";
import { C as useRouter, Z as require_react, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, w as require_jsx_runtime, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as UNITS, r as getUnit } from "./units-9gg8Qwt9.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { a as sealUpload, c as CHAT_FILE_CHUNK, i as rememberPublished, o as storedFileSize, r as cleanFileName, s as streamStoredFile, t as appendChatChunk, u as formatBytes } from "./chat-file-store.server-CLEaw4B2.mjs";
import { n as defaultBuiltin, r as isBuiltinId, t as BUILTIN_IDS } from "./avatars-_NsnOvHN.mjs";
import { n as Send, r as Paperclip, s as Bell, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-VNKMmnlx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var TONE = {
	fox: "bg-coral",
	bear: "bg-sun",
	duck: "bg-paper",
	frog: "bg-grass",
	lion: "bg-sun",
	fish: "bg-meadow",
	bird: "bg-coral",
	cube: "bg-ink",
	star: "bg-sun",
	kite: "bg-meadow",
	boat: "bg-paper",
	sun: "bg-sun"
};
function choiceFor(account, saved) {
	return saved ?? {
		kind: "builtin",
		id: defaultBuiltin(account)
	};
}
function AvatarFace({ choice, online, className = "size-10" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `relative inline-flex shrink-0 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block size-full overflow-hidden rounded-full border-2 border-ink " + (online ? "" : "grayscale"),
			children: choice.kind === "upload" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: choice.src,
				alt: "",
				className: "size-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuiltinFace, {
				id: choice.id,
				light: choice.id === "cube"
			})
		}), online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-paper bg-grass",
			"aria-hidden": true
		}) : null]
	});
}
function BuiltinFace({ id, light = false }) {
	const eye = light ? "bg-paper" : "bg-ink";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `relative block size-full ${TONE[id]}`,
		children: [
			id === "fox" || id === "bear" || id === "lion" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0 left-[12%] size-[28%] rounded-full border-2 border-ink ${TONE[id]}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0 right-[12%] size-[28%] rounded-full border-2 border-ink ${TONE[id]}` })] }) : null,
			id === "duck" || id === "bird" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1/2 left-1/2 h-[18%] w-[34%] -translate-x-1/2 rounded-full bg-sun" }) : null,
			id === "frog" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-[18%] left-[18%] size-[22%] rounded-full border-2 border-ink bg-paper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-[18%] right-[18%] size-[22%] rounded-full border-2 border-ink bg-paper" })] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-[42%] left-[28%] size-[12%] rounded-full ${eye}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-[42%] right-[28%] size-[12%] rounded-full ${eye}` }),
			id === "fish" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-0 bottom-[18%] h-[28%] w-[22%] rounded-full bg-coral" }) : null,
			id === "star" || id === "sun" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-[16%] left-1/2 h-[10%] w-[28%] -translate-x-1/2 rounded-full bg-coral" }) : null
		]
	});
}
function builtinChoices() {
	return [...BUILTIN_IDS];
}
function parseChoice(kind, value) {
	if (kind === "builtin" && isBuiltinId(value)) return {
		kind: "builtin",
		id: value
	};
	if (kind === "upload" && value.startsWith("data:image/jpeg;base64,")) return {
		kind: "upload",
		src: value
	};
	return null;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var signInStudent = createServerFn({ method: "POST" }).inputValidator((data) => ({
	account: String(data?.account ?? ""),
	password: String(data?.password ?? "")
})).handler(createSsrRpc("08d6da6613cba96178504344d1092677a5ed23eba816c276b0a9e542777e7821"));
var changePassword = createServerFn({ method: "POST" }).inputValidator((data) => ({
	token: String(data?.token ?? ""),
	current: String(data?.current ?? ""),
	next: String(data?.next ?? "")
})).handler(createSsrRpc("3ab47c73ab2d0d1fad7aabd5e6d7d1b073511132e08709033b049355b57ccfad"));
function tokenOf(input) {
	return String(input?.token ?? "").trim();
}
function roomOf(input) {
	return String(input?.roomId ?? "hall").trim() || "hall";
}
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
}).handler(createSsrRpc("a6162762f024aa43a67ffe12edb4f7a1c1aeb98a79388f0cdc6967f9e57586f2"));
var chatSend = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: roomOf(input),
	body: String(input?.body ?? "")
})).handler(createSsrRpc("af289ad3664fb333b04fcbecc2f44b0aac2ed987e221f08aa94b79046c2e66c1"));
var chatClear = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: roomOf(input)
})).handler(createSsrRpc("b973373c76a5102df02c51b7378c0ed65795dfa9d9e94919e3548919dfa57336"));
var chatAvatar = createServerFn({ method: "POST" }).inputValidator((input) => {
	const raw = input;
	return {
		token: tokenOf(input),
		kind: String(raw?.kind ?? ""),
		value: String(raw?.value ?? "")
	};
}).handler(createSsrRpc("3d2cf2fa98ddd50394d62ae700cc341e71044a6f12434c2b7c8c023584aa9c43"));
var chatProfile = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	name: String(input?.name ?? "")
})).handler(createSsrRpc("22644ec56907fcd960a2c3d208db21c9ff0eab50f69f827c6c97a1cb738983f0"));
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
}).handler(createSsrRpc("738c3224c25a62bc53f60c89aa026fc923e9fcb0a64762a3938270487b0eaf84"));
var KEY = "playground-park-v1";
function snapshot(state) {
	return {
		stamps: state.stamps,
		teacher: state.teacher,
		nickname: state.nickname,
		student: state.student,
		chatToken: state.chatToken,
		plan: state.plan,
		mastery: state.mastery
	};
}
function write(state) {
	if (typeof window === "undefined" || !state.ready) return;
	localStorage.setItem(KEY, JSON.stringify(snapshot(state)));
}
var usePark = create((set, get) => ({
	stamps: [],
	teacher: false,
	nickname: "學生01",
	student: null,
	chatToken: null,
	plan: null,
	mastery: {},
	ready: false,
	stamp: (id) => {
		const { stamps } = get();
		if (stamps.includes(id)) return;
		set({ stamps: [...stamps, id] });
		write(get());
	},
	toggleTeacher: () => {
		set({ teacher: !get().teacher });
		write(get());
	},
	clearStamps: () => {
		set({ stamps: [] });
		write(get());
	},
	setNickname: (name) => {
		const nickname = name.trim().slice(0, 12);
		if (!nickname) return;
		set({ nickname });
		write(get());
	},
	signInStudent: (account, token, name) => {
		set({
			student: account,
			nickname: (name || account).trim().slice(0, 12) || account,
			chatToken: token
		});
		write(get());
	},
	signOutStudent: () => {
		set({
			student: null,
			chatToken: null,
			nickname: get().nickname === get().student ? "學生01" : get().nickname
		});
		write(get());
	},
	dropChatToken: () => {
		set({ chatToken: null });
		write(get());
	},
	setPlan: (plan) => {
		set({ plan });
		write(get());
	},
	clearPlan: () => {
		set({ plan: null });
		write(get());
	},
	toggleDay: (date) => {
		const plan = get().plan;
		if (!plan) return;
		set({ plan: {
			...plan,
			done: {
				...plan.done,
				[date]: !plan.done[date]
			}
		} });
		write(get());
	},
	addResult: (rows) => {
		const mastery = { ...get().mastery };
		for (const row of rows) {
			const prev = mastery[row.unitId] ?? {
				correct: 0,
				seen: 0
			};
			mastery[row.unitId] = {
				correct: prev.correct + (row.correct ? 1 : 0),
				seen: prev.seen + 1
			};
		}
		set({ mastery });
		write(get());
	},
	hydrate: () => {
		if (get().ready || typeof window === "undefined") return;
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) {
				const data = JSON.parse(raw);
				set({
					stamps: Array.isArray(data.stamps) ? data.stamps : [],
					teacher: Boolean(data.teacher),
					nickname: typeof data.nickname === "string" && data.nickname ? data.nickname.slice(0, 12) : "學生01",
					student: typeof data.student === "string" ? data.student : null,
					chatToken: typeof data.chatToken === "string" ? data.chatToken : null,
					plan: data.plan ?? null,
					mastery: data.mastery && typeof data.mastery === "object" ? data.mastery : {},
					ready: true
				});
				return;
			}
		} catch {}
		set({ ready: true });
	}
}));
var RoomContext = (0, import_react.createContext)(null);
function useRoom() {
	const room = (0, import_react.useContext)(RoomContext);
	if (!room) throw new Error("聊天室未就緒");
	return room;
}
function useClassChat() {
	return useRoom();
}
function clock(at) {
	const date = new Date(at);
	return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
}
function who(name, seat) {
	return name && name !== seat ? `${name} · ${seat}` : seat;
}
function unreadMates(inbox, seenRooms, primed, me) {
	if (!primed) return [];
	const latest = /* @__PURE__ */ new Map();
	for (const row of inbox) {
		if (row.account === me) continue;
		if (row.id <= (seenRooms[row.roomId] ?? 0)) continue;
		const prev = latest.get(row.account);
		if (!prev || row.id > prev.id) latest.set(row.account, row);
	}
	return [...latest.values()].sort((a, b) => b.at - a.at);
}
function pingText(row) {
	if (row.body.trim()) return row.body;
	return row.fileName ? `檔案 · ${row.fileName}` : "傳送了檔案";
}
function pingWhere(rooms, roomId) {
	const found = rooms.find((item) => item.id === roomId);
	if (!found || found.kind === "hall") return "大堂";
	if (found.kind === "direct") return "私聊";
	return found.title || "群組";
}
function bellKey(account) {
	return `park-chat-bell:${account}`;
}
function readBell(account) {
	if (!account || typeof window === "undefined") return {
		primed: false,
		rooms: {}
	};
	try {
		const raw = localStorage.getItem(bellKey(account));
		if (!raw) return {
			primed: false,
			rooms: {}
		};
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed.rooms !== "object" || parsed.rooms === null) return {
			primed: false,
			rooms: {}
		};
		return {
			primed: Boolean(parsed.primed),
			rooms: parsed.rooms
		};
	} catch {
		return {
			primed: false,
			rooms: {}
		};
	}
}
function writeBell(account, seen) {
	if (!account || typeof window === "undefined") return;
	localStorage.setItem(bellKey(account), JSON.stringify(seen));
}
function ClassChatProvider({ children }) {
	const me = usePark((s) => s.student) ?? "";
	const token = usePark((s) => s.chatToken);
	const remember = usePark((s) => s.signInStudent);
	const dropChatToken = usePark((s) => s.dropChatToken);
	const [mates, setMates] = (0, import_react.useState)([]);
	const [rooms, setRooms] = (0, import_react.useState)([{
		id: "hall",
		kind: "hall",
		title: "大堂",
		members: []
	}]);
	const [roomId, setRoomId] = (0, import_react.useState)("hall");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [notices, setNotices] = (0, import_react.useState)([]);
	const [avatars, setAvatars] = (0, import_react.useState)({});
	const [linkError, setLinkError] = (0, import_react.useState)("");
	const [sendError, setSendError] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [inbox, setInbox] = (0, import_react.useState)([]);
	const [seen, setSeen] = (0, import_react.useState)({
		primed: false,
		rooms: {}
	});
	const roomRef = (0, import_react.useRef)("hall");
	const afters = (0, import_react.useRef)({});
	const caches = (0, import_react.useRef)({});
	const rev = (0, import_react.useRef)(-1);
	const seenOnline = (0, import_react.useRef)(null);
	const inboxRef = (0, import_react.useRef)([]);
	const enter = (id) => {
		roomRef.current = id;
		setRoomId(id);
		setMessages(caches.current[id] ?? []);
		setSeen((prev) => {
			let max = prev.rooms[id] ?? 0;
			for (const ping of inboxRef.current) if (ping.roomId === id) max = Math.max(max, ping.id);
			for (const row of caches.current[id] ?? []) max = Math.max(max, row.id);
			if (max <= (prev.rooms[id] ?? 0)) return prev;
			const next = {
				primed: prev.primed,
				rooms: {
					...prev.rooms,
					[id]: max
				}
			};
			writeBell(me, next);
			return next;
		});
	};
	(0, import_react.useEffect)(() => {
		if (!token) return;
		let stop = false;
		const pull = async () => {
			try {
				const asked = roomRef.current;
				const result = await chatSync({ data: {
					token,
					roomId: asked,
					after: afters.current[asked] ?? 0,
					rev: rev.current
				} });
				if (stop) return;
				if (!result.ok) {
					dropChatToken();
					return;
				}
				setLinkError("");
				setMates(result.mates);
				setRooms(result.rooms);
				const mine = result.mates.find((mate) => mate.account === me);
				if (mine && usePark.getState().nickname !== mine.name) usePark.getState().setNickname(mine.name);
				rev.current = result.rev;
				if (result.avatars) {
					const next = {};
					for (const row of result.avatars) {
						const choice = parseChoice(row.kind, row.value);
						if (choice) next[row.account] = choice;
					}
					setAvatars(next);
				}
				if (result.replace) {
					const bucket = result.roomId;
					const had = (caches.current[bucket] ?? []).length > 0;
					caches.current[bucket] = result.messages;
					afters.current[bucket] = result.messages.at(-1)?.id ?? 0;
					if (had && result.messages.length === 0) setNotices((prev) => [...prev, {
						key: `wipe-${bucket}-${Date.now()}`,
						text: "對話記錄已刪除"
					}].slice(-8));
				} else if (result.messages.length) {
					const last = result.messages[result.messages.length - 1];
					const bucket = result.roomId;
					if (last) afters.current[bucket] = Math.max(afters.current[bucket] ?? 0, last.id);
					const prev = caches.current[bucket] ?? [];
					const map = new Map(prev.map((row) => [row.id, row]));
					for (const row of result.messages) map.set(row.id, row);
					caches.current[bucket] = [...map.values()].sort((a, b) => a.id - b.id).slice(-200);
				}
				if (asked !== roomRef.current) return;
				if (result.roomId !== asked) enter(result.roomId);
				else setMessages(caches.current[result.roomId] ?? []);
				const pings = result.pings;
				inboxRef.current = pings;
				setInbox(pings);
				setSeen((prev) => {
					if (prev.primed) return prev;
					const rooms = { ...prev.rooms };
					for (const ping of pings) rooms[ping.roomId] = Math.max(rooms[ping.roomId] ?? 0, ping.id);
					const next = {
						primed: true,
						rooms
					};
					writeBell(me, next);
					return next;
				});
				const now = new Set(result.mates.filter((mate) => mate.online).map((mate) => mate.account));
				const before = seenOnline.current;
				seenOnline.current = now;
				if (before) {
					const lines = [];
					for (const mate of result.mates) {
						if (mate.online && !before.has(mate.account) && mate.account !== me) lines.push({
							key: `in-${mate.account}-${Date.now()}`,
							text: `${who(mate.name, mate.seat)} 上線了`
						});
						if (!mate.online && before.has(mate.account) && mate.account !== me) lines.push({
							key: `out-${mate.account}-${Date.now()}`,
							text: `${who(mate.name, mate.seat)} 離開了`
						});
					}
					if (lines.length) setNotices((prev) => [...prev, ...lines].slice(-8));
				}
			} catch {
				if (!stop) setLinkError("對講暫時斷線，會再試。");
			}
		};
		pull();
		const id = window.setInterval(() => void pull(), 2500);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, [
		dropChatToken,
		me,
		token
	]);
	(0, import_react.useEffect)(() => {
		setSeen(readBell(me));
	}, [me]);
	const take = (bucket, message) => {
		afters.current[bucket] = Math.max(afters.current[bucket] ?? 0, message.id);
		const prev = caches.current[bucket] ?? [];
		caches.current[bucket] = prev.some((row) => row.id === message.id) ? prev : [...prev, message];
		if (roomRef.current === bucket) setMessages(caches.current[bucket] ?? []);
	};
	const send = async (body) => {
		if (!token || sending) return false;
		const current = roomRef.current;
		setSending(true);
		setSendError("");
		try {
			const result = await chatSend({ data: {
				token,
				roomId: current,
				body
			} });
			if (!result.ok) {
				if (result.error === "expired") dropChatToken();
				else setSendError(result.error);
				return false;
			}
			afters.current[current] = Math.max(afters.current[current] ?? 0, result.message.id);
			const prev = caches.current[current] ?? [];
			caches.current[current] = prev.some((row) => row.id === result.message.id) ? prev : [...prev, result.message];
			if (roomRef.current === current) setMessages(caches.current[current] ?? []);
			return true;
		} catch {
			setSendError("送唔出，再試一次。");
			return false;
		} finally {
			setSending(false);
		}
	};
	const pickAvatar = async (choice) => {
		if (!token) return "請先進入聊天室。";
		const value = choice.kind === "upload" ? choice.src : choice.id;
		try {
			const result = await chatAvatar({ data: {
				token,
				kind: choice.kind,
				value
			} });
			if (!result.ok) {
				if (result.error === "expired") dropChatToken();
				return result.error;
			}
			setAvatars((prev) => ({
				...prev,
				[me]: choice
			}));
			rev.current = -1;
			return "";
		} catch {
			return "頭像暫時存唔到。";
		}
	};
	const saveName = async (name) => {
		if (!token) return "請先進入聊天室。";
		try {
			const result = await chatProfile({ data: {
				token,
				name
			} });
			if (!result.ok) {
				if (result.error === "expired") dropChatToken();
				return result.error;
			}
			usePark.getState().setNickname(result.name);
			setMates((prev) => prev.map((mate) => mate.account === me ? {
				...mate,
				name: result.name
			} : mate));
			return "";
		} catch {
			return "名字暫時存唔到。";
		}
	};
	const rememberRoom = (room) => {
		setRooms((prev) => prev.some((item) => item.id === room.id) ? prev.map((item) => item.id === room.id ? room : item) : [...prev, room]);
		enter(room.id);
	};
	const openDirect = async (account) => {
		if (!token) return "請先進入聊天室。";
		try {
			const result = await chatOpen({ data: {
				token,
				kind: "direct",
				with: account,
				title: "",
				members: []
			} });
			if (!result.ok) return result.error === "expired" ? (dropChatToken(), "請再進入一次。") : result.error;
			rememberRoom(result.room);
			return "";
		} catch {
			return "私聊暫時開唔到。";
		}
	};
	const openGroup = async (title, members) => {
		if (!token) return "請先進入聊天室。";
		try {
			const result = await chatOpen({ data: {
				token,
				kind: "group",
				with: "",
				title,
				members
			} });
			if (!result.ok) return result.error === "expired" ? (dropChatToken(), "請再進入一次。") : result.error;
			rememberRoom(result.room);
			return "";
		} catch {
			return "群組暫時開唔到。";
		}
	};
	const unlock = async (password) => {
		try {
			const result = await signInStudent({ data: {
				account: me,
				password
			} });
			if (!result.ok || !result.token) return result.ok ? "聊天室暫時入唔到" : "密碼不正確";
			remember(result.account, result.token);
			return "";
		} catch {
			return "暫時入唔到，再試一次";
		}
	};
	const clearTalk = async () => {
		if (!token) return "請先進入聊天室。";
		const current = roomRef.current;
		try {
			const result = await chatClear({ data: {
				token,
				roomId: current
			} });
			if (!result.ok) {
				if (result.error === "expired") dropChatToken();
				return result.error;
			}
			caches.current[current] = [];
			afters.current[current] = 0;
			if (roomRef.current === current) setMessages([]);
			setNotices((prev) => [...prev, {
				key: `wipe-${current}-${Date.now()}`,
				text: "對話記錄已刪除"
			}].slice(-8));
			return "";
		} catch {
			return "暫時刪除不到，再試一次。";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomContext.Provider, {
		value: {
			me,
			token,
			roomId,
			rooms,
			mates,
			messages,
			notices,
			avatars,
			linkError,
			sendError,
			sending,
			send,
			take,
			pickAvatar,
			saveName,
			openDirect,
			openGroup,
			clearTalk,
			enter,
			unlock,
			inbox,
			seenRooms: seen.rooms,
			bellPrimed: seen.primed
		},
		children
	});
}
function ParkChat({ dock = false }) {
	const room = useRoom();
	const [open, setOpen] = (0, import_react.useState)(true);
	const [panel, setPanel] = (0, import_react.useState)("talk");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [groupTitle, setGroupTitle] = (0, import_react.useState)("");
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [formError, setFormError] = (0, import_react.useState)("");
	const [gate, setGate] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [pendingGate, setPendingGate] = (0, import_react.useState)(false);
	const [wipeAsk, setWipeAsk] = (0, import_react.useState)(false);
	const [bellOpen, setBellOpen] = (0, import_react.useState)(false);
	const stick = (0, import_react.useRef)(true);
	const scroller = (0, import_react.useRef)(null);
	const box = (0, import_react.useRef)(null);
	const attachment = (0, import_react.useRef)(null);
	const bellBox = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setWipeAsk(false);
	}, [room.roomId]);
	(0, import_react.useEffect)(() => {
		if (!bellOpen) return;
		const close = (event) => {
			if (!bellBox.current?.contains(event.target)) setBellOpen(false);
		};
		document.addEventListener("pointerdown", close);
		return () => document.removeEventListener("pointerdown", close);
	}, [bellOpen]);
	(0, import_react.useEffect)(() => {
		if (!dock) return;
		const wide = window.matchMedia("(min-width: 1024px)");
		setOpen(wide.matches);
	}, [dock]);
	(0, import_react.useEffect)(() => {
		const node = scroller.current;
		if (!node || !stick.current) return;
		node.scrollTop = node.scrollHeight;
	}, [
		room.messages,
		room.notices,
		open
	]);
	const unread = unreadMates(room.inbox, room.seenRooms, room.bellPrimed, room.me);
	const badge = Math.min(unread.length, 2);
	if (dock && !open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full w-16 shrink-0 flex-col border-l-2 border-ink bg-paper/95 max-lg:fixed max-lg:top-20 max-lg:right-0 max-lg:bottom-0 max-lg:z-30",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen(true),
			className: "relative border-b border-line px-1 py-3 text-xs font-bold text-ink",
			children: ["聊天", badge > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[10px] leading-none font-bold text-paper",
				children: badge
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-1 flex-col items-center gap-2 overflow-y-auto py-2",
			"aria-label": "同學",
			children: room.mates.map((mate) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				title: mate.online ? `${who(mate.name, mate.seat)} 在線` : `${who(mate.name, mate.seat)} 不在線`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
					choice: choiceFor(mate.account, room.avatars[mate.account]),
					online: mate.online,
					className: "size-9"
				})
			}, mate.account))
		})]
	});
	const current = room.rooms.find((item) => item.id === room.roomId) ?? room.rooms[0];
	const onlineCount = room.mates.filter((mate) => mate.online).length;
	const shown = !current || current.kind === "hall" ? room.mates : room.mates.filter((mate) => current.members.includes(mate.account));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: dock ? "flex h-full w-80 shrink-0 flex-col border-l-2 border-ink bg-paper/95 max-lg:fixed max-lg:top-20 max-lg:right-0 max-lg:bottom-0 max-lg:z-30 max-lg:h-auto max-lg:w-[min(22rem,100vw)]" : "flex h-full min-h-[70dvh] flex-col overflow-hidden rounded-3xl border-2 border-ink bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-2 border-b border-line px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-coral",
						children: current?.kind === "direct" ? "私聊" : current?.kind === "group" ? "群組" : "大堂"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "truncate text-lg leading-tight text-ink",
						children: current?.title ?? "聊天室"
					})]
				}),
				room.token ? wipeAsk ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-auto flex shrink-0 gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-9 rounded-xl bg-coral px-2 text-xs font-bold text-paper",
						onClick: () => {
							room.clearTalk().then((error) => {
								setFormError(error);
								setWipeAsk(false);
							});
						},
						children: "確定刪除"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-9 rounded-xl border-2 border-ink px-2 text-xs font-bold",
						onClick: () => setWipeAsk(false),
						children: "取消"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setWipeAsk(true),
					className: "ml-auto h-9 shrink-0 rounded-xl border-2 border-coral px-2 text-xs font-bold text-coral",
					children: "刪除記錄"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: (room.token ? "" : "ml-auto ") + "text-xs font-bold text-grass",
					children: [onlineCount, " 在線"]
				}),
				dock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(false),
					className: "h-9 rounded-xl border-2 border-ink px-2 text-xs font-bold",
					children: "收起"
				}) : null
			]
		}), !room.token ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-1 flex-col gap-3 p-4",
			onSubmit: async (event) => {
				event.preventDefault();
				setPendingGate(true);
				const error = await room.unlock(password);
				setGate(error);
				if (!error) setPassword("");
				setPendingGate(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [room.me, " 再輸入一次密碼，就可以同同學對話。"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: password,
					autoComplete: "current-password",
					onChange: (event) => setPassword(event.target.value),
					className: "h-12 rounded-2xl border-2 border-ink bg-cream px-4",
					"aria-label": "密碼"
				}),
				gate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-coral",
					children: gate
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: pendingGate,
					className: "h-12 rounded-2xl bg-grass font-bold text-paper disabled:opacity-60",
					children: pendingGate ? "核對中…" : "進入"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1 border-b border-line px-2 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPanel("talk"),
					className: "h-8 shrink-0 rounded-full px-3 text-xs font-bold " + (panel === "talk" ? "bg-ink text-paper" : "bg-cream text-ink"),
					children: "對話"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPanel("direct"),
					className: "h-8 shrink-0 rounded-full px-3 text-xs font-bold " + (panel === "direct" ? "bg-ink text-paper" : "bg-cream text-ink"),
					children: "私聊"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPanel("group"),
					className: "h-8 shrink-0 rounded-full px-3 text-xs font-bold " + (panel === "group" ? "bg-ink text-paper" : "bg-cream text-ink"),
					children: "群組"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setPanel("talk");
						room.enter("hall");
					},
					className: "h-8 shrink-0 rounded-full px-3 text-xs font-bold " + (panel === "talk" && room.roomId === "hall" ? "bg-grass text-paper" : "bg-cream text-ink"),
					children: "大堂"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: bellBox,
					className: "relative ml-auto shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-label": "新訊息",
						"aria-expanded": bellOpen,
						onClick: () => setBellOpen((value) => !value),
						className: "relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), badge > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[10px] leading-none font-bold text-paper",
							children: badge
						}) : null]
					}), bellOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[4px_4px_0_#1c241c]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "border-b border-line px-3 py-2 text-xs font-bold text-ink",
							children: "新訊息"
						}), unread.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 py-4 text-sm text-muted",
							children: "未有新訊息"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "max-h-72 overflow-y-auto",
							"aria-label": "新訊息預覽",
							children: unread.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-cream",
								onClick: () => {
									room.enter(row.roomId);
									setPanel("talk");
									setBellOpen(false);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
									choice: choiceFor(row.account, room.avatars[row.account]),
									online: true,
									className: "size-9 shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-baseline justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate text-sm font-bold text-ink",
												children: row.name === row.seat ? row.seat : row.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "shrink-0 text-[10px] text-muted",
												children: clock(row.at)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-xs text-muted",
											children: pingText(row)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-grass",
											children: pingWhere(room.rooms, row.roomId)
										})
									]
								})]
							}) }, row.account))
						})]
					}) : null]
				})
			]
		}), panel === "direct" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "min-h-0 flex-1 overflow-y-auto px-2 py-2",
			"aria-label": "揀同學私聊",
			children: [room.mates.filter((mate) => mate.account !== room.me).map((mate) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex w-full items-center gap-2 rounded-2xl px-2 py-1.5 text-left hover:bg-cream",
				onClick: () => {
					room.openDirect(mate.account).then((error) => {
						setFormError(error);
						if (!error) setPanel("talk");
					});
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
					choice: choiceFor(mate.account, room.avatars[mate.account]),
					online: mate.online,
					className: "size-9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-sm font-bold text-ink",
						children: mate.name === mate.seat ? mate.seat : mate.name
					}), mate.name !== mate.seat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted",
						children: mate.seat
					}) : null]
				})]
			}) }, mate.account)), formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-2 text-sm font-bold text-coral",
				children: formError
			}) : null]
		}) : panel === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex min-h-0 flex-1 flex-col",
			onSubmit: (event) => {
				event.preventDefault();
				room.openGroup(groupTitle, picked).then((error) => {
					setFormError(error);
					if (!error) {
						setPanel("talk");
						setGroupTitle("");
						setPicked([]);
					}
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-3 pt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: groupTitle,
						maxLength: 12,
						placeholder: "群組名稱",
						onChange: (event) => setGroupTitle(event.target.value),
						className: "h-11 w-full rounded-2xl border-2 border-ink bg-cream px-3"
					})
				}),
				room.rooms.some((item) => item.kind === "group") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex gap-1 overflow-x-auto px-3 pt-2",
					"aria-label": "已開的群組",
					children: room.rooms.filter((item) => item.kind === "group").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							room.enter(item.id);
							setPanel("talk");
						},
						className: "h-8 rounded-full bg-cream px-3 text-xs font-bold text-ink",
						children: item.title
					}) }, item.id))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 grid min-h-0 flex-1 grid-cols-4 gap-1 overflow-y-auto px-2",
					"aria-label": "揀群組成員",
					children: room.mates.filter((mate) => mate.account !== room.me).map((mate) => {
						const on = picked.includes(mate.account);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setPicked((prev) => on ? prev.filter((item) => item !== mate.account) : [...prev, mate.account]),
							className: "flex w-full flex-col items-center rounded-2xl px-1 py-1 " + (on ? "bg-meadow" : ""),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
									choice: choiceFor(mate.account, room.avatars[mate.account]),
									online: mate.online,
									className: "size-9"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 max-w-full truncate text-xs font-bold text-ink",
									children: mate.name === mate.seat ? mate.seat : mate.name
								}),
								mate.name !== mate.seat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "max-w-full truncate text-xs text-muted",
									children: mate.seat
								}) : null
							]
						}) }, mate.account);
					})
				}),
				formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 text-sm font-bold text-coral",
					children: formError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					className: "m-3 h-11 rounded-2xl bg-grass font-bold text-paper",
					children: [
						"開群組（",
						picked.length,
						"）"
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid max-h-44 grid-cols-4 gap-1 overflow-y-auto border-b border-line px-2 py-2",
				"aria-label": "同學",
				children: shown.map((mate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col items-center",
					children: [
						mate.account === room.me || room.roomId !== "hall" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
							choice: choiceFor(mate.account, room.avatars[mate.account]),
							online: mate.online,
							className: "size-9"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							title: `同${who(mate.name, mate.seat)}私聊`,
							onClick: () => {
								room.openDirect(mate.account).then((error) => {
									setFormError(error);
									if (!error) setPanel("talk");
								});
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
								choice: choiceFor(mate.account, room.avatars[mate.account]),
								online: mate.online,
								className: "size-9"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 max-w-full truncate text-xs font-bold " + (mate.online ? "text-ink" : "text-muted"),
							children: mate.account === room.me ? "你" : mate.name === mate.seat ? mate.seat : mate.name
						}),
						mate.account === room.me || mate.name !== mate.seat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "max-w-full truncate text-xs text-muted",
							children: mate.seat
						}) : null
					]
				}, mate.account))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scroller,
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3",
				onScroll: (event) => {
					const node = event.currentTarget;
					stick.current = node.scrollHeight - node.scrollTop - node.clientHeight < 80;
				},
				children: [
					room.messages.length === 0 && room.notices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "m-auto text-center text-sm text-muted",
						children: "未有人出聲。你做第一個。"
					}) : null,
					room.messages.map((row) => {
						const self = row.account === room.me;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex max-w-[92%] items-end gap-2 " + (self ? "ml-auto flex-row-reverse" : "mr-auto"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
								choice: choiceFor(row.account, room.avatars[row.account]),
								online: true,
								className: "size-8"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-1 text-xs text-muted " + (self ? "text-right" : ""),
									children: [
										self ? `你 · ${row.seat}` : who(row.name, row.seat),
										" · ",
										clock(row.at)
									]
								}),
								row.file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBubble, {
									file: row.file,
									token: room.token,
									mine: self
								}) : null,
								row.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatBody, {
									body: row.body,
									mine: self
								}) : null
							] })]
						}, row.id);
					}),
					room.notices.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs font-bold text-muted",
						children: row.text
					}, row.key))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "border-t border-line p-3",
				onSubmit: (event) => {
					event.preventDefault();
					const body = draft.trim();
					if (!body) return;
					room.send(body).then((ok) => {
						if (!ok) return;
						setDraft("");
						stick.current = true;
						box.current?.focus();
					});
				},
				children: [
					room.sendError || room.linkError || formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-bold text-coral",
						children: room.sendError || room.linkError || formError
					}) : null,
					uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-2 text-sm font-bold text-grass",
						children: [
							"上傳中 ",
							progress,
							"%"
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: uploading,
								onClick: () => attachment.current?.click(),
								className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-ink disabled:opacity-50",
								"aria-label": "上傳圖片或檔案",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: attachment,
								type: "file",
								className: "sr-only",
								onChange: (event) => {
									const file = event.target.files?.[0];
									event.target.value = "";
									if (!file || !room.token) return;
									if (file.size <= 0) {
										setFormError("檔案是空的。");
										return;
									}
									if (file.size > 1073741824) {
										setFormError("檔案不可超過 1GB。");
										return;
									}
									const roomId = room.roomId;
									const total = Math.max(1, Math.ceil(file.size / CHAT_FILE_CHUNK));
									setUploading(true);
									setProgress(0);
									setFormError("");
									(async () => {
										let uploadId = "";
										try {
											for (let index = 0; index < total; index += 1) {
												const data = await (await fetch("/api/chat-file", {
													method: "POST",
													headers: {
														"x-chat-token": room.token ?? "",
														"x-room-id": roomId,
														"x-file-name": encodeURIComponent(file.name),
														"x-file-mime": file.type || "application/octet-stream",
														"x-file-size": String(file.size),
														"x-upload-id": uploadId,
														"x-chunk-index": String(index),
														"x-chunk-total": String(total)
													},
													body: file.slice(index * CHAT_FILE_CHUNK, (index + 1) * CHAT_FILE_CHUNK)
												})).json();
												if (!data.ok || !data.uploadId) {
													setFormError(data.error || "上傳失敗，請再試一次。");
													return;
												}
												uploadId = data.uploadId;
												setProgress(Math.round((index + 1) / total * 100));
												if (data.message) {
													room.take(roomId, data.message);
													stick.current = true;
												}
											}
										} catch {
											setFormError("上傳中斷，請再試一次。");
										} finally {
											setUploading(false);
										}
									})();
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: box,
								value: draft,
								maxLength: 80,
								placeholder: "同同學講句話",
								onChange: (event) => setDraft(event.target.value),
								className: "h-11 min-w-0 flex-1 rounded-2xl border-2 border-ink bg-cream px-3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: room.sending || !draft.trim(),
								className: "flex h-11 shrink-0 items-center gap-1 rounded-2xl bg-grass px-3 text-sm font-bold text-paper disabled:opacity-50",
								"aria-label": "送出",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
							})
						]
					})
				]
			})
		] })] })]
	});
}
function ChatBody({ body, mine }) {
	const invite = body.match(/^\[\[tug:([A-Za-z0-9]{4,8})\]\]\s*(.*)$/);
	if (invite) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl px-3 py-2 text-sm leading-snug " + (mine ? "bg-grass text-paper" : "bg-cream text-ink"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: invite[2] || "你被邀請加入拔河" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/race",
			search: { room: invite[1] ?? "" },
			className: "mt-2 inline-flex h-9 items-center rounded-xl bg-coral px-3 text-sm font-bold text-paper",
			children: "進入房間"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-2xl px-3 py-2 text-sm leading-snug " + (mine ? "bg-grass text-paper" : "bg-cream text-ink"),
		children: body
	});
}
function FileBubble({ file, token, mine }) {
	const href = `/api/chat-file/${file.id}?token=${encodeURIComponent(token ?? "")}`;
	if (file.mime.startsWith("image/") && !file.mime.includes("svg") && file.size <= 41943040) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: "block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: href,
			alt: file.name,
			referrerPolicy: "no-referrer",
			className: "max-h-48 max-w-full rounded-2xl border border-line object-cover"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		download: file.name,
		referrerPolicy: "no-referrer",
		className: "block rounded-2xl px-3 py-2 text-sm font-bold underline " + (mine ? "bg-grass text-paper" : "bg-cream text-ink"),
		children: [file.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-xs font-normal no-underline",
			children: formatBytes(file.size)
		})]
	});
}
function shrinkAvatar(file) {
	return new Promise((resolve) => {
		const url = URL.createObjectURL(file);
		const image = new Image();
		image.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = 72;
			canvas.height = 72;
			const pen = canvas.getContext("2d");
			if (!pen) {
				URL.revokeObjectURL(url);
				resolve(null);
				return;
			}
			const scale = Math.max(72 / image.width, 72 / image.height);
			const width = image.width * scale;
			const height = image.height * scale;
			pen.drawImage(image, (72 - width) / 2, (72 - height) / 2, width, height);
			URL.revokeObjectURL(url);
			const src = canvas.toDataURL("image/jpeg", .72);
			resolve(src.length > 6e4 ? null : src);
		};
		image.onerror = () => {
			URL.revokeObjectURL(url);
			resolve(null);
		};
		image.src = url;
	});
}
function shown(holds, routing) {
	return holds > 0 || routing;
}
var useNavLoading = create((set) => ({
	visible: false,
	holds: 0,
	routing: false,
	setRouting: (routing) => set((state) => ({
		routing,
		visible: shown(state.holds, routing)
	})),
	hold: () => set((state) => ({
		holds: state.holds + 1,
		visible: true
	})),
	release: () => set((state) => {
		const holds = Math.max(0, state.holds - 1);
		return {
			holds,
			visible: shown(holds, state.routing)
		};
	})
}));
function holdNav() {
	useNavLoading.getState().hold();
}
function releaseNav() {
	useNavLoading.getState().release();
}
function finishNav() {
	const state = useNavLoading.getState();
	if (state.holds > 0) state.release();
	state.setRouting(false);
}
var bypass = false;
function samePlace(anchor) {
	const url = new URL(anchor.href, window.location.href);
	return url.origin === window.location.origin && url.pathname === window.location.pathname && url.search === window.location.search && url.hash === window.location.hash;
}
function internalLink(anchor) {
	if (anchor.target && anchor.target !== "_self") return false;
	if (anchor.hasAttribute("download")) return false;
	const href = anchor.getAttribute("href");
	if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
	try {
		return new URL(anchor.href, window.location.href).origin === window.location.origin && !samePlace(anchor);
	} catch {
		return false;
	}
}
function NavLoading() {
	const router = useRouter();
	const visible = useNavLoading((state) => state.visible);
	(0, import_react.useEffect)(() => {
		return router.subscribe("onResolved", () => {
			useNavLoading.getState().setRouting(false);
		});
	}, [router]);
	(0, import_react.useEffect)(() => {
		const onClick = (event) => {
			if (bypass || event.defaultPrevented || event.button !== 0) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			const target = event.target;
			if (!(target instanceof Element)) return;
			const anchor = target.closest("a");
			const button = target.closest("button");
			const goLink = anchor instanceof HTMLAnchorElement && internalLink(anchor);
			const goButton = button instanceof HTMLButtonElement && !button.disabled && button.hasAttribute("data-nav");
			const el = goLink ? anchor : goButton ? button : null;
			if (!el) return;
			event.preventDefault();
			event.stopPropagation();
			useNavLoading.getState().setRouting(true);
			window.setTimeout(() => {
				const holdsBefore = useNavLoading.getState().holds;
				bypass = true;
				el.click();
				bypass = false;
				if (goLink) return;
				window.requestAnimationFrame(() => {
					window.requestAnimationFrame(() => {
						if (useNavLoading.getState().holds === holdsBefore) useNavLoading.getState().setRouting(false);
					});
				});
			}, 32);
		};
		document.addEventListener("click", onClick, true);
		return () => document.removeEventListener("click", onClick, true);
	}, []);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-center justify-center bg-[#f3eee4]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-3xl font-bold text-ink",
			children: "加載中"
		})
	});
}
var styles_default = "/assets/styles-CmKY5F9D.css";
var APP_NAME = "遊樂數學場";
var Route$16 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#1C7A4A"
			},
			{
				name: "description",
				content: "六年級數學遊樂場，對齊教育局小學數學課程闡釋（第二學習階段）。"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=ZCOOL+KuaiLe&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh-Hant",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClassChatProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLoading, {})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$13 = () => import("./routes-C9dkM14t.mjs");
var Route$15 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "遊樂數學場 · 六年級" }] })
});
var $$splitComponentImporter$12 = () => import("./buzz-Do9RDP0l.mjs");
var Route$14 = createFileRoute("/buzz")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [{ title: "搶答 · 遊樂數學場" }] })
});
var $$splitComponentImporter$11 = () => import("./chat-B4TVlAbZ.mjs");
var Route$13 = createFileRoute("/chat")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "聊天室 · 遊樂數學場" }] })
});
var $$splitComponentImporter$10 = () => import("./exam-B3auLdmy.mjs");
var Route$12 = createFileRoute("/exam")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "試卷 · 遊樂數學場" }] })
});
var $$splitComponentImporter$9 = () => import("./login-BfIW693u.mjs");
var Route$11 = createFileRoute("/login")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "登入 · 遊樂數學場" }] })
});
var $$splitComponentImporter$8 = () => import("./pets-CDgak7vg.mjs");
var Route$10 = createFileRoute("/pets")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "寵物 · 遊樂數學場" }] })
});
var $$splitComponentImporter$7 = () => import("./plan-CI9qjjyR.mjs");
var Route$9 = createFileRoute("/plan")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "備試 · 遊樂數學場" }] })
});
var $$splitComponentImporter$6 = () => import("./practice-4upNTo2g.mjs");
var Route$8 = createFileRoute("/practice")({
	validateSearch: (search) => ({ topic: typeof search.topic === "string" && UNITS.some((unit) => unit.id === search.topic) ? search.topic : "all" }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "練習 · 遊樂數學場" }] })
});
var $$splitComponentImporter$5 = () => import("./profile-CIqG6zDy.mjs");
var Route$7 = createFileRoute("/profile")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "個人資料 · 遊樂數學場" }] })
});
var $$splitComponentImporter$4 = () => import("./race-CzUP-Pub.mjs");
var Route$6 = createFileRoute("/race")({
	validateSearch: (search) => ({ room: typeof search.room === "string" ? search.room.replace(/[^A-Za-z0-9]/g, "").slice(0, 8) : "" }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "對戰 · 遊樂數學場" }] })
});
var $$splitComponentImporter$3 = () => import("./review-B3Mz4XYd.mjs");
var Route$5 = createFileRoute("/review")({
	validateSearch: (search) => ({ topic: typeof search.topic === "string" && UNITS.some((unit) => unit.id === search.topic) ? search.topic : UNITS[0]?.id ?? "" }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "重溫 · 遊樂數學場" }] })
});
var $$splitComponentImporter$2 = () => import("./teacher-DytbDAgA.mjs");
var Route$4 = createFileRoute("/teacher")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "老師後台 · 遊樂數學場" }] })
});
var $$splitComponentImporter$1 = () => import("./tutor-C-Gijfie.mjs");
var Route$3 = createFileRoute("/tutor")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "導師 · 遊樂數學場" }] })
});
var Route$2 = createFileRoute("/api/chat-file")({ server: { handlers: { POST: async ({ request }) => {
	const header = (name) => request.headers.get(name) ?? "";
	const token = header("x-chat-token");
	const roomId = header("x-room-id") || "hall";
	const size = Number(header("x-file-size"));
	const index = Number(header("x-chunk-index"));
	const total = Number(header("x-chunk-total"));
	const name = cleanFileName(decodeURIComponent(header("x-file-name") || "檔案"));
	const mime = (header("x-file-mime") || "application/octet-stream").slice(0, 80);
	const { accountForChat } = await import("./chat.server-ClhhNbD1.mjs");
	const account = await accountForChat(token, roomId);
	if (!account) return Response.json({
		ok: false,
		error: "請再進入一次。"
	}, { status: 401 });
	const bytes = Buffer.from(await request.arrayBuffer());
	const saved = await appendChatChunk({
		uploadId: header("x-upload-id"),
		account,
		roomId,
		name,
		mime,
		size,
		index,
		total,
		bytes
	});
	if (!saved.ok) return Response.json(saved, { status: 400 });
	if (!saved.done) return Response.json({
		ok: true,
		uploadId: saved.uploadId
	});
	if (saved.published) {
		await /* @__PURE__ */ sealUpload(saved.uploadId);
		return Response.json({
			ok: true,
			uploadId: saved.uploadId,
			message: saved.published
		});
	}
	const { publishFileMessage } = await import("./chat.server-ClhhNbD1.mjs");
	const published = await publishFileMessage(token, roomId, {
		id: saved.uploadId,
		name,
		mime,
		size
	});
	if (!published.ok) return Response.json(published, { status: 400 });
	await rememberPublished(saved.uploadId, published.message);
	return Response.json({
		ok: true,
		uploadId: saved.uploadId,
		message: published.message
	});
} } } });
var $$splitComponentImporter = () => import("./ride._id-Deor2y6z.mjs");
var Route$1 = createFileRoute("/ride/$id")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ params }) => {
		const unit = getUnit(params.id);
		return { meta: [{ title: unit ? `${unit.ride} · 遊樂數學場` : "遊樂數學場" }] };
	}
});
var RASTER = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp",
	"image/bmp",
	"image/avif"
]);
var Route = createFileRoute("/api/chat-file/$id")({ server: { handlers: { GET: async ({ request, params }) => {
	const token = new URL(request.url).searchParams.get("token") ?? "";
	const { openChatFile } = await import("./chat.server-ClhhNbD1.mjs");
	const opened = await openChatFile(token, params.id);
	if (!opened.ok) return new Response(opened.error, { status: opened.error === "expired" ? 401 : 404 });
	const size = await storedFileSize(params.id);
	const stream = await streamStoredFile(params.id);
	if (size == null || !stream) return new Response("找不到檔案。", { status: 404 });
	const raster = RASTER.has(opened.mime);
	const ascii = opened.name.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
	return new Response(stream, { headers: {
		"content-type": raster ? opened.mime : "application/octet-stream",
		"content-length": String(size),
		"content-disposition": `${raster ? "inline" : "attachment"}; filename="${ascii || "file"}"; filename*=UTF-8''${encodeURIComponent(opened.name)}`,
		"x-content-type-options": "nosniff",
		"cache-control": "private, max-age=3600"
	} });
} } } });
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var BuzzRoute = Route$14.update({
	id: "/buzz",
	path: "/buzz",
	getParentRoute: () => Route$16
});
var ChatRoute = Route$13.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => Route$16
});
var ExamRoute = Route$12.update({
	id: "/exam",
	path: "/exam",
	getParentRoute: () => Route$16
});
var LoginRoute = Route$11.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$16
});
var PetsRoute = Route$10.update({
	id: "/pets",
	path: "/pets",
	getParentRoute: () => Route$16
});
var PlanRoute = Route$9.update({
	id: "/plan",
	path: "/plan",
	getParentRoute: () => Route$16
});
var PracticeRoute = Route$8.update({
	id: "/practice",
	path: "/practice",
	getParentRoute: () => Route$16
});
var ProfileRoute = Route$7.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$16
});
var RaceRoute = Route$6.update({
	id: "/race",
	path: "/race",
	getParentRoute: () => Route$16
});
var ReviewRoute = Route$5.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => Route$16
});
var TeacherRoute = Route$4.update({
	id: "/teacher",
	path: "/teacher",
	getParentRoute: () => Route$16
});
var TutorRoute = Route$3.update({
	id: "/tutor",
	path: "/tutor",
	getParentRoute: () => Route$16
});
var ApiChatFileRoute = Route$2.update({
	id: "/api/chat-file",
	path: "/api/chat-file",
	getParentRoute: () => Route$16
});
var RideIdRoute = Route$1.update({
	id: "/ride/$id",
	path: "/ride/$id",
	getParentRoute: () => Route$16
});
var ApiChatFileRouteChildren = { ApiChatFileIdRoute: Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ApiChatFileRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	BuzzRoute,
	ChatRoute,
	ExamRoute,
	LoginRoute,
	PetsRoute,
	PlanRoute,
	PracticeRoute,
	ProfileRoute,
	RaceRoute,
	ReviewRoute,
	TeacherRoute,
	TutorRoute,
	ApiChatFileRoute: ApiChatFileRoute._addFileChildren(ApiChatFileRouteChildren),
	RideIdRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { builtinChoices as _, Route$8 as a, releaseNav as c, useClassChat as d, usePark as f, AvatarFace as g, createSsrRpc as h, Route$6 as i, ParkChat as l, signInStudent as m, Route$1 as n, finishNav as o, changePassword as p, Route$5 as r, holdNav as s, router_exports as t, shrinkAvatar as u, choiceFor as v };
