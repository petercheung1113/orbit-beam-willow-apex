import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as UNITS } from "./units-9gg8Qwt9.mjs";
import { a as Route$8, f as usePark } from "./router-VNKMmnlx.mjs";
import { t as FigureView } from "./FigureView-D1buCP24.mjs";
import { n as UnitPicks } from "./picks-lSJJt8hU.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
import { n as topicBreakdown, t as studentStamp } from "./student-iJdruc8c.mjs";
import { t as recordPractice } from "./teacher.functions-Scv-njag.mjs";
import { n as drawPractice } from "./practice-bank-GEsoUN4U.mjs";
import { t as PlayQuiz } from "./PlayQuiz-BsQmZiQx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-4upNTo2g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PracticePage() {
	const { topic } = Route$8.useSearch();
	const target = usePark((s) => s.plan?.target ?? 80);
	const addResult = usePark((s) => s.addResult);
	const [selected, setSelected] = (0, import_react.useState)(topic === "all" ? [] : [topic]);
	const [paper, setPaper] = (0, import_react.useState)(null);
	const [timed, setTimed] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [startedAt, setStartedAt] = (0, import_react.useState)(0);
	const start = (nextTimed) => {
		const ids = nextTimed ? UNITS.map((unit) => unit.id) : selected;
		const seed = Math.floor(Math.random() * 2147483647) + 1;
		setTimed(nextTimed);
		setResult(null);
		setStartedAt(Date.now());
		setPaper(drawPractice(seed, ids.length ? ids : UNITS.map((unit) => unit.id)));
	};
	const finish = (rows) => {
		setResult(rows);
		addResult(rows.map((row) => ({
			unitId: row.item.unitId,
			correct: row.correct
		})));
		const stamp = studentStamp();
		const topics = [...new Set(rows.map((row) => UNITS.find((unit) => unit.id === row.item.unitId)?.name ?? row.item.unitId))].join("、");
		recordPractice({ data: {
			...stamp,
			mode: timed ? "mock" : "practice",
			correct: rows.filter((row) => row.correct).length,
			total: rows.length,
			seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1e3)),
			topics,
			breakdown: topicBreakdown(rows.map((row) => ({
				name: UNITS.find((unit) => unit.id === row.item.unitId)?.name ?? row.item.unitId,
				correct: row.correct
			})))
		} });
	};
	const score = result ? Math.round(result.filter((row) => row.correct).length / (result.length || 1) * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-8",
		children: [
			!paper && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-grass",
					children: "練習及模擬小測"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl text-ink",
					children: "揀課題練習"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted",
					children: [
						"每個課題 100 題，分基礎、鞏固、高階，題型對齊課本和工作紙。開始後抽 15 題：基礎 5、鞏固 5、高階 5，次序隨機打散，題目上不標難度。想限時交卷才對答案，用",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/exam",
							className: "font-bold text-ink",
							children: "模擬考試"
						}),
						"。"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitPicks, {
						selected,
						onToggle: (id) => setSelected((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]),
						onAll: () => setSelected(selected.length === UNITS.length ? [] : UNITS.map((unit) => unit.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm font-bold text-ink",
					children: "每次 15 題，基礎、鞏固、高階各 5 題，次序已經打散。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-nav": true,
						className: "h-12 rounded-2xl bg-grass px-5 font-bold text-paper",
						onClick: () => start(false),
						disabled: selected.length === 0,
						children: "開始練習"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-nav": true,
						className: "h-12 rounded-2xl border-2 border-ink bg-paper px-5 font-bold",
						onClick: () => start(true),
						children: "15 題模擬小測"
					})]
				})
			] }),
			paper && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayQuiz, {
				items: paper,
				timed,
				onDone: finish
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-coral",
					children: "成績"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-5xl tabular-nums text-ink",
					children: [score, " 分"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-lg",
					children: [
						"答對 ",
						result.filter((row) => row.correct).length,
						" / ",
						result.length,
						" 題。",
						score >= target ? `達到你的目標 ${target} 分。` : `距離目標 ${target} 分還差一點，看看下面的解釋。`
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper",
					onClick: () => {
						setPaper(null);
						setResult(null);
					},
					children: "再練一組"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 space-y-3",
					children: result.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-3xl border-2 border-ink bg-paper p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-bold text-muted",
								children: [
									row.item.unitName,
									" · ",
									row.correct ? "答對" : "要再看"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-bold",
								children: row.item.question.stem
							}),
							row.item.question.figure && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureView, { figure: row.item.question.figure }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed",
								children: row.item.question.why
							})
						]
					}, row.item.id))
				})
			] })
		]
	}) });
}
//#endregion
export { PracticePage as component };
