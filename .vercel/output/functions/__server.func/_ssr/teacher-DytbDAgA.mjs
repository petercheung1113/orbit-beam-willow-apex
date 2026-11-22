import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime, x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as isTeacherAccount } from "./teacher-account-BqPbmFfU.mjs";
import { c as releaseNav, f as usePark, s as holdNav } from "./router-VNKMmnlx.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
import { r as teacherBoard } from "./teacher.functions-Scv-njag.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher-DytbDAgA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function when(ms) {
	if (!ms) return "未做過";
	return new Intl.DateTimeFormat("zh-HK", {
		timeZone: "Asia/Hong_Kong",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(new Date(ms));
}
function rate(correct, total) {
	if (!total) return "—";
	return `${Math.round(correct / total * 100)}%`;
}
function TeacherPage() {
	const hydrate = usePark((s) => s.hydrate);
	const ready = usePark((s) => s.ready);
	const student = usePark((s) => s.student);
	const token = usePark((s) => s.chatToken);
	const [error, setError] = (0, import_react.useState)("");
	const [students, setStudents] = (0, import_react.useState)(null);
	const [picked, setPicked] = (0, import_react.useState)("");
	const holding = (0, import_react.useRef)(false);
	if (ready && isTeacherAccount(student) && token && students === null && !holding.current) {
		holding.current = true;
		holdNav();
	}
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (!ready || !isTeacherAccount(student) || !token) return;
		let live = true;
		teacherBoard({ data: { token } }).then((result) => {
			if (!live) return;
			if (!result.ok) {
				setError(result.error);
				setStudents([]);
			} else {
				setStudents(result.students);
				setPicked(result.students[0]?.studentId ?? "");
			}
			if (holding.current) {
				holding.current = false;
				releaseNav();
			}
		}).catch(() => {
			if (!live || !holding.current) return;
			holding.current = false;
			releaseNav();
			setError("暫時打不開紀錄");
			setStudents([]);
		});
		return () => {
			live = false;
		};
	}, [
		ready,
		student,
		token
	]);
	const current = students?.find((item) => item.studentId === picked) ?? students?.[0];
	const totals = (0, import_react.useMemo)(() => {
		return (students ?? []).reduce((sum, item) => ({
			sessions: sum.sessions + item.sessions,
			correct: sum.correct + item.correct,
			total: sum.total + item.total,
			chats: sum.chats + item.tutorCount
		}), {
			sessions: 0,
			correct: 0,
			total: 0,
			chats: 0
		});
	}, [students]);
	if (ready && !student) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	if (ready && !isTeacherAccount(student)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-md px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl text-ink",
			children: "老師後台"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "這頁只給 6D 老師。請先登出，再用老師帳號登入。"
		})]
	}) });
	if (ready && !token) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-md px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl text-ink",
			children: "老師後台"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "登入時未能連接紀錄。請登出，再用老師帳號登入一次。"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-5xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-coral",
				children: "6D 老師"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl text-ink",
				children: "老師後台"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: "每個學生幾時做練習、答對率、有沒有問過導師，以及較弱的課題。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/buzz",
				className: "mt-4 inline-flex h-12 items-center rounded-2xl bg-coral px-4 font-bold text-paper",
				children: "開搶答比賽"
			}),
			students === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-bold",
				children: "正在打開…"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-bold text-coral",
				children: error
			}) : null,
			students && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "全班學生",
						value: String(students.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "練習次數",
						value: String(totals.sessions)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "全班答對率",
						value: rate(totals.correct, totals.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "問導師次數",
						value: String(totals.chats)
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 lg:grid-cols-[18rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-[70dvh] space-y-2 overflow-auto",
					children: students.map((item) => {
						const on = item.studentId === current?.studentId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: on ? "w-full rounded-2xl bg-ink p-3 text-left text-paper" : "w-full rounded-2xl border border-line bg-paper p-3 text-left",
							onClick: () => setPicked(item.studentId),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xl",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: on ? "text-xs" : "text-xs text-muted",
								children: [
									when(item.lastAt),
									" · 答對 ",
									rate(item.correct, item.total),
									" · ",
									item.tutorCount ? `問過 ${item.tutorCount} 次` : "未問導師"
								]
							})]
						}) }, item.studentId);
					})
				}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentDetail, { student: current }) : null]
			})] })
		]
	}) });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-line bg-paper p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-bold text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-3xl text-ink",
			children: value
		})]
	});
}
function StudentDetail({ student }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl border border-line bg-paper p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl",
						children: student.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"練習 ",
							student.sessions,
							" 次 · 答對 ",
							student.correct,
							"/",
							student.total || 0,
							"（",
							rate(student.correct, student.total),
							"） · ",
							student.tutorCount ? `問過導師 ${student.tutorCount} 次` : "未問過導師"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-lg",
						children: "較弱課題"
					}),
					student.weak.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: student.sessions ? "暫時未見明顯較弱課題。" : "未有練習紀錄，未能分析。"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-2",
						children: student.weak.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border-2 border-ink px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [item.total ? `答對率 ${rate(item.correct, item.total)}（${item.correct}/${item.total}）` : "未做這個課題的練習", item.tutor ? ` · 問過導師 ${item.tutor} 次` : ""]
							})]
						}, item.name))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl border border-line bg-paper p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "練習時間"
				}), student.practices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3",
					children: "未做過練習。"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: student.practices.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border-2 border-ink px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-bold",
							children: [
								when(item.at),
								" · ",
								item.mode === "mock" ? "模擬試卷" : "課題練習",
								" · ",
								item.correct,
								"/",
								item.total,
								"（",
								rate(item.correct, item.total),
								"）"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								"用了 ",
								item.seconds,
								" 秒",
								item.topics ? ` · ${item.topics}` : ""
							]
						})]
					}, `${item.at}-${index}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl border border-line bg-paper p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "問導師"
				}), student.chats.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3",
					children: "未問過導師。"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: student.chats.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border-2 border-ink p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-bold text-muted",
								children: [
									when(item.at),
									" · ",
									item.mode === "lesson" ? "重溫" : "提問",
									" · ",
									item.topic
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-bold",
								children: ["學生：", item.question]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 whitespace-pre-wrap leading-relaxed",
								children: ["導師：", item.reply]
							})
						]
					}, `${item.at}-${index}`))
				})]
			})
		]
	});
}
//#endregion
export { TeacherPage as component };
