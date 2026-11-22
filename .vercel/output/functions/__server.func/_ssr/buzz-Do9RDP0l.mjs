import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { n as UNITS } from "./units-9gg8Qwt9.mjs";
import { n as isTeacherAccount } from "./teacher-account-BqPbmFfU.mjs";
import { d as useClassChat, g as AvatarFace, h as createSsrRpc, v as choiceFor } from "./router-VNKMmnlx.mjs";
import { t as FigureView } from "./FigureView-D1buCP24.mjs";
import { n as UnitPicks, r as chipClass, t as PageIntro } from "./picks-lSJJt8hU.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buzz-Do9RDP0l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function tokenOf(input) {
	return String(input?.token ?? "").trim();
}
function pinOf(input) {
	return String(input?.pin ?? "").replace(/\D/g, "").slice(0, 4);
}
var livePeek = createServerFn({ method: "POST" }).inputValidator((input) => ({ token: tokenOf(input) })).handler(createSsrRpc("e3d4ac3f3d5bf758169df4120142eee7b6a24fcce83721c51f0389d78b465ce1"));
var liveCreate = createServerFn({ method: "POST" }).inputValidator((input) => {
	const raw = input;
	const topics = Array.isArray(raw?.topics) ? raw.topics.map((item) => String(item)).slice(0, 20) : [];
	return {
		token: tokenOf(input),
		topics,
		count: Number(raw?.count ?? 0),
		seconds: Number(raw?.seconds ?? 0)
	};
}).handler(createSsrRpc("2a0a86cf3156f008127c13014da7075d55d4610e495edd02e2e67068d1220f92"));
var liveJoin = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(createSsrRpc("fd1bb4c3b01405868ac4a3c42137a47bce2caeb7f7eb78a0421416283587d6ba"));
var liveSync = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(createSsrRpc("147c40826d0a0d35d7d560c146d804a87b0b6c6e7bd167380564d96409a9fed5"));
var liveStart = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(createSsrRpc("890444fd0cbd5ed3e433ea9b1b469b20a0f92b13bab5ce1dc0c5651c8c7f9a60"));
var liveReveal = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(createSsrRpc("9f24ffb046d44ea6d7836bdf6d0a4b1687c21ba6355308577b93c40fbc7a46a9"));
var liveNext = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(createSsrRpc("a6c82f023a167cc44ac4ac378d9d038fbd9d3fb1d86081fa991b435f8c6bd11d"));
var liveClose = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input)
})).handler(createSsrRpc("baf23e13694eab7ee29c0e342e7614c3bcbb7185ba3592b102133fb45c6e9b42"));
var liveAnswer = createServerFn({ method: "POST" }).inputValidator((input) => ({
	token: tokenOf(input),
	pin: pinOf(input),
	choice: Math.round(Number(input?.choice ?? -1))
})).handler(createSsrRpc("b34b19ca2911d6195ca8074941480fb06f7dd5d570f24ce0544e4a2866263b83"));
var COLORS = [
	{
		bg: "#e15a3a",
		ink: "#fffaf4",
		mark: "▲"
	},
	{
		bg: "#2b6cb0",
		ink: "#fffaf4",
		mark: "◆"
	},
	{
		bg: "#e2b33c",
		ink: "#1c241c",
		mark: "●"
	},
	{
		bg: "#1c7a4a",
		ink: "#fffaf4",
		mark: "■"
	}
];
function BuzzRoom({ pin, first, onLeave }) {
	const chat = useClassChat();
	const [view, setView] = (0, import_react.useState)(first);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [left, setLeft] = (0, import_react.useState)(first.leftMs);
	(0, import_react.useEffect)(() => {
		setView(first);
	}, [first]);
	(0, import_react.useEffect)(() => {
		if (!chat.token) return;
		let stop = false;
		const pull = async () => {
			const result = await liveSync({ data: {
				token: chat.token ?? "",
				pin
			} });
			if (stop) return;
			if (!result.ok) {
				setError(result.error);
				return;
			}
			setError("");
			setView(result.view);
		};
		const id = window.setInterval(() => void pull(), 1e3);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, [chat.token, pin]);
	(0, import_react.useEffect)(() => {
		setLeft(view.leftMs);
		if (view.phase !== "question") return;
		const started = Date.now();
		const base = view.leftMs;
		const id = window.setInterval(() => setLeft(Math.max(0, base - (Date.now() - started))), 100);
		return () => window.clearInterval(id);
	}, [
		view.phase,
		view.qi,
		view.leftMs
	]);
	const act = async (run) => {
		setPending(true);
		try {
			const result = await run();
			if (!result.ok) setError(result.error);
			else if ("view" in result) {
				setError("");
				setView(result.view);
			}
		} catch {
			setError("暫時連不上，再試一次。");
		} finally {
			setPending(false);
		}
	};
	const close = async () => {
		setPending(true);
		try {
			const result = await liveClose({ data: {
				token,
				pin
			} });
			if (!result.ok) setError(result.error);
			else onLeave();
		} catch {
			setError("暫時連不上，再試一次。");
		} finally {
			setPending(false);
		}
	};
	const token = chat.token ?? "";
	const mine = view.players.find((player) => player.me);
	const rank = mine ? view.players.findIndex((player) => player.me) + 1 : 0;
	const secondsLeft = Math.ceil(left / 1e3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-bold text-coral",
					children: ["搶答 · ", pin]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl text-ink",
					children: view.phase === "podium" ? "成績" : view.phase === "lobby" ? "等候開場" : `第 ${view.qi + 1} / ${view.total} 題`
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-bold text-muted",
					children: [view.players.length, " 人加入"]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-bold text-coral",
				children: error
			}) : null,
			view.phase === "lobby" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 rounded-3xl border-2 border-ink bg-paper p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm font-bold text-muted",
						children: "告訴同學這個號碼"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-6xl font-bold tracking-[0.2em] text-ink",
						children: pin
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-5 flex flex-wrap justify-center gap-2",
						children: [view.players.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-muted",
							children: "還沒有同學加入"
						}) : null, view.players.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 rounded-full border border-line bg-cream px-2 py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
								choice: choiceFor(player.account, chat.avatars[player.account]),
								online: true,
								className: "size-8"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold",
								children: player.name
							})]
						}, player.account))]
					}),
					view.host ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: pending,
							className: "h-12 rounded-2xl bg-grass px-5 font-bold text-paper disabled:opacity-60",
							onClick: () => void act(() => liveStart({ data: {
								token,
								pin
							} })),
							children: "開始"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: pending,
							className: "h-12 rounded-2xl border-2 border-ink px-4 font-bold disabled:opacity-60",
							onClick: () => void close(),
							children: "結束"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-center font-bold text-grass",
						children: "已加入，等老師開始。"
					})
				]
			}) : null,
			view.question ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border-2 border-ink bg-ink px-4 py-5 text-paper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-sun",
							children: view.question.unitName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-2xl font-bold leading-snug",
							children: view.question.stem
						})]
					}),
					view.question.figure ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 rounded-3xl border-2 border-ink bg-paper p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureView, { figure: view.question.figure })
					}) : null,
					view.phase === "question" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-3 overflow-hidden rounded-full bg-paper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-coral",
								style: { width: `${Math.max(0, Math.min(100, left / (view.seconds * 1e3) * 100))}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-right text-sm font-bold",
							children: [
								secondsLeft,
								" 秒 · 已答 ",
								view.answered,
								"/",
								view.players.length
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-bold",
						children: [
							view.correctCount ?? 0,
							" 人答對",
							view.myPoints !== null ? ` · 你這題 ${view.myPoints > 0 ? `+${view.myPoints}` : "0 分"}` : "",
							rank ? ` · 暫列第 ${rank}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: view.question.choices.map((choice, index) => {
							const color = COLORS[index % COLORS.length];
							const picked = view.myChoice === index;
							const revealed = view.phase === "reveal";
							const right = revealed && view.answer === index;
							const wrongPick = revealed && picked && !right;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: view.host || view.phase !== "question" || pending || left <= 0,
								className: "flex min-h-20 items-center gap-3 rounded-3xl px-4 py-3 text-left text-lg font-bold disabled:opacity-80",
								style: {
									background: color.bg,
									color: color.ink,
									outline: right ? "4px solid #1c241c" : picked ? "4px solid #fffaf4" : "none",
									opacity: wrongPick ? .45 : 1
								},
								onClick: () => void act(() => liveAnswer({ data: {
									token,
									pin,
									choice: index
								} })),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: color.mark
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: choice }),
									right ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto text-sm",
										children: "正確"
									}) : null
								]
							}, `${index}-${choice}`);
						})
					}),
					view.phase === "reveal" && view.why ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 rounded-2xl bg-paper px-4 py-3 text-sm font-bold text-ink",
						children: view.why
					}) : null,
					view.host && view.phase === "question" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: pending,
						className: "mt-4 h-12 rounded-2xl bg-ink px-5 font-bold text-paper disabled:opacity-60",
						onClick: () => void act(() => liveReveal({ data: {
							token,
							pin
						} })),
						children: "提早揭曉"
					}) : null,
					view.host && view.phase === "reveal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: pending,
						className: "mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper disabled:opacity-60",
						onClick: () => void act(() => liveNext({ data: {
							token,
							pin
						} })),
						children: view.qi + 1 >= view.total ? "看成績" : "下一題"
					}) : null,
					view.host && view.phase !== "lobby" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: pending,
						className: "mt-3 block text-sm font-bold text-muted",
						onClick: () => void close(),
						children: "結束比賽"
					}) : null,
					view.phase === "reveal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {
						players: view.players,
						avatars: chat.avatars,
						limit: 5
					}) : null
				]
			}) : null,
			view.phase === "podium" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Podium, { players: view.players }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {
						players: view.players,
						avatars: chat.avatars
					}),
					view.host ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: pending,
						className: "mt-4 h-12 rounded-2xl bg-ink px-5 font-bold text-paper disabled:opacity-60",
						onClick: () => void close(),
						children: "結束比賽"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-bold text-grass",
						children: mine ? `你得 ${mine.score} 分，第 ${rank} 名。` : "比賽完結。"
					})
				]
			}) : null
		]
	});
}
function Board({ players, avatars, limit }) {
	const rows = typeof limit === "number" ? players.slice(0, limit) : players;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-4 space-y-2",
		children: rows.map((player, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-3 rounded-2xl border border-line bg-paper px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-8 text-lg font-bold",
					children: index + 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
					choice: choiceFor(player.account, avatars[player.account]),
					online: true,
					className: "size-9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate font-bold",
					children: player.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold text-grass",
					children: player.score
				})
			]
		}, player.account))
	});
}
function Podium({ players }) {
	const top = [
		players[1],
		players[0],
		players[2]
	];
	const titles = [
		"亞軍",
		"冠軍",
		"季軍"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 items-end gap-2",
		children: top.map((player, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index === 1 ? "rounded-3xl bg-ink px-2 py-4 text-center text-paper" : "rounded-3xl border-2 border-ink bg-paper px-2 py-3 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold",
					children: titles[index]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 truncate text-lg font-bold",
					children: player?.name ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: player ? player.score : ""
				})
			]
		}, titles[index]))
	});
}
function BuzzPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuzzGate, {}) });
}
function BuzzGate() {
	const chat = useClassChat();
	const teacher = isTeacherAccount(chat.me);
	const [pin, setPin] = (0, import_react.useState)("");
	const [view, setView] = (0, import_react.useState)(null);
	const [openPin, setOpenPin] = (0, import_react.useState)("");
	const [openCount, setOpenCount] = (0, import_react.useState)(0);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [count, setCount] = (0, import_react.useState)(10);
	const [seconds, setSeconds] = (0, import_react.useState)(20);
	const [selected, setSelected] = (0, import_react.useState)(UNITS.map((unit) => unit.id));
	(0, import_react.useEffect)(() => {
		if (!chat.token || view) return;
		let stop = false;
		const look = async () => {
			const result = await livePeek({ data: { token: chat.token ?? "" } });
			if (stop || !result.ok) return;
			if (result.game && teacher && result.game.host) {
				const joined = await liveJoin({ data: {
					token: chat.token ?? "",
					pin: result.game.id
				} });
				if (!stop && joined.ok) {
					setPin(result.game.id);
					setView(joined.view);
				}
				return;
			}
			if (result.game && !teacher) {
				if ((window.sessionStorage.getItem("buzz-pin") ?? "") === result.game.id) {
					const joined = await liveJoin({ data: {
						token: chat.token ?? "",
						pin: result.game.id
					} });
					if (!stop && joined.ok) {
						setPin(result.game.id);
						setView(joined.view);
						return;
					}
					window.sessionStorage.removeItem("buzz-pin");
				}
			}
			setOpenPin(result.game?.id ?? "");
			setOpenCount(result.game?.players ?? 0);
		};
		look();
		const id = window.setInterval(() => void look(), 2e3);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, [
		chat.token,
		teacher,
		view
	]);
	const join = async (code) => {
		if (!chat.token) return;
		setPending(true);
		setError("");
		try {
			const result = await liveJoin({ data: {
				token: chat.token,
				pin: code
			} });
			if (!result.ok) setError(result.error);
			else {
				setPin(result.view.id);
				setView(result.view);
				window.sessionStorage.setItem("buzz-pin", result.view.id);
			}
		} catch {
			setError("暫時加入不到，再試一次。");
		} finally {
			setPending(false);
		}
	};
	if (!chat.token) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-md px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl text-ink",
			children: "搶答"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "請先登出，再登入一次。"
		})]
	});
	if (view && pin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuzzRoom, {
		pin,
		first: view,
		onLeave: () => {
			window.sessionStorage.removeItem("buzz-pin");
			setView(null);
			setPin("");
			setOpenPin("");
		}
	});
	if (!teacher) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-md px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "6D",
				title: "搶答",
				children: "只有老師可以開場。老師開場後，輸入號碼加入。答得越快，分數越高。"
			}),
			openPin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: pending,
				className: "mt-6 h-16 w-full rounded-3xl bg-grass text-xl font-bold text-paper disabled:opacity-60",
				onClick: () => void join(openPin),
				children: [
					"加入 ",
					openPin,
					openCount ? ` · ${openCount} 人` : ""
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-bold text-muted",
				children: "老師還沒開比賽。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 flex gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					join(typed);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					inputMode: "numeric",
					value: typed,
					placeholder: "輸入號碼",
					onChange: (event) => setTyped(event.target.value.replace(/\D/g, "").slice(0, 4)),
					className: "h-12 min-w-0 flex-1 rounded-2xl border-2 border-ink bg-paper px-4 text-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: pending || typed.length !== 4,
					className: "h-12 rounded-2xl bg-ink px-4 font-bold text-paper disabled:opacity-60",
					children: "加入"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-bold text-coral",
				children: error
			}) : null
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "老師",
				title: "開搶答比賽",
				children: "同學在「搶答」頁會見到號碼。每題限時作答，答對而且越快，分數越高，最快約 1000 分。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [[
					5,
					10,
					15
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: chipClass(count === item),
					onClick: () => setCount(item),
					children: [item, " 題"]
				}, item)), [
					10,
					20,
					30
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: chipClass(seconds === item),
					onClick: () => setSeconds(item),
					children: [
						"每題 ",
						item,
						" 秒"
					]
				}, item))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitPicks, {
					selected,
					onToggle: (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
					onAll: () => setSelected(selected.length === UNITS.length ? [] : UNITS.map((unit) => unit.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: pending,
				className: "mt-6 h-14 rounded-3xl bg-coral px-6 text-lg font-bold text-paper disabled:opacity-60",
				onClick: () => {
					if (!chat.token) return;
					setPending(true);
					setError("");
					liveCreate({ data: {
						token: chat.token,
						topics: selected,
						count,
						seconds
					} }).then(async (created) => {
						if (!created.ok || !chat.token) {
							setError(created.ok ? "暫時開不到場。" : created.error);
							return;
						}
						const joined = await liveJoin({ data: {
							token: chat.token,
							pin: created.id
						} });
						if (!joined.ok) setError(joined.error);
						else {
							setPin(created.id);
							setView(joined.view);
							window.sessionStorage.setItem("buzz-pin", created.id);
						}
					}).catch(() => setError("暫時開不到場，再試一次。")).finally(() => setPending(false));
				},
				children: pending ? "開場中…" : "開場"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-bold text-coral",
				children: error
			}) : null
		]
	});
}
//#endregion
export { BuzzPage as component };
