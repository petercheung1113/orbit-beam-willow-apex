import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as UNITS } from "./units-9gg8Qwt9.mjs";
import { f as usePark } from "./router-VNKMmnlx.mjs";
import { t as FigureView } from "./FigureView-D1buCP24.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
import { a as examShow, i as examRight, n as EXAM_UNIT_IDS, o as findPaper, t as EXAM_PAPERS } from "./exam-papers-C2c2V6pq.mjs";
import { t as studentStamp } from "./student-iJdruc8c.mjs";
import { t as recordPractice } from "./teacher.functions-Scv-njag.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exam-B3auLdmy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LIVE_KEY = "playground-exam-v2";
function readLive() {
	if (typeof sessionStorage === "undefined") return null;
	try {
		const parsed = JSON.parse(sessionStorage.getItem(LIVE_KEY) ?? "");
		if (!parsed || parsed.minutes !== 20 && parsed.minutes !== 60) return null;
		if (!findPaper(parsed.unitId, parsed.minutes)) return null;
		return parsed;
	} catch {
		return null;
	}
}
function writeLive(live) {
	if (live) sessionStorage.setItem(LIVE_KEY, JSON.stringify(live));
	else sessionStorage.removeItem(LIVE_KEY);
}
function formatLeft(ms) {
	const total = Math.max(0, Math.ceil(ms / 1e3));
	return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
function rowsOf(live) {
	const paper = findPaper(live.unitId, live.minutes);
	if (!paper) return [];
	return paper.items.map((item, index) => ({
		id: `${live.unitId}-${live.minutes}-${index}`,
		item
	}));
}
function ExamPage() {
	const addResult = usePark((s) => s.addResult);
	const [picked, setPicked] = (0, import_react.useState)(EXAM_UNIT_IDS[0]);
	const [live, setLive] = (0, import_react.useState)(null);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [confirming, setConfirming] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [recorded, setRecorded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const saved = readLive();
		if (saved) setLive(saved);
		setReady(true);
	}, []);
	const paperRows = (0, import_react.useMemo)(() => live ? rowsOf(live) : [], [live]);
	const limit = (live?.minutes ?? 20) * 60 * 1e3;
	const left = live ? limit - (now - live.startedAt) : limit;
	const expired = Boolean(live && !live.submitted && left <= 0);
	(0, import_react.useEffect)(() => {
		if (!live || live.submitted) return;
		const id = window.setInterval(() => setNow(Date.now()), 250);
		return () => window.clearInterval(id);
	}, [live]);
	(0, import_react.useEffect)(() => {
		if (!expired || !live || live.submitted) return;
		const next = {
			...live,
			submitted: true,
			endedAt: Date.now()
		};
		writeLive(next);
		setLive(next);
		setConfirming(false);
	}, [expired, live]);
	const patch = (next) => {
		writeLive(next);
		setLive(next);
	};
	const marked = (0, import_react.useMemo)(() => {
		if (!live?.submitted) return [];
		return paperRows.map((row) => {
			const pickedAnswer = live.answers[row.id] ?? "";
			return {
				...row,
				picked: pickedAnswer,
				correct: examRight(row.item, pickedAnswer)
			};
		});
	}, [live, paperRows]);
	(0, import_react.useEffect)(() => {
		if (!live?.submitted || recorded || marked.length === 0) return;
		const sheet = findPaper(live.unitId, live.minutes);
		if (!sheet) return;
		setRecorded(true);
		const earned = marked.reduce((sum, row) => sum + (row.correct ? row.item.points : 0), 0);
		addResult(marked.map((row) => ({
			unitId: row.item.topic ?? live.unitId,
			correct: row.correct
		})));
		const ended = live.endedAt ?? Date.now();
		const stamp = studentStamp();
		recordPractice({ data: {
			...stamp,
			mode: "mock",
			correct: earned,
			total: sheet.total,
			seconds: Math.max(0, Math.round((ended - live.startedAt) / 1e3)),
			topics: `${sheet.name} · ${sheet.minutes}分鐘`,
			breakdown: JSON.stringify([{
				name: UNITS.find((unit) => unit.id === live.unitId)?.name ?? sheet.name,
				correct: earned,
				total: sheet.total
			}])
		} });
	}, [
		addResult,
		live,
		marked,
		recorded
	]);
	const start = (minutes, unitId = picked) => {
		const next = {
			unitId,
			minutes,
			startedAt: Date.now(),
			index: 0,
			answers: {},
			submitted: false
		};
		setRecorded(false);
		patch(next);
		setNow(Date.now());
		setConfirming(false);
	};
	const reset = () => {
		writeLive(null);
		setLive(null);
		setConfirming(false);
		setRecorded(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-8",
		children: [
			!ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "正在準備試卷…"
			}),
			ready && !live && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Setup, {
				picked,
				onPick: setPicked,
				onStart: start,
				onMixed: () => start(60, "ALL")
			}),
			ready && live && !live.submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				live,
				rows: paperRows,
				left,
				confirming,
				onJump: (index) => patch({
					...live,
					index
				}),
				onAnswer: (id, value) => patch({
					...live,
					answers: {
						...live.answers,
						[id]: value
					}
				}),
				onConfirm: () => setConfirming(true),
				onCancel: () => setConfirming(false),
				onSubmit: () => patch({
					...live,
					submitted: true,
					endedAt: Date.now()
				}),
				onAbandon: reset
			}),
			ready && live?.submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {
				live,
				rows: marked,
				onAgain: () => start(live.minutes, live.unitId),
				onReset: reset
			})
		]
	}) });
}
function Setup({ picked, onPick, onStart, onMixed }) {
	const units = EXAM_UNIT_IDS.map((id) => EXAM_PAPERS.find((paper) => paper.unitId === id && paper.minutes === 60));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-bold text-coral",
			children: "模擬試卷 · 交卷先對答案"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl text-ink",
			children: "揀課題開卷"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"data-nav": true,
			className: "mt-4 w-full rounded-3xl border-2 border-ink bg-coral p-4 text-left text-paper",
			onClick: onMixed,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold",
					children: "全科"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-2xl font-bold",
					children: "60 分鐘綜合模擬考試"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-paper/90",
					children: "100 分 · 15 個課題 · 選擇 15 題、填充 10 題、應用 5 題"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-muted",
			children: "或揀一個課題：20 分鐘 50 分，60 分鐘 100 分。題目次序跟該課題試卷。"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: units.map((paper) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onPick(paper.unitId),
				className: "h-11 rounded-full px-3 text-sm font-bold " + (picked === paper.unitId ? "bg-grass text-paper" : "border-2 border-ink bg-paper text-ink"),
				children: paper.name
			}, paper.unitId))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-nav": true,
				className: "rounded-3xl border-2 border-ink bg-paper p-4 text-left",
				onClick: () => onStart(20),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-coral",
						children: "短卷"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-2xl font-bold",
						children: "20 分鐘 · 50 分"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "選擇 6 題、填充 6 題、應用 2 題"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-nav": true,
				className: "rounded-3xl border-2 border-ink bg-ink p-4 text-left text-paper",
				onClick: () => onStart(60),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-sun",
						children: "長卷"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-2xl font-bold",
						children: "60 分鐘 · 100 分"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-paper/80",
						children: "選擇 10 題、填充 10 題、應用 5 題"
					})
				]
			})]
		})
	] });
}
function Paper({ live, rows, left, confirming, onJump, onAnswer, onConfirm, onCancel, onSubmit, onAbandon }) {
	const sheet = findPaper(live.unitId, live.minutes);
	const row = rows[live.index];
	const answered = rows.filter((item) => live.answers[item.id]?.trim()).length;
	if (!row || !sheet) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "試卷還在整理，請再選一次課題。" });
	const q = row.item;
	const wide = q.kind === "text" && q.points >= 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 border-ink bg-paper p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-bold text-muted",
					children: [
						sheet.name,
						" · ",
						sheet.minutes,
						" 分鐘 · ",
						sheet.total,
						" 分"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: left < 3e5 ? "text-4xl tabular-nums text-coral" : "text-4xl tabular-nums text-ink",
					children: formatLeft(left)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold",
						children: [
							"已答 ",
							answered,
							" / ",
							rows.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-1 text-xs font-bold text-muted underline",
						onClick: onAbandon,
						children: "放棄重選"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-1.5 sm:grid-cols-10",
				children: rows.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onJump(index),
					className: "h-9 rounded-lg border-2 border-ink text-sm font-bold " + (index === live.index ? "bg-ink text-paper" : live.answers[item.id]?.trim() ? "bg-grass text-paper" : "bg-paper"),
					children: index + 1
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-3xl border-2 border-ink bg-paper p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold text-grass",
						children: [
							"第 ",
							live.index + 1,
							" 題 · ",
							q.points,
							" 分"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-sans text-xl font-bold leading-relaxed",
						children: q.stem
					}),
					q.figure && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureView, { figure: q.figure }),
					q.kind === "choice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3",
						children: q.choices.map((choice, choiceIndex) => {
							const on = live.answers[row.id] === String(choiceIndex);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onAnswer(row.id, String(choiceIndex)),
								className: "flex min-h-14 items-center gap-3 rounded-2xl border-2 border-ink px-4 py-3 text-left text-lg font-bold " + (on ? "bg-grass text-paper" : "bg-cream"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-8 shrink-0 place-items-center rounded-full text-sm " + (on ? "bg-paper text-ink" : "border-2 border-ink"),
									children: String.fromCharCode(65 + choiceIndex)
								}), choice]
							}, choice);
						})
					}) : wide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: live.answers[row.id] ?? "",
						onChange: (event) => onAnswer(row.id, event.target.value),
						rows: 4,
						"aria-label": "答案",
						placeholder: "寫下答案，應用題可列出主要步驟",
						className: "mt-4 w-full rounded-2xl border-2 border-ink bg-cream px-3 py-2 font-bold"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-4 flex items-center gap-2 font-bold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: q.kind === "number" ? "decimal" : "text",
							value: live.answers[row.id] ?? "",
							onChange: (event) => onAnswer(row.id, event.target.value),
							className: "h-12 w-48 rounded-2xl border-2 border-ink bg-cream px-3",
							"aria-label": "答案"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 rounded-2xl border-2 border-ink px-4 font-bold",
						disabled: live.index === 0,
						onClick: () => onJump(live.index - 1),
						children: "上一題"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 rounded-2xl border-2 border-ink px-4 font-bold",
						disabled: live.index >= rows.length - 1,
						onClick: () => onJump(live.index + 1),
						children: "下一題"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 rounded-2xl bg-ink px-4 font-bold text-paper",
						onClick: onConfirm,
						children: "交卷"
					})
				]
			}),
			confirming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border-2 border-ink bg-paper p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-bold",
					children: answered < rows.length ? `還有 ${rows.length - answered} 題未答，未答不給分。確定交卷？` : "確定交卷？交卷後才看答案。"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 rounded-2xl bg-coral px-4 font-bold text-paper",
						onClick: onSubmit,
						children: "確定交卷"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 rounded-2xl border-2 border-ink px-4 font-bold",
						onClick: onCancel,
						children: "返回作答"
					})]
				})]
			})
		]
	});
}
function Result({ live, rows, onAgain, onReset }) {
	const sheet = findPaper(live.unitId, live.minutes);
	const earned = rows.reduce((sum, row) => sum + (row.correct ? row.item.points : 0), 0);
	const total = sheet?.total ?? rows.reduce((sum, row) => sum + row.item.points, 0);
	const used = Math.min(live.minutes * 60 * 1e3, Math.max(0, (live.endedAt ?? Date.now()) - live.startedAt));
	const seconds = Math.round(used / 1e3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm font-bold text-coral",
			children: ["考試完畢 · ", sheet?.name]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-5xl tabular-nums text-ink",
			children: [
				earned,
				" / ",
				total
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-lg",
			children: [
				"答對 ",
				rows.filter((row) => row.correct).length,
				" / ",
				rows.length,
				" 題，用了 ",
				Math.floor(seconds / 60),
				" 分 ",
				seconds % 60,
				" 秒。"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-12 rounded-2xl bg-grass px-4 font-bold text-paper",
					onClick: onAgain,
					children: "再做一次"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-12 rounded-2xl border-2 border-ink px-4 font-bold",
					onClick: onReset,
					children: "改選課題"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/review",
					search: { topic: live.unitId === "ALL" ? "6N1" : live.unitId },
					className: "inline-flex h-12 items-center rounded-2xl border-2 border-ink px-4 font-bold",
					children: "去重溫"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 space-y-3",
			children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-3xl border-2 border-ink bg-paper p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-bold text-muted",
						children: [
							"第 ",
							index + 1,
							" 題 · ",
							row.item.points,
							" 分 · ",
							row.correct ? "答對" : row.picked.trim() ? "要再看" : "未作答"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-bold",
						children: row.item.stem
					}),
					row.item.figure && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureView, { figure: row.item.figure }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: row.item.why
					}),
					!row.correct && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: ["參考答案：", examShow(row.item)]
					})
				]
			}, row.id))
		})
	] });
}
//#endregion
export { ExamPage as component };
