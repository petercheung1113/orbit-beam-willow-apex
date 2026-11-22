import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as UNITS } from "./units-9gg8Qwt9.mjs";
import { d as useClassChat, f as usePark, l as ParkChat } from "./router-VNKMmnlx.mjs";
import { a as speciesOf, o as usePet, r as Shell } from "./Shell-Cqn6vIRv.mjs";
import { t as PetSprite } from "./PetSprite-3Zzr--Pk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C9dkM14t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PetWalker() {
	const species = usePet((s) => s.save.species);
	const stage = usePet((s) => s.save.stage);
	const worn = usePet((s) => s.save.worn);
	const box = (0, import_react.useRef)(null);
	const face = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = box.current;
		const head = face.current;
		if (!el || !species) return;
		let x = 28;
		let y = 8;
		let tx = 48;
		let ty = 16;
		let last = performance.now();
		let frame = 0;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const tick = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			const dx = tx - x;
			const dy = ty - y;
			const dist = Math.hypot(dx, dy);
			if (dist < 1.4) {
				tx = 8 + Math.random() * 82;
				ty = 6 + Math.random() * 84;
			} else if (!reduced) {
				x += dx / dist * 7 * dt;
				y += dy / dist * 7 * dt;
				if (head && Math.abs(dx) > .6) head.classList.toggle("pet-face-right", dx > 0);
			}
			el.style.left = `${x}%`;
			el.style.top = `${y}%`;
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [species]);
	const pet = speciesOf(species);
	if (!species || !pet) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: box,
		className: "pointer-events-none absolute z-20 w-24",
		style: {
			left: "28%",
			top: "8%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: face,
			className: "pet-bob mx-auto w-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetSprite, {
				species,
				stage,
				worn,
				className: "h-20 w-20"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto w-fit rounded-full border-2 border-ink bg-paper px-2 text-xs font-bold text-ink",
			children: pet.name
		})]
	});
}
/** Fixed places on the big field, in curriculum order. x/y are percents. */
var SPOTS = {
	"6N1": {
		x: 11,
		y: 1,
		s: 1.08
	},
	"6N2": {
		x: 33,
		y: 3,
		s: .92
	},
	"6D1": {
		x: 57,
		y: 0
	},
	"6N3": {
		x: 80,
		y: 2
	},
	"6N4": {
		x: 88,
		y: 22,
		s: .9
	},
	"6M2": {
		x: 64,
		y: 20
	},
	"6M3": {
		x: 40,
		y: 18,
		s: 1.24
	},
	"6M5": {
		x: 15,
		y: 21
	},
	"6M1": {
		x: 12,
		y: 42
	},
	"6D3": {
		x: 36,
		y: 40,
		s: 1.05
	},
	"6M4": {
		x: 61,
		y: 39,
		s: 1.12
	},
	"6A1": {
		x: 85,
		y: 43
	},
	"6D2": {
		x: 73,
		y: 63,
		s: .95
	},
	"6D4": {
		x: 46,
		y: 65,
		s: .95
	},
	"6S1": {
		x: 18,
		y: 62
	},
	"enrich-turn": {
		x: 52,
		y: 85,
		s: .92
	},
	"enrich-base": {
		x: 78,
		y: 82,
		s: .9
	}
};
function trailPath(pts) {
	if (pts.length === 0) return "";
	return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}
function Station({ unit, done, start }) {
	const spot = SPOTS[unit.id] ?? {
		x: 50,
		y: 50
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "spot",
		style: {
			["--x"]: `${spot.x}%`,
			["--y"]: `${spot.y}%`,
			["--s"]: String(spot.s ?? 1)
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/ride/$id",
			params: { id: unit.id },
			className: "map-link relative flex flex-col",
			children: [
				start && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-0 right-0 z-20 rounded-full border-2 border-ink bg-paper px-2 py-0.5 text-xs font-bold text-ink",
					children: "起點"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: unit.art,
					alt: "",
					className: "map-art"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "map-label-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative z-10 mx-auto flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 bg-paper px-2 text-center " + (done ? "border-sun" : unit.enrich ? "border-dashed border-ink" : "border-ink"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-clamp-2 text-sm font-bold leading-tight text-ink",
								children: unit.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-0.5 max-w-full truncate text-xs font-medium text-ink",
								children: [unit.ride, unit.enrich ? " · 增潤" : ""]
							}),
							done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "已蓋章"
							})
						]
					}), done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -top-1 right-0 z-20 flex size-6 items-center justify-center rounded-full bg-sun text-xs font-bold text-ink",
						children: "章"
					})]
				})
			]
		})
	});
}
function HomePark() {
	const stamps = usePark((s) => s.stamps);
	const trailKey = UNITS.map((u) => u.id).join(".");
	const frameRef = (0, import_react.useRef)(null);
	const [trail, setTrail] = (0, import_react.useState)("");
	(0, import_react.useLayoutEffect)(() => {
		const frame = frameRef.current;
		if (!frame) return;
		const draw = () => {
			const box = frame.getBoundingClientRect();
			const pts = [...frame.querySelectorAll(".map-label-wrap")].map((el) => {
				const r = el.getBoundingClientRect();
				return {
					x: r.left + r.width / 2 - box.left,
					y: r.top + r.height / 2 - box.top
				};
			});
			setTrail(trailPath(pts));
		};
		draw();
		const observer = new ResizeObserver(draw);
		observer.observe(frame);
		return () => observer.disconnect();
	}, [trailKey]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "park-scroll border-x-8 border-b-8 border-sun",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: frameRef,
			className: "park-scene",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "pointer-events-none absolute inset-0 z-0 h-full w-full",
					"aria-hidden": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: trail,
						fill: "none",
						stroke: "var(--color-track)",
						strokeWidth: "22",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: trail,
						fill: "none",
						stroke: "var(--color-sun)",
						strokeWidth: "4",
						strokeDasharray: "12 9",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/park/tree.png",
					alt: "",
					className: "pointer-events-none absolute size-16",
					style: {
						left: "46%",
						top: "10%"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/park/tree.png",
					alt: "",
					className: "flip-x pointer-events-none absolute size-14",
					style: {
						left: "1%",
						top: "33%"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/park/tree.png",
					alt: "",
					className: "pointer-events-none absolute size-16",
					style: {
						left: "91%",
						top: "54%"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/park/tree.png",
					alt: "",
					className: "flip-x pointer-events-none absolute size-14",
					style: {
						left: "3%",
						top: "75%"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute size-24 rounded-full bg-grass/15",
					style: {
						left: "48%",
						top: "32%"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute size-28 rounded-full bg-grass/10",
					style: {
						left: "30%",
						top: "72%"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute h-16 w-28 rounded-full bg-grass/10",
					style: {
						left: "22%",
						top: "13%"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetWalker, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "absolute inset-0 z-10",
					children: UNITS.map((unit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Station, {
						unit,
						done: stamps.includes(unit.id),
						start: index === 0
					}, unit.id))
				})
			]
		})
	});
}
function Home() {
	const hydrate = usePark((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		heading: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-[calc(100dvh-5.25rem)] min-h-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 overflow-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hello, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePark, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParkChat, { dock: true })]
		})
	});
}
function Hello() {
	const room = useClassChat();
	const mine = room.mates.find((mate) => mate.account === room.me);
	const called = mine && mine.name !== mine.seat ? mine.name : mine?.seat || usePark.getState().nickname;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-grass",
				children: "香港小六數學"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-2xl text-ink",
				children: ["你好，", called]
			}),
			mine && mine.name !== mine.seat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: mine.seat
			}) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/pets",
				className: "inline-flex h-11 items-center rounded-2xl bg-grass px-4 text-sm font-bold text-paper",
				children: "寵物"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/profile",
				className: "inline-flex h-11 items-center rounded-2xl border-2 border-ink bg-paper px-4 text-sm font-bold",
				children: "個人資料"
			})]
		})]
	});
}
//#endregion
export { Home as component };
