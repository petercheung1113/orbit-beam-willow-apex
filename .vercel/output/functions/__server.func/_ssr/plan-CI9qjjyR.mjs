import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CORE_UNITS } from "./units-9gg8Qwt9.mjs";
import { a as ChevronLeft, i as ChevronRight, o as Check } from "../_libs/lucide-react.mjs";
import { f as usePark } from "./router-VNKMmnlx.mjs";
import { r as chipClass } from "./picks-lSJJt8hU.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-CI9qjjyR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WEEK = [
	"日",
	"一",
	"二",
	"三",
	"四",
	"五",
	"六"
];
function parseISODate(value) {
	const [year, month, day] = value.split("-").map(Number);
	return new Date(year || 2026, (month || 1) - 1, day || 1);
}
function formatISODate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function addDays(date, days) {
	const next = new Date(date);
	next.setDate(next.getDate() + days);
	return next;
}
function todayISO() {
	return formatISODate(/* @__PURE__ */ new Date());
}
function queue(focus, coverAll) {
	const selected = focus.filter((id) => CORE_UNITS.some((unit) => unit.id === id));
	const base = coverAll || selected.length === 0 ? CORE_UNITS : CORE_UNITS.filter((unit) => selected.includes(unit.id));
	const list = [];
	for (const unit of base) {
		const boost = selected.includes(unit.id) ? 3 : 1;
		const copies = Math.max(1, Math.round(unit.hours / 8 * boost));
		for (let i = 0; i < copies; i += 1) list.push(unit.id);
	}
	return list.sort((a, b) => Number(!selected.includes(a)) - Number(!selected.includes(b)));
}
function dose(minutes) {
	if (minutes <= 15) return "做 5 題";
	if (minutes <= 30) return "先看重溫，再做 8 題";
	return "重溫重點、做 12 題，再挑 1 題問導師";
}
function targetLine(target) {
	if (target >= 90) return `目標 ${target} 分：多做混合和應用題，錯了要看解釋。`;
	if (target <= 60) return `目標 ${target} 分：先穩做每個課題的第一類題。`;
	return `目標 ${target} 分：基礎和應用都要碰到。`;
}
function buildSchedule(input) {
	const start = parseISODate(input.today);
	const exam = parseISODate(input.examDate);
	const span = Math.round((exam.getTime() - start.getTime()) / 864e5);
	if (span < 0) return [];
	const days = [];
	const push = (offset, item) => {
		const date = addDays(start, offset);
		days.push({
			...item,
			date: formatISODate(date),
			weekday: WEEK[date.getDay()] ?? ""
		});
	};
	if (span === 0) {
		push(0, {
			kind: "exam",
			title: "今天就是考試",
			detail: "早上只看一張重點，吃早餐，檢查文具。不要臨時追新課題。"
		});
		return days;
	}
	const topics = queue(input.focus, input.coverAll);
	let cursor = 0;
	for (let offset = 0; offset < span; offset += 1) {
		const daysLeft = span - offset;
		if (daysLeft === 1 && span >= 2) {
			push(offset, {
				kind: "review",
				title: "輕鬆重溫",
				detail: `用 ${input.minutes} 分鐘看錯題解釋和重點，今晚早點休息。`
			});
			continue;
		}
		if (daysLeft === 2 && span >= 4) {
			push(offset, {
				kind: "mock",
				title: "模擬小測",
				detail: "做一場限時模擬考試。做完只改錯，不追新課題。"
			});
			continue;
		}
		const topicId = topics[cursor % topics.length] ?? CORE_UNITS[0]?.id ?? "";
		cursor += 1;
		const unit = CORE_UNITS.find((item) => item.id === topicId);
		push(offset, {
			kind: "study",
			topic: topicId,
			title: unit?.name ?? "溫習",
			detail: `${dose(input.minutes)}。${unit?.learn[0] ?? ""} ${targetLine(input.target)}`
		});
	}
	push(span, {
		kind: "exam",
		title: "考試日",
		detail: "看一眼今天的重點就出發。先做會的題，不會的先跳過。"
	});
	return days;
}
function PlanPage() {
	const plan = usePark((s) => s.plan);
	const setPlan = usePark((s) => s.setPlan);
	const clearPlan = usePark((s) => s.clearPlan);
	const toggleDay = usePark((s) => s.toggleDay);
	const ready = usePark((s) => s.ready);
	const [today, setToday] = (0, import_react.useState)("");
	const [examDate, setExamDate] = (0, import_react.useState)(plan?.examDate ?? "");
	const [target, setTarget] = (0, import_react.useState)(plan?.target ?? 80);
	const [minutes, setMinutes] = (0, import_react.useState)(plan?.minutes ?? 20);
	const [focus, setFocus] = (0, import_react.useState)(plan?.focus ?? []);
	const [coverAll, setCoverAll] = (0, import_react.useState)(plan?.coverAll ?? true);
	(0, import_react.useEffect)(() => {
		const now = todayISO();
		setToday(now);
		setExamDate((current) => current || formatISODate(addDays(/* @__PURE__ */ new Date(), 7)));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready || !plan) return;
		setExamDate(plan.examDate);
		setTarget(plan.target);
		setMinutes(plan.minutes);
		setFocus(plan.focus);
		setCoverAll(plan.coverAll);
	}, [ready, plan]);
	const days = (0, import_react.useMemo)(() => {
		if (!today || !examDate) return [];
		return buildSchedule({
			today,
			examDate,
			target,
			minutes,
			focus,
			coverAll
		});
	}, [
		today,
		examDate,
		target,
		minutes,
		focus,
		coverAll
	]);
	const save = () => {
		if (!examDate) return;
		setPlan({
			examDate,
			target,
			minutes,
			focus,
			coverAll,
			done: plan?.examDate === examDate ? plan.done : {}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-5xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-coral",
				children: "考試準備"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl text-ink",
				children: "你的溫習時間表"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: "點月曆上的一天，就知道那天要溫什麼。考前會有模擬小測和輕鬆重溫。"
			}),
			days.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendar, {
				days,
				today,
				saved: Boolean(plan),
				done: plan?.done ?? {},
				onToggle: toggleDay
			}),
			today && examDate && examDate < today && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-bold text-coral",
				children: "這個日子已經過了，請再選一次。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 text-2xl text-ink",
				children: "調整安排"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 space-y-5 rounded-3xl border-2 border-ink bg-paper p-4 sm:p-6",
				onSubmit: (event) => {
					event.preventDefault();
					save();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block font-bold",
						children: ["考試日期", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							required: true,
							value: examDate,
							min: today || void 0,
							onChange: (event) => setExamDate(event.target.value),
							className: "mt-2 h-12 w-full rounded-2xl border-2 border-ink bg-cream px-3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold",
							children: "目標分數"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [
								60,
								70,
								80,
								90,
								100
							].map((score) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: score === target ? chipClass(true) : chipClass(false),
								onClick: () => setTarget(score),
								children: score
							}, score))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [targetLine(target), " 練習和模擬考試都會從你選的課題抽題，題目上不會標難度。"]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block font-bold",
						children: [
							"每天大約 ",
							minutes,
							" 分鐘",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 10,
								max: 45,
								step: 5,
								value: minutes,
								onChange: (event) => setMinutes(Number(event.target.value)),
								className: "mt-3 w-full accent-grass"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: "想多溫的課題"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: CORE_UNITS.map((unit) => {
							const on = focus.includes(unit.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: on ? "h-11 rounded-full bg-coral px-3 text-sm font-bold text-paper" : chipClass(false),
								onClick: () => setFocus((prev) => on ? prev.filter((id) => id !== unit.id) : [...prev, unit.id]),
								children: unit.name
							}, unit.id);
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: coverAll,
							onChange: (event) => setCoverAll(event.target.checked),
							className: "size-5 accent-grass"
						}), "其他課題也排一點"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-12 rounded-2xl bg-grass px-5 font-bold text-paper",
							children: "生成時間表"
						}), plan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-12 px-3 font-bold text-muted",
							onClick: clearPlan,
							children: "清除"
						})]
					})
				]
			})
		]
	}) });
}
var WEEKDAYS = [
	"日",
	"一",
	"二",
	"三",
	"四",
	"五",
	"六"
];
function monthCells(year, month) {
	const lead = new Date(year, month, 1).getDay();
	const count = new Date(year, month + 1, 0).getDate();
	const cells = Array.from({ length: lead }, () => null);
	for (let day = 1; day <= count; day += 1) cells.push(formatISODate(new Date(year, month, day)));
	while (cells.length % 7) cells.push(null);
	return cells;
}
function MonthCalendar({ days, today, saved, done, onToggle }) {
	const byDate = (0, import_react.useMemo)(() => new Map(days.map((day) => [day.date, day])), [days]);
	const anchor = parseISODate(today || days[0]?.date || formatISODate(/* @__PURE__ */ new Date()));
	const [year, setYear] = (0, import_react.useState)(anchor.getFullYear());
	const [month, setMonth] = (0, import_react.useState)(anchor.getMonth());
	const [picked, setPicked] = (0, import_react.useState)(byDate.has(today) ? today : days[0]?.date ?? "");
	const cells = monthCells(year, month);
	const selected = byDate.get(picked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-3xl border-2 border-ink bg-paper p-3 sm:p-5",
			"aria-label": "溫習月曆",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-12 place-items-center rounded-2xl border-2 border-ink",
						onClick: () => shift(-1),
						"aria-label": "上個月",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-3xl text-ink",
						children: [
							year,
							"年",
							month + 1,
							"月"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-12 place-items-center rounded-2xl border-2 border-ink",
						onClick: () => shift(1),
						"aria-label": "下個月",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-7 gap-1 sm:gap-2",
				children: [WEEKDAYS.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pb-1 text-center text-sm font-bold text-muted",
					children: name
				}, name)), cells.map((date, index) => {
					if (!date) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `blank-${index}`);
					const day = byDate.get(date);
					const on = date === picked;
					const finished = Boolean(day && done[date]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPicked(date),
						className: "flex min-h-16 flex-col items-center justify-center rounded-2xl border-2 px-0.5 py-1 sm:min-h-24 " + (on ? "border-ink bg-grass text-paper" : day?.kind === "exam" ? "border-ink bg-coral text-paper" : day ? "border-ink bg-cream text-ink" : "border-line bg-paper text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5 text-xl leading-none",
							children: [Number(date.slice(8)), finished && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-3.5",
								"aria-hidden": true
							})]
						}), day && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "max-w-full truncate text-xs font-bold",
							children: day.kind === "exam" ? "考試" : day.kind === "mock" ? "小測" : day.kind === "review" ? "重溫" : day.title
						})]
					}, date);
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: "rounded-3xl border-2 border-ink bg-paper p-4 sm:p-6 lg:sticky lg:top-24",
			children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-bold text-muted",
					children: [
						selected.date,
						" · 星期",
						selected.weekday,
						selected.date === today ? " · 今天" : "",
						done[selected.date] ? " · 已完成" : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-3xl text-ink",
					children: selected.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg leading-relaxed",
					children: selected.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						selected.kind !== "exam" && saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: done[selected.date] ? chipClass(true) : "h-12 rounded-2xl border-2 border-ink px-4 font-bold",
							onClick: () => onToggle(selected.date),
							children: done[selected.date] ? "完成了" : "打卡"
						}),
						selected.topic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/review",
							search: { topic: selected.topic },
							className: "inline-flex h-12 items-center rounded-2xl bg-grass px-4 font-bold text-paper",
							children: "去重溫"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/practice",
							search: { topic: selected.topic },
							className: "inline-flex h-12 items-center rounded-2xl border-2 border-ink px-4 font-bold",
							children: "去做題"
						})] }),
						selected.kind === "mock" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/exam",
							className: "inline-flex h-12 items-center rounded-2xl border-2 border-ink px-4 font-bold",
							children: "開始模擬考試"
						})
					]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl text-ink",
				children: "這天休息"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg",
				children: "沒有溫習安排。點有課題名字的日子，就知道要溫什麼。"
			})] })
		})]
	});
	function shift(delta) {
		const next = new Date(year, month + delta, 1);
		setYear(next.getFullYear());
		setMonth(next.getMonth());
	}
}
//#endregion
export { PlanPage as component };
