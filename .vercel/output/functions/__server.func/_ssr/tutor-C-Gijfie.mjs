import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as UNITS } from "./units-9gg8Qwt9.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
import { n as hasProfanity, t as PROFANITY_ERROR } from "./profanity-BWxlDsA2.mjs";
import { t as studentStamp } from "./student-iJdruc8c.mjs";
import { n as recordTutor } from "./teacher.functions-Scv-njag.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-C-Gijfie.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function detect(text) {
	const t = text.replace(/\s+/g, "");
	if (!t) return null;
	if (t.includes("圓形圖") || t.includes("圓心角")) return "6D3";
	if (t.includes("旋轉對稱")) return "enrich-turn";
	if ((t.includes("周界") || t.includes("圓周")) && t.includes("面積") && t.includes("圓")) return "circle-both";
	if (t.includes("圓面積") || t.includes("圓形面積") || t.includes("圓的面積") || t.includes("半圓面積")) return "6M5";
	if (t.includes("面積") && /圓|半徑|直徑|半圓/.test(t)) return "6M5";
	if (t.includes("圓周") || t.includes("周界")) return "6M3";
	if (t.includes("折線") && (t.includes("棒形") || t.includes("圓形") || t.includes("分別"))) return "6D4";
	if (t.includes("折線")) return "6D2";
	if (t.includes("棒形") || t.includes("誤導") || t.includes("統計")) return "6D4";
	if (t.includes("對稱")) return "6S1";
	if (t.includes("一打") || t.includes("非十進")) return "enrich-base";
	if (t.includes("方程") || t.includes("未知數")) return "6A1";
	if (t.includes("速率") || t.includes("公里每小時") || t.includes("路程") && t.includes("時間")) return "6M4";
	if (/體積|容量|立方|毫升|排水/.test(t)) return "6M2";
	if (/銳角|鈍角|平角|周角|反角|量角器|度數|角度|直角/.test(t)) return "6M1";
	if (t.includes("平均")) return "6D1";
	if (t.includes("小數") && t.includes("分數")) return "6N2";
	if (/百分之幾|增加百|減少百|原數的|的60%|的百分之/.test(t)) return "6N4";
	if (t.includes("百分")) return "6N3";
	if (/小數點|除以10|除以十|除以100|除以0\.|小數除/.test(t) || t.includes("小數")) return "6N1";
	return null;
}
function lines(unit) {
	return unit.learn.map((line) => `・${line}`).join("\n");
}
function example(unit, text) {
	const nums = text.match(/\d+(?:\.\d+)?/g) ?? [];
	let best = unit.questions[0];
	let bestScore = 0;
	for (const question of unit.questions) {
		const found = question.stem.match(/\d+(?:\.\d+)?/g) ?? [];
		const score = nums.filter((num) => found.includes(num)).length;
		if (score > bestScore) {
			bestScore = score;
			best = question;
		}
	}
	return best ? `例如：${best.why}` : "你先試一步，再把答案打過來。";
}
function tutorReply(message, topicId) {
	const compact = message.replace(/\s+/g, "");
	const detected = detect(compact);
	if (detected === "circle-both") {
		const peri = UNITS.find((unit) => unit.id === "6M3");
		const area = UNITS.find((unit) => unit.id === "6M5");
		if (peri && area) return {
			topic: "圓的周界和面積",
			text: `圓的周界和圓面積是兩條不同的式，不要混在一起。\n\n周界\n${lines(peri)}\n\n面積\n${lines(area)}\n\n${example(area, compact)}`
		};
	}
	const unitId = detected && detected !== "circle-both" ? detected : topicId !== "all" ? topicId : null;
	const unit = UNITS.find((item) => item.id === unitId);
	if (!unit) return {
		topic: "未定課題",
		text: "你把題目再打清楚一點，例如「圓形面積點計」或者「36 除以 10」。"
	};
	const guard = compact.includes("圓形") && compact.includes("面積") && !compact.includes("圓形圖") ? "你問的是圓面積，不是圓形圖。\n\n" : "";
	return {
		topic: unit.name,
		text: `${guard}${unit.name}可以這樣算。\n\n${lines(unit)}\n\n${example(unit, compact)}`
	};
}
var SUGGESTIONS = [
	"除以 10、100、1000，小數點怎樣走？",
	"百分數和小數怎樣互化？",
	"圓的周界和面積用哪條式？",
	"速率、時間和距離怎樣找？",
	"折線圖和棒形圖有什麼分別？"
];
function TutorPage() {
	const [topic, setTopic] = (0, import_react.useState)("all");
	const [text, setText] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const send = (message) => {
		const clean = message.trim();
		if (!clean) return;
		if (hasProfanity(clean)) {
			setMessages((prev) => [
				...prev,
				{
					role: "user",
					text: clean
				},
				{
					role: "tutor",
					text: PROFANITY_ERROR
				}
			]);
			setText("");
			return;
		}
		const answer = tutorReply(clean, topic);
		setMessages((prev) => [
			...prev,
			{
				role: "user",
				text: clean
			},
			{
				role: "tutor",
				text: answer.text
			}
		]);
		setText("");
		const stamp = studentStamp();
		recordTutor({ data: {
			...stamp,
			topic: answer.topic,
			mode: "chat",
			question: clean,
			reply: answer.text
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/park/mascot.jpg",
					alt: "",
					className: "size-16 rounded-full border-2 border-ink object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-coral",
					children: "課本導師"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl text-ink",
					children: "問樂樂"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "把不會的題目打給樂樂。樂樂會用遊樂場課題的做法引導你怎樣想。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block text-sm font-bold",
				children: ["這題關於", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: topic,
					onChange: (event) => setTopic(event.target.value),
					className: "mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "我不太確定"
					}), UNITS.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: unit.id,
						children: unit.name
					}, unit.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: SUGGESTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-2xl border-2 border-ink bg-paper px-3 py-2 text-left text-sm font-bold",
						onClick: () => send(item),
						children: item
					}, item))
				}), messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: message.role === "user" ? "ml-8 rounded-2xl bg-grass p-4 text-paper" : "mr-6 whitespace-pre-wrap rounded-3xl border-2 border-ink bg-paper p-4 leading-relaxed",
					children: message.text
				}, index))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 flex gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					send(text);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "ask",
						children: "你的問題"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "ask",
						value: text,
						onChange: (event) => setText(event.target.value),
						rows: 3,
						maxLength: 600,
						placeholder: "例如：36 除以 10 是多少？圓周怎樣算？",
						className: "min-h-24 flex-1 rounded-2xl border-2 border-ink bg-paper p-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: text.trim().length === 0,
						className: "h-12 self-end rounded-2xl bg-coral px-4 font-bold text-paper",
						children: "發送"
					})
				]
			})
		]
	}) });
}
//#endregion
export { TutorPage as component };
