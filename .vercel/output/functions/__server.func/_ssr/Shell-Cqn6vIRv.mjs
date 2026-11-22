import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, p as useRouterState, w as require_jsx_runtime, x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as isTeacherAccount } from "./teacher-account-BqPbmFfU.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { d as useClassChat, f as usePark } from "./router-VNKMmnlx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Shell-Cqn6vIRv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SPECIES = [
	{
		id: "kitten",
		name: "小貓",
		blurb: "奶油色小虎斑"
	},
	{
		id: "puppy",
		name: "小狗",
		blurb: "垂耳小黃狗"
	},
	{
		id: "raccoon",
		name: "小浣熊",
		blurb: "黑眼罩、環紋尾巴"
	},
	{
		id: "dino",
		name: "小恐龍",
		blurb: "薄荷綠色的小朋友"
	},
	{
		id: "bear",
		name: "小熊",
		blurb: "圓耳朵蜜糖熊"
	}
];
var WEARS = [
	{
		id: "wear-scarf",
		name: "紅領巾",
		price: 40
	},
	{
		id: "wear-cap",
		name: "黃太陽帽",
		price: 50
	},
	{
		id: "wear-bow",
		name: "藍蝴蝶結",
		price: 50
	},
	{
		id: "wear-cape",
		name: "小披風",
		price: 80
	},
	{
		id: "wear-vest",
		name: "條紋背心",
		price: 70
	}
];
var FOODS = [
	{
		id: "food-apple",
		name: "蘋果",
		price: 20,
		feed: 1
	},
	{
		id: "food-fish",
		name: "小魚乾",
		price: 24,
		feed: 1
	},
	{
		id: "food-bun",
		name: "肉包",
		price: 36,
		feed: 2
	},
	{
		id: "food-honey",
		name: "蜂蜜",
		price: 44,
		feed: 2
	},
	{
		id: "food-berry",
		name: "能量果",
		price: 50,
		feed: 3
	}
];
function speciesOf(id) {
	return SPECIES.find((item) => item.id === id) ?? null;
}
var KEY = "park-pet-v1";
function empty() {
	return {
		species: null,
		stage: 1,
		coins: 0,
		fed: 0,
		food: {},
		owned: [],
		worn: null,
		paid: []
	};
}
function speciesId(value) {
	return SPECIES.some((item) => item.id === value) ? value : null;
}
function wearId(value) {
	return WEARS.some((item) => item.id === value) ? value : null;
}
function sanitize(raw) {
	const base = empty();
	if (!raw || typeof raw !== "object") return base;
	const data = raw;
	const food = {};
	if (data.food && typeof data.food === "object") for (const item of FOODS) {
		const count = Number(data.food[item.id] ?? 0);
		if (Number.isInteger(count) && count > 0) food[item.id] = Math.min(count, 99);
	}
	const owned = Array.isArray(data.owned) ? data.owned.map(wearId).filter((id) => Boolean(id)) : [];
	const worn = wearId(data.worn);
	return {
		species: speciesId(data.species),
		stage: data.stage === 2 ? 2 : 1,
		coins: Math.max(0, Math.min(99999, Math.floor(Number(data.coins) || 0))),
		fed: Math.max(0, Math.min(999, Math.floor(Number(data.fed) || 0))),
		food,
		owned: [...new Set(owned)],
		worn: worn && owned.includes(worn) ? worn : null,
		paid: Array.isArray(data.paid) ? data.paid.filter((id) => typeof id === "string").slice(0, 80) : []
	};
}
function readAll() {
	if (typeof window === "undefined") return {};
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return {};
		const data = JSON.parse(raw);
		if (!data || typeof data !== "object") return {};
		return data;
	} catch {
		return {};
	}
}
function persist(account, save) {
	const all = readAll();
	all[account] = save;
	localStorage.setItem(KEY, JSON.stringify(all));
}
var usePet = create((set, get) => ({
	account: null,
	save: empty(),
	flash: "",
	clearFlash: () => set({ flash: "" }),
	bind: (account, stamps) => {
		if (!account) {
			set({
				account: null,
				save: empty(),
				flash: ""
			});
			return;
		}
		const save = sanitize(readAll()[account]);
		const unpaid = stamps.filter((id) => !save.paid.includes(id));
		let flash = get().account === account ? get().flash : "";
		if (unpaid.length) {
			save.paid = [...save.paid, ...unpaid];
			save.coins += unpaid.length * 40;
			persist(account, save);
			flash = unpaid.length === 1 ? `完成課題，寵物錢 +40` : `已完成 ${unpaid.length} 個課題，寵物錢 +${unpaid.length * 40}`;
		}
		set({
			account,
			save,
			flash
		});
	},
	choose: (species) => {
		const { account, save } = get();
		if (!account) return;
		const next = {
			...save,
			species
		};
		persist(account, next);
		set({
			save: next,
			flash: ""
		});
	},
	buyWear: (id) => {
		const item = WEARS.find((wear) => wear.id === id);
		const { account, save } = get();
		if (!item || !account) return "暫時買不到。";
		if (!save.species) return "先選一隻寵物。";
		if (save.owned.includes(id)) return "這件衣服已經有了。";
		if (save.coins < item.price) return "寵物錢不夠。";
		const next = {
			...save,
			coins: save.coins - item.price,
			owned: [...save.owned, id],
			worn: id
		};
		persist(account, next);
		set({
			save: next,
			flash: `穿上了${item.name}`
		});
		return "";
	},
	buyFood: (id) => {
		const item = FOODS.find((food) => food.id === id);
		const { account, save } = get();
		if (!item || !account) return "暫時買不到。";
		if (!save.species) return "先選一隻寵物。";
		if (save.coins < item.price) return "寵物錢不夠。";
		const next = {
			...save,
			coins: save.coins - item.price,
			food: {
				...save.food,
				[id]: (save.food[id] ?? 0) + 1
			}
		};
		persist(account, next);
		set({
			save: next,
			flash: `買到${item.name}`
		});
		return "";
	},
	wear: (id) => {
		const { account, save } = get();
		if (!account) return;
		const worn = id && save.owned.includes(id) ? id : null;
		const next = {
			...save,
			worn
		};
		persist(account, next);
		set({ save: next });
	},
	feed: (id) => {
		const item = FOODS.find((food) => food.id === id);
		const { account, save } = get();
		if (!item || !account || !save.species) return "先選一隻寵物。";
		const have = save.food[id] ?? 0;
		if (have < 1) return "背包裡沒有這個糧食。";
		const species = SPECIES.find((pet) => pet.id === save.species);
		const fed = save.fed + item.feed;
		const evolved = save.stage === 1 && fed >= 8;
		const next = {
			...save,
			food: {
				...save.food,
				[id]: have - 1
			},
			fed,
			stage: evolved ? 2 : save.stage
		};
		persist(account, next);
		set({
			save: next,
			flash: evolved ? `${species?.name ?? "寵物"}吃飽了，進化了！` : `${species?.name ?? "寵物"}吃了${item.name}，好好味。`
		});
		return "";
	}
}));
var NAV = [
	{
		to: "/plan",
		label: "備試"
	},
	{
		to: "/exam",
		label: "試卷"
	},
	{
		to: "/practice",
		label: "練習"
	},
	{
		to: "/review",
		label: "重溫"
	},
	{
		to: "/tutor",
		label: "導師"
	},
	{
		to: "/race",
		label: "對戰"
	},
	{
		to: "/buzz",
		label: "搶答"
	},
	{
		to: "/pets",
		label: "寵物"
	},
	{
		to: "/profile",
		label: "個人資料"
	},
	{
		to: "/chat",
		label: "聊天"
	}
];
function Brand({ heading = false }) {
	const room = useClassChat();
	const mine = room.mates.find((mate) => mate.account === room.me);
	const called = mine ? mine.name === mine.seat ? mine.seat : `${mine.name} · ${mine.seat}` : usePark.getState().nickname;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex min-h-11 shrink-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/park/mascot.jpg",
			alt: "",
			className: "size-14 rounded-full object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [heading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-sans text-[1.65rem] font-bold leading-none tracking-tight text-ink",
			children: "遊樂數學場"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-sans text-[1.65rem] font-bold leading-none tracking-tight text-ink",
			children: "遊樂數學場"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mt-1 block text-sm font-normal text-muted",
			children: [called, "的小六數學"]
		})] })]
	});
}
function SiteHeader({ heading = false }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const student = usePark((s) => s.student);
	const signOutStudent = usePark((s) => s.signOutStudent);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-line bg-cream/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { heading }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "ml-auto flex items-center gap-5 overflow-x-auto text-base font-medium text-ink sm:gap-7",
				children: [
					NAV.map((item) => {
						const on = path === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							"aria-current": on ? "page" : void 0,
							className: "shrink-0 py-2 text-ink",
							children: item.label
						}, item.to);
					}),
					isTeacherAccount(student) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/teacher",
						"aria-current": path === "/teacher" ? "page" : void 0,
						className: "shrink-0 py-2 font-bold text-coral",
						children: "老師後台"
					}) : null,
					student ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: signOutStudent,
						className: "shrink-0 py-2 text-ink",
						children: "登出"
					}) : null
				]
			})]
		})
	});
}
function PetFlash() {
	const flash = usePet((s) => s.flash);
	const clearFlash = usePet((s) => s.clearFlash);
	if (!flash) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 text-sm font-bold text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-2xl border-2 border-sun bg-paper px-3 py-2",
			children: flash
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "h-9 shrink-0 rounded-xl bg-ink px-3 text-paper",
			onClick: clearFlash,
			children: "知道了"
		})]
	});
}
function Shell({ children, heading = false }) {
	const hydrate = usePark((s) => s.hydrate);
	const ready = usePark((s) => s.ready);
	const student = usePark((s) => s.student);
	const stamps = usePark((s) => s.stamps);
	const bindPet = usePet((s) => s.bind);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		bindPet(student, stamps);
	}, [
		ready,
		student,
		stamps,
		bindPet
	]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-[#f3eee4]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-3xl font-bold text-ink",
			children: "加載中"
		})
	});
	if (!student) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "park-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { heading }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetFlash, {}),
			children
		]
	});
}
//#endregion
export { speciesOf as a, WEARS as i, SPECIES as n, usePet as o, Shell as r, FOODS as t };
