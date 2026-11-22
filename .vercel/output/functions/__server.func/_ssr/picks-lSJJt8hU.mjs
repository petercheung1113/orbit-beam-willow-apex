import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as UNITS } from "./units-9gg8Qwt9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/picks-lSJJt8hU.js
var import_jsx_runtime = require_jsx_runtime();
var STRANDS = [
	"數",
	"代數",
	"度量",
	"圖形與空間",
	"數據處理"
];
function chipClass(on) {
	return on ? "h-11 rounded-full bg-grass px-3 text-sm font-bold text-paper" : "h-11 rounded-full border-2 border-ink bg-paper px-3 text-sm font-bold text-ink";
}
function UnitPicks({ selected, onToggle, onAll }) {
	const allOn = selected.length === UNITS.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: chipClass(allOn),
		onClick: onAll,
		children: "全部課題"
	}), STRANDS.map((strand) => {
		const items = UNITS.filter((unit) => unit.strand === strand);
		if (items.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-muted",
				children: strand
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: items.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: chipClass(selected.includes(unit.id)),
					onClick: () => onToggle(unit.id),
					children: unit.name
				}, unit.id))
			})]
		}, strand);
	})] });
}
function PageIntro({ kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-bold text-coral",
			children: kicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl text-ink",
			children: title
		}),
		children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 max-w-2xl text-muted",
			children
		})
	] });
}
//#endregion
export { UnitPicks as n, chipClass as r, PageIntro as t };
