import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as nextUnit, r as getUnit, t as CORE_UNITS } from "./units-9gg8Qwt9.mjs";
import { f as usePark, n as Route$1, o as finishNav, s as holdNav } from "./router-VNKMmnlx.mjs";
import { t as FigureView } from "./FigureView-D1buCP24.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
import { n as topicBreakdown, t as studentStamp } from "./student-iJdruc8c.mjs";
import { t as recordPractice } from "./teacher.functions-Scv-njag.mjs";
import { t as PlayQuiz } from "./PlayQuiz-BsQmZiQx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ride._id-Deor2y6z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** 敘述句練習，對齊六年級校本單元和課程闡釋界線，情境用遊樂場，不翻印課本原題。 */
var EXTRA = {
	"6N1": [
		{
			kind: "number",
			stem: "三張旋轉木馬票共 36.9 元。每張售多少元？",
			answer: 12.3,
			eps: .001,
			suffix: "元",
			why: "36.9 ÷ 3 = 12.3。小數除以整數，商的小數點要和被除數對齊。估算：36 ÷ 3 = 12。"
		},
		{
			kind: "number",
			stem: "木馬每轉一圈用 0.6 分鐘。8.4 分鐘可以轉多少圈？",
			answer: 14,
			suffix: "圈",
			why: "8.4 ÷ 0.6 = 84 ÷ 6 = 14。除數是一位小數，被除數化成整數後仍在位數上限內。"
		},
		{
			kind: "number",
			stem: "4 人平分 7 元代幣。每人分得多少元？",
			answer: 1.75,
			eps: .001,
			suffix: "元",
			why: "7 ÷ 4 = 1.75。整數除以整數，商可以是小數。"
		},
		{
			kind: "choice",
			stem: "12.6 − 1.5 × 4 = ？",
			choices: [
				"44.4",
				"6.6",
				"10.6",
				"12.6"
			],
			answer: 1,
			why: "先乘後減：1.5 × 4 = 6，12.6 − 6 = 6.6。不超過四個數。"
		},
		{
			kind: "number",
			stem: "20.5 ÷ 6，把商取至最接近的十分位。填這個近似值。",
			answer: 3.4,
			eps: .001,
			suffix: "（約）",
			why: "20.5 ÷ 6 = 3.4166…，最接近的十分位是 3.4，寫成 20.5 ÷ 6 ≈ 3.4。"
		}
	],
	"6N2": [
		{
			kind: "choice",
			stem: "0.35 份棉花糖，化成最簡分數是？",
			choices: [
				"35/10",
				"7/20",
				"35/100 不能再約",
				"3/5"
			],
			answer: 1,
			why: "0.35 = 35/100。35 和 100 的最大公因數是 5，35 ÷ 5 = 7，100 ÷ 5 = 20，所以是 7/20。"
		},
		{
			kind: "number",
			stem: "7/8 公斤的糖畫，化成小數是多少公斤？",
			answer: .875,
			eps: .001,
			suffix: "公斤",
			why: "分子除以分母：7 ÷ 8 = 0.875。"
		},
		{
			kind: "choice",
			stem: "2/3 公斤和 0.7 公斤的糖，哪一份較多？",
			choices: [
				"2/3 較多",
				"0.7 較多",
				"一樣多",
				"一定要先通分，不能化小數"
			],
			answer: 1,
			why: "2 ÷ 3 ≈ 0.67。0.67 < 0.7，所以 0.7 公斤較多。課程容許用化小數來比較。"
		}
	],
	"6D1": [{
		kind: "number",
		stem: "五款遊戲的售票是 12、15、9、16、13 張。平均售出多少張？",
		answer: 13,
		suffix: "張",
		why: "(12 + 15 + 9 + 16 + 13) ÷ 5 = 65 ÷ 5 = 13。平均數也可以叫做平均值。"
	}, {
		kind: "number",
		stem: "四天售票的平均數是 10 張。已知三天是 8、12、9 張，餘下那天售出多少張？",
		answer: 11,
		suffix: "張",
		why: "四天合計 10 × 4 = 40。8 + 12 + 9 = 29，40 − 29 = 11。"
	}],
	"6N3": [{
		kind: "number",
		stem: "彩旗有四分之三染了色。化成百分數是多少？",
		answer: 75,
		suffix: "%",
		why: "3/4 = 75/100 = 75%。百分數化成分數時要最簡，反過來分數也可以化成百分數。"
	}, {
		kind: "choice",
		stem: "100% 表示什麼？",
		choices: [
			"一半",
			"全部，等於 1",
			"比 1 大一點",
			"10%"
		],
		answer: 1,
		why: "100% = 1，表示全部。一成等於 10% 不是這級必學。"
	}],
	"6N4": [{
		kind: "number",
		stem: "小賣部有 80 張贈券，送出 25%。送出多少張？",
		answer: 20,
		suffix: "張",
		why: "80 × 25% = 80 × 0.25 = 20。這是「求一個數的百分之幾」。"
	}, {
		kind: "number",
		stem: "送出的 24 張，是 80 張的百分之幾？",
		answer: 30,
		suffix: "%",
		why: "24 ÷ 80 = 0.3 = 30%。這是「求 A 是 B 的百分之幾」，不是「增加了百分之幾」。"
	}],
	"6M2": [{
		kind: "number",
		stem: "沙池旁的水桶裝了 2.5 升水。等於多少毫升？",
		answer: 2500,
		suffix: "毫升",
		why: "1 升 = 1000 毫升，2.5 × 1000 = 2500。升和毫升都是容量單位，也是液體體積單位。"
	}, {
		kind: "choice",
		stem: "邊長 10 厘米的正方體盒子，容量是？",
		choices: [
			"10 毫升",
			"100 毫升",
			"1 升",
			"1 立方米"
		],
		answer: 2,
		why: "體積 = 10 × 10 × 10 = 1000 cm³。1 cm³ = 1 mL，所以是 1000 mL，也就是 1 升。"
	}],
	"6M3": [{
		kind: "number",
		stem: "四分之一圓拱門，半徑 7 米，π 取 22/7。沿着弧和兩條半徑走一圈，周界是多少米？",
		answer: 25,
		suffix: "米",
		why: "全圓周 = 2 × 22/7 × 7 = 44。四分之一弧 = 11。再加上兩條半徑 7 + 7 = 14。周界 = 11 + 14 = 25 米。不用圓心角求一般弧長。"
	}],
	"6M5": [{
		kind: "number",
		stem: "半徑 7 米的圓，π 取 22/7。四分之三個圓的面積是多少平方米？",
		answer: 115.5,
		eps: .01,
		suffix: "m²",
		why: "全圓面積 = 22/7 × 7 × 7 = 154。四分之三是 154 × 3/4 = 115.5。不用扇形公式，也不用由面積反推半徑。"
	}],
	"6M1": [{
		kind: "choice",
		stem: "另一道滑梯和地面夾成 135°。這是什麼角？",
		choices: [
			"銳角",
			"直角",
			"鈍角",
			"反角"
		],
		answer: 2,
		why: "大於 90°、小於 180° 是鈍角。大於 180° 才是反角。"
	}, {
		kind: "number",
		stem: "周角是多少度？",
		answer: 360,
		suffix: "度",
		why: "周角 = 360°。平角 = 180°，直角 = 90°。量度和繪畫都不包括 0° 和 360° 這兩個端點。"
	}],
	"6D3": [{
		kind: "number",
		stem: "全日 240 位訪客裏，玩機動遊戲佔圓形圖的 90°。有多少位？",
		answer: 60,
		suffix: "位",
		why: "90° ÷ 360° = 1/4。240 × 1/4 = 60。90° 是 45° 的倍數，不用自己量角。"
	}],
	"6M4": [
		{
			kind: "number",
			stem: "排隊 150 秒。等於多少分鐘？",
			answer: 2.5,
			eps: .01,
			suffix: "分鐘",
			why: "60 秒 = 1 分鐘，150 ÷ 60 = 2.5 分鐘。只做分鐘和秒，或小時和分鐘，不把三種單位混在同一題相加。"
		},
		{
			kind: "choice",
			stem: "小火車 14:20 開出，行了 1 小時 45 分鐘。幾時到達？",
			choices: [
				"15:05",
				"16:05",
				"16:20",
				"15:65"
			],
			answer: 1,
			why: "14:20 加 1 小時是 15:20，再加 45 分鐘是 16:05。"
		},
		{
			kind: "number",
			stem: "玩具車 10 秒行了 120 米。速率是多少米每秒？",
			answer: 12,
			suffix: "m/s",
			why: "速率 = 120 ÷ 10 = 12 m/s。這題用米和秒，不要改成 km/h。也不做追趕。"
		}
	],
	"6A1": [
		{
			kind: "number",
			stem: "解方程：5x − 2x = 12。x = ？",
			answer: 4,
			why: "同類項在同一邊：3x = 12，x = 4。驗算：5×4 − 2×4 = 20 − 8 = 12。"
		},
		{
			kind: "number",
			stem: "解方程：(2/5)x = 8。x = ？",
			answer: 20,
			why: "兩邊同時除以 2/5，等於乘 5/2：x = 8 × 5/2 = 20。驗算：(2/5)×20 = 8。"
		},
		{
			kind: "number",
			stem: "長方形花圃周界 18 米，闊 3.5 米。設長是 x 米，求 x。",
			answer: 5.5,
			eps: .01,
			suffix: "米",
			why: "依周界列方程：2(x + 3.5) = 18，x + 3.5 = 9，x = 5.5。驗算：2 × (5.5 + 3.5) = 18。"
		}
	],
	"6D2": [{
		kind: "number",
		stem: "人龍：10 時 40 人，11 時 70 人。這一段增加了多少人？",
		answer: 30,
		suffix: "人",
		why: "70 − 40 = 30。折線向上表示增加。"
	}],
	"6D4": [{
		kind: "choice",
		stem: "想看「今日每小時人數怎樣上升或下降」，應選？",
		choices: [
			"圓形圖",
			"折線圖",
			"只列一個平均數",
			"把五款遊戲的名字連成折線"
		],
		answer: 1,
		why: "連續時間上的變化用折線圖。遊戲名字不是連續時間，不應連成折線假裝有趨勢。"
	}],
	"6S1": [{
		kind: "choice",
		stem: "菱形（不是正方形）有多少條對稱軸？",
		choices: [
			"1",
			"2",
			"4",
			"無數"
		],
		answer: 1,
		why: "兩條對角線。沿對邊中點對摺，菱形的兩邊不會重合。正方形才有 4 條。"
	}, {
		kind: "choice",
		stem: "圓有多少條對稱軸？",
		choices: [
			"1",
			"2",
			"4",
			"無數"
		],
		answer: 3,
		why: "任何一條直徑都可以做對稱軸，所以有無數條。"
	}],
	"enrich-turn": [{
		kind: "choice",
		stem: "等邊三角形風車，最少轉多少度就會和原來重合？（小於 360°）",
		choices: [
			"60°",
			"90°",
			"120°",
			"180°"
		],
		answer: 2,
		why: "360° ÷ 3 = 120°。這是增潤的旋轉對稱，核心必學仍是軸對稱。"
	}],
	"enrich-base": [{
		kind: "number",
		stem: "2 打氣球再加 5 個，一共多少個？",
		answer: 29,
		suffix: "個",
		why: "1 打 = 12 個，2 × 12 + 5 = 29。不要把「打」當成十進制的 10。"
	}]
};
function Quiz({ questions, onClear, title = "敘述句練習", submitLabel = "對答案並蓋章", doneLabel = "已蓋章" }) {
	const [picks, setPicks] = (0, import_react.useState)(() => questions.map(() => null));
	const [texts, setTexts] = (0, import_react.useState)(() => questions.map(() => ""));
	const [marked, setMarked] = (0, import_react.useState)(false);
	const results = questions.map((q, i) => {
		if (q.kind === "choice") return picks[i] === q.answer;
		const n = Number(texts[i].trim());
		const eps = q.eps ?? .001;
		return Number.isFinite(n) && Math.abs(n - q.answer) <= eps;
	});
	const allRight = marked && results.every(Boolean);
	function submit(e) {
		e.preventDefault();
		setMarked(true);
		if (questions.every((q, i) => {
			if (q.kind === "choice") return picks[i] === q.answer;
			const n = Number(texts[i].trim());
			return Number.isFinite(n) && Math.abs(n - q.answer) <= (q.eps ?? .001);
		})) onClear();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl text-ink",
					children: title
				}), allRight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pop-in rounded-full bg-sun px-3 py-1 text-sm font-medium text-ink",
					children: doneLabel
				})]
			}),
			questions.map((q, i) => {
				const right = marked && results[i];
				const wrong = marked && !results[i];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "rounded-2xl border bg-cream/60 p-3 " + (right ? "border-grass" : wrong ? "border-coral" : "border-line"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", {
							className: "px-1 text-sm font-medium text-muted",
							children: [
								"第 ",
								i + 1,
								" 題"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-ink",
							children: q.stem
						}),
						q.kind === "choice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: q.choices.map((c, ci) => {
								const on = picks[i] === ci;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2 " + (on ? "border-grass bg-paper" : "border-line bg-paper"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: `q-${i}`,
										className: "size-4 accent-grass",
										checked: on,
										onChange: () => {
											setPicks((prev) => prev.map((v, j) => j === i ? ci : v));
											setMarked(false);
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c })]
								}, c);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "decimal",
								value: texts[i],
								onChange: (e) => {
									setTexts((prev) => prev.map((v, j) => j === i ? e.target.value : v));
									setMarked(false);
								},
								className: "min-h-11 w-32 rounded-xl border border-line bg-paper px-3 tabular-nums text-ink",
								"aria-label": `第 ${i + 1} 題答案`
							}), q.suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: q.suffix
							})]
						}),
						marked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm " + (right ? "text-grass" : "text-coral"),
							role: "status",
							children: [
								right ? "對。" : "再試一次。",
								" ",
								q.why
							]
						})
					]
				}, q.stem);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "min-h-11 rounded-full bg-grass px-5 font-medium text-paper",
				children: marked && !allRight ? "改好了，再對一次" : submitLabel
			})
		]
	});
}
var ink = "#1c241c";
var coral = "#e15a3a";
var grass = "#1c7a4a";
function text(x, y, value, size = 32, fill = ink) {
	return {
		kind: "text",
		x,
		y,
		text: value,
		size,
		fill
	};
}
var WHITEBOARD_LESSONS = {
	"6N1": [
		{
			say: "一個數除以十，小數點向左移一位。除以一百移兩位，除以一千移三位。三十六除以十，小數點向左走一位，答案是三點六。",
			marks: [
				text(48, 70, "÷10、100、1000", 36),
				text(48, 140, "小數點向左移 1、2、3 位", 32, coral),
				text(48, 230, "36 ÷ 10 = 3.6", 48, grass)
			]
		},
		{
			say: "除以零點一、零點零一、零點零零一，小數點就向右移一位、兩位、三位。四點八六除以零點零一，等於四百八十六。除數比一小，答案會比原本的數大。",
			marks: [
				text(48, 80, "4.86 ÷ 0.01 = 486", 40, grass),
				text(48, 170, "小數點向右移 2 位", 32, coral),
				text(48, 250, "除數 < 1，答案變大", 30)
			]
		},
		{
			say: "除數是其他小數時，先把除數變成整數。除數的小數點向右移幾位，被除數也向右移同樣的位數。七點二除以零點六，兩邊都移一位，變成七十二除以六，等於十二。",
			marks: [
				text(48, 70, "7.2 ÷ 0.6", 44),
				text(48, 155, "兩邊小數點同時右移 1 位", 30, coral),
				text(48, 240, "72 ÷ 6 = 12", 48, grass)
			]
		},
		{
			say: "四則混合運算，次序同整數一樣，先乘除，後加減。二點四加一點六乘三，先算一點六乘三等於四點八，再加二點四，等於七點二。",
			marks: [
				text(48, 70, "2.4 + 1.6 × 3", 40),
				text(48, 155, "先算 1.6 × 3 = 4.8", 32, coral),
				text(48, 240, "2.4 + 4.8 = 7.2", 40, grass)
			]
		},
		{
			say: "有餘數的應用題，要講清楚買到幾多，又餘下幾多。六十元，每枝十四點八元。先估算，十五乘四大約六十，所以大約四枝。十四點八乘四等於五十九點二，餘下零點八元。最多買四枝。",
			marks: [
				text(48, 60, "60 元，每枝 14.8 元", 32),
				text(48, 140, "14.8 × 4 = 59.2", 36, coral),
				text(48, 230, "買 4 枝，餘 0.8 元", 36, grass)
			]
		}
	],
	"6N2": [
		{
			say: "小數化分數，看小數有幾位。一位小數，分母是十，零點七就是十分之七。五點零二四有三位小數，就是五又千分之二十四。二十四和一千都可以除以八，約到最簡是五又一百二十五分之三。",
			marks: [
				text(48, 70, "0.7 = 7/10", 40, grass),
				text(48, 155, "5.024 = 5又24/1000", 32),
				text(48, 240, "= 5又3/125", 40, coral)
			]
		},
		{
			say: "分數化小數，一般用分子除以分母。有些分數先擴分更快。二十五分之三，分子分母都乘四，變成一百分之十二，就是零點一二。",
			marks: [
				text(48, 80, "3/25", 48),
				text(48, 165, "×4/×4 → 12/100", 36, coral),
				text(48, 250, "= 0.12", 52, grass)
			]
		},
		{
			say: "比大小，可以先化成小數。八分之三，三除以八等於零點三七五。零點三七五比零點四小，所以零點四較多。小數太長，就取到最接近的十分位或百分位，寫約等號。不用學循環小數這個名稱。",
			marks: [
				text(48, 70, "3/8 = 0.375", 40),
				text(48, 160, "0.375 < 0.4", 44, grass),
				text(48, 250, "太長就用 ≈", 32, coral)
			]
		}
	],
	"6D1": [
		{
			say: "平均數，又叫平均值，等於總數除以項數。可以想像棒形圖：把高出來的一截，搬去填補矮的，最後一樣高，那條線就是平均數。",
			marks: [
				text(48, 90, "平均數 = 總數 ÷ 項數", 36, grass),
				text(48, 180, "也叫平均值", 32),
				text(48, 260, "高的補矮的，直到一樣高", 28, coral)
			]
		},
		{
			say: "四個得分是四、八、六和十。先全部加起來。四加八是十二，加六是十八，加十是二十八。",
			marks: [text(48, 90, "4、8、6、10", 40), text(48, 190, "4 + 8 + 6 + 10 = 28", 36, coral)]
		},
		{
			say: "有四個數，二十八除以四等於七。平均分就是七。",
			marks: [text(48, 120, "28 ÷ 4 = 7", 56, grass)]
		},
		{
			say: "知道平均數，想找回缺了的那個數，先用平均數乘項數，得出總數，再減去其餘各數。五天平均八張，總數是八乘五等於四十。已知四天加起來是三十二。四十減三十二等於八。",
			marks: [
				text(48, 60, "總數 = 8 × 5 = 40", 34),
				text(48, 150, "已知 6+9+7+10 = 32", 32, coral),
				text(48, 240, "40 − 32 = 8", 44, grass)
			]
		}
	],
	"6N3": [
		{
			say: "一百個小朋友入面，有二十人戴帽。二十佔一百的幾多，就是百分之二十。百分數用來比較兩個同類的量，寫成分母是一百的分數。百分之一百等於一，代表全部。課程不用教一成。",
			marks: [
				text(48, 70, "20 / 100 = 20%", 44, grass),
				text(48, 160, "100% = 全部 = 1", 36),
				text(48, 250, "不用「一成」", 32, coral)
			]
		},
		{
			say: "小數變百分數，小數點向右移兩位。零點九九，向右兩位，就是百分之九十九。",
			marks: [text(48, 120, "0.99  →  99%", 52, coral)]
		},
		{
			say: "百分數變小數，小數點向左移兩位。百分之一百二十二是一點二二，比一大。變成分數要寫最簡。百分之五十是二分之一。百分之二點五，就是二點五除以一百，等於二十五除以一千，約成四十分之一。",
			marks: [
				text(48, 60, "122% = 1.22", 40),
				text(48, 145, "50% = 1/2", 36, grass),
				text(48, 230, "2.5% = 1/40", 40, coral)
			]
		}
	],
	"6N4": [
		{
			say: "第一類：三十是五十的百分之幾。用部分除以全部。三十除以五十等於零點六，零點六就是百分之六十。",
			marks: [
				text(48, 70, "部分 ÷ 全部", 36, coral),
				text(48, 160, "30 ÷ 50 = 0.6", 40),
				text(48, 250, "= 60%", 52, grass)
			]
		},
		{
			say: "第二類：五十的百分之六十是多少。看到「的百分之幾」，就用乘法。五十乘零點六等於三十。",
			marks: [text(48, 80, "的百分之幾 → 乘", 36, coral), text(48, 180, "50 × 0.6 = 30", 48, grass)]
		},
		{
			say: "第三類：五十增加了百分之十之後是多少。不是把五十加上十。五十乘百分之十等於五，五十加五等於五十五。也可以一次過乘百分之一百一十。減少百分之十，就乘百分之九十，等於四十五。求原本的數，留到方程那一課。",
			marks: [
				text(48, 55, "增加 10% → × 110%", 32, coral),
				text(48, 140, "50 × 110% = 55", 40, grass),
				text(48, 230, "減少 10% → × 90% = 45", 32)
			]
		}
	],
	"6M2": [
		{
			say: "邊長一厘米的正方體，體積是一立方厘米。它剛好盛到一毫升水，所以一立方厘米等於一毫升。容量是容器可以盛多少，體積是物件佔多少空間。",
			marks: [
				{
					kind: "rect",
					x: 70,
					y: 70,
					w: 110,
					h: 110,
					stroke: ink
				},
				text(230, 120, "1 cm³ = 1 mL", 36, grass),
				text(230, 190, "容量 = 可盛多少", 28)
			]
		},
		{
			say: "邊長十厘米的正方體，十乘十乘十等於一千立方厘米，就是一千毫升，等於一升。所以一升等於一千立方厘米。一立方米等於一千升。",
			marks: [
				text(48, 80, "10×10×10 = 1000 cm³", 34),
				text(48, 165, "1000 mL = 1 L", 40, grass),
				text(48, 250, "1 m³ = 1000 L", 36)
			]
		},
		{
			say: "排水法：物件完全浸沒之後，水位上升多少，體積就是多少。原本有水四百毫升，放入石頭後到六百毫升。六百減四百等於二百毫升，就是二百立方厘米。乒乓球會浮，方糖會溶，毛巾會吸水，這些都不可以用。",
			marks: [
				text(48, 55, "400 mL → 600 mL", 36),
				text(48, 145, "600 − 400 = 200 cm³", 36, grass),
				text(48, 235, "要完全浸沒", 32, coral),
				text(48, 300, "會浮、會溶：不可用", 28)
			],
			h: 340
		}
	],
	"6M3": [
		{
			say: "量幾個圓會見到，圓周大約是直徑的三點一四倍。這個數叫圓周率，用三點一四或者七分之二十二。圓周等於直徑乘圓周率。題目給半徑，就先乘二變成直徑。",
			marks: [
				{
					kind: "circle",
					cx: 140,
					cy: 190,
					r: 80,
					stroke: ink
				},
				{
					kind: "line",
					x1: 60,
					y1: 190,
					x2: 220,
					y2: 190,
					stroke: coral,
					width: 4
				},
				text(260, 140, "圓周 = 直徑 × π", 30, grass),
				text(260, 210, "π ≈ 3.14 或 22/7", 28)
			]
		},
		{
			say: "直徑十米，用三點一四。十乘三點一四等於三十一點四米。",
			marks: [text(48, 130, "10 × 3.14 = 31.4 米", 44, grass)]
		},
		{
			say: "倒過來，知道圓周可以求直徑。直徑等於圓周除以圓周率。圓周三十一點四米，除以三點一四，直徑是十米。半徑再把直徑除以二。",
			marks: [text(48, 80, "直徑 = 圓周 ÷ π", 36, coral), text(48, 180, "31.4 ÷ 3.14 = 10 米", 40, grass)]
		},
		{
			say: "半圓形的周界，不是只取圓周的一半。曲線是圓周除以二，還要加回那條直徑。直徑十厘米：十乘三點一四除以二等於十五點七，再加十，周界是二十五點七厘米。四分一圓要加回兩條半徑。不用圓心角去計弧長。",
			marks: [
				{
					kind: "path",
					d: "M 70 210 A 80 80 0 0 1 230 210",
					stroke: ink,
					width: 4
				},
				{
					kind: "line",
					x1: 70,
					y1: 210,
					x2: 230,
					y2: 210,
					stroke: coral,
					width: 4
				},
				text(270, 130, "圓周÷2 + 直徑", 30, grass),
				text(270, 200, "= 25.7 cm", 32)
			]
		}
	],
	"6M5": [
		{
			say: "把圓形紙對摺成四份，再摺成八份、十六份。每一份愈來愈像三角形。合起來就是圓面積，等於圓周率乘半徑乘半徑。題目如果給直徑，一定先除以二。不要把直徑當成半徑。",
			marks: [
				{
					kind: "circle",
					cx: 150,
					cy: 190,
					r: 90,
					stroke: ink
				},
				{
					kind: "line",
					x1: 150,
					y1: 190,
					x2: 240,
					y2: 190,
					stroke: coral,
					width: 4
				},
				text(280, 140, "面積 = π × r × r", 30, grass),
				text(280, 210, "先把直徑 ÷ 2", 28, coral)
			]
		},
		{
			say: "半徑七米，圓周率用七分之二十二。七分之二十二乘七，一個七先約去，剩下二十二乘七，等於一百五十四平方米。",
			marks: [
				text(48, 90, "22/7 × 7 × 7", 40),
				text(48, 180, "約去一個 7", 32, coral),
				text(48, 260, "= 154 平方米", 40, grass)
			]
		},
		{
			say: "半圓面積是全圓的一半，一百五十四除以二等於七十七。四分一圓就除以四，四分三圓就乘四分之三。不要由面積倒推半徑，也不要用圓心角除以三百六十再乘圓面積。",
			marks: [
				text(48, 70, "半圓 = 154 ÷ 2 = 77", 36, grass),
				text(48, 160, "1/4 圓 = 全圓 ÷ 4", 32),
				text(48, 250, "不用扇形公式", 32, coral)
			]
		}
	],
	"6M1": [
		{
			say: "兩個銳角都可以一大一小，所以要有公認單位。度的符號是一個小圓圈。轉足一圈是三百六十度，叫做周角。",
			h: 220,
			marks: [
				{
					kind: "circle",
					cx: 130,
					cy: 120,
					r: 70,
					stroke: ink
				},
				text(240, 90, "轉一整圈", 32),
				text(240, 155, "360° = 周角", 40, grass)
			]
		},
		{
			say: "圓形紙對摺一次，是一百八十度，叫做平角，兩條邊連成一條直線。再對摺一次是九十度，叫做直角，記號是一個小正方形，不是一條弧。對摺第三次大約是四十五度。",
			h: 240,
			marks: [
				{
					kind: "line",
					x1: 40,
					y1: 150,
					x2: 280,
					y2: 150,
					stroke: ink,
					width: 4
				},
				{
					kind: "rect",
					x: 150,
					y: 120,
					w: 28,
					h: 28,
					stroke: coral
				},
				text(310, 80, "對摺 1 次：180°", 28),
				text(310, 140, "2 次：90° 直角", 28, grass),
				text(310, 200, "3 次：45°", 28)
			]
		},
		{
			say: "細過九十度是銳角。大過九十度、未到一百八十度是鈍角。大過一百八十度、未到三百六十度是反角。不用量零度和三百六十度。量度之前，先估計。",
			h: 220,
			marks: [
				text(36, 60, "銳角  < 90°", 32, grass),
				text(36, 120, "90° < 鈍角 < 180°", 32),
				text(36, 180, "180° < 反角 < 360°", 32, coral)
			]
		},
		{
			say: "用量角器：中心點對準角的頂點，底邊貼住角的一邊。另一邊指住幾多，角度就是幾多。要看清楚讀外圈還是內圈，必須由你貼住那一邊的零度讀起。",
			h: 200,
			marks: [
				text(40, 80, "中心點 → 頂點", 36),
				text(40, 155, "底邊貼住一邊的 0°", 32, coral),
				text(40, 230, "再讀另一邊", 36, grass)
			]
		},
		{
			say: "畫二百度這種反角，可以先畫平角一百八十度，再加二十度。或者用三百六十減一百六十。兩種方法畫出的是同一個角。",
			h: 180,
			marks: [text(40, 80, "200° = 180° + 20°", 36, grass), text(40, 170, "200° = 360° − 160°", 36, coral)]
		},
		{
			say: "三個字母寫角，中間那個字母才是頂點。角 A、B、C 的頂點是 B，寫成角 A B C，也可以寫角 C B A。",
			h: 230,
			marks: [
				{
					kind: "line",
					x1: 180,
					y1: 170,
					x2: 70,
					y2: 50,
					stroke: ink,
					width: 4
				},
				{
					kind: "line",
					x1: 180,
					y1: 170,
					x2: 340,
					y2: 150,
					stroke: ink,
					width: 4
				},
				text(52, 46, "A", 28),
				text(160, 200, "B 頂點", 28, coral),
				text(346, 148, "C", 28),
				text(390, 100, "∠ABC", 40, grass)
			]
		}
	],
	"6D3": [
		{
			say: "圓形圖用來顯示每一部分佔全部幾多。成個圓是三百六十度，也是百分之一百。着色那一塊叫扇形，角的頂點在圓心，叫做圓心角。題目給的圓心角會是三十度或四十五度的倍數，不用自己量角。",
			marks: [
				{
					kind: "circle",
					cx: 140,
					cy: 190,
					r: 90,
					stroke: ink
				},
				text(270, 140, "全圓 = 360°", 32),
				text(270, 200, "= 100%", 36, grass),
				text(270, 260, "圓心角：30° 或 45° 的倍數", 22)
			]
		},
		{
			say: "圓心角除以三百六十，就是佔全圓的分數。一百八十除以三百六十等於二分之一。八小時的一半是四小時。九十度是四分之一。百分之二十五也是四分之一，八乘四分之一等於兩小時。",
			marks: [
				text(40, 70, "180° ÷ 360° = 1/2", 36, coral),
				text(40, 155, "8 × 1/2 = 4 小時", 36, grass),
				text(40, 240, "25% = 1/4，8 × 1/4 = 2", 32)
			]
		},
		{
			say: "兩個圖都是百分之二十五，不代表人數一樣。必須先知道總數。二百人的百分之二十五是五十人。八十人的百分之二十五是二十人。不可以只看百分數，就說哪一個的實際數量較大。",
			marks: [
				text(40, 70, "25% × 200 人 = 50 人", 32),
				text(40, 155, "25% × 80 人 = 20 人", 32, coral),
				text(40, 245, "百分數一樣 ≠ 人數一樣", 30, grass)
			]
		}
	],
	"6M4": [
		{
			say: "先不用公式。時間一樣，行得較遠的較快。路程一樣，用時較少的較快。要比清楚，就用速率等於路程除以時間。單位跟數據走。公里配小時，就是公里每小時。米配秒，就是米每秒。不要把這兩個單位互化。",
			marks: [
				text(40, 70, "速率 = 路程 ÷ 時間", 36, grass),
				text(40, 160, "時間一樣，遠的較快", 30),
				text(40, 240, "不把 m/s 改成 km/h", 30, coral)
			]
		},
		{
			say: "行九十公里，用兩個小時。九十除以二等於四十五，速率是每小時四十五公里。如果時間是九十分鐘，先化成小時，九十除以六十等於一點五小時。一百八十秒等於三分鐘。不要把小時、分鐘和秒三種單位放在同一題裏相加。",
			marks: [
				text(40, 60, "90 ÷ 2 = 45 km/h", 40, grass),
				text(40, 150, "90 分鐘 = 1.5 小時", 32),
				text(40, 230, "180 秒 = 3 分鐘", 32, coral)
			]
		},
		{
			say: "小火車九時四十分開出，十一時十分到達。九時四十分到十時四十分是一小時，再到十一時十分是三十分鐘，一共一小時三十分鐘。行程圖上的平線，表示停住，時間過去了，路程沒有增加。不計追趕問題。",
			marks: [
				text(40, 60, "9:40 → 11:10", 36),
				text(40, 145, "1 小時 30 分鐘", 40, grass),
				text(40, 230, "平線 = 停着不動", 32, coral)
			]
		}
	],
	"6A1": [
		{
			say: "方程好像天平。等號兩邊做同一件事，板才繼續平衡。",
			marks: [
				{
					kind: "line",
					x1: 80,
					y1: 150,
					x2: 460,
					y2: 150,
					stroke: ink,
					width: 6
				},
				text(110, 120, "左邊", 32),
				text(340, 120, "右邊", 32),
				text(150, 210, "兩邊做同一件事", 32, coral)
			]
		},
		{
			say: "x 加二點五等於八。兩邊一齊減二點五，x 等於五點五。代回去驗算：五點五加二點五等於八，才算解對。",
			marks: [
				text(40, 80, "x + 2.5 = 8", 40),
				text(40, 165, "x = 8 − 2.5 = 5.5", 36, grass),
				text(40, 250, "驗算：5.5 + 2.5 = 8", 32, coral)
			]
		},
		{
			say: "有括號，先把括號外面的數除掉。三乘括號 x 減一點五等於九。兩邊除以三，括號入面等於三，所以 x 等於四點五。同類項在同一邊，可以先合併。五 x 加二 x 等於二十一，七 x 等於二十一，x 等於三。",
			marks: [
				text(36, 55, "3(x − 1.5) = 9", 32),
				text(36, 130, "x − 1.5 = 3，x = 4.5", 32, grass),
				text(36, 210, "5x + 2x = 21", 32),
				text(36, 280, "7x = 21，x = 3", 32, coral)
			],
			h: 330
		},
		{
			say: "應用題要按情境列方程。原價的百分之七十五是三十元，就直接寫零點七五 x 等於三十。三十除以零點七五等於四十。驗算：四十乘百分之七十五等於三十。這類求原本的數，在方程這一課處理。",
			marks: [
				text(40, 70, "0.75x = 30", 44),
				text(40, 160, "x = 30 ÷ 0.75 = 40", 36, grass),
				text(40, 250, "驗算：40 × 75% = 30", 32, coral)
			]
		}
	],
	"6D2": [
		{
			say: "折線圖用來顯示數量怎樣隨時間變化。橫軸多數是時間，縱軸是數量。棒形圖也可以比較數量，折線圖更加清楚看見增加和減少。",
			marks: [
				{
					kind: "line",
					x1: 80,
					y1: 250,
					x2: 360,
					y2: 250,
					stroke: ink,
					width: 3
				},
				{
					kind: "line",
					x1: 80,
					y1: 250,
					x2: 80,
					y2: 70,
					stroke: ink,
					width: 3
				},
				text(160, 300, "時間", 28),
				text(20, 140, "數量", 24)
			]
		},
		{
			say: "線向上是增加，向下是減少。由四十人升到七十人，就是增加三十人。同一張圖不要畫多過兩組折線。",
			marks: [
				{
					kind: "path",
					d: "M 90 230 L 210 160 L 360 90",
					stroke: grass,
					width: 4
				},
				text(400, 120, "40 → 70", 32),
				text(400, 180, "增加 30", 32, coral)
			]
		},
		{
			say: "讀圖之前先看縱軸。一格代表多少？是不是由零開始？一格代表的數量愈小，同一組數據的線會看起來愈斜，變化就好像更劇烈。",
			marks: [text(40, 90, "一格代表多少？", 40, coral), text(40, 180, "不是從 0 起，斜度會騙人", 32)]
		}
	],
	"6D4": [
		{
			say: "先問統計想強調什麼。比較各款遊戲賣出幾多，用棒形圖。看人數怎樣隨時間變化，用折線圖。看各部分佔全部幾多，用圓形圖。遊戲的名字不是時間，不要把它們連成折線。",
			marks: [
				text(40, 70, "各項數量 → 棒形圖", 32),
				text(40, 155, "隨時間變化 → 折線圖", 32, grass),
				text(40, 240, "佔全部 → 圓形圖", 32, coral)
			]
		},
		{
			say: "看這個棒形圖例子。橫軸是三款遊戲，縱軸是賣出的票數，由零開始。過山車十二張，旋轉木馬八張，碰碰車十五張。碰碰車的棒最高，所以賣得最多。每一款一條棒，棒和棒之間不要連線。",
			marks: [
				{
					kind: "line",
					x1: 90,
					y1: 40,
					x2: 90,
					y2: 230,
					stroke: ink,
					width: 3
				},
				{
					kind: "line",
					x1: 90,
					y1: 230,
					x2: 520,
					y2: 230,
					stroke: ink,
					width: 3
				},
				{
					kind: "rect",
					x: 140,
					y: 110,
					w: 70,
					h: 120,
					stroke: grass
				},
				{
					kind: "rect",
					x: 270,
					y: 150,
					w: 70,
					h: 80,
					stroke: ink
				},
				{
					kind: "rect",
					x: 400,
					y: 50,
					w: 70,
					h: 180,
					stroke: coral
				},
				text(145, 100, "12", 28, grass),
				text(285, 140, "8", 28),
				text(405, 42, "15", 28, coral),
				text(130, 275, "過山車", 24),
				text(255, 275, "旋轉木馬", 24),
				text(395, 275, "碰碰車", 24),
				text(540, 80, "票數", 28),
				text(540, 140, "由 0 開始", 26, grass),
				text(540, 200, "最高 = 最多", 26, coral)
			],
			h: 320
		},
		{
			say: "再看折線圖例子。橫軸是星期一到星期三，縱軸是入場人數，同樣由零開始。星期一四十人，星期二七十人，線向上，增加了三十人。星期三五十人，線向下，減少了二十人。折線用來顯示隨時間的變化。",
			marks: [
				{
					kind: "line",
					x1: 90,
					y1: 40,
					x2: 90,
					y2: 230,
					stroke: ink,
					width: 3
				},
				{
					kind: "line",
					x1: 90,
					y1: 230,
					x2: 520,
					y2: 230,
					stroke: ink,
					width: 3
				},
				{
					kind: "path",
					d: "M 160 150 L 310 70 L 460 130",
					stroke: grass,
					width: 4
				},
				{
					kind: "circle",
					cx: 160,
					cy: 150,
					r: 6,
					stroke: grass
				},
				{
					kind: "circle",
					cx: 310,
					cy: 70,
					r: 6,
					stroke: grass
				},
				{
					kind: "circle",
					cx: 460,
					cy: 130,
					r: 6,
					stroke: coral
				},
				text(145, 140, "40", 24),
				text(295, 60, "70", 24, grass),
				text(445, 120, "50", 24, coral),
				text(145, 275, "星期一", 24),
				text(295, 275, "星期二", 24),
				text(445, 275, "星期三", 24),
				text(540, 90, "向上 +30", 26, grass),
				text(540, 150, "向下 −20", 26, coral)
			],
			h: 320
		},
		{
			say: "看任何統計圖，先問兩句。縱軸由哪裏開始？一格代表多少？",
			marks: [text(40, 100, "縱軸從 0 開始嗎？", 36), text(40, 190, "一格 = ？", 48, coral)]
		},
		{
			say: "同一組人數，如果縱軸由九十畫到一百三十，而不是由零開始，少少分別都會看起來差很遠，容易令人做錯誤決定。兩個圓形圖百分數一樣，也不可以比較實際人數，除非知道每一個的總數。",
			marks: [
				text(40, 80, "同一組數據", 36),
				text(40, 160, "軸不從 0 起 → 誇大", 32, coral),
				text(40, 250, "圓形圖要先知道總數", 30, grass)
			]
		}
	],
	"6S1": [
		{
			say: "沿着一條直線對摺，兩邊完全重合，這條摺痕就是對稱軸。判別時只看圖形本身，不看上面的花紋。一般的平行四邊形沒有對稱軸。",
			marks: [
				{
					kind: "line",
					x1: 200,
					y1: 40,
					x2: 200,
					y2: 280,
					stroke: coral,
					width: 3
				},
				{
					kind: "path",
					d: "M 200 70 L 110 230 L 200 230 Z",
					stroke: ink,
					width: 3
				},
				{
					kind: "path",
					d: "M 200 70 L 290 230 L 200 230 Z",
					stroke: ink,
					width: 3
				},
				text(320, 140, "完全重合", 32, grass),
				text(320, 200, "摺痕 = 對稱軸", 28)
			]
		},
		{
			say: "正方形有四條對稱軸，包括兩條對角線。不是正方形的長方形只有兩條，是對邊中點的連線，用對角線對摺不會重合。不是正方形的菱形也有兩條，但那兩條就是它的對角線。",
			marks: [
				text(40, 60, "正方形：4 條", 32, grass),
				text(40, 140, "長方形：2 條，不是對角線", 30),
				text(40, 220, "菱形：2 條，就是對角線", 30, coral)
			]
		},
		{
			say: "等邊三角形有三條，每條由一個角去到對邊的中點。只是等腰、不是等邊，就只有一條。圓有無數條，任何一條直徑都可以。給你一半，就數格子：摺痕一邊幾格，另一邊也畫幾格，方向相反。",
			marks: [
				text(40, 55, "等邊三角形：3 條", 32, grass),
				text(40, 130, "等腰三角形：1 條", 32),
				text(40, 205, "圓：無數條直徑", 32),
				text(40, 280, "數格，畫另一半", 30, coral)
			],
			h: 330
		}
	],
	"enrich-turn": [{
		say: "這是增潤，和軸對稱不同。圖形繞住中心轉一個小於三百六十度的角，又能和原來重合，就叫旋轉對稱。",
		marks: [text(40, 100, "轉一個角後又重合", 36), text(40, 190, "這個角要小於 360°", 32, coral)]
	}, {
		say: "正方形每轉九十度就重合一次。三百六十除以九十等於四，所以轉完一圈會重合四次。",
		marks: [text(40, 120, "360° ÷ 90° = 4 次", 44, grass)]
	}],
	"enrich-base": [{
		say: "這是增潤。不是所有單位都是十進制。一打是十二個，不是十個。",
		marks: [text(40, 120, "1 打 = 12 個", 52, grass)]
	}, {
		say: "兩打加五個，是二乘十二再加五，等於二十九個。時間也一樣，一小時等於六十分鐘，不是一百分鐘。所以九十分鐘是一點五小時，不是零點九零小時。",
		marks: [text(40, 80, "2 × 12 + 5 = 29", 40), text(40, 180, "1 小時 = 60 分鐘", 36, coral)]
	}]
};
function stepHeight(step) {
	if (step.h) return step.h;
	let max = 72;
	for (const mark of step.marks) if (mark.kind === "text") max = Math.max(max, mark.y + 12);
	else if (mark.kind === "line") max = Math.max(max, mark.y1, mark.y2);
	else if (mark.kind === "rect") max = Math.max(max, mark.y + mark.h);
	else if (mark.kind === "circle") max = Math.max(max, mark.cy + mark.r);
	else {
		const nums = mark.d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
		for (const value of nums) max = Math.max(max, value);
	}
	return Math.ceil(max + 32);
}
function MarkShape({ mark, live }) {
	if (mark.kind === "text") return null;
	const draw = live ? "wb-draw" : void 0;
	if (mark.kind === "line") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: mark.x1,
		y1: mark.y1,
		x2: mark.x2,
		y2: mark.y2,
		stroke: mark.stroke ?? "#1c241c",
		strokeWidth: mark.width ?? 3,
		strokeLinecap: "round",
		fill: "none",
		pathLength: 1,
		className: draw
	});
	if (mark.kind === "rect") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: mark.x,
		y: mark.y,
		width: mark.w,
		height: mark.h,
		stroke: mark.stroke ?? "#1c241c",
		strokeWidth: 3,
		fill: "none",
		pathLength: 1,
		className: draw
	});
	if (mark.kind === "circle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: mark.cx,
		cy: mark.cy,
		r: mark.r,
		stroke: mark.stroke ?? "#1c241c",
		strokeWidth: 3,
		fill: "none",
		pathLength: 1,
		className: draw
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: mark.d,
		stroke: mark.stroke ?? "#1c241c",
		strokeWidth: mark.width ?? 3,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		fill: "none",
		pathLength: 1,
		className: draw
	});
}
function WriteText({ mark, live, boardHeight }) {
	const [count, setCount] = (0, import_react.useState)(live ? 0 : mark.text.length);
	(0, import_react.useEffect)(() => {
		if (!live) {
			setCount(mark.text.length);
			return;
		}
		setCount(0);
		let i = 0;
		const timer = window.setInterval(() => {
			i += 1;
			setCount(i);
			if (i >= mark.text.length) window.clearInterval(timer);
		}, 120);
		return () => window.clearInterval(timer);
	}, [live, mark.text]);
	const size = mark.size ?? 32;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "absolute m-0 whitespace-nowrap font-bold leading-none",
		style: {
			left: `${mark.x / 760 * 100}%`,
			top: `${mark.y / boardHeight * 100}%`,
			transform: "translateY(-100%)",
			fontSize: `${size / 760 * 100}cqw`,
			color: mark.fill ?? "#1c241c",
			fontFamily: "\"ZCOOL KuaiLe\", \"Noto Sans TC\", \"PingFang HK\", sans-serif"
		},
		children: mark.text.slice(0, count)
	});
}
function WhiteboardTutor({ unitId, title }) {
	const steps = WHITEBOARD_LESSONS[unitId] ?? [];
	const [playing, setPlaying] = (0, import_react.useState)(true);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(0);
	const [pen, setPen] = (0, import_react.useState)(1);
	const [run, setRun] = (0, import_react.useState)(0);
	const current = steps[step];
	const board = (0, import_react.useRef)(null);
	const audioRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const box = board.current;
		if (!box) return;
		box.scrollTo({
			top: box.scrollHeight,
			behavior: "smooth"
		});
	}, [step, pen]);
	const playingRef = (0, import_react.useRef)(playing);
	playingRef.current = playing;
	(0, import_react.useEffect)(() => {
		if (!current) return;
		let alive = true;
		let moved = false;
		setPen(1);
		const audio = new Audio(`/tutor/${unitId}-${step}.mp3`);
		audioRef.current = audio;
		const timers = [];
		const clearTimers = () => {
			timers.forEach((id) => window.clearTimeout(id));
			timers.length = 0;
		};
		const goNext = () => {
			if (!alive || moved) return;
			moved = true;
			clearTimers();
			setStep((value) => {
				if (value + 1 >= steps.length) {
					setPlaying(false);
					return value;
				}
				return value + 1;
			});
		};
		const plan = (ms) => {
			if (!alive) return;
			clearTimers();
			const count = Math.max(current.marks.length, 1);
			const slice = ms / count;
			for (let index = 1; index < count; index += 1) timers.push(window.setTimeout(() => setPen(index + 1), slice * index));
		};
		let fallback = 0;
		const silent = (ms) => {
			window.clearTimeout(fallback);
			const fire = () => {
				if (!alive || moved) return;
				if (!playingRef.current) {
					fallback = window.setTimeout(fire, 400);
					return;
				}
				goNext();
			};
			fallback = window.setTimeout(fire, ms);
		};
		audio.onloadedmetadata = () => {
			const ms = Math.max(2800, (Number.isFinite(audio.duration) ? audio.duration : 4) * 1e3);
			plan(ms);
			timers.push(window.setTimeout(() => {
				if (!alive || moved) return;
				if (audio.ended || audio.currentTime >= Math.max(0, (audio.duration || 0) - .3)) goNext();
			}, ms + 900));
		};
		audio.onended = () => {
			if (!alive) return;
			window.setTimeout(() => {
				if (alive) goNext();
			}, 420);
		};
		audio.onerror = () => {
			const ms = Math.max(4200, current.say.length * 170);
			plan(ms);
			silent(ms + 400);
		};
		if (playingRef.current) audio.play().catch(() => {
			const ms = Math.max(4200, current.say.length * 170);
			plan(ms);
			silent(ms + 400);
		});
		else plan(Math.max(4200, current.say.length * 170));
		return () => {
			alive = false;
			moved = true;
			window.clearTimeout(fallback);
			clearTimers();
			audio.onended = null;
			audio.onerror = null;
			audio.onloadedmetadata = null;
			audio.pause();
			audio.src = "";
		};
	}, [
		step,
		unitId,
		run,
		current,
		steps.length
	]);
	(0, import_react.useEffect)(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.muted = muted;
		if (!playing) {
			audio.pause();
			return;
		}
		if (audio.paused && audio.currentTime < (audio.duration || 0) - .2) audio.play().catch(() => {});
	}, [muted, playing]);
	if (!current) return null;
	const jump = (next) => {
		setPlaying(true);
		setStep(Math.max(0, Math.min(steps.length - 1, next)));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border-2 border-ink bg-paper p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/park/login-fox.jpg",
						alt: "",
						className: "size-12 rounded-full border-2 border-ink object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-coral",
							children: "白板家教 · 邊講邊畫"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate text-xl text-ink",
							children: title
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold text-muted",
						children: [
							step + 1,
							" / ",
							steps.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 min-h-14 rounded-2xl bg-cream px-4 py-3 text-base font-bold leading-relaxed text-ink",
				children: current.say
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: board,
				className: "relative mt-3 h-[32rem] overflow-y-auto rounded-2xl border-2 border-ink bg-[#f6f0e4]",
				style: { containerType: "inline-size" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-full",
					style: {
						backgroundImage: "linear-gradient(#eadfce 1px, transparent 1px), linear-gradient(90deg, #eadfce 1px, transparent 1px)",
						backgroundSize: "40px 40px"
					},
					children: steps.slice(0, step + 1).map((item, index) => {
						const height = stepHeight(item);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							style: { height: `calc(${height} / 760 * 100cqw)` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: `0 0 760 ${height}`,
								className: "absolute inset-0 h-full w-full",
								children: item.marks.slice(0, index === step ? pen : item.marks.length).map((mark, markIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkShape, {
									mark,
									live: index === step && markIndex === pen - 1
								}, `${index}-${markIndex}`))
							}), item.marks.slice(0, index === step ? pen : item.marks.length).map((mark, markIndex) => mark.kind === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteText, {
								mark,
								live: index === step && markIndex === pen - 1,
								boardHeight: height
							}, `${index}-t-${markIndex}`) : null)]
						}, index);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 rounded-2xl bg-ink px-4 font-bold text-paper",
						onClick: () => {
							if (!playing && step + 1 >= steps.length) {
								setRun((value) => value + 1);
								setStep(0);
								setPlaying(true);
								return;
							}
							setPlaying((value) => !value);
						},
						children: playing ? "暫停" : step + 1 >= steps.length ? "再看一次" : "繼續"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 rounded-2xl border-2 border-ink px-4 font-bold",
						onClick: () => jump(step - 1),
						children: "上一步"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 rounded-2xl border-2 border-ink px-4 font-bold",
						onClick: () => {
							setRun((value) => value + 1);
							setPlaying(true);
							setStep(0);
						},
						children: "重看"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-12 rounded-2xl border-2 px-4 font-bold " + (muted ? "border-coral text-coral" : "border-ink"),
						onClick: () => setMuted((value) => !value),
						children: muted ? "已靜音" : "有聲"
					})
				]
			})
		]
	});
}
function Panel({ title, kicker, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border border-line bg-paper p-4",
		children: [
			kicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-grass",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-xl text-ink",
				children: title
			}),
			children
		]
	});
}
function CheckNote({ ok, children }) {
	if (ok === null) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-3 text-sm " + (ok ? "text-grass" : "text-coral"),
		role: "status",
		children
	});
}
function tidy(n) {
	if (!Number.isFinite(n)) return "—";
	const r = Math.round(n * 1e6) / 1e6;
	return String(r);
}
function gcd(a, b) {
	const x = Math.abs(a);
	const y = Math.abs(b);
	return y ? gcd(y, x % y) : x;
}
function DecimalRide({ onClear }) {
	const [n, setN] = (0, import_react.useState)(36.9);
	const [note, setNote] = (0, import_react.useState)("按一下，看小數點怎樣走。");
	const [seenLeft, setSeenLeft] = (0, import_react.useState)(false);
	const [seenRight, setSeenRight] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (seenLeft && seenRight) onClear();
	}, [
		seenLeft,
		seenRight,
		onClear
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6N1 · 動手",
		title: "小數點滑軌",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "先估算，再按。左右兩邊都試過，就可以蓋章。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-center text-4xl tabular-nums text-ink",
				children: tidy(n)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
				children: [
					{
						label: "÷ 10",
						by: 10,
						dir: "左",
						step: 1,
						side: "L"
					},
					{
						label: "÷ 100",
						by: 100,
						dir: "左",
						step: 2,
						side: "L"
					},
					{
						label: "÷ 1000",
						by: 1e3,
						dir: "左",
						step: 3,
						side: "L"
					},
					{
						label: "÷ 0.1",
						by: .1,
						dir: "右",
						step: 1,
						side: "R"
					},
					{
						label: "÷ 0.01",
						by: .01,
						dir: "右",
						step: 2,
						side: "R"
					},
					{
						label: "÷ 0.001",
						by: .001,
						dir: "右",
						step: 3,
						side: "R"
					}
				].map((op) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-full border border-line bg-cream px-3 text-ink",
					onClick: () => {
						setN((v) => Math.round(v / op.by * 1e6) / 1e6);
						setNote(`除以 ${op.by}，小數點向${op.dir}移 ${op.step} 位。`);
						if (op.side === "L") setSeenLeft(true);
						else setSeenRight(true);
					},
					children: op.label
				}, op.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-grass",
				role: "status",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 text-sm text-muted underline",
				onClick: () => setN(36.9),
				children: "回到 36.9"
			})
		]
	});
}
function FractionRide({ onClear }) {
	const pairs = [
		{
			dec: "0.7",
			frac: "7/10",
			ok: "7/10"
		},
		{
			dec: "0.12",
			frac: "3/25",
			ok: "3/25"
		},
		{
			dec: "0.375",
			frac: "3/8",
			ok: "3/8"
		}
	];
	const [i, setI] = (0, import_react.useState)(0);
	const [pick, setPick] = (0, import_react.useState)(null);
	const item = pairs[i];
	const choices = [
		"7/10",
		"3/25",
		"3/8",
		"1/4"
	];
	const right = pick === item.ok;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6N2 · 動手",
		title: "糖畫對對碰",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "把小數和分數配成同一份糖。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "my-4 text-center text-4xl tabular-nums",
				children: item.dec
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: choices.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-xl border px-3 " + (pick === c ? "border-grass bg-cream" : "border-line bg-paper"),
					onClick: () => {
						setPick(c);
						if (c === item.ok) onClear();
					},
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: pick === null ? null : right,
				children: right ? i < pairs.length - 1 ? "對上了。" : "三款都對得上。3/8 = 0.375，可以用來和 0.4 比較。" : "再看分母。0.7 是十分位，0.12 是百分位。"
			}),
			right && i < pairs.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: () => {
					setI((n) => n + 1);
					setPick(null);
				},
				children: "下一款"
			})
		]
	});
}
function PercentGrid({ onClear }) {
	const targets = [
		20,
		35,
		100
	];
	const [ti, setTi] = (0, import_react.useState)(0);
	const [on, setOn] = (0, import_react.useState)(() => Array(100).fill(false));
	const count = on.filter(Boolean).length;
	const target = targets[ti];
	const hit = count === target;
	const g = gcd(count, 100);
	(0, import_react.useEffect)(() => {
		if (hit) onClear();
	}, [hit, onClear]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6N3 · 動手",
		title: "一百面彩旗",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"塗到 ",
					target,
					"% 。100% 就是全部旗。"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-10 gap-1",
				"aria-label": "一百格",
				children: on.map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": cell,
					className: "h-6 rounded-sm sm:h-7 " + (cell ? "bg-coral" : "bg-line"),
					onClick: () => setOn((prev) => prev.map((v, j) => j === i ? !v : v))
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 tabular-nums text-ink",
				children: [
					count,
					"%　=　",
					count / 100,
					"　=　",
					count === 0 ? "0" : `${count / g}/${100 / g}`
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: hit ? true : null,
				children: "塗好了。百分數、小數、最簡分數是同一件事的三種寫法。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-full border border-line px-4",
					onClick: () => setOn(Array(100).fill(false)),
					children: "清空"
				}), ti < targets.length - 1 && hit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-full bg-grass px-4 text-paper",
					onClick: () => {
						setTi((n) => n + 1);
						setOn(Array(100).fill(false));
					},
					children: "下一個目標"
				})]
			})
		]
	});
}
function PercentShop({ onClear }) {
	const [price, setPrice] = (0, import_react.useState)(50);
	const up = Math.round(price * 1.1 * 100) / 100;
	const down = Math.round(price * .9 * 100) / 100;
	const [guess, setGuess] = (0, import_react.useState)("");
	const n = Number(guess);
	const ok = Number.isFinite(n) && Math.abs(n - up) < .001;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6N4 · 動手",
		title: "加價與減價",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "只做「增加或減少一個百分數之後是多少」。不做折扣和利息。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "原價" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value: price,
						onChange: (e) => setPrice(Number(e.target.value) || 0),
						className: "min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "元" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3",
				children: ["減少 10% 後：", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums font-medium",
					children: [tidy(down), " 元"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "增加 10% 後是" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value: guess,
						onChange: (e) => setGuess(e.target.value),
						className: "min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums",
						"aria-label": "加價後的價錢"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "元" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-full bg-grass px-4 text-paper",
						onClick: () => {
							if (ok) onClear();
						},
						children: "核對"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: guess === "" ? null : ok,
				children: ok ? `對。${tidy(price)} × 110% = ${tidy(up)}。` : `想想原價的 10% 是多少，再加回去。`
			})
		]
	});
}
var EQUATIONS = [
	{
		label: "3x + 1.5 = 7.5",
		answer: 2,
		check: (x) => Math.abs(3 * x + 1.5 - 7.5) < .001,
		why: "兩邊減 1.5，得 3x = 6，x = 2。驗算：3×2 + 1.5 = 7.5。"
	},
	{
		label: "x + 2.5 = 8",
		answer: 5.5,
		check: (x) => Math.abs(x + 2.5 - 8) < .001,
		why: "兩邊減 2.5，x = 5.5。"
	},
	{
		label: "0.75x = 30",
		answer: 40,
		check: (x) => Math.abs(.75 * x - 30) < .001,
		why: "兩邊除以 0.75，x = 40。這是「求原本的數」。"
	}
];
function SeesawRide({ onClear }) {
	const [ei, setEi] = (0, import_react.useState)(0);
	const [raw, setRaw] = (0, import_react.useState)("");
	const eq = EQUATIONS[ei];
	const n = Number(raw);
	const known = raw.trim() !== "" && Number.isFinite(n);
	const ok = known && eq.check(n);
	const tilt = !known ? 0 : Math.max(-16, Math.min(16, (n - eq.answer) * 4));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6A1 · 動手",
		title: "蹺蹺板",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 flex flex-wrap gap-2",
				children: EQUATIONS.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-full border px-3 text-sm " + (i === ei ? "border-grass bg-cream" : "border-line"),
					onClick: () => {
						setEi(i);
						setRaw("");
					},
					children: e.label
				}, e.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-6 h-28 w-full max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-16",
					style: { transform: `rotate(${tilt}deg)` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-6 right-0 left-0 h-2 rounded-full bg-sun" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-0 left-2 flex size-14 items-center justify-center rounded-full bg-coral text-xs text-paper",
							children: "左"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-0 right-2 flex size-14 items-center justify-center rounded-full bg-grass text-xs text-paper",
							children: "右"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-8 w-2 bg-ink" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-2 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "x =" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					inputMode: "decimal",
					value: raw,
					onChange: (e) => setRaw(e.target.value),
					className: "min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums",
					"aria-label": "未知數"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: known ? ok : null,
				children: ok ? eq.why : "板還沒有平。等號兩邊要一樣重。"
			}),
			ok && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: onClear,
				children: "驗算完成，蓋章"
			})
		]
	});
}
function kindOf(deg) {
	if (deg === 0 || deg === 360) return "0° 和 360° 不用量";
	if (deg < 90) return "銳角";
	if (deg === 90) return "直角";
	if (deg < 180) return "鈍角";
	if (deg === 180) return "平角";
	if (deg < 360) return "反角";
	return "";
}
function AngleRide({ onClear }) {
	const [deg, setDeg] = (0, import_react.useState)(35);
	const hit = Math.abs(deg - 60) <= 2;
	const rad = (360 - deg) * Math.PI / 180;
	const x2 = 100 + Math.cos(rad) * 68;
	const y2 = 100 + Math.sin(rad) * 68;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6M1 · 動手",
		title: "滑梯量角器",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "把活動的一邊調到 60°。量度前先估計：比直角小一點。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 200 200",
				className: "mx-auto mt-2 w-full max-w-64",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "100",
						cy: "100",
						r: "72",
						fill: "none",
						className: "stroke-line",
						strokeWidth: "8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "100",
						y1: "100",
						x2: "168",
						y2: "100",
						className: "stroke-ink",
						strokeWidth: "3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "100",
						y1: "100",
						x2,
						y2,
						className: "stroke-coral",
						strokeWidth: "3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "100",
						cy: "100",
						r: "4",
						className: "fill-ink"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x: "100",
						y: "28",
						textAnchor: "middle",
						className: "fill-ink text-lg",
						children: [deg, "°"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted",
				children: kindOf(deg)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 min-w-11 rounded-full border border-line",
						onClick: () => setDeg((d) => (d + 359) % 360),
						children: "−1°"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 359,
						value: deg,
						"aria-label": "角度",
						onChange: (e) => setDeg(Number(e.target.value)),
						className: "w-40 accent-grass"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 min-w-11 rounded-full border border-line",
						onClick: () => setDeg((d) => (d + 1) % 360),
						children: "+1°"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: hit ? true : deg === 0 ? false : null,
				children: hit ? "60°，是銳角。用量角器畫角時，也是先對準頂點和其中一邊。" : "0° 不用量，把一邊拖開。"
			}),
			hit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: onClear,
				children: "角度正確，蓋章"
			})
		]
	});
}
function VolumeRide({ onClear }) {
	const before = 250;
	const [after, setAfter] = (0, import_react.useState)(410);
	const [floats, setFloats] = (0, import_react.useState)(false);
	const vol = after - before;
	const [raw, setRaw] = (0, import_react.useState)("");
	const n = Number(raw);
	const ok = !floats && raw !== "" && n === vol;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6M2 · 動手",
		title: "排水量杯",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-40 w-24 items-end overflow-hidden rounded-b-xl border-2 border-ink bg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full bg-grass/50",
					style: { height: `${after / 800 * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-center tabular-nums text-sm",
				children: [
					"水面 ",
					after,
					" mL　原來 ",
					before,
					" mL"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: before,
				max: 700,
				value: after,
				"aria-label": "水面",
				onChange: (e) => setAfter(Number(e.target.value)),
				className: "mt-2 w-full accent-grass",
				disabled: floats
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-2 flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: floats,
					onChange: (e) => setFloats(e.target.checked)
				}), "這次放進去的是會浮起的皮球"]
			}),
			floats ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-coral",
				children: "皮球沒有完全被水蓋過，排水法不適用。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "體積" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value: raw,
						onChange: (e) => setRaw(e.target.value),
						className: "min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums",
						"aria-label": "體積"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "cm³" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-full bg-grass px-4 text-paper",
						onClick: () => ok && onClear(),
						children: "核對"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: floats ? false : raw === "" ? null : ok,
				children: ok ? `${after} − ${before} = ${vol} mL = ${vol} cm³。1 立方米則等於 1000 升。` : "用上升了的水來算。1 mL = 1 cm³。"
			})
		]
	});
}
var CIRCLES = [
	{
		name: "摩天輪",
		ask: "圓周",
		answer: 31.4,
		why: "πd = 3.14 × 10 = 31.4 米"
	},
	{
		name: "直徑 7 米的圓池",
		ask: "圓周",
		answer: 22,
		why: "π 取 22/7：22/7 × 7 = 22 米"
	},
	{
		name: "直徑 14 米的半圓拱門",
		ask: "周界（半圓周 + 直徑）",
		answer: 36,
		why: "全圓周 44，一半是 22，加直徑 14，得 36 米"
	}
];
function CircleRide({ onClear }) {
	const [i, setI] = (0, import_react.useState)(0);
	const [raw, setRaw] = (0, import_react.useState)("");
	const item = CIRCLES[i];
	const n = Number(raw);
	const ok = raw !== "" && Math.abs(n - item.answer) < .02;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6M3 · 動手",
		title: "繞着圓走",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-28 items-center justify-center rounded-full border-4 border-coral bg-cream text-sm",
					children: item.name
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "π 只用 3.14 或 22/7。不用圓心角求弧長。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.ask }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value: raw,
						onChange: (e) => setRaw(e.target.value),
						className: "min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "米" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: raw === "" ? null : ok,
				children: ok ? item.why : "先寫圓周 = π × 直徑。半圓拱門還要加回那條直徑。"
			}),
			ok && (i < CIRCLES.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: () => {
					setI((n) => n + 1);
					setRaw("");
				},
				children: "下一個圓"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: onClear,
				children: "三個都算過，蓋章"
			}))
		]
	});
}
function AreaRide({ onClear }) {
	const [raw, setRaw] = (0, import_react.useState)("");
	const n = Number(raw);
	const ok = raw !== "" && n === 154;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6M5 · 動手",
		title: "旋轉杯地板",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "半徑 7 米，π 取 22/7。只由半徑求面積，不反推半徑。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto my-4 size-28 rounded-full bg-sun/40 ring-4 ring-sun" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "圓面積" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value: raw,
						onChange: (e) => setRaw(e.target.value),
						className: "min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "平方米" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-full bg-grass px-4 text-paper",
						onClick: () => ok && onClear(),
						children: "核對"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: raw === "" ? null : ok,
				children: ok ? "22/7 × 7 × 7 = 154。半圓就是 77，四分一圓是 38.5。" : "圓面積 = π × 半徑 × 半徑。"
			})
		]
	});
}
function SpeedRide({ onClear }) {
	const [ran, setRan] = (0, import_react.useState)(false);
	const [raw, setRaw] = (0, import_react.useState)("");
	const n = Number(raw);
	const ok = raw !== "" && n === 45;
	const points = (0, import_react.useMemo)(() => "0,80 60,40 120,40 200,8", []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6M4 · 動手",
		title: "小火車",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "兩輛車跑了同樣的 4 秒。行得遠的較快。不做追趕，也不把 m/s 化成 km/h。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-3 overflow-hidden rounded-full bg-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-full bg-coral transition-all duration-700 " + (ran ? "w-2/5" : "w-0") })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-3 overflow-hidden rounded-full bg-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-full bg-grass transition-all duration-700 " + (ran ? "w-4/5" : "w-0") })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full border border-line px-4",
				onClick: () => setRan(true),
				children: ran ? "紅車 12 米，綠車 20 米" : "開跑 4 秒"
			}),
			ran && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: "紅車 12÷4 = 3 m/s，綠車 20÷4 = 5 m/s。同一時間，綠車較快。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 220 100",
				className: "mt-4 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
						points,
						fill: "none",
						className: "stroke-grass",
						strokeWidth: "3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "4",
						y: "96",
						className: "fill-muted text-[10px]",
						children: "0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "168",
						y: "96",
						className: "fill-muted text-[10px]",
						children: "3 小時"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "行程圖：第一小時上升，第二小時是平線（停車），第三小時再上升。全程 90 公里、3 小時。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "平均速率" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value: raw,
						onChange: (e) => setRaw(e.target.value),
						className: "min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "km/h" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-full bg-grass px-4 text-paper",
						onClick: () => ok && onClear(),
						children: "核對"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: raw === "" ? null : ok,
				children: ok ? "90 ÷ 3 = 45 km/h。平線那一小時路程沒有增加。" : "平均速率 = 總路程 ÷ 總時間。"
			})
		]
	});
}
var SCORES = [
	4,
	8,
	6,
	10
];
function MeanRide({ onClear }) {
	const [flat, setFlat] = (0, import_react.useState)(false);
	const mean = 7;
	const shown = flat ? SCORES.map(() => mean) : SCORES;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6D1 · 動手",
		title: "把柱子填平",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "先估一條橫線，再想像把高出的部分填去矮柱。填平之後就是平均數。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex h-40 items-end gap-3",
				children: shown.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full rounded-t-lg bg-grass",
						style: { height: `${v * 10}%` }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm tabular-nums",
						children: v
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: () => {
					setFlat(true);
					onClear();
				},
				children: flat ? `平均值是 ${mean}` : "試着填平"
			})
		]
	});
}
var HOURS = [
	"10",
	"11",
	"12",
	"13",
	"14",
	"15"
];
function LineRide({ onClear }) {
	const [vals, setVals] = (0, import_react.useState)([
		40,
		40,
		40,
		40,
		40,
		40
	]);
	const max = Math.max(...vals);
	const spread = max - Math.min(...vals);
	const peak = HOURS[vals.indexOf(max)];
	const ready = spread >= 40;
	const pts = vals.map((v, i) => `${20 + i * 36},${120 - v * .7}`).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6D2 · 動手",
		title: "砌一條人龍折線",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "調每小時的人數。高低差至少 40 人，折線才看得出趨勢。只畫一組數據。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 220 130",
				className: "mt-2 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
					points: pts,
					fill: "none",
					className: "stroke-coral",
					strokeWidth: "3"
				}), vals.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 20 + i * 36,
					cy: 120 - v * .7,
					r: "3",
					className: "fill-ink"
				}, HOURS[i]))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2 sm:grid-cols-6",
				children: HOURS.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-center text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-muted",
							children: [h, "時"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: vals[i]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 flex justify-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 min-w-11 rounded-full border border-line",
								onClick: () => setVals((prev) => prev.map((v, j) => j === i ? Math.max(20, v - 10) : v)),
								children: "−"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 min-w-11 rounded-full border border-line",
								onClick: () => setVals((prev) => prev.map((v, j) => j === i ? Math.min(140, v + 10) : v)),
								children: "+"
							})]
						})
					]
				}, h))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: ready ? true : null,
				children: ready ? `最高在 ${peak} 時，有 ${max} 人。線向上是增加，向下是減少。` : "再把某一小時調高或調低。"
			}),
			ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: onClear,
				children: "折線完成，蓋章"
			})
		]
	});
}
function Arc({ frac, color, offset }) {
	const r = 16;
	const c = 2 * Math.PI * r;
	const len = frac * c;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "21",
		cy: "21",
		r,
		fill: "none",
		stroke: color,
		strokeWidth: "8",
		strokeDasharray: `${len} ${c - len}`,
		strokeDashoffset: -offset * c
	});
}
function PieRide({ onClear }) {
	const [seen, setSeen] = (0, import_react.useState)(false);
	const parts = (0, import_react.useMemo)(() => [
		{
			name: "遊戲",
			frac: .5,
			color: "var(--color-grass)"
		},
		{
			name: "小食",
			frac: .25,
			color: "var(--color-sun)"
		},
		{
			name: "休息",
			frac: .25,
			color: "var(--color-coral)"
		}
	], []);
	let acc = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6D3 · 動手",
		title: "一整天的圓",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 42 42",
					className: "size-36 -rotate-90",
					children: parts.map((p) => {
						const el = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arc, {
							frac: p.frac,
							color: p.color,
							offset: acc
						}, p.name);
						acc += p.frac;
						return el;
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "遊戲 180°，佔一半" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "小食 90°" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "休息 90°" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "mt-1 text-muted",
							children: "角度都是 45° 的倍數，不用自己量。"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full border border-line px-4",
				onClick: () => setSeen(true),
				children: "看兩個月的宣傳費"
			}),
			seen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl bg-cream p-3 text-sm",
					children: "一月收入 2000 元，宣傳費 20%，即 400 元。"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl bg-cream p-3 text-sm",
					children: "二月收入 800 元，宣傳費 25%，即 200 元。"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: seen ? true : null,
				children: "百分數較大，不代表金額較大。只看兩幅圓，不能比較實際銀碼。"
			}),
			seen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: onClear,
				children: "看懂了，蓋章"
			})
		]
	});
}
var SERIES = [
	100,
	108,
	104,
	118,
	112
];
function Poly({ from, to }) {
	const pts = SERIES.map((v, i) => {
		return `${16 + i * 40},${90 - (v - from) / (to - from) * 70}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 190 100",
		className: "w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			points: pts,
			fill: "none",
			className: "stroke-coral",
			strokeWidth: "3"
		})
	});
}
function MisuseRide({ onClear }) {
	const [pick, setPick] = (0, import_react.useState)(null);
	const ok = pick === "same";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6D4 · 動手",
		title: "兩張海報",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "同一組排隊人數。左圖縱軸 0 到 200，右圖 90 到 130。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poly, {
					from: 0,
					to: 200
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm",
					children: "從 0 起"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poly, {
					from: 90,
					to: 130
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm",
					children: "從 90 起"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2",
				children: [
					["more", "右圖的人數升得比較多"],
					["same", "數據相同，右圖把變化誇大了"],
					["left", "左圖一定印錯"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-xl border px-3 text-left " + (pick === id ? "border-grass bg-cream" : "border-line"),
					onClick: () => setPick(id),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: pick === null ? null : ok,
				children: ok ? "縱軸比例會改變觀感。不誠實的圖，可能讓人加開太多閘口。" : "先看兩圖用的是不是同一組數。"
			}),
			ok && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: onClear,
				children: "破案，蓋章"
			})
		]
	});
}
var LEFT = [
	[0, 1],
	[1, 1],
	[1, 2],
	[2, 0],
	[2, 1],
	[2, 2],
	[2, 3],
	[3, 1],
	[3, 2],
	[4, 2],
	[5, 2],
	[5, 3]
];
function key(r, c) {
	return `${r}-${c}`;
}
function MirrorRide({ onClear }) {
	const left = (0, import_react.useMemo)(() => new Set(LEFT.map(([r, c]) => key(r, c))), []);
	const expect = (0, import_react.useMemo)(() => new Set(LEFT.map(([r, c]) => key(r, 7 - c))), []);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const got = new Set(picked);
	const ok = checked && picked.length === expect.size && picked.every((k) => expect.has(k));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "6S1 · 動手",
		title: "沿軸畫另一半",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "只塗右邊。對摺後要和左邊重合。圖形上的花紋不用理。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid w-max grid-cols-8 gap-1",
					children: Array.from({ length: 48 }, (_, i) => {
						const r = Math.floor(i / 8);
						const c = i % 8;
						const k = key(r, c);
						const fixed = c < 4;
						const on = fixed ? left.has(k) : got.has(k);
						const bad = checked && !fixed && on !== expect.has(k);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: fixed,
							"aria-pressed": on,
							onClick: () => {
								setChecked(false);
								setPicked((prev) => prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]);
							},
							className: "size-9 rounded-md border sm:size-11 " + (bad ? "border-coral bg-coral/30" : on ? "border-grass bg-grass" : "border-line bg-paper")
						}, k);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-grass px-4 text-paper",
				onClick: () => {
					setChecked(true);
					if (picked.length === expect.size && picked.every((k) => expect.has(k))) onClear();
				},
				children: "對摺檢查"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: checked ? ok : null,
				children: ok ? "兩邊重合，中間就是對稱軸。" : "紅色的格子還未和左邊成鏡像。"
			})
		]
	});
}
function TurnRide({ onClear }) {
	const [turns, setTurns] = (0, import_react.useState)(0);
	const back = turns > 0 && turns % 4 === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "增潤 · 不是核心單位",
		title: "風車轉一轉",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "校本有旋轉對稱。對齊課程闡釋時，必學的是軸對稱，這一站只作增潤。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-4 flex justify-center",
				style: { transform: `rotate(${turns * 90}deg)` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid size-24 grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-tl-full bg-coral" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-tr-full bg-sun" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-bl-full bg-grass" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-br-full bg-ink" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "min-h-11 rounded-full border border-line px-4",
				onClick: () => setTurns((n) => n + 1),
				children: [
					"轉 90°（已轉 ",
					turns,
					" 次）"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: turns === 0 ? null : back,
				children: back ? "轉了 4 次 90°，回到原來的樣子。" : "還沒回到出發時的方向。"
			}),
			back && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-full bg-sun px-4 text-ink",
				onClick: onClear,
				children: "增潤蓋章"
			})
		]
	});
}
function DozenRide({ onClear }) {
	const [raw, setRaw] = (0, import_react.useState)("");
	const ok = Number(raw) === 36;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "增潤 · 不是核心單位",
		title: "一打不是十個",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "非十進制單位是校本增潤。1 米 = 100 厘米仍然是十進制，不要混在一起。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3 打氣球 =" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "numeric",
						value: raw,
						onChange: (e) => setRaw(e.target.value),
						className: "min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "個" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-full bg-sun px-4 text-ink",
						onClick: () => ok && onClear(),
						children: "核對"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckNote, {
				ok: raw === "" ? null : ok,
				children: ok ? "3 × 12 = 36。1 小時 = 60 分鐘，也是非十進制。" : "一打是 12，不是 10。"
			})
		]
	});
}
function Play({ id, onClear }) {
	switch (id) {
		case "6N1": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecimalRide, { onClear });
		case "6N2": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FractionRide, { onClear });
		case "6N3": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PercentGrid, { onClear });
		case "6N4": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PercentShop, { onClear });
		case "6A1": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeesawRide, { onClear });
		case "6M1": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AngleRide, { onClear });
		case "6M2": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeRide, { onClear });
		case "6M3": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleRide, { onClear });
		case "6M5": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaRide, { onClear });
		case "6M4": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedRide, { onClear });
		case "6D1": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeanRide, { onClear });
		case "6D2": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineRide, { onClear });
		case "6D3": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieRide, { onClear });
		case "6D4": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MisuseRide, { onClear });
		case "6S1": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MirrorRide, { onClear });
		case "enrich-turn": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurnRide, { onClear });
		case "enrich-base": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DozenRide, { onClear });
		default: return null;
	}
}
function BoothPractice({ unit }) {
	const target = usePark((s) => s.plan?.target ?? 80);
	const addResult = usePark((s) => s.addResult);
	const [paper, setPaper] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [startedAt, setStartedAt] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const start = () => {
		holdNav();
		setBusy(true);
		import("./practice-bank-GEsoUN4U.mjs").then((n) => n.r).then((n) => n.r).then(({ drawPractice }) => {
			const seed = Math.floor(Math.random() * 2147483647) + 1;
			setResult(null);
			setStartedAt(Date.now());
			setPaper(drawPractice(seed, [unit.id]));
			setBusy(false);
			finishNav();
		}).catch(() => {
			setBusy(false);
			finishNav();
		});
	};
	const finish = (rows) => {
		setResult(rows);
		addResult(rows.map((row) => ({
			unitId: row.item.unitId,
			correct: row.correct
		})));
		const stamp = studentStamp();
		recordPractice({ data: {
			...stamp,
			mode: "practice",
			correct: rows.filter((row) => row.correct).length,
			total: rows.length,
			seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1e3)),
			topics: unit.name,
			breakdown: topicBreakdown(rows.map((row) => ({
				name: unit.name,
				correct: row.correct
			})))
		} });
	};
	const score = result ? Math.round(result.filter((row) => row.correct).length / (result.length || 1) * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border border-line bg-paper p-4",
		children: [
			!paper && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl text-ink",
				children: "練習"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper disabled:opacity-60",
				onClick: start,
				disabled: busy,
				children: busy ? "準備題目…" : "開始練習"
			})] }),
			paper && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayQuiz, {
				items: paper,
				onDone: finish
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-coral",
					children: "成績"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-4xl tabular-nums text-ink",
					children: [score, " 分"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-ink",
					children: [
						"答對 ",
						result.filter((row) => row.correct).length,
						" / ",
						result.length,
						" 題。",
						score >= target ? `達到你的目標 ${target} 分。` : `距離目標 ${target} 分還差一點。`
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-nav": true,
					className: "mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper",
					onClick: start,
					children: "再練一組"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-3",
					children: result.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-cream/60 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-muted",
								children: row.correct ? "答對" : "要再看"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-bold text-ink",
								children: row.item.question.stem
							}),
							row.item.question.figure && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureView, { figure: row.item.question.figure }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-ink",
								children: row.item.question.why
							})
						]
					}, row.item.id))
				})
			] })
		]
	});
}
function RideView({ unit }) {
	const stamped = usePark((s) => s.stamps.includes(unit.id));
	const stamp = usePark((s) => s.stamp);
	const onClear = (0, import_react.useCallback)(() => stamp(unit.id), [stamp, unit.id]);
	const nxt = nextUnit(unit.id);
	const order = CORE_UNITS.findIndex((u) => u.id === unit.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "min-h-11 self-start text-sm font-medium text-grass",
				children: "← 返回遊樂場"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium text-muted",
					children: [
						unit.book,
						" · ",
						unit.bookUnit,
						unit.enrich ? " · 增潤" : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-4xl text-ink",
					children: unit.ride
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-ink",
					children: unit.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						unit.code,
						" ",
						unit.name,
						" · ",
						unit.strand,
						!unit.enrich && order >= 0 ? ` · 核心第 ${order + 1} 站` : "",
						stamped ? " · 已蓋章" : ""
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: unit.art,
				alt: "",
				className: "h-52 w-full rounded-3xl object-cover sm:h-64"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhiteboardTutor, {
				unitId: unit.id,
				title: unit.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
				id: unit.id,
				onClear
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoothPractice, { unit }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl border border-line bg-paper p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl text-ink",
					children: "今日學懂"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 list-disc space-y-1 pl-5 text-ink",
					children: unit.learn.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-3xl border border-line bg-paper p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, {
					questions: [...unit.questions, ...EXTRA[unit.id] ?? []],
					onClear
				})
			}),
			nxt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/ride/$id",
				params: { id: nxt.id },
				className: "flex min-h-11 items-center justify-between rounded-full bg-ink px-5 text-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "下一站" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: nxt.ride })]
			})
		]
	});
}
function RidePage() {
	const { id } = Route$1.useParams();
	const unit = getUnit(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RideView, { unit }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl text-ink",
			children: "找不到這座設施"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-flex min-h-11 items-center text-grass",
			children: "返回遊樂場"
		})]
	}) });
}
//#endregion
export { RidePage as component };
