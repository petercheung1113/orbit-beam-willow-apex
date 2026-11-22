import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FigureView-D1buCP24.js
var import_jsx_runtime = require_jsx_runtime();
var ink = "var(--color-ink)";
var paper = "var(--color-paper)";
var water = "color-mix(in srgb, var(--color-grass) 38%, var(--color-paper))";
var sun = "var(--color-sun)";
function num(n) {
	const rounded = Math.round((n + Math.sign(n) * 1e-10) * 1e3) / 1e3;
	return Object.is(rounded, -0) ? "0" : String(rounded);
}
function FigureView({ figure, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 rounded-2xl border-2 border-ink bg-cream px-2 py-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: figure.kind === "angles" || figure.kind === "named" || figure.kind === "folds" ? "0 0 360 248" : "0 0 360 210",
			className: className ?? "mx-auto h-auto w-full max-w-md",
			role: "img",
			"aria-hidden": true,
			children: [
				figure.kind === "cuboid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cuboid, { ...figure }),
				figure.kind === "beaker" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Beaker, { ...figure }),
				figure.kind === "blocks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blocks, { ...figure }),
				figure.kind === "lshape" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LShape, { ...figure }),
				figure.kind === "rise" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rise, { ...figure }),
				figure.kind === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Up, { ...figure }),
				figure.kind === "balance" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Balance, { ...figure }),
				figure.kind === "rect" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RectFig, { ...figure }),
				figure.kind === "tri" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriFig, { ...figure }),
				figure.kind === "trap" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrapFig, { ...figure }),
				figure.kind === "grid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HundredGrid, { ...figure }),
				figure.kind === "pbar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PercentBar, { ...figure }),
				figure.kind === "pline" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PercentLine, { ...figure }),
				figure.kind === "pchart" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PercentChart, { ...figure }),
				figure.kind === "pie" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieFig, { ...figure }),
				figure.kind === "vbars" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VBars, { ...figure }),
				figure.kind === "grow" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowFig, { ...figure }),
				figure.kind === "circle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleFig, { ...figure }),
				figure.kind === "semi" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemiFig, { ...figure }),
				figure.kind === "quarter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuarterFig, { ...figure }),
				figure.kind === "capsule" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapsuleFig, { ...figure }),
				figure.kind === "door" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorFig, { ...figure }),
				figure.kind === "wave" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveFig, { ...figure }),
				figure.kind === "angle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AngleFig, { ...figure }),
				figure.kind === "angles" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnglesFig, { ...figure }),
				figure.kind === "protractor" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtractorFig, { ...figure }),
				figure.kind === "folds" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoldsFig, {}),
				figure.kind === "named" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NamedFig, {}),
				figure.kind === "threeq" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreeQFig, { ...figure }),
				figure.kind === "inset" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsetFig, { ...figure }),
				figure.kind === "sectors" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectorsFig, { ...figure }),
				figure.kind === "fans" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FansFig, {}),
				figure.kind === "arcpair" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArcPairFig, {}),
				figure.kind === "span" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpanFig, { ...figure }),
				figure.kind === "clocks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClocksFig, { ...figure }),
				figure.kind === "hbars" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HBarsFig, { ...figure }),
				figure.kind === "trip" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripFig, { ...figure }),
				figure.kind === "line" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineFig, { ...figure }),
				figure.kind === "bars" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarsFig, { ...figure }),
				figure.kind === "sym" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymFig, { ...figure }),
				figure.kind === "gridpt" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridPt, { ...figure }),
				figure.kind === "freq" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FreqFig, { ...figure }),
				figure.kind === "pics" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicsFig, {})
			]
		})
	});
}
function label(x, y, text, anchor = "middle") {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x,
		y,
		textAnchor: anchor,
		fill: ink,
		fontSize: "14",
		fontWeight: "700",
		children: text
	});
}
function Cuboid({ l, w, h, water: depth, earlier, unit = "cm", showHeight = true }) {
	const depthX = .5;
	const depthY = .32;
	const spanW = l + w * depthX;
	const spanH = h + w * depthY;
	const s = Math.min(210 / Math.max(spanW, .001), 128 / Math.max(spanH, .001));
	const fw = l * s;
	const fd = w * s;
	const fh = h * s;
	const dx = fd * depthX;
	const dy = fd * depthY;
	const x = Math.max(64, (360 - fw - dx) / 2);
	const y = Math.min(178, 22 + fh + dy);
	const front = `${x},${y} ${x + fw},${y} ${x + fw},${y - fh} ${x},${y - fh}`;
	const side = `${x + fw},${y} ${x + fw + dx},${y - dy} ${x + fw + dx},${y - fh - dy} ${x + fw},${y - fh}`;
	const top = `${x},${y - fh} ${x + fw},${y - fh} ${x + fw + dx},${y - fh - dy} ${x + dx},${y - fh - dy}`;
	const ratio = depth === void 0 ? 0 : Math.min(1, Math.max(0, depth / h));
	const wy = y - fh * ratio;
	const waterFront = ratio > 0 ? `${x},${y} ${x + fw},${y} ${x + fw},${wy} ${x},${wy}` : "";
	const waterSide = ratio > 0 ? `${x + fw},${y} ${x + fw + dx},${y - dy} ${x + fw + dx},${wy - dy} ${x + fw},${wy}` : "";
	const earlierY = earlier === void 0 ? 0 : y - fh * Math.min(1, earlier / h);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: top,
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: side,
			fill: "var(--color-line)",
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: front,
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		ratio > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: waterFront,
			fill: water,
			stroke: "none"
		}),
		ratio > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: waterSide,
			fill: water,
			stroke: "none"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: front,
			fill: "none",
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: side,
			fill: "none",
			stroke: ink,
			strokeWidth: "2.4"
		}),
		earlier !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x,
			x2: x + fw,
			y1: earlierY,
			y2: earlierY,
			stroke: sun,
			strokeWidth: "2.2",
			strokeDasharray: "5 4"
		}),
		label(x + fw / 2, y + 22, `${num(l)} ${unit}`),
		label(x + fw + dx + 8, y - dy / 2, `${num(w)} ${unit}`, "start"),
		showHeight && label(x - 8, y - fh / 2, `${num(h)} ${unit}`, "end"),
		depth !== void 0 && label(x + fw / 2, Math.min(wy - 8, y - 16), `水深 ${num(depth)} ${unit}`),
		earlier !== void 0 && label(x - 8, earlierY, `原 ${num(earlier)}`, "end")
	] });
}
function Beaker({ before, after, unit = "mL" }) {
	const max = Math.max(before, after, 1) * 1.18;
	const x = 118;
	const top = 28;
	const bottom = 176;
	const yOf = (value) => bottom - value / max * 132;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M ${x} ${top} L 110 ${bottom} L 196 ${bottom} L 188 ${top}`,
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M 120 ${yOf(after)} L 112 174 L 194 174 L 186 ${yOf(after)} Z`,
			fill: water
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 102,
			x2: 204,
			y1: yOf(before),
			y2: yOf(before),
			stroke: sun,
			strokeWidth: "2.4",
			strokeDasharray: "5 4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 102,
			x2: 204,
			y1: yOf(after),
			y2: yOf(after),
			stroke: ink,
			strokeWidth: "2.4"
		}),
		label(214, yOf(before) + 4, `前 ${num(before)} ${unit}`, "start"),
		label(214, yOf(after) + 4, `後 ${num(after)} ${unit}`, "start")
	] });
}
function Blocks({ x: nx, y: ny, z: nz }) {
	const s = 28;
	const ox = 150 - nx * s / 2;
	const oy = 150;
	const cubes = [];
	for (let z = 0; z < nz; z += 1) for (let y = 0; y < ny; y += 1) for (let x = 0; x < nx; x += 1) {
		const px = ox + x * s + z * 14;
		const py = oy - y * s - z * 10;
		cubes.push(`${px},${py} ${px + s},${py} ${px + s},${py - s} ${px},${py - s}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [cubes.map((points) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
		points,
		fill: paper,
		stroke: ink,
		strokeWidth: "2"
	}, points)), label(180, 196, `${nx} × ${ny} × ${nz} 個 1 cm³`)] });
}
function LShape({ depth, baseL, baseH, topL, extraH }) {
	const u = 18;
	const x = 92;
	const y = 156;
	const bw = baseL * u;
	const bh = baseH * u;
	const tw = topL * u;
	const th = extraH * u;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x,
			y: y - bh,
			width: bw,
			height: bh,
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x,
			y: y - bh - th,
			width: tw,
			height: th,
			fill: "var(--color-line)",
			stroke: ink,
			strokeWidth: "2.4"
		}),
		label(x + bw / 2, 174, `底長 ${num(baseL)} cm`),
		label(x + bw + 8, y - bh / 2, `高 ${num(baseH)} cm`, "start"),
		label(x + tw / 2, y - bh - th - 8, `上長 ${num(topL)} cm`),
		label(84, y - bh - th / 2, `再高 ${num(extraH)} cm`, "end"),
		label(180, 198, `深 ${num(depth)} cm`)
	] });
}
function Rise({ l, w, from, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cuboid, {
		l,
		w,
		h: Math.max(from, to) + 2,
		water: to,
		earlier: from,
		unit: "cm",
		showHeight: false
	});
}
function Up({ l, w, rise }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "78",
			y: "54",
			width: "200",
			height: "100",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		label(178, 110, "底面"),
		label(178, 178, `長 ${num(l)} cm`),
		label(292, 110, `闊 ${num(w)} cm`, "start"),
		label(178, 36, `水面上升 ${num(rise)} cm`)
	] });
}
function Balance({ left, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "180,86 166,158 194,158",
			fill: ink
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "36",
			y1: "86",
			x2: "324",
			y2: "86",
			stroke: ink,
			strokeWidth: "4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "180",
			cy: "86",
			r: "7",
			fill: sun,
			stroke: ink,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "70",
			y1: "86",
			x2: "70",
			y2: "108",
			stroke: ink,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "290",
			y1: "86",
			x2: "290",
			y2: "108",
			stroke: ink,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "24",
			y: "108",
			width: "92",
			height: "40",
			rx: "10",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "244",
			y: "108",
			width: "92",
			height: "40",
			rx: "10",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		label(70, 134, left),
		label(290, 134, right)
	] });
}
function RectFig({ length, width, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "78",
			y: "42",
			width: "180",
			height: "100",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		label(168, 168, length),
		label(276, 96, width, "start"),
		label(168, 28, note)
	] });
}
function TriFig({ base, height, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "70,160 290,160 180,48",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "180",
			y1: "48",
			x2: "180",
			y2: "160",
			stroke: ink,
			strokeWidth: "1.6",
			strokeDasharray: "5 4"
		}),
		label(180, 186, base),
		label(168, 108, height, "end"),
		label(180, 28, note)
	] });
}
function TrapFig({ top, bottom, height, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "110,52 250,52 300,160 60,160",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "180",
			y1: "52",
			x2: "180",
			y2: "160",
			stroke: ink,
			strokeWidth: "1.6",
			strokeDasharray: "5 4"
		}),
		label(180, 40, top),
		label(180, 186, bottom),
		label(196, 108, height, "start"),
		label(180, 22, note)
	] });
}
function HundredGrid({ shaded, caption }) {
	const size = 15;
	const x0 = 105;
	const y0 = 16;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [Array.from({ length: 100 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: x0 + i % 10 * size,
		y: y0 + Math.floor(i / 10) * size,
		width: size,
		height: size,
		fill: i < shaded ? sun : paper,
		stroke: ink,
		strokeWidth: "1"
	}, i)), label(180, 196, caption ?? `塗色 ${shaded} 格，共 100 格`)] });
}
function PercentBar({ parts, shaded }) {
	const x0 = 24;
	const w = 312 / parts;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [Array.from({ length: parts }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: x0 + i * w,
		y: 72,
		width: w,
		height: 52,
		fill: i < shaded ? sun : paper,
		stroke: ink,
		strokeWidth: "1.5"
	}, i)), label(180, 164, `${shaded} 份塗色，共 ${parts} 份`)] });
}
function PercentLine({ at }) {
	const ticks = [
		"0%",
		"25%",
		"50%",
		"75%",
		"100%"
	];
	const x0 = 28;
	const x1 = 332;
	const y = 96;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: x0,
		y1: y,
		x2: x1,
		y2: y,
		stroke: ink,
		strokeWidth: "3"
	}), ticks.map((tick, i) => {
		const x = x0 + i * 304 / 4;
		const on = tick === at;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x,
				y1: 82,
				x2: x,
				y2: 110,
				stroke: ink,
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: x,
				cy: y,
				r: on ? 8 : 4,
				fill: on ? sun : paper,
				stroke: ink,
				strokeWidth: "2"
			}),
			label(x, 136, tick)
		] }, tick);
	})] });
}
function PercentChart({ known, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: [
		"分數",
		"小數",
		"百分數"
	].map((name, i) => {
		const x = 30 + i * 108;
		const filled = name === known;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x,
				y: 46,
				width: 92,
				height: 36,
				rx: "8",
				fill: paper,
				stroke: ink,
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x,
				y: 90,
				width: 92,
				height: 52,
				rx: "8",
				fill: filled ? sun : paper,
				stroke: ink,
				strokeWidth: "2"
			}),
			label(x + 46, 70, name),
			label(x + 46, 122, filled ? value : "？")
		] }, name);
	}) });
}
function PieFig({ slices }) {
	const fills = [
		sun,
		water,
		"#e7c9b0",
		"#c9d7c2"
	];
	const cx = 118;
	const cy = 108;
	const r = 78;
	let a0 = -Math.PI / 2;
	const arcs = slices.map((slice, i) => {
		const a1 = a0 + slice.pct / 100 * Math.PI * 2;
		const large = slice.pct > 50 ? 1 : 0;
		const x0 = cx + r * Math.cos(a0);
		const y0 = cy + r * Math.sin(a0);
		const x1 = cx + r * Math.cos(a1);
		const y1 = cy + r * Math.sin(a1);
		const d = `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
		a0 = a1;
		return {
			d,
			fill: fills[i % fills.length],
			text: `${slice.label} ${slice.pct}%`
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [arcs.map((arc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: arc.d,
		fill: arc.fill,
		stroke: ink,
		strokeWidth: "2"
	}, arc.text)), arcs.map((arc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: 214,
		y: 58 + i * 36,
		width: 18,
		height: 18,
		fill: arc.fill,
		stroke: ink,
		strokeWidth: "1.5"
	}), label(240, 72 + i * 36, arc.text, "start")] }, arc.text))] });
}
function VBars({ max, unit, items }) {
	const bw = 46;
	const gap = 36;
	const base = 162;
	const hMax = 100;
	const x0 = (360 - (items.length * bw + (items.length - 1) * gap)) / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		label(180, 28, `每班 ${max} ${unit}`),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 48,
			y1: base,
			x2: 312,
			y2: base,
			stroke: ink,
			strokeWidth: "2"
		}),
		items.map((item, i) => {
			const h = item.value / max * hMax;
			const x = x0 + i * 82;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x,
					y: base - h,
					width: bw,
					height: h,
					fill: sun,
					stroke: ink,
					strokeWidth: "2"
				}),
				label(x + bw / 2, base - h - 10, `${item.value}`),
				label(x + bw / 2, 186, item.label)
			] }, item.label);
		})
	] });
}
function GrowFig({ from, pct }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: 36,
			y: 78,
			width: 150,
			height: 44,
			rx: "8",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		label(111, 106, `${from}`),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 200,
			y1: 100,
			x2: 268,
			y2: 100,
			stroke: ink,
			strokeWidth: "3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "286,100 268,90 268,110",
			fill: ink
		}),
		label(243, 78, `增加 ${pct}%`)
	] });
}
var blue = "#1a6bb5";
function CircleFig({ mark, value, caption }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "180",
			cy: "104",
			r: "74",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "180",
			cy: "104",
			r: "3.4",
			fill: ink
		}),
		mark === "d" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "106",
			y1: "104",
			x2: "254",
			y2: "104",
			stroke: blue,
			strokeWidth: "3"
		}), label(180, 88, value)] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "180",
				y1: "104",
				x2: "246",
				y2: "62",
				stroke: blue,
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "246",
				cy: "62",
				r: "3.2",
				fill: blue
			}),
			label(214, 52, value)
		] }),
		caption ? label(180, 196, caption) : null
	] });
}
function SemiFig({ value, as = "d" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 70 132 A 110 110 0 0 1 290 132",
			fill: "#d7e6f5",
			stroke: ink,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "70",
			y1: "132",
			x2: "290",
			y2: "132",
			stroke: blue,
			strokeWidth: "3"
		}),
		as === "r" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "180",
			cy: "132",
			r: "3.2",
			fill: ink
		}), label(236, 122, value)] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "70",
				y1: "150",
				x2: "290",
				y2: "150",
				stroke: ink,
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "70,150 82,144 82,156",
				fill: ink
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "290,150 278,144 278,156",
				fill: ink
			}),
			label(180, 174, value)
		] })
	] });
}
function QuarterFig({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 230 150 A 100 100 0 0 0 130 50 L 130 150 Z",
			fill: "#e7eef6",
			stroke: ink,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "130",
			y: "136",
			width: "14",
			height: "14",
			fill: "none",
			stroke: ink,
			strokeWidth: "1.6"
		}),
		label(180, 188, value),
		label(112, 104, value, "end"),
		label(196, 78, "弧")
	] });
}
function CapsuleFig({ length, width }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 48 48 H 196 V 148 H 48 Z",
			fill: "#f4f1ea",
			stroke: ink,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 196 48 A 50 50 0 0 1 196 148",
			fill: "#d7e6f5",
			stroke: blue,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "196",
			y1: "48",
			x2: "196",
			y2: "148",
			stroke: ink,
			strokeWidth: "1.6",
			strokeDasharray: "5 4"
		}),
		label(122, 38, length),
		label(122, 176, length),
		label(248, 104, width, "start")
	] });
}
function DoorFig({ side }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 110 96 A 70 70 0 0 1 250 96",
			fill: "#d7e6f5",
			stroke: ink,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "110",
			y: "96",
			width: "140",
			height: "78",
			fill: "#f4f1ea",
			stroke: ink,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "110",
			y1: "96",
			x2: "250",
			y2: "96",
			stroke: blue,
			strokeWidth: "3"
		}),
		label(180, 88, side),
		label(92, 140, side, "end"),
		label(268, 140, side, "start"),
		label(180, 192, side)
	] });
}
function WaveFig({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 40 108 A 70 70 0 0 0 180 108",
			fill: "none",
			stroke: ink,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 180 108 A 70 70 0 0 1 320 108",
			fill: "none",
			stroke: ink,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "40",
			y1: "108",
			x2: "320",
			y2: "108",
			stroke: blue,
			strokeWidth: "2",
			strokeDasharray: "6 4"
		}),
		label(110, 128, value),
		label(250, 96, value)
	] });
}
function angleGeom(deg, turn, len, arcR) {
	const rad = (turn === "cw" ? -deg : deg) * Math.PI / 180;
	const x2 = Math.cos(rad) * len;
	const y2 = -Math.sin(rad) * len;
	const ax = Math.cos(rad) * arcR;
	const ay = -Math.sin(rad) * arcR;
	return {
		x2,
		y2,
		d: `M ${arcR} 0 A ${arcR} ${arcR} 0 ${deg > 180 ? 1 : 0} ${turn === "cw" ? 1 : 0} ${ax} ${ay}`
	};
}
function AngleMark({ cx, cy, deg, turn, scale = 1 }) {
	const len = 72 * scale;
	const ray = angleGeom(deg, turn, len, 26 * scale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx,
			y1: cy,
			x2: cx + len,
			y2: cy,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx,
			y1: cy,
			x2: cx + ray.x2,
			y2: cy + ray.y2,
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx,
			cy,
			r: 3.2,
			fill: ink
		}),
		deg === 90 && !turn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: cx,
			y: cy - 14 * scale,
			width: 14 * scale,
			height: 14 * scale,
			fill: "none",
			stroke: blue,
			strokeWidth: "2"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			transform: `translate(${cx} ${cy})`,
			d: ray.d,
			fill: "none",
			stroke: blue,
			strokeWidth: "2.4"
		}),
		label(cx + (turn === "cw" ? 18 : 8) * scale, cy - 16 * scale, `${deg}°`, "start")
	] });
}
function AngleFig({ deg, name, turn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AngleMark, {
			cx: 120,
			cy: 130,
			deg,
			turn
		}),
		name ? label(250, 120, name) : null,
		turn ? label(250, 148, turn === "cw" ? "順時針" : "逆時針") : null
	] });
}
function AnglesFig({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: items.map((item, index) => {
		const col = index % 3;
		const row = Math.floor(index / 3);
		const cx = 58 + col * 118;
		const cy = 64 + row * 112;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AngleMark, {
			cx,
			cy,
			deg: item.deg,
			scale: .62
		}), label(cx + 28, cy + 28, item.name)] }, item.name);
	}) });
}
function ProtractorFig({ deg }) {
	const cx = 168;
	const cy = 150;
	const r = 108;
	const ticks = Array.from({ length: 19 }, (_, i) => i * 10);
	const rad = deg * Math.PI / 180;
	const x = cx + Math.cos(rad) * 100;
	const y = cy - Math.sin(rad) * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M 60 ${cy} A ${r} ${r} 0 0 1 276 ${cy}`,
			fill: "#f4f1ea",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 44,
			y1: cy,
			x2: 304,
			y2: cy,
			stroke: ink,
			strokeWidth: "2.2"
		}),
		ticks.map((tick) => {
			const a = tick * Math.PI / 180;
			const inner = tick % 30 === 0 ? 92 : 99;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx + Math.cos(a) * inner,
				y1: cy - Math.sin(a) * inner,
				x2: cx + Math.cos(a) * r,
				y2: cy - Math.sin(a) * r,
				stroke: ink,
				strokeWidth: "1.4"
			}, tick);
		}),
		label(284, 142, "0°", "start"),
		label(cx, 36, "90°"),
		label(52, 142, "180°", "end"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx,
			y1: cy,
			x2: x,
			y2: y,
			stroke: blue,
			strokeWidth: "2.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx,
			cy,
			r: "3.4",
			fill: ink
		}),
		label(196, 132, `${deg}°`, "start")
	] });
}
function FoldsFig() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [[
		{
			x: 62,
			title: "對摺一次",
			deg: "180°",
			sweep: 180
		},
		{
			x: 180,
			title: "對摺兩次",
			deg: "90°",
			sweep: 90
		},
		{
			x: 298,
			title: "對摺三次",
			deg: "45°",
			sweep: 45
		}
	].map((fold) => {
		const rad = fold.sweep * Math.PI / 180;
		const ax = fold.x + Math.cos(rad) * 22;
		const ay = 78 - Math.sin(rad) * 22;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: fold.x,
				cy: 78,
				r: "42",
				fill: paper,
				stroke: ink,
				strokeWidth: "2.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${fold.x + 22} 78 A 22 22 0 ${fold.sweep > 180 ? 1 : 0} 0 ${ax} ${ay} L ${fold.x} 78 Z`,
				fill: "#d7e6f5",
				stroke: blue,
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: fold.x - 42,
				y1: 78,
				x2: fold.x + 42,
				y2: 78,
				stroke: ink,
				strokeWidth: "1.6"
			}),
			label(fold.x, 28, fold.deg),
			label(fold.x, 142, fold.title)
		] }, fold.title);
	}), label(180, 176, "虛線是摺痕，色塊是摺後蓋住的部分")] });
}
function NamedFig() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "28",
			y1: "78",
			x2: "92",
			y2: "28",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "28",
			y1: "78",
			x2: "108",
			y2: "108",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "28",
			cy: "78",
			r: "3",
			fill: ink
		}),
		label(18, 96, "B"),
		label(100, 24, "A"),
		label(116, 122, "C"),
		label(70, 150, "∠ABC"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "168",
			y1: "108",
			x2: "214",
			y2: "36",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "168",
			y1: "108",
			x2: "250",
			y2: "118",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "168",
			cy: "108",
			r: "3",
			fill: ink
		}),
		label(156, 126, "A"),
		label(208, 150, "∠A"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "286",
			y1: "108",
			x2: "330",
			y2: "30",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "286",
			y1: "108",
			x2: "352",
			y2: "112",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "286",
			cy: "108",
			r: "3",
			fill: ink
		}),
		label(318, 78, "a"),
		label(318, 150, "∠a")
	] });
}
function ThreeQFig({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 250 116 A 78 78 0 1 0 172 38 L 172 116 Z",
			fill: "#d7e6f5",
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "172",
			cy: "116",
			r: "3",
			fill: ink
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "172",
			y1: "116",
			x2: "250",
			y2: "116",
			stroke: blue,
			strokeWidth: "2.4"
		}),
		label(214, 108, value)
	] });
}
function InsetFig({ side }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "100",
			y: "36",
			width: "140",
			height: "140",
			fill: "#f4f1ea",
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "170",
			cy: "106",
			r: "70",
			fill: "#d7e6f5",
			stroke: blue,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "170",
			y1: "106",
			x2: "240",
			y2: "106",
			stroke: blue,
			strokeWidth: "2"
		}),
		label(205, 98, "半徑"),
		label(170, 196, `邊長 ${side}`)
	] });
}
function SectorsFig({ parts, shaded, note }) {
	const cx = 150;
	const cy = 100;
	const r = 68;
	const slices = Array.from({ length: parts }, (_, index) => {
		const a0 = -Math.PI / 2 + index * 2 * Math.PI / parts;
		const a1 = -Math.PI / 2 + (index + 1) * 2 * Math.PI / parts;
		const large = a1 - a0 > Math.PI ? 1 : 0;
		const d = `M ${cx} ${cy} L ${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A ${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} Z`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: index < shaded ? "#d7e6f5" : paper,
			stroke: ink,
			strokeWidth: "2"
		}, index);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [slices, note ? label(180, 190, note) : null] });
}
function FansFig() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "78",
			cy: "78",
			r: "48",
			fill: paper,
			stroke: ink,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 78 78 L 78 30 A 48 48 0 0 1 126 78 Z",
			fill: "#d7e6f5",
			stroke: ink,
			strokeWidth: "1.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 78 78 L 126 78 A 48 48 0 0 1 78 126 Z",
			fill: paper,
			stroke: ink,
			strokeWidth: "1.4"
		}),
		label(78, 142, "扇形較少"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "150,78 168,70 168,86",
			fill: ink
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "188",
			y: "48",
			width: "140",
			height: "62",
			fill: "#d7e6f5",
			stroke: ink,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 188 48 Q 223 36 258 48 T 328 48",
			fill: "none",
			stroke: blue,
			strokeWidth: "2"
		}),
		label(258, 142, "扇形愈多，愈接近長方形")
	] });
}
function ArcPairFig() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 150 150 A 70 70 0 0 0 80 80 L 80 150 Z",
			fill: "#d7e6f5",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		label(110, 176, "四分一圓"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 190 150 A 70 70 0 0 1 330 150 Z",
			fill: "#e7eef6",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "190",
			y1: "150",
			x2: "330",
			y2: "150",
			stroke: blue,
			strokeWidth: "2.4"
		}),
		label(260, 176, "半圓"),
		label(180, 28, "半徑相同")
	] });
}
function SpanFig({ from, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "46",
			y1: "70",
			x2: "314",
			y2: "70",
			stroke: blue,
			strokeWidth: "3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "46,70 58,64 58,76",
			fill: blue
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "314,70 302,64 302,76",
			fill: blue
		}),
		label(180, 52, "時間間隔？"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "54",
			y1: "108",
			x2: "306",
			y2: "108",
			stroke: ink,
			strokeWidth: "2.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "54",
			cy: "108",
			r: "5",
			fill: ink
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "306",
			cy: "108",
			r: "5",
			fill: ink
		}),
		label(70, 140, from),
		label(290, 140, to)
	] });
}
function clockHand(cx, cy, deg, len, color, width) {
	const t = deg * Math.PI / 180;
	const x = cx + Math.sin(t) * len;
	const y = cy - Math.cos(t) * len;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: cx,
		y1: cy,
		x2: x,
		y2: y,
		stroke: color,
		strokeWidth: width,
		strokeLinecap: "round"
	});
}
function OneClock({ cx, h, m, caption }) {
	const hour = h % 12 * 30 + m * .5;
	const minute = m * 6;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx,
			cy: 78,
			r: "48",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.2"
		}),
		[
			12,
			3,
			6,
			9
		].map((n) => {
			const t = n * 30 * Math.PI / 180;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: cx + Math.sin(t) * 34,
				y: 78 - Math.cos(t) * 34 + 4,
				textAnchor: "middle",
				fill: ink,
				fontSize: "12",
				fontWeight: "700",
				children: n
			}, n);
		}),
		clockHand(cx, 78, hour, 22, ink, 3.4),
		clockHand(cx, 78, minute, 32, blue, 2.2),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx,
			cy: 78,
			r: "3",
			fill: ink
		}),
		label(cx, 146, caption)
	] });
}
function ClocksFig({ times }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: times.slice(0, 2).map((time, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OneClock, {
		cx: index === 0 ? 100 : 250,
		h: time.h,
		m: time.m,
		caption: time.label
	}, time.label)) });
}
function HBarsFig({ unit, items }) {
	const max = Math.max(...items.map((item) => item.value), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [items.map((item, index) => {
		const y = 46 + index * 42;
		const w = item.value / max * 210;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			label(48, y + 16, item.label, "end"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "58",
				y,
				width: w,
				height: "24",
				fill: index === 0 ? "#d7e6f5" : "#eee7dc",
				stroke: ink,
				strokeWidth: "1.8"
			}),
			label(66 + w, y + 17, `${item.value}`, "start")
		] }, item.label);
	}), label(180, 190, unit)] });
}
function TripFig({ xLabel, yLabel, xMax, yMax, points }) {
	const left = 58;
	const right = 328;
	const top = 24;
	const bottom = 160;
	const xStep = xMax <= 8 ? 1 : xMax <= 30 ? 5 : 1;
	const yStep = yMax <= 40 ? 10 : yMax <= 160 ? 20 : 300;
	const X = (x) => left + x / xMax * 270;
	const Y = (y) => bottom - y / yMax * 136;
	const d = points.map((point, index) => `${index === 0 ? "M" : "L"} ${X(point[0] ?? 0)} ${Y(point[1] ?? 0)}`).join(" ");
	const xs = [];
	const ys = [];
	for (let x = 0; x <= xMax + .001; x += xStep) xs.push(Math.round(x * 10) / 10);
	for (let y = 0; y <= yMax + .001; y += yStep) ys.push(y);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		ys.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: left,
			y1: Y(y),
			x2: right,
			y2: Y(y),
			stroke: "#eadfce",
			strokeWidth: "1"
		}, `y${y}`)),
		xs.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: X(x),
			y1: top,
			x2: X(x),
			y2: bottom,
			stroke: "#eadfce",
			strokeWidth: "1"
		}, `x${x}`)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: left,
			y1: bottom,
			x2: right,
			y2: bottom,
			stroke: ink,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: left,
			y1: top,
			x2: left,
			y2: bottom,
			stroke: ink,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: blue,
			strokeWidth: "2.6"
		}),
		points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: X(point[0] ?? 0),
			cy: Y(point[1] ?? 0),
			r: "3.4",
			fill: blue
		}, `${point[0]}-${point[1]}`)),
		xs.filter((_, index) => index % (xs.length > 8 ? 2 : 1) === 0).map((x) => label(X(x), 178, String(x))),
		ys.map((y) => label(50, Y(y) + 4, String(y), "end")),
		label(190, 198, xLabel),
		label(200, 16, yLabel)
	] });
}
var coral = "#c46b4a";
function LineFig({ xLabel, yLabel, cats, series }) {
	const vals = series.flatMap((item) => item.values.filter((value) => value != null));
	const minV = Math.min(...vals);
	const maxV = Math.max(...vals);
	const lo = minV > 0 && maxV - minV < minV * .45 ? Math.max(0, Math.floor(minV - (maxV - minV || 1))) : 0;
	const hi = maxV;
	const left = 46;
	const right = series.length > 1 ? 300 : 332;
	const top = 36;
	const bottom = 156;
	const X = (index) => left + (cats.length <= 1 ? .5 : index / (cats.length - 1)) * (right - left);
	const Y = (value) => bottom - (value - lo) / (hi - lo || 1) * 120;
	const colors = [blue, coral];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: left,
			y1: bottom,
			x2: right,
			y2: bottom,
			stroke: ink,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: left,
			y1: top,
			x2: left,
			y2: bottom,
			stroke: ink,
			strokeWidth: "2"
		}),
		cats.map((cat, index) => label(X(index), 174, cat)),
		series.map((item, seriesIndex) => {
			const color = colors[seriesIndex % colors.length] ?? blue;
			let path = "";
			const dots = [];
			item.values.forEach((value, index) => {
				if (value == null) {
					path = "";
					return;
				}
				const x = X(index);
				const y = Y(value);
				path += `${path ? " L" : "M"} ${x} ${y}`;
				dots.push({
					x,
					y
				});
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: path,
				fill: "none",
				stroke: color,
				strokeWidth: "2.6"
			}), dots.map((dot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: dot.x,
				cy: dot.y,
				r: "3.4",
				fill: color
			}, `${item.name}-${dot.x}`))] }, item.name);
		}),
		series.length > 1 ? series.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 308,
			y1: 48 + index * 22,
			x2: 328,
			y2: 48 + index * 22,
			stroke: colors[index],
			strokeWidth: "3"
		}), label(332, 52 + index * 22, item.name, "start")] }, item.name)) : null,
		label(188, 196, xLabel),
		label(150, 18, yLabel),
		label(40, Y(lo) + 4, String(lo), "end"),
		label(40, Y(hi) + 4, String(hi), "end")
	] });
}
function BarsFig({ unit, items, mean }) {
	const nums = items.map((item) => item.value ?? 0);
	const max = Math.max(...nums, mean ?? 0, 1);
	const bw = Math.min(42, Math.floor(250 / items.length));
	const gap = 16;
	const base = 158;
	const hMax = 96;
	const x0 = (360 - (items.length * bw + (items.length - 1) * gap)) / 2;
	const yOf = (value) => base - value / max * hMax;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 36,
			y1: base,
			x2: 330,
			y2: base,
			stroke: ink,
			strokeWidth: "2"
		}),
		mean != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 36,
			y1: yOf(mean),
			x2: 330,
			y2: yOf(mean),
			stroke: coral,
			strokeWidth: "2",
			strokeDasharray: "5 4"
		}), label(42, yOf(mean) - 8, `平均 ${mean}`, "start")] }) : null,
		items.map((item, index) => {
			const x = x0 + index * (bw + gap);
			if (item.value == null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x,
					y: 130,
					width: bw,
					height: 28,
					fill: "none",
					stroke: ink,
					strokeDasharray: "4 3",
					strokeWidth: "2"
				}),
				label(x + bw / 2, 118, "？"),
				label(x + bw / 2, 178, item.label)
			] }, item.label);
			const h = item.value / max * hMax;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x,
					y: base - h,
					width: bw,
					height: h,
					fill: sun,
					stroke: ink,
					strokeWidth: "2"
				}),
				label(x + bw / 2, base - h - 12, String(item.value)),
				label(x + bw / 2, 178, item.label)
			] }, item.label);
		}),
		label(180, 196, unit)
	] });
}
function axisLine(x1, y1, x2, y2) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1,
		y1,
		x2,
		y2,
		stroke: blue,
		strokeWidth: "2.2",
		strokeDasharray: "6 4"
	});
}
function SymFig({ shape, axes = "one" }) {
	if (shape === "trio") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "28",
			y: "58",
			width: "78",
			height: "78",
			fill: paper,
			stroke: ink,
			strokeWidth: "2"
		}),
		axisLine(67, 58, 67, 136),
		axisLine(28, 97, 106, 97),
		label(67, 168, "正方形"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "136",
			y: "70",
			width: "92",
			height: "54",
			fill: paper,
			stroke: ink,
			strokeWidth: "2"
		}),
		axisLine(182, 70, 182, 124),
		label(182, 168, "長方形"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "292,48 258,142 326,142",
			fill: paper,
			stroke: ink,
			strokeWidth: "2"
		}),
		axisLine(292, 48, 292, 142),
		label(292, 168, "等腰三角形")
	] });
	if (shape === "butterfly") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 180 108 C 140 40 70 50 78 100 C 70 150 140 160 180 108 C 220 160 290 150 282 100 C 290 50 220 40 180 108 Z",
			fill: "#d7e6f5",
			stroke: ink,
			strokeWidth: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "132",
			cy: "92",
			r: "8",
			fill: coral
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "214",
			y: "84",
			width: "16",
			height: "16",
			fill: sun,
			stroke: ink
		}),
		axisLine(180, 42, 180, 168),
		label(180, 190, "外框左右相同，花紋不同")
	] });
	if (shape === "fold") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 180 36 L 250 150 L 110 150 Z",
			fill: "#d7e6f5",
			stroke: ink,
			strokeWidth: "2.2"
		}),
		axisLine(180, 36, 180, 150),
		label(180, 178, "沿虛線對摺，兩邊重合")
	] });
	const body = (() => {
		if (shape === "square") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "110",
			y: "36",
			width: "140",
			height: "140",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		});
		if (shape === "rect") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "70",
			y: "58",
			width: "220",
			height: "110",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		});
		if (shape === "iso") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "180,36 86,168 274,168",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		});
		if (shape === "equi") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "180,34 78,176 282,176",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		});
		if (shape === "rhombus") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "180,28 292,108 180,188 68,108",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "180",
			cy: "108",
			r: "78",
			fill: paper,
			stroke: ink,
			strokeWidth: "2.4"
		});
	})();
	const lines = [];
	if (shape === "square") {
		if (axes === "one" || axes === "two" || axes === "four" || axes === "partial" || axes === "ab") lines.push({
			x1: 180,
			y1: 36,
			x2: 180,
			y2: 176
		});
		if (axes === "two" || axes === "four" || axes === "partial") lines.push({
			x1: 110,
			y1: 106,
			x2: 250,
			y2: 106
		});
		if (axes === "four") lines.push({
			x1: 110,
			y1: 36,
			x2: 250,
			y2: 176
		}, {
			x1: 250,
			y1: 36,
			x2: 110,
			y2: 176
		});
		if (axes === "ab") lines.push({
			x1: 110,
			y1: 70,
			x2: 250,
			y2: 150
		});
	} else if (shape === "rect") {
		lines.push({
			x1: 180,
			y1: 58,
			x2: 180,
			y2: 168
		});
		if (axes === "two" || axes === "four") lines.push({
			x1: 70,
			y1: 113,
			x2: 290,
			y2: 113
		});
	} else if (shape === "iso" || shape === "equi") {
		lines.push({
			x1: 180,
			y1: 36,
			x2: 180,
			y2: 172
		});
		if (shape === "equi" && (axes === "three" || axes === "four")) lines.push({
			x1: 78,
			y1: 176,
			x2: 231,
			y2: 70
		}, {
			x1: 282,
			y1: 176,
			x2: 129,
			y2: 70
		});
	} else if (shape === "rhombus") {
		lines.push({
			x1: 180,
			y1: 28,
			x2: 180,
			y2: 188
		});
		if (axes !== "one") lines.push({
			x1: 68,
			y1: 108,
			x2: 292,
			y2: 108
		});
	} else {
		lines.push({
			x1: 102,
			y1: 108,
			x2: 258,
			y2: 108
		}, {
			x1: 180,
			y1: 30,
			x2: 180,
			y2: 186
		});
		if (axes === "many") lines.push({
			x1: 124,
			y1: 52,
			x2: 236,
			y2: 164
		});
		if (axes === "mixed") lines.push({
			x1: 116,
			y1: 78,
			x2: 230,
			y2: 78
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		body,
		lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: axisLine(line.x1, line.y1, line.x2, line.y2) }, `${line.x1}-${line.y1}-${line.x2}`)),
		axes === "ab" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [label(196, 28, "甲"), label(258, 158, "乙")] }) : null
	] });
}
function GridPt({ axis, axisAt, dots, note }) {
	const cols = 8;
	const rows = 6;
	const size = 22;
	const x0 = 78;
	const y0 = 24;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		Array.from({ length: rows }, (_, row) => Array.from({ length: cols }, (_, col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x0 + col * size,
			y: y0 + row * size,
			width: size,
			height: size,
			fill: paper,
			stroke: "#eadfce",
			strokeWidth: "1"
		}, `${col}-${row}`))),
		axis === "v" ? axisLine(x0 + axisAt * size, y0, x0 + axisAt * size, 156) : axisLine(x0, y0 + axisAt * size, 254, y0 + axisAt * size),
		dots.map((dot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: x0 + dot.c * size,
			cy: y0 + dot.r * size,
			r: "5",
			fill: coral
		}), dot.name ? label(x0 + dot.c * size, y0 + dot.r * size - 12, dot.name) : null] }, `${dot.c}-${dot.r}`)),
		note ? label(180, 186, note) : null
	] });
}
function FreqFig({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "70",
			y: "36",
			width: "220",
			height: "36",
			fill: "#efe6d6",
			stroke: ink,
			strokeWidth: "1.6"
		}),
		label(125, 60, "類別"),
		label(230, 60, "頻數"),
		rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "70",
				y: 72 + index * 32,
				width: "220",
				height: "32",
				fill: paper,
				stroke: ink,
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "180",
				y1: 72 + index * 32,
				x2: "180",
				y2: 104 + index * 32,
				stroke: ink,
				strokeWidth: "1.2"
			}),
			label(125, 94 + index * 32, row.label),
			label(230, 94 + index * 32, String(row.n))
		] }, row.label))
	] });
}
function PicsFig() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [label(180, 28, "每個圖案應代表 1 人"), [
		{
			x: 70,
			r: 16
		},
		{
			x: 170,
			r: 28
		},
		{
			x: 270,
			r: 16
		}
	].map((icon) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: icon.x,
		cy: 100,
		r: icon.r,
		fill: sun,
		stroke: ink,
		strokeWidth: "2"
	}), label(icon.x, 168, "1 人")] }, icon.x))] });
}
//#endregion
export { FigureView as t };
