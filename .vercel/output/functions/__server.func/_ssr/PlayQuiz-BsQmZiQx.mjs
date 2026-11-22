import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as FigureView } from "./FigureView-D1buCP24.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PlayQuiz-BsQmZiQx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isRight(question, picked) {
	if (!picked.trim()) return false;
	if (question.kind === "choice") return Number(picked) === question.answer;
	const value = Number(picked.trim());
	return Number.isFinite(value) && Math.abs(value - question.answer) <= (question.eps ?? .001);
}
function answerText(question) {
	if (question.kind === "choice") return question.choices[question.answer] ?? "";
	return `${question.answer}${question.suffix ? ` ${question.suffix}` : ""}`;
}
function PlayQuiz({ items, timed, onDone }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [rows, setRows] = (0, import_react.useState)([]);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const start = (0, import_react.useRef)(Date.now());
	const item = items[index];
	(0, import_react.useEffect)(() => {
		start.current = Date.now();
		setNow(Date.now());
	}, [items]);
	(0, import_react.useEffect)(() => {
		if (!timed) return;
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, [timed, items]);
	if (!item) return null;
	const question = item.question;
	const revealed = picked !== null;
	const elapsed = Math.max(0, Math.round((now - start.current) / 1e3));
	const clock = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;
	function commit(value) {
		if (picked !== null) return;
		const row = {
			item,
			picked: value,
			correct: isRight(question, value)
		};
		const next = [...rows, row];
		setRows(next);
		setPicked(value);
	}
	function next() {
		if (index + 1 >= items.length) {
			onDone(rows);
			return;
		}
		setPicked(null);
		setDraft("");
		setIndex((value) => value + 1);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-sm font-bold text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"第 ",
					index + 1,
					" / ",
					items.length,
					" 題"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: timed ? clock : "慢慢想" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 overflow-hidden rounded-full bg-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-grass",
					style: { width: `${index / items.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-3xl border-2 border-ink bg-paper p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold text-grass",
						children: [
							item.ride,
							" · ",
							item.unitName
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-sans text-xl font-bold leading-relaxed text-ink",
						children: question.stem
					}),
					question.figure && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureView, { figure: question.figure }),
					revealed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-2xl border-2 border-ink p-3 font-bold " + (isRight(question, picked ?? "") ? "bg-grass text-paper" : "bg-coral text-paper"),
						children: isRight(question, picked ?? "") ? "答對了" : `答錯了，答案是 ${answerText(question)}`
					}),
					question.kind === "choice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3",
						children: question.choices.map((choice, choiceIndex) => {
							const on = picked === String(choiceIndex);
							const showRight = revealed && choiceIndex === question.answer;
							const showWrong = revealed && on && choiceIndex !== question.answer;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => commit(String(choiceIndex)),
								className: "min-h-12 rounded-2xl border-2 border-ink px-4 py-3 text-left text-lg font-bold " + (showRight ? "bg-grass text-paper" : showWrong ? "bg-coral text-paper" : "bg-cream text-ink"),
								children: choice
							}, choice);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-wrap items-center gap-2",
						onSubmit: (event) => {
							event.preventDefault();
							if (!revealed) commit(draft);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "decimal",
								value: draft,
								disabled: revealed,
								onChange: (event) => setDraft(event.target.value),
								"aria-label": "答案",
								className: "h-12 w-36 rounded-2xl border-2 border-ink bg-cream px-3 tabular-nums"
							}),
							question.suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: question.suffix }),
							!revealed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "h-12 rounded-2xl bg-ink px-4 font-bold text-paper",
								children: "確定"
							})
						]
					}),
					revealed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-ink",
						children: question.why
					}),
					revealed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: next,
						className: "mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper",
						children: index + 1 === items.length ? "看成績" : "下一題"
					})
				]
			})
		]
	});
}
//#endregion
export { PlayQuiz as t };
