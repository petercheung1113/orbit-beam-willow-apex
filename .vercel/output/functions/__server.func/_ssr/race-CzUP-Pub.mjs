import { o as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { n as UNITS } from "./units-9gg8Qwt9.mjs";
import { d as useClassChat, g as AvatarFace, h as createSsrRpc, i as Route$6, o as finishNav, s as holdNav, v as choiceFor } from "./router-VNKMmnlx.mjs";
import { t as FigureView } from "./FigureView-D1buCP24.mjs";
import { n as UnitPicks, r as chipClass } from "./picks-lSJJt8hU.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
import { n as choiceDeck } from "./tug-deck-Cx9iyKSe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/race-CzUP-Pub.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var QUESTION_SECONDS = 30;
var LIMIT = 10;
var PULL = 2;
var CAST = [
	{
		side: "red",
		slot: 0,
		id: "fox"
	},
	{
		side: "red",
		slot: 1,
		id: "ghost"
	},
	{
		side: "blue",
		slot: 0,
		id: "cat"
	},
	{
		side: "blue",
		slot: 1,
		id: "shiba"
	}
];
var GIF = {
	fox: "/art/sprites/fox.gif",
	ghost: "/art/sprites/ghost.gif",
	cat: "/art/sprites/cat.gif",
	shiba: "/art/sprites/shiba.gif"
};
function Puppet({ name, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: GIF[name],
		alt: "",
		className: `tug-puppet object-contain object-bottom ${className ?? ""}`
	});
}
function clamp(n) {
	return Math.max(-10, Math.min(LIMIT, n));
}
function freshSeat(qi) {
	return {
		qi,
		left: QUESTION_SECONDS
	};
}
function slotsFor(mode) {
	return mode === "quad" ? [0, 1] : [0];
}
function initial(arg) {
	return {
		mode: arg.mode,
		tug: 0,
		match: arg.seconds,
		red: [freshSeat(0), freshSeat(0)],
		blue: [freshSeat(0), freshSeat(0)],
		log: [{
			id: 0,
			side: "both",
			text: arg.mode === "quad" ? "四人拔河開始，每人一題" : "二人拔河開始，搶拉中",
			tag: "開波"
		}],
		seq: 1,
		phase: "play",
		winner: null
	};
}
function withLog(state, entry, patch) {
	return {
		...state,
		...patch,
		seq: state.seq + 1,
		log: [{
			...entry,
			id: state.seq
		}, ...state.log].slice(0, 16)
	};
}
function putSeat(pair, slot, seat) {
	const next = [pair[0], pair[1]];
	next[slot] = seat;
	return next;
}
function miss(state, side, slot, names) {
	const who = names[side][slot];
	return withLog(state, {
		side,
		text: `${who} · 時間到（不拉繩）`,
		tag: "超時"
	}, { [side]: putSeat(state[side], slot, freshSeat(state[side][slot].qi + 1)) });
}
function tick(state, names) {
	if (state.phase !== "play") return state;
	const live = slotsFor(state.mode);
	let next = {
		...state,
		match: state.match - 1,
		red: state.red.map((seat, index) => live.includes(index) ? {
			...seat,
			left: seat.left - 1
		} : seat),
		blue: state.blue.map((seat, index) => live.includes(index) ? {
			...seat,
			left: seat.left - 1
		} : seat)
	};
	for (const side of ["red", "blue"]) for (const slot of live) if (next[side][slot].left <= 0) next = miss(next, side, slot, names);
	if (next.match <= 0) {
		const winner = next.tug < 0 ? "red" : next.tug > 0 ? "blue" : "tie";
		return {
			...next,
			phase: "done",
			winner,
			match: 0
		};
	}
	return next;
}
function answer(state, side, slot, correct, names) {
	if (state.phase !== "play") return state;
	if (state.mode === "duo" && slot !== 0) return state;
	const who = names[side][slot];
	const tug = correct ? clamp(state.tug + (side === "red" ? -2 : PULL)) : state.tug;
	const next = withLog(state, {
		side,
		text: correct ? `${who} 答對，拉向${side === "red" ? "紅" : "藍"}方` : `${who} 答錯 · 不拉繩`,
		tag: correct ? "答對" : "答錯"
	}, {
		tug,
		[side]: putSeat(state[side], slot, freshSeat(state[side][slot].qi + 1))
	});
	if (tug <= -10) return {
		...next,
		phase: "done",
		winner: "red"
	};
	if (tug >= LIMIT) return {
		...next,
		phase: "done",
		winner: "blue"
	};
	return next;
}
function reduce(state, action) {
	if (action.type === "tick") return tick(state, action.names);
	return answer(state, action.side, action.slot, action.correct, action.names);
}
function clock(seconds) {
	const safe = Math.max(0, seconds);
	return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}
function lead(tug) {
	if (tug === 0) return "平手 · 搶拉中";
	if (tug < 0) return `紅隊領先 ${-tug}`;
	return `藍隊領先 ${tug}`;
}
function TugWar({ mode, topics, names, seconds, seed, onExit, onReplay, online }) {
	const [game, dispatch] = (0, import_react.useReducer)(reduce, {
		seconds,
		mode
	}, initial);
	const locks = (0, import_react.useRef)({});
	const quizzes = (0, import_react.useMemo)(() => ({
		red: [choiceDeck(seed, topics), choiceDeck(seed + 104729, topics)],
		blue: [choiceDeck(seed + 7919, topics), choiceDeck(seed + 224737, topics)]
	}), [seed, topics]);
	(0, import_react.useEffect)(() => {
		if (online || game.phase !== "play") return;
		const id = window.setInterval(() => dispatch({
			type: "tick",
			names
		}), 1e3);
		return () => window.clearInterval(id);
	}, [
		online,
		game.phase,
		names
	]);
	(0, import_react.useEffect)(() => {
		locks.current = {};
	}, [
		game.red[0].qi,
		game.red[1].qi,
		game.blue[0].qi,
		game.blue[1].qi
	]);
	const shown = online ? {
		mode,
		tug: online.snap.tug,
		match: online.snap.match,
		red: online.snap.red,
		blue: online.snap.blue,
		log: online.snap.log.length ? online.snap.log : game.log,
		seq: online.snap.log.length,
		phase: online.snap.phase,
		winner: online.snap.winner
	} : game;
	const pick = (side, slot, choice, solution) => {
		if (online) {
			if (online.mine.side !== side || online.mine.slot !== slot || shown.phase !== "play") return;
			online.onAnswer(choice);
			return;
		}
		const key = `${side}-${slot}`;
		if (game.phase !== "play" || locks.current[key]) return;
		locks.current[key] = true;
		dispatch({
			type: "answer",
			side,
			slot,
			correct: choice === solution,
			names
		});
	};
	const mineOnly = (side, slot) => Boolean(online && (online.mine.side !== side || online.mine.slot !== slot));
	const [impulse, setImpulse] = (0, import_react.useState)("");
	const seen = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const top = shown.log[0];
		if (!top || top.id === seen.current) return;
		seen.current = top.id;
		const kind = top.tag === "答對" ? top.side === "red" ? "is-yank-red" : "is-yank-blue" : top.tag === "答錯" ? "is-shake" : "";
		if (!kind) return;
		setImpulse("");
		const frame = requestAnimationFrame(() => setImpulse(kind));
		const timer = window.setTimeout(() => setImpulse(""), 700);
		return () => {
			cancelAnimationFrame(frame);
			window.clearTimeout(timer);
		};
	}, [shown.log[0]?.id]);
	const winnerLine = shown.winner === "red" ? "紅隊拉贏了" : shown.winner === "blue" ? "藍隊拉贏了" : "平手";
	const tense = Math.abs(shown.tug) >= 4;
	const cast = mode === "duo" ? [CAST[0], CAST[2]] : CAST;
	const quad = mode === "quad";
	const at = (side, slot) => {
		const deck = quizzes[side][slot];
		return deck[shown[side][slot].qi % Math.max(deck.length, 1)];
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col overflow-hidden bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: quad ? "relative h-24 shrink-0 overflow-hidden border-b-2 border-ink sm:h-28" : "relative h-36 shrink-0 overflow-hidden border-b-2 border-ink sm:h-40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/art/tug-field.jpg",
					alt: "",
					className: "tug-field absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tug-cloud tug-cloud-a" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tug-cloud tug-cloud-b" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute top-3 left-3 z-30 h-11 rounded-2xl border-2 border-ink bg-paper px-3 text-sm font-bold",
					onClick: onExit,
					children: "離開"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-3 left-1/2 z-30 -translate-x-1/2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: (shown.match <= 20 ? "tug-clock is-low " : "") + "rounded-xl border-2 border-ink bg-grass px-4 py-1 text-3xl text-paper tabular-nums",
						children: clock(shown.match)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "tug-crew absolute inset-x-0 bottom-0 z-10 h-20 sm:h-24",
					style: { transform: `translateX(${shown.tug * 2.2}%)` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: tense ? `tug-stage is-tense ${impulse}` : `tug-stage ${impulse}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "tug-rope",
								"aria-hidden": "true",
								children: Array.from({ length: 16 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tug-knot",
									style: { animationDelay: `${index * .05}s` }
								}, index))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tug-flag" }),
							impulse === "is-yank-red" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tug-shout tug-shout-red text-coral",
								children: "拉！"
							}),
							impulse === "is-yank-blue" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tug-shout tug-shout-blue text-grass",
								children: "拉！"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: quad ? "relative z-10 mx-auto grid h-full w-[92%] grid-cols-4 items-end" : "relative z-10 mx-auto grid h-full w-[70%] grid-cols-2 items-end",
								children: cast.map((mate) => {
									const won = shown.phase === "done" && shown.winner === mate.side;
									const lost = shown.phase === "done" && shown.winner !== null && shown.winner !== "tie" && shown.winner !== mate.side;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
										className: "flex flex-col items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `tug-actor ${won ? "is-win" : ""} ${lost ? "is-lose" : ""}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Puppet, {
												name: mate.id,
												className: quad ? "h-14 w-14 sm:h-16 sm:w-16" : "h-20 w-20 sm:h-28 sm:w-28"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
											className: "mb-1 rounded-full border-2 border-ink bg-paper px-2 text-xs font-bold",
											children: names[mate.side][mate.slot]
										})]
									}, mate.id);
								})
							})
						]
					})
				}),
				shown.phase === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute inset-x-0 bottom-3 z-30 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block rounded-2xl border-2 border-ink bg-paper px-4 py-2 text-3xl",
						children: winnerLine
					})
				})
			]
		}), quad ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col gap-2 p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreStrip, {
				game: shown,
				replay: !online || online.replay,
				onExit,
				onReplay
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPane, {
						side: "red",
						slot: 0,
						name: names.red[0],
						seat: shown.red[0],
						item: at("red", 0),
						disabled: shown.phase !== "play" || mineOnly("red", 0),
						spectator: mineOnly("red", 0),
						compact: true,
						onPick: (choice, solution) => pick("red", 0, choice, solution)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPane, {
						side: "blue",
						slot: 0,
						name: names.blue[0],
						seat: shown.blue[0],
						item: at("blue", 0),
						disabled: shown.phase !== "play" || mineOnly("blue", 0),
						spectator: mineOnly("blue", 0),
						compact: true,
						onPick: (choice, solution) => pick("blue", 0, choice, solution)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPane, {
						side: "red",
						slot: 1,
						name: names.red[1],
						seat: shown.red[1],
						item: at("red", 1),
						disabled: shown.phase !== "play" || mineOnly("red", 1),
						spectator: mineOnly("red", 1),
						compact: true,
						onPick: (choice, solution) => pick("red", 1, choice, solution)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPane, {
						side: "blue",
						slot: 1,
						name: names.blue[1],
						seat: shown.blue[1],
						item: at("blue", 1),
						disabled: shown.phase !== "play" || mineOnly("blue", 1),
						spectator: mineOnly("blue", 1),
						compact: true,
						onPick: (choice, solution) => pick("blue", 1, choice, solution)
					})
				]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreStrip, {
				game: shown,
				replay: !online || online.replay,
				onExit,
				onReplay
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-2 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPane, {
					side: "red",
					slot: 0,
					name: names.red[0],
					seat: shown.red[0],
					item: at("red", 0),
					disabled: shown.phase !== "play" || mineOnly("red", 0),
					spectator: mineOnly("red", 0),
					onPick: (choice, solution) => pick("red", 0, choice, solution)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPane, {
					side: "blue",
					slot: 0,
					name: names.blue[0],
					seat: shown.blue[0],
					item: at("blue", 0),
					disabled: shown.phase !== "play" || mineOnly("blue", 0),
					spectator: mineOnly("blue", 0),
					onPick: (choice, solution) => pick("blue", 0, choice, solution)
				})]
			})]
		})]
	});
}
function ScoreStrip({ game, replay = true, onExit, onReplay }) {
	const headline = game.phase === "done" ? game.winner === "red" ? "紅隊勝" : game.winner === "blue" ? "藍隊勝" : "平手" : lead(game.tug);
	const latest = game.log[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex shrink-0 items-center gap-2 rounded-2xl border-2 border-ink bg-paper px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "shrink-0 text-sm font-bold",
				children: headline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-16 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rope, {
					tug: game.tug,
					thin: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hidden min-w-0 flex-1 truncate text-sm sm:block",
				children: latest ? latest.text : "四人各答各的題"
			}),
			game.phase === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 gap-2",
				children: [replay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-9 rounded-xl bg-coral px-3 text-sm font-bold text-paper",
					onClick: onReplay,
					children: "再拉一局"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-9 rounded-xl border-2 border-ink px-3 text-sm font-bold",
					onClick: onExit,
					children: "回大廳"
				})]
			})
		]
	});
}
function Rope({ tug, thin }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative rounded-full border-2 border-ink " + (thin ? "h-3" : "mt-3 h-4"),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 w-1/2 bg-coral" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 right-0 w-1/2 bg-grass" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tug-marker absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-paper",
				style: { left: `${(tug + LIMIT) / 20 * 100}%` }
			})
		]
	}), !thin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-2 flex items-center justify-between text-xs font-bold",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-coral",
				children: ["紅 −", LIMIT]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lead(tug) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-grass",
				children: ["藍 +", LIMIT]
			})
		]
	})] });
}
function PlayerPane({ className, side, slot, name, seat, item, disabled, spectator = false, compact = false, onPick }) {
	const red = side === "red";
	const question = item?.question.kind === "choice" ? item.question : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `${className ?? ""} flex w-full flex-col overflow-hidden rounded-2xl border-2 bg-paper ${compact ? "h-full min-h-0" : ""} ${red ? "border-coral" : "border-grass"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-2 border-b-2 border-ink px-3 py-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: compact ? "truncate text-base" : "truncate text-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: red ? "mr-2 text-xs font-bold text-coral" : "mr-2 text-xs font-bold text-grass",
						children: [
							red ? "紅隊" : "藍隊",
							" ",
							slot + 1
						]
					}), name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-base tabular-nums " + (seat.left <= 5 ? "tug-clock is-low " : "") + (red ? "border-coral text-coral" : "border-grass text-grass"),
					"aria-label": `${name} 剩餘 ${seat.left} 秒`,
					children: seat.left
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-auto px-3 py-2 " + (compact ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: compact ? "text-base font-bold leading-snug" : "text-lg font-bold leading-snug",
					children: spectator ? "同學正在作答" : question?.stem ?? "這個課題暫時沒有選擇題。"
				}), !spectator && question?.figure ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureView, {
					figure: question.figure,
					className: "mx-auto h-auto max-h-44 w-auto max-w-full"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-1.5 border-t-2 border-line p-2",
				children: spectator ? null : question?.choices.map((choice, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled,
					className: "tug-pad flex min-h-10 items-center justify-center rounded-xl border-2 border-ink px-2 py-1 text-center text-sm font-bold leading-tight",
					onPointerUp: (event) => {
						if (disabled || event.button !== 0) return;
						onPick(index, question.answer);
					},
					children: choice
				}, choice))
			})
		]
	});
}
function tokenOf(input) {
	return String(input?.token ?? "").trim();
}
var tugCreate = createServerFn({ method: "POST" }).inputValidator((input) => {
	const raw = input;
	const topics = Array.isArray(raw?.topics) ? raw.topics.map((item) => String(item)).slice(0, 20) : [];
	const invites = Array.isArray(raw?.invites) ? raw.invites.map((item) => String(item)).slice(0, 3) : [];
	return {
		token: tokenOf(input),
		mode: String(raw?.mode ?? ""),
		minutes: Number(raw?.minutes ?? 0),
		topics,
		invites
	};
}).handler(createSsrRpc("c143ec96728b821a2374a3af4ce0c05c359aa3e0dd8a1d8344c42ce0af1d23cc"));
var tugJoin = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8)
})).handler(createSsrRpc("0e812040936589de0879f96edbd48e649b56b8492829f314b98ad32cc0a75eb9"));
var tugSync = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8)
})).handler(createSsrRpc("afc78896024dc822924c65a2119d045426a95805ce76b5dabe139388c92b9b89"));
var tugStart = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8)
})).handler(createSsrRpc("f42a2f7ca971cd70514adc2a5382ee5eb67f6290a85395ec3143ee28ad7e86a4"));
var tugAnswer = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8),
	choice: Number(input?.choice ?? -1)
})).handler(createSsrRpc("c3e04a0399022d73e035d27cb0dd0672c6a941bf3e25c8ea64b094ce501caffb"));
var tugReplay = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	roomId: String(input?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8)
})).handler(createSsrRpc("d4d00a7eea96cf9cd0d30c684bbd52a1f760dd50e609ba03f719816f9e1f2271"));
function TugRoom({ code }) {
	const navigate = useNavigate();
	const chat = useClassChat();
	const [view, setView] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!chat.token) return;
		let stop = false;
		const pull = async () => {
			const result = await tugSync({ data: {
				token: chat.token ?? "",
				roomId: code
			} });
			if (stop) return;
			if (!result.ok) {
				setError(result.error);
				return;
			}
			setError("");
			setView(result.view);
		};
		tugJoin({ data: {
			token: chat.token,
			roomId: code
		} }).then((result) => {
			if (stop) return;
			if (!result.ok) setError(result.error);
			else setView(result.view);
		});
		const id = window.setInterval(() => void pull(), 1e3);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, [chat.token, code]);
	const leave = () => {
		navigate({
			to: "/race",
			search: { room: "" }
		});
	};
	if (!chat.token) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-md px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "先在聊天室輸入密碼，就可以進入拔河房間。"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-4 h-12 rounded-2xl bg-grass px-4 font-bold text-paper",
			onClick: () => void navigate({ to: "/chat" }),
			children: "去聊天室"
		})]
	}) });
	if (error && !view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-md px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg font-bold text-coral",
			children: error
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-4 h-12 rounded-2xl border-2 border-ink px-4 font-bold",
			onClick: leave,
			children: "返回"
		})]
	}) });
	if (!view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-10 text-muted",
		children: "進入房間…"
	}) });
	if (view.phase !== "lobby" && view.snap && view.me) {
		const names = {
			red: [view.seats.find((seat) => seat.side === "red" && seat.slot === 0)?.name ?? "紅隊", view.seats.find((seat) => seat.side === "red" && seat.slot === 1)?.name ?? ""],
			blue: [view.seats.find((seat) => seat.side === "blue" && seat.slot === 0)?.name ?? "藍隊", view.seats.find((seat) => seat.side === "blue" && seat.slot === 1)?.name ?? ""]
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TugWar, {
			mode: view.mode,
			topics: view.topics,
			names,
			seconds: view.minutes * 60,
			seed: view.seed,
			onExit: leave,
			onReplay: () => {
				tugReplay({ data: {
					token: chat.token ?? "",
					roomId: code
				} });
			},
			online: {
				mine: view.me,
				snap: view.snap,
				replay: view.host === chat.me,
				onAnswer: (choice) => {
					tugAnswer({ data: {
						token: chat.token ?? "",
						roomId: code,
						choice
					} });
				}
			}
		});
	}
	const ready = view.seats.every((seat) => seat.joined);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-lg px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-bold text-coral",
				children: ["房間 ", view.id]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl text-ink",
				children: view.mode === "duo" ? "二人拔河" : "四人拔河"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "邀請已發到聊天室。同學按下「進入房間」就會出現在這裡。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: view.seats.map((seat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-2xl border-2 border-ink bg-paper px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: seat.side === "red" ? "mr-2 text-sm font-bold text-coral" : "mr-2 text-sm font-bold text-grass",
						children: seat.side === "red" ? "紅隊" : "藍隊"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: seat.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: seat.joined ? "text-sm font-bold text-grass" : "text-sm text-muted",
						children: seat.joined ? "已入房" : "未入房"
					})]
				}, seat.account))
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-bold text-coral",
				children: error
			}) : null,
			view.host === chat.me ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: !ready || pending,
				className: "mt-4 h-12 rounded-2xl bg-coral px-5 font-bold text-paper disabled:opacity-50",
				"data-nav": true,
				onClick: () => {
					setPending(true);
					tugStart({ data: {
						token: chat.token ?? "",
						roomId: code
					} }).then((result) => {
						if (!result.ok) setError(result.error);
						setPending(false);
					});
				},
				children: ready ? "開始拔河" : "等齊同學再開"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "等房主開始。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 h-11 rounded-2xl border-2 border-ink px-4 text-sm font-bold",
				onClick: leave,
				children: "離開房間"
			})
		]
	}) });
}
function RacePage() {
	const { room } = Route$6.useSearch();
	if (room) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TugRoom, { code: room });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaceSetup, {});
}
function RaceSetup() {
	const navigate = useNavigate();
	const chat = useClassChat();
	const classmates = (0, import_react.useMemo)(() => chat.mates.filter((mate) => mate.account !== chat.me).sort((a, b) => Number(b.online) - Number(a.online) || a.account.localeCompare(b.account)), [chat.mates, chat.me]);
	const onlineCount = classmates.filter((mate) => mate.online).length;
	const [mode, setMode] = (0, import_react.useState)("quad");
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [round, setRound] = (0, import_react.useState)(0);
	const [seed, setSeed] = (0, import_react.useState)(1);
	const [minutes, setMinutes] = (0, import_react.useState)(3);
	const [selected, setSelected] = (0, import_react.useState)(UNITS.map((unit) => unit.id));
	const [redA, setRedA] = (0, import_react.useState)("樂樂");
	const [redB, setRedB] = (0, import_react.useState)("小白");
	const [blueA, setBlueA] = (0, import_react.useState)("慢慢");
	const [blueB, setBlueB] = (0, import_react.useState)("柴柴");
	const [invites, setInvites] = (0, import_react.useState)([]);
	const [roomError, setRoomError] = (0, import_react.useState)("");
	const [opening, setOpening] = (0, import_react.useState)(false);
	const need = mode === "duo" ? 1 : 3;
	const names = (0, import_react.useMemo)(() => ({
		red: [redA.trim() || "樂樂", redB.trim() || "小白"],
		blue: [blueA.trim() || "慢慢", blueB.trim() || "柴柴"]
	}), [
		redA,
		redB,
		blueA,
		blueB
	]);
	if (playing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TugWar, {
		mode,
		topics: selected.length ? selected : UNITS.map((unit) => unit.id),
		names,
		seconds: minutes * 60,
		seed,
		onExit: () => setPlaying(false),
		onReplay: () => {
			setSeed(Math.floor(Math.random() * 2147483647) + 1);
			setRound((value) => value + 1);
		}
	}, `${round}-${mode}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-coral",
				children: "朋友對戰"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl text-ink",
				children: "拔河對戰"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: mode === "duo" ? "二人對戰：一人坐左邊，一人坐右邊。兩個人同時答題，答對就拉繩，答錯不拉。" : "四人對戰：紅隊兩人、藍隊兩人。四個人各有一題，可以同時作答。答對就幫自己隊伍拉繩。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: mode === "duo" ? chipClass(true) : chipClass(false),
					onClick: () => {
						setMode("duo");
						setInvites((prev) => prev.slice(0, 1));
					},
					children: "二人對戰"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: mode === "quad" ? "h-11 rounded-full bg-ink px-4 text-sm font-bold text-paper" : chipClass(false),
					onClick: () => setMode("quad"),
					children: "四人對戰"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-4 h-40 overflow-hidden rounded-2xl border-2 border-ink sm:h-52",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/art/tug-field.jpg",
					alt: "",
					className: "size-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Puppet, {
							name: "fox",
							className: "h-28 w-28"
						}),
						mode === "quad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Puppet, {
							name: "ghost",
							className: "h-24 w-24"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Puppet, {
							name: "cat",
							className: mode === "quad" ? "h-24 w-24" : "h-28 w-28"
						}),
						mode === "quad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Puppet, {
							name: "shiba",
							className: "h-28 w-28"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameCard, {
					title: "紅隊",
					tone: "coral",
					mode,
					a: redA,
					b: redB,
					setA: setRedA,
					setB: setRedB
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameCard, {
					title: "藍隊",
					tone: "teal",
					mode,
					a: blueA,
					b: blueB,
					setA: setBlueA,
					setB: setBlueB
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-bold",
				children: "比賽時間"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-2",
				children: [
					2,
					3,
					5
				].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: value === minutes ? "h-12 rounded-2xl bg-ink px-4 font-bold text-paper" : chipClass(false),
					onClick: () => setMinutes(value),
					children: [value, " 分鐘"]
				}, value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-bold",
				children: "入卷課題"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "彩色會出題，再點一下就拿掉。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitPicks, {
					selected,
					onToggle: (id) => setSelected((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]),
					onAll: () => setSelected(selected.length === UNITS.length ? [] : UNITS.map((unit) => unit.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 h-12 rounded-2xl bg-coral px-5 font-bold text-paper",
				"data-nav": true,
				disabled: selected.length === 0,
				onClick: () => {
					setSeed(Math.floor(Math.random() * 2147483647) + 1);
					setPlaying(true);
				},
				children: "開始拔河"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-3xl border-2 border-ink bg-paper p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl text-ink",
						children: "開房間"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							mode === "duo" ? "邀請 1 位同學，二人各坐一邊。" : "邀請 3 位同學，紅隊兩人、藍隊兩人。你是紅隊第一位。",
							"在線的排在前面，頭像有綠點就是在線。現在 ",
							onlineCount,
							" 人在線。"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid max-h-80 grid-cols-1 gap-2 overflow-auto sm:grid-cols-2",
						children: classmates.map((mate) => {
							const on = invites.includes(mate.account);
							const renamed = mate.name !== mate.seat;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex w-full items-center gap-2 rounded-2xl border-2 px-2 py-2 text-left text-sm font-bold " + (on ? "border-grass bg-meadow" : "border-ink"),
								onClick: () => setInvites((prev) => {
									if (prev.includes(mate.account)) return prev.filter((item) => item !== mate.account);
									if (prev.length >= need) return prev;
									return [...prev, mate.account];
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
									choice: choiceFor(mate.account, chat.avatars[mate.account]),
									online: mate.online,
									className: "size-11"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate",
										children: renamed ? mate.name : mate.seat
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate text-xs font-normal " + (mate.online ? "text-grass" : "text-muted"),
										children: [renamed ? `${mate.seat} · ` : "", mate.online ? "在線" : "不在線"]
									})]
								})]
							}) }, mate.account);
						})
					}),
					roomError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-bold text-coral",
						children: roomError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: opening || invites.length !== need || selected.length === 0 || !chat.token,
						"data-nav": true,
						className: "mt-4 h-12 rounded-2xl bg-ink px-5 font-bold text-paper disabled:opacity-50",
						onClick: () => {
							if (!chat.token) {
								setRoomError("請先到聊天室輸入密碼。");
								finishNav();
								return;
							}
							holdNav();
							setOpening(true);
							setRoomError("");
							tugCreate({ data: {
								token: chat.token,
								mode,
								minutes,
								topics: selected,
								invites
							} }).then((result) => {
								setOpening(false);
								if (!result.ok) {
									setRoomError(result.error);
									finishNav();
									return;
								}
								navigate({
									to: "/race",
									search: { room: result.id }
								}).then(() => finishNav());
							}).catch(() => {
								setOpening(false);
								setRoomError("開房失敗，請再試一次。");
								finishNav();
							});
						},
						children: opening ? "開房中…" : chat.token ? `建立房間並邀請（${invites.length}/${need}）` : "先進入聊天室先可開房"
					})
				]
			})
		]
	}) });
}
function NameCard({ title, tone, mode, a, b, setA, setB }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border-2 border-ink bg-paper p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: tone === "coral" ? "text-2xl text-coral" : "text-2xl text-grass",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-2 block text-sm font-bold",
				children: [mode === "duo" ? "選手" : "隊員 1", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: a,
					maxLength: 6,
					onChange: (event) => setA(event.target.value),
					className: "mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-cream px-3"
				})]
			}),
			mode === "quad" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-2 block text-sm font-bold",
				children: ["隊員 2", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: b,
					maxLength: 6,
					onChange: (event) => setB(event.target.value),
					className: "mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-cream px-3"
				})]
			})
		]
	});
}
//#endregion
export { RacePage as component };
