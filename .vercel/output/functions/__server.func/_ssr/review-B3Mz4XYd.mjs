import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as UNITS } from "./units-9gg8Qwt9.mjs";
import { f as usePark, r as Route$5 } from "./router-VNKMmnlx.mjs";
import { r as chipClass } from "./picks-lSJJt8hU.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-B3Mz4XYd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReviewPage() {
	const { topic } = Route$5.useSearch();
	const mastery = usePark((s) => s.mastery);
	const [current, setCurrent] = (0, import_react.useState)(topic);
	const [talk, setTalk] = (0, import_react.useState)("");
	const unit = UNITS.find((item) => item.id === current) ?? UNITS[0];
	if (!unit) return null;
	const stat = mastery[unit.id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-grass",
				children: "課堂重溫"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl text-ink",
				children: "動手看懂"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex gap-2 overflow-x-auto pb-2",
				children: UNITS.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: chipClass(entry.id === current) + " shrink-0",
					onClick: () => {
						setCurrent(entry.id);
						setTalk("");
					},
					children: entry.name
				}, entry.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-2 overflow-hidden rounded-3xl border-2 border-ink bg-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: unit.art,
					alt: "",
					className: "h-48 w-full bg-meadow object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-4 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-bold text-muted",
							children: [
								unit.strand,
								" · ",
								unit.code,
								" · ",
								unit.ride,
								stat ? ` · 練過 ${stat.seen} 題，對了 ${stat.correct}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl text-ink",
							children: unit.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: unit.blurb }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: unit.learn.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border-l-4 border-grass pl-3",
								children: point
							}, point))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: unit.focuses.map((focus) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border-2 border-ink bg-cream p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold text-coral",
									children: "學習重點"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: focus
								})]
							}, focus))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-12 rounded-2xl bg-coral px-5 font-bold text-paper",
							onClick: () => setTalk([
								`${unit.ride}這一站要記住：`,
								...unit.learn,
								"",
								"例如：",
								unit.questions[0]?.stem ?? "",
								unit.questions[0]?.why ?? ""
							].join("\n")),
							children: "請樂樂講這課"
						}),
						talk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "whitespace-pre-wrap rounded-2xl bg-cream p-4 leading-relaxed",
							children: talk
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { ReviewPage as component };
