//#region node_modules/.nitro/vite/services/ssr/assets/exam-papers-C2c2V6pq.js
var choice = (topic, stem, choices, answer, why, figure) => ({
	points: 2,
	topic,
	stem,
	choices,
	answer,
	why,
	kind: "choice",
	figure
});
var num = (topic, stem, answer, why, figure) => ({
	points: 3,
	topic,
	stem,
	answer,
	why,
	kind: "number",
	figure
});
var text = (topic, points, stem, show, keys, why, mode = "all", figure) => ({
	points,
	topic,
	stem,
	show,
	keys,
	why,
	mode,
	kind: "text",
	figure
});
var MIXED_PAPER = {
	unitId: "ALL",
	name: "綜合模擬考試",
	minutes: 60,
	total: 100,
	items: [
		choice("6N1", "7.2÷0.1=", [
			"0.72",
			"7.2",
			"72",
			"720"
		], 2, "7.2÷0.1=72。"),
		choice("6N2", "把 0.375 化成最簡分數：", [
			"3/8",
			"3/5",
			"5/8",
			"375/100"
		], 0, "0.375=375/1000=3/8。"),
		choice("6N3", "35% 化成小數是：", [
			"3.5",
			"0.35",
			"0.035",
			"35"
		], 1, "35%=35/100=0.35。"),
		choice("6N4", "80 增加 25% 後是：", [
			"85",
			"90",
			"100",
			"105"
		], 2, "80×1.25=100。"),
		choice("6A1", "方程 0.5x+2=7 的解是：", [
			"5",
			"8",
			"10",
			"14"
		], 2, "0.5x=5，x=10。"),
		choice("6M1", "一個角是 225°，它是：", [
			"鈍角",
			"平角",
			"反角",
			"周角"
		], 2, "比 180° 大而比 360° 小，是反角。", {
			kind: "angle",
			deg: 225,
			name: "225°"
		}),
		choice("6M2", "1 cm³ 等於：", [
			"1 mL",
			"10 mL",
			"100 mL",
			"1 L"
		], 0, "1 cm³=1 mL。"),
		choice("6M3", "圓的直徑是 14 cm，使用 π=22/7，圓周是：", [
			"22 cm",
			"44 cm",
			"88 cm",
			"154 cm"
		], 1, "C=πd=22/7×14=44 cm。"),
		choice("6M4", "一輛車行 120 km 用了 2 小時，平均速率是：", [
			"30 km/h",
			"60 km/h",
			"120 km/h",
			"240 km/h"
		], 1, "120÷2=60 km/h。"),
		choice("6M5", "圓的半徑是 7 cm，使用 π=22/7，圓面積是：", [
			"44 cm²",
			"77 cm²",
			"154 cm²",
			"308 cm²"
		], 2, "A=πr²=22/7×7×7=154 cm²。", {
			kind: "circle",
			mark: "r",
			value: "7 cm"
		}),
		choice("6S1", "非正方形長方形有多少條對稱軸？", [
			"1條",
			"2條",
			"3條",
			"4條"
		], 1, "長方形有 2 條對稱軸，分別對摺長和闊。", {
			kind: "sym",
			shape: "rect",
			axes: "two"
		}),
		choice("6D1", "數據 4、6、8、10 的平均數是：", [
			"6",
			"7",
			"8",
			"9"
		], 1, "(4+6+8+10)÷4=7。"),
		choice("6D2", "一星期的氣溫依次為 20°C、22°C、21°C、24°C。若要顯示氣溫隨日子的變化，較適合使用：", [
			"折線圖",
			"圓形圖",
			"示意圖",
			"路線圖"
		], 0, "折線圖適合顯示數據隨時間的變化。", {
			kind: "line",
			xLabel: "日子",
			yLabel: "氣溫（°C）",
			cats: [
				"一",
				"二",
				"三",
				"四"
			],
			series: [{
				name: "氣溫",
				values: [
					20,
					22,
					21,
					24
				]
			}]
		}),
		choice("6D3", "圓形圖中一部分的圓心角是 90°，該部分佔全圓：", [
			"1/4",
			"1/3",
			"1/2",
			"3/4"
		], 0, "90÷360=1/4。", {
			kind: "sectors",
			parts: 4,
			shaded: 1,
			note: "90°"
		}),
		choice("6D4", "同一組數據以兩幅折線圖表示：甲圖縱軸每格代表 1，乙圖每格代表 10。哪項說法正確？", [
			"甲圖的數據一定較大",
			"乙圖的數據一定較小",
			"甲圖的變化看起來可能較明顯",
			"兩圖的數據必定不同"
		], 2, "每格代表的數值較小，同樣的變化在圖上看起來較陡、較明顯。", {
			kind: "line",
			xLabel: "項目",
			yLabel: "數值",
			cats: [
				"A",
				"B",
				"C",
				"D"
			],
			series: [{
				name: "數據",
				values: [
					8,
					9,
					8,
					10
				]
			}]
		}),
		num("6N1", "8.4÷0.7=", 12, "8.4÷0.7=12。"),
		text("6N2", 3, "0.6= ______（以最簡分數表示）。", "3/5", ["3/5"], "0.6=6/10=3/5。", "any"),
		num("6N3", "3/4= ______ %。", 75, "3/4=0.75=75%。"),
		num("6N4", "200 的 15% 是 ______。", 30, "200×0.15=30。"),
		num("6A1", "3x−4=14，x=", 6, "3x=18，x=6。"),
		text("6M1", 3, "180° 稱為 ______ 角。", "平角", ["平", "平角"], "180° 是平角。", "any", {
			kind: "angle",
			deg: 180,
			name: "平角"
		}),
		num("6M2", "2 L= ______ cm³。", 2e3, "1 L=1000 cm³，2 L=2000 cm³。"),
		num("6M3", "圓周為 62.8 cm，使用 π=3.14，直徑是 ______ 厘米。", 20, "d=C÷π=62.8÷3.14=20 cm。", {
			kind: "circle",
			mark: "d",
			value: "?",
			caption: "圓周 62.8 cm"
		}),
		num("6M4", "90 分鐘等於 ______ 小時。", 1.5, "90÷60=1.5 小時。"),
		num("6M5", "圓的直徑是 10 cm，使用 π=3.14，圓面積是 ______ 平方厘米。", 78.5, "半徑 5 cm。A=3.14×5×5=78.5 cm²。", {
			kind: "circle",
			mark: "d",
			value: "10 cm"
		}),
		text("6N1", 8, "一瓶果汁有 3.6 L。小明每天喝 3/10 L。（a）把每天喝的果汁量化成小數。（b）這瓶果汁可喝多少天？", "0.3 L；12 天", ["0.3", "12"], "（a）3/10=0.3 L。（b）3.6÷0.3=12，可喝 12 天。"),
		text("6A1", 8, "一個數的 40% 是 28。設這個數為 x，列方程求 x，並驗算。", "x=70", ["70"], "0.4x=28，x=70。驗算：70×40%=28。"),
		text("6M2", 8, "一個長方體盒長 20 cm、闊 10 cm、高 6 cm。盒內放入一個體積為 500 cm³ 的物件。（a）求盒子的容積。（b）求剩餘空間的體積。", "1200 cm³；700 cm³", ["1200", "700"], "（a）20×10×6=1200 cm³。（b）1200−500=700 cm³。", "all", {
			kind: "cuboid",
			l: 20,
			w: 10,
			h: 6,
			unit: "cm"
		}),
		text("6M4", 8, "一輛巴士上午 9 時 15 分出發，上午 10 時 45 分到達。路程是 60 km。（a）求行車時間。（b）求平均速率。", "1.5 小時；40 km/h", ["1.5", "40"], "（a）由 9:15 至 10:45 是 1 小時 30 分鐘，即 1.5 小時。（b）60÷1.5=40 km/h。", "all", {
			kind: "clocks",
			times: [{
				label: "出發",
				h: 9,
				m: 15
			}, {
				label: "到達",
				h: 10,
				m: 45
			}]
		}),
		text("6D1", 8, "某班學生的閱讀頁數：星期一 10 頁、星期二 14 頁、星期三 12 頁、星期四 16 頁。（a）求四天的平均數。（b）描述變化趨勢，並指出哪一天至哪一天下降。（c）若畫折線圖，橫軸和縱軸各表示甚麼？", "13 頁；星期二至星期三下降；橫軸日子、縱軸頁數", [
			"13",
			"星期二",
			"星期三",
			"頁"
		], "（a）(10+14+12+16)÷4=13 頁。（b）整體上升；星期二至星期三由 14 頁降至 12 頁。（c）橫軸：日子；縱軸：閱讀頁數（頁）。", "all", {
			kind: "line",
			xLabel: "日子",
			yLabel: "頁數",
			cats: [
				"星期一",
				"星期二",
				"星期三",
				"星期四"
			],
			series: [{
				name: "頁數",
				values: [
					10,
					14,
					12,
					16
				]
			}]
		})
	]
};
var EXAM_PAPERS = [
	{
		"unitId": "6N1",
		"name": "6N1 小數（四）",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "7.2÷10=",
				"why": "C",
				"kind": "choice",
				"choices": [
					"72",
					"7.02",
					"0.72",
					"0.072"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "3.6÷0.1=",
				"why": "C",
				"kind": "choice",
				"choices": [
					"0.36",
					"3.6",
					"36",
					"360"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "4.8÷6=",
				"why": "A",
				"kind": "choice",
				"choices": [
					"0.8",
					"0.08",
					"8",
					"28.8"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "5÷0.5=",
				"why": "C",
				"kind": "choice",
				"choices": [
					"0.1",
					"1",
					"10",
					"25"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "8.4÷0.7=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"1.2",
					"12",
					"120",
					"0.12"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "2.4÷0.6=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.4",
					"4",
					"40",
					"1.8"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "6.3÷3=",
				"why": "A",
				"kind": "choice",
				"choices": [
					"2.1",
					"21",
					"0.21",
					"3.3"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "9.6÷100=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.96",
					"0.096",
					"0.0096",
					"960"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "3.75÷0.01=",
				"why": "D",
				"kind": "choice",
				"choices": [
					"0.375",
					"3.75",
					"37.5",
					"375"
				],
				"answer": 3
			},
			{
				"points": 2,
				"stem": "7.2÷0.8+1.5=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"9",
					"10.5",
					"11.5",
					"12"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "8.5÷10=",
				"why": "0.85",
				"kind": "number",
				"answer": .85
			},
			{
				"points": 3,
				"stem": "420÷1000=",
				"why": "0.42",
				"kind": "number",
				"answer": .42
			},
			{
				"points": 3,
				"stem": "5.6÷0.1=",
				"why": "56",
				"kind": "number",
				"answer": 56
			},
			{
				"points": 3,
				"stem": "7.2÷0.01=",
				"why": "720",
				"kind": "number",
				"answer": 720
			},
			{
				"points": 3,
				"stem": "6.4÷8=",
				"why": "0.8",
				"kind": "number",
				"answer": .8
			},
			{
				"points": 3,
				"stem": "12÷0.4=",
				"why": "30",
				"kind": "number",
				"answer": 30
			},
			{
				"points": 3,
				"stem": "4.2÷0.6=",
				"why": "7",
				"kind": "number",
				"answer": 7
			},
			{
				"points": 3,
				"stem": "5.5÷2=",
				"why": "2.75",
				"kind": "number",
				"answer": 2.75
			},
			{
				"points": 3,
				"stem": "把 8.76÷4 的商取近似值至最接近的百分位：",
				"why": "2.19",
				"kind": "number",
				"answer": 2.19
			},
			{
				"points": 3,
				"stem": "計算 18.4÷4+2.5：",
				"why": "7.1",
				"kind": "number",
				"answer": 7.1
			},
			{
				"points": 8,
				"stem": "一卷絲帶長 8.4 米，平均剪成 6 段。每段長多少米？",
				"why": "8.4÷6=1.4 米。（算式4分，答案及單位4分）",
				"kind": "text",
				"show": "8.4÷6=1.4 米。",
				"keys": ["1.4"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "有 5 升果汁，每瓶盛 0.5 升。最多可裝滿多少瓶？",
				"why": "5÷0.5=10 瓶。（算式4分，答案4分）",
				"kind": "text",
				"show": "5÷0.5=10 瓶。",
				"keys": ["10"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "小食店有 12.6 千克米，平均分裝到 9 個袋內。每袋有多少千克？",
				"why": "12.6÷9=1.4 千克。（算式4分，答案及單位4分）",
				"kind": "text",
				"show": "12.6÷9=1.4 千克。",
				"keys": ["1.4"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一壺有 6.5 升水，每杯盛 0.4 升。最多可倒滿多少杯？餘下多少升水？",
				"why": "6.5÷0.4=16 餘 0.1；最多倒滿 16 杯，餘 0.1 升。（除法及商餘數8分，答案4分）",
				"kind": "text",
				"show": "6.5÷0.4=16 餘 0.1；最多倒滿 16 杯，餘 0.1 升。",
				"keys": ["16", "0.1"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "一條長 15.6 米的繩，每段剪成 1.2 米。可剪成多少段？若每段售 3.5 元，全部售出可得多少元？",
				"why": "15.6÷1.2=13 段；13×3.5=45.5 元。（求段數6分，求總價6分，答案及單位2分）",
				"kind": "text",
				"show": "15.6÷1.2=13 段；13×3.5=45.5 元。",
				"keys": ["13", "45.5"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6N2",
		"name": "6N2 小數（五）",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "0.7 化成分母為 10 的分數是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"7/10",
					"7/100",
					"70/10",
					"1/7"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "0.25 化成最簡分數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"25/10",
					"1/4",
					"2/5",
					"25/1000"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "3/5 化成小數是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"0.3",
					"0.5",
					"0.6",
					"0.8"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "7/20 化成小數是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"0.35",
					"0.7",
					"0.27",
					"3.5"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "哪個較大？",
				"why": "A",
				"kind": "choice",
				"choices": [
					"1/2",
					"0.45",
					"一樣大",
					"無法比較"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "0.125 化成最簡分數是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"1/8",
					"1/5",
					"1/4",
					"125/100"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "3/4 化成小數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.34",
					"0.75",
					"0.8",
					"1.25"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "2.5 化成最簡分數是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"5/2",
					"25/10",
					"2/5",
					"1/4"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "由小至大排列 0.4,3/8,0.5：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"3/8,0.4,0.5",
					"0.4,3/8,0.5",
					"0.5,0.4,3/8",
					"0.4,0.5,3/8"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "7/8 化成小數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.78",
					"0.875",
					"0.87",
					"1.125"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "0.3= ______ （分母為10）",
				"why": "3/10",
				"kind": "text",
				"show": "3/10",
				"keys": ["3/10"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "0.42= ______ （分母為100）",
				"why": "42/100",
				"kind": "text",
				"show": "42/100",
				"keys": ["42/100"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "0.125= ______ （最簡分數）",
				"why": "1/8",
				"kind": "text",
				"show": "1/8",
				"keys": ["1/8"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "9/20= ______ （小數）",
				"why": "0.45",
				"kind": "number",
				"answer": .45
			},
			{
				"points": 3,
				"stem": "3/8= ______ （小數）",
				"why": "0.375",
				"kind": "number",
				"answer": .375
			},
			{
				"points": 3,
				"stem": "1.25= ______ （最簡帶分數）",
				"why": "1 1/4",
				"kind": "text",
				"show": "1 1/4",
				"keys": [
					"1 1/4",
					"5/4",
					"11/4"
				],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "0.06= ______ （最簡分數）",
				"why": "3/50",
				"kind": "text",
				"show": "3/50",
				"keys": ["3/50"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "7/25= ______ （小數）",
				"why": "0.28",
				"kind": "number",
				"answer": .28
			},
			{
				"points": 3,
				"stem": "在 0.65 和 7/10 中，較大的是 ______ 。",
				"why": "7/10",
				"kind": "text",
				"show": "7/10",
				"keys": ["7/10"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "由小至大排列：0.72,3/4,0.7： ______ 。",
				"why": "0.7,0.72,3/4",
				"kind": "text",
				"show": "0.7,0.72,3/4",
				"keys": ["0.7,0.72,3/4"],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "一條布用去 3/10 米，寫成小數是多少米？",
				"why": "3/10=0.3 米。（轉換3分，答案及單位5分）",
				"kind": "text",
				"show": "3/10=0.3 米。",
				"keys": ["0.3"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一瓶果汁喝了 0.35 升，寫成最簡分數是多少升？",
				"why": "0.35=35/100=7/20 升。（轉分數4分，約分4分）",
				"kind": "text",
				"show": "0.35=35/100=7/20 升。",
				"keys": ["7/20"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "小華走了 7/20 公里，小明走了 0.4 公里。誰走得較遠？",
				"why": "7/20=0.35<0.4，小明較遠。（化小數4分，比較4分）",
				"kind": "text",
				"show": "小明較遠",
				"keys": ["小明"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個水壺裝了 1.25 升水。用分數表示水量，並寫成最簡帶分數。",
				"why": "1.25=125/100=5/4=1 1/4 升。（轉換步驟8分，最簡答案4分）",
				"kind": "text",
				"show": "1.25=125/100=5/4=1 1/4 升。",
				"keys": ["1 1/4"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "甲同學完成了 5/8 本練習冊，乙同學完成了 0.6 本。誰完成得較多？多多少本？",
				"why": "5/8=0.625，比 0.6 多 0.025 本，甲較多。（比較6分，差額6分，結論2分）",
				"kind": "text",
				"show": "甲較多，多 0.025 本",
				"keys": ["甲", "0.025"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6N3",
		"name": "6N3 百分數（一）",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "百分數表示以多少作分母的分數？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"10",
					"100",
					"1000",
					"1"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "25% 化成小數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"2.5",
					"0.25",
					"0.025",
					"25"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "0.4 化成百分數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"4%",
					"40%",
					"400%",
					"0.4%"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "3/5 化成百分數是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"30%",
					"50%",
					"60%",
					"80%"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "75% 化成最簡分數是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"3/4",
					"7/5",
					"75/10",
					"1/3"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "0.08 化成百分數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.8%",
					"8%",
					"80%",
					"800%"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "1/4 化成百分數是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"4%",
					"20%",
					"25%",
					"40%"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "125% 化成小數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.125",
					"1.25",
					"12.5",
					"125"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "40% 化成最簡分數是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"2/5",
					"4/5",
					"1/4",
					"40/10"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "哪個數值最小？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.6",
					"55%",
					"3/5",
					"三者相等"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "15%= ______ （小數）",
				"why": "0.15",
				"kind": "number",
				"answer": .15
			},
			{
				"points": 3,
				"stem": "0.72= ______ %",
				"why": "72",
				"kind": "number",
				"answer": 72
			},
			{
				"points": 3,
				"stem": "7/10= ______ %",
				"why": "70",
				"kind": "number",
				"answer": 70
			},
			{
				"points": 3,
				"stem": "35%= ______ （最簡分數）",
				"why": "7/20",
				"kind": "text",
				"show": "7/20",
				"keys": ["7/20"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "0.125= ______ %",
				"why": "12.5",
				"kind": "number",
				"answer": 12.5
			},
			{
				"points": 3,
				"stem": "9/20= ______ %",
				"why": "45",
				"kind": "number",
				"answer": 45
			},
			{
				"points": 3,
				"stem": "160%= ______ （小數）",
				"why": "1.6",
				"kind": "number",
				"answer": 1.6
			},
			{
				"points": 3,
				"stem": "5%= ______ （最簡分數）",
				"why": "1/20",
				"kind": "text",
				"show": "1/20",
				"keys": ["1/20"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "1.4= ______ %",
				"why": "140",
				"kind": "number",
				"answer": 140
			},
			{
				"points": 3,
				"stem": "62.5%= ______ （最簡分數）",
				"why": "5/8",
				"kind": "text",
				"show": "5/8",
				"keys": ["5/8"],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "一班有 40 位學生，其中 25% 參加合唱團。把 25% 寫成小數及最簡分數。",
				"why": "25%=0.25=1/4。（各項轉換4分）",
				"kind": "text",
				"show": "0.25 = 1/4",
				"keys": ["0.25", "1/4"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一個水箱的 3/4 容量已滿。以百分數和小數表示已用容量。",
				"why": "3/4=75%=0.75。（百分數4分，小數4分）",
				"kind": "text",
				"show": "75% = 0.75",
				"keys": ["75", "0.75"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "小明答對測驗題目比例是 0.85。以百分數表示。",
				"why": "0.85=85%。（轉換5分，答案3分）",
				"kind": "text",
				"show": "0.85=85%。",
				"keys": ["85"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一條繩長 2.5 米。把長度分別寫成分數和百分數形式。",
				"why": "2.5=5/2=250%。（分數6分，百分數6分）",
				"kind": "text",
				"show": "5/2 = 250%",
				"keys": ["5/2", "250"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "比較 5/8、62% 和 0.6，由小至大排列。",
				"why": "0.6=0.6，62%=0.62，5/8=0.625；由小至大：0.6,62%,5/8。（化同形式8分，排序4分，答案2分）",
				"kind": "text",
				"show": "0.6,62%,5/8",
				"keys": ["0.6,62%,5/8"],
				"mode": "any"
			}
		]
	},
	{
		"unitId": "6N4",
		"name": "6N4 百分數（二）",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "20 是 100 的百分之幾？",
				"why": "A",
				"kind": "choice",
				"choices": [
					"20%",
					"25%",
					"50%",
					"80%"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "50 的 10% 是多少？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.5",
					"5",
					"10",
					"50"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "80 增加 25% 後是多少？",
				"why": "C",
				"kind": "choice",
				"choices": [
					"90",
					"95",
					"100",
					"105"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "60 減少 10% 後是多少？",
				"why": "C",
				"kind": "choice",
				"choices": [
					"6",
					"50",
					"54",
					"66"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "15 是 60 的百分之幾？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"15%",
					"25%",
					"40%",
					"45%"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "200 的 5% 是多少？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"5",
					"10",
					"20",
					"40"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "40 增加 50% 後是多少？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"50",
					"60",
					"80",
					"90"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "120 減少 25% 後是多少？",
				"why": "C",
				"kind": "choice",
				"choices": [
					"30",
					"80",
					"90",
					"95"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "36 是 90 的百分之幾？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"30%",
					"40%",
					"45%",
					"60%"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "150 增加 20% 後是多少？",
				"why": "C",
				"kind": "choice",
				"choices": [
					"170",
					"175",
					"180",
					"200"
				],
				"answer": 2
			},
			{
				"points": 3,
				"stem": "30 是 50 的 ______ %。",
				"why": "60",
				"kind": "number",
				"answer": 60
			},
			{
				"points": 3,
				"stem": "80 的 25% 是 ______ 。",
				"why": "20",
				"kind": "number",
				"answer": 20
			},
			{
				"points": 3,
				"stem": "45 增加 20% 後是 ______ 。",
				"why": "54",
				"kind": "number",
				"answer": 54
			},
			{
				"points": 3,
				"stem": "90 減少 10% 後是 ______ 。",
				"why": "81",
				"kind": "number",
				"answer": 81
			},
			{
				"points": 3,
				"stem": "12 是 40 的 ______ %。",
				"why": "30",
				"kind": "number",
				"answer": 30
			},
			{
				"points": 3,
				"stem": "300 的 15% 是 ______ 。",
				"why": "45",
				"kind": "number",
				"answer": 45
			},
			{
				"points": 3,
				"stem": "64 增加 25% 後是 ______ 。",
				"why": "80",
				"kind": "number",
				"answer": 80
			},
			{
				"points": 3,
				"stem": "200 減少 15% 後是 ______ 。",
				"why": "170",
				"kind": "number",
				"answer": 170
			},
			{
				"points": 3,
				"stem": "72 的 12.5% 是 ______ 。",
				"why": "9",
				"kind": "number",
				"answer": 9
			},
			{
				"points": 3,
				"stem": "48 增加 50% 後是 ______ 。",
				"why": "72",
				"kind": "number",
				"answer": 72
			},
			{
				"points": 8,
				"stem": "圖書館有 200 本新書，其中 35% 是故事書。故事書有多少本？",
				"why": "200×0.35=70 本。（算式4分，答案4分）",
				"kind": "text",
				"show": "200×0.35=70 本。",
				"keys": ["70"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一個班有 40 位學生，今天有 10% 缺席。缺席學生有多少位？",
				"why": "40×0.1=4 位。（算式4分，答案4分）",
				"kind": "text",
				"show": "40×0.1=4 位。",
				"keys": ["4"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一個水箱原有 80 升水，加入原有水量的 25%。現在有多少升水？",
				"why": "增加 80×0.25=20 升；共 100 升。（增加量4分，總量4分）",
				"kind": "text",
				"show": "現在有 100 升",
				"keys": ["100"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個社團原有 120 名會員，因畢業減少 15%。現在有多少名會員？",
				"why": "減少 120×0.15=18 人；現有 120−18=102 人。（減少量6分，現有數6分）",
				"kind": "text",
				"show": "減少 120×0.15=18 人；現有 120−18=102 人。",
				"keys": ["102"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "一個數的 40% 是 28。利用方程求這個數，並驗算。",
				"why": "設原數為 x。0.4x=28，x=70。驗算：70×40%=28。（列方程4分，解方程6分，驗算4分）",
				"kind": "text",
				"show": "x = 70",
				"keys": ["70"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6A1",
		"name": "6A1 簡易方程（二）",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "方程 x+2.5=6 的解是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"2.5",
					"3",
					"3.5",
					"8.5"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "3x=15，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3",
					"5",
					"12",
					"45"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "x−1.2=3.8，x=",
				"why": "C",
				"kind": "choice",
				"choices": [
					"2.6",
					"4",
					"5",
					"6"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "(x)/(4)=3，x=",
				"why": "C",
				"kind": "choice",
				"choices": [
					"0.75",
					"7",
					"12",
					"16"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "2x+3=11，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3",
					"4",
					"7",
					"14"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "5x−4=16，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3",
					"4",
					"5",
					"6"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "2(x+3)=14，x=",
				"why": "A",
				"kind": "choice",
				"choices": [
					"4",
					"5",
					"8",
					"11"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "3x+2x=25，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3",
					"5",
					"10",
					"15"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "0.5x+2=7，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"5",
					"10",
					"14",
					"18"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "2(x−1.5)=9，x=",
				"why": "C",
				"kind": "choice",
				"choices": [
					"3",
					"4.5",
					"6",
					"7.5"
				],
				"answer": 2
			},
			{
				"points": 3,
				"stem": "x+4=10，x= ______ 。",
				"why": "6",
				"kind": "number",
				"answer": 6
			},
			{
				"points": 3,
				"stem": "x−2.5=3，x= ______ 。",
				"why": "5.5",
				"kind": "number",
				"answer": 5.5
			},
			{
				"points": 3,
				"stem": "4x=18，x= ______ 。",
				"why": "4.5",
				"kind": "number",
				"answer": 4.5
			},
			{
				"points": 3,
				"stem": "(x)/(5)=2.4，x= ______ 。",
				"why": "12",
				"kind": "number",
				"answer": 12
			},
			{
				"points": 3,
				"stem": "3x+2=17，x= ______ 。",
				"why": "5",
				"kind": "number",
				"answer": 5
			},
			{
				"points": 3,
				"stem": "6x−5=19，x= ______ 。",
				"why": "4",
				"kind": "number",
				"answer": 4
			},
			{
				"points": 3,
				"stem": "2(x+4)=20，x= ______ 。",
				"why": "6",
				"kind": "number",
				"answer": 6
			},
			{
				"points": 3,
				"stem": "3(x−2)=15，x= ______ 。",
				"why": "7",
				"kind": "number",
				"answer": 7
			},
			{
				"points": 3,
				"stem": "2x+3x=35，x= ______ 。",
				"why": "7",
				"kind": "number",
				"answer": 7
			},
			{
				"points": 3,
				"stem": "0.25x=12.5，x= ______ 。",
				"why": "50",
				"kind": "number",
				"answer": 50
			},
			{
				"points": 8,
				"stem": "一個數加上 3.5 得 9。設這個數為 x，列方程並求解。",
				"why": "x+3.5=9，x=5.5。（列方程4分，解4分）",
				"kind": "text",
				"show": "x+3.5=9，x=5.5。",
				"keys": ["5.5"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一個長方形的長是 x+2 厘米，闊是 x 厘米，周界為 20 厘米。列方程求 x。",
				"why": "2(x+2)+2x=20，4x+4=20，x=4。（列方程4分，解4分）",
				"figure": {
					"kind": "rect",
					"length": "x+2 cm",
					"width": "x cm",
					"note": "周界"
				},
				"kind": "text",
				"show": "2(x+2)+2x=20，4x+4=20，x=4。",
				"keys": ["4"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一個數的 3/5 是 24。列方程求這個數。",
				"why": "3/5x=24，x=40。（列方程4分，解4分）",
				"kind": "text",
				"show": "3/5x=24，x=40。",
				"keys": ["40"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個正方形的邊長是 x+1.5 厘米，周界是 30 厘米。列方程求邊長及 x，並驗算。",
				"why": "4(x+1.5)=30，邊長 =7.5 厘米，x=6；驗算 4×7.5=30。（列方程4分，解4分，驗算4分）",
				"figure": {
					"kind": "rect",
					"length": "x+1.5 cm",
					"width": "x+1.5 cm",
					"note": "正方形"
				},
				"kind": "text",
				"show": "邊長 7.5 cm，x = 6",
				"keys": ["7.5", "6"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "一件物品的原價是 x 元，增加 20% 後為 72 元。列方程求原價並驗算。",
				"why": "1.2x=72，x=60 元；驗算 60×1.2=72。（列方程4分，解6分，驗算4分）",
				"kind": "text",
				"show": "原價 60 元",
				"keys": ["60"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6M1",
		"name": "6M1 角（度）",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "直角是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"45°",
					"90°",
					"180°",
					"360°"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "平角是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"90°",
					"120°",
					"180°",
					"360°"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "周角是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"180°",
					"270°",
					"360°",
					"90°"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "120° 是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"銳角",
					"直角",
					"鈍角",
					"平角"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "240° 是：",
				"why": "D",
				"kind": "choice",
				"choices": [
					"銳角",
					"直角",
					"鈍角",
					"反角"
				],
				"answer": 3
			},
			{
				"points": 2,
				"stem": "45° 與 75° 比較，哪個較大？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"45°",
					"75°",
					"一樣大",
					"無法比較"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "180° 是甚麼角？",
				"why": "A",
				"kind": "choice",
				"choices": [
					"平角",
					"周角",
					"反角",
					"直角"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "角的符號是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"∠",
					"∥",
					"⟂",
					"△"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "360° 的一半是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"90°",
					"120°",
					"180°",
					"270°"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "比 90° 大而比 180° 小的角稱為：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"銳角",
					"鈍角",
					"反角",
					"周角"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "90° 稱為 ______ 角。",
				"why": "直",
				"kind": "text",
				"show": "直",
				"keys": ["直", "直角"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "180° 稱為 ______ 角。",
				"why": "平",
				"kind": "text",
				"show": "平",
				"keys": ["平", "平角"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "360° 稱為 ______ 角。",
				"why": "周",
				"kind": "text",
				"show": "周",
				"keys": ["周", "周角"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "135° 比直角大 ______ 度。",
				"why": "45",
				"kind": "number",
				"answer": 45
			},
			{
				"points": 3,
				"stem": "270° 是反角，亦比平角大 ______ 度。",
				"why": "90",
				"kind": "number",
				"answer": 90
			},
			{
				"points": 3,
				"stem": "若 ∠ABC=60°，角的頂點是 ______ 。",
				"why": "B",
				"kind": "text",
				"show": "B",
				"keys": ["B"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "一個周角的四分之一是 ______ 度。",
				"why": "90",
				"kind": "number",
				"answer": 90
			},
			{
				"points": 3,
				"stem": "45°+90°= ______ 度。",
				"why": "135",
				"kind": "number",
				"answer": 135
			},
			{
				"points": 3,
				"stem": "300°−180°= ______ 度。",
				"why": "120",
				"kind": "number",
				"answer": 120
			},
			{
				"points": 3,
				"stem": "由 0° 轉到 360°，共轉了 ______ 周。",
				"why": "1",
				"kind": "number",
				"answer": 1
			},
			{
				"points": 8,
				"stem": "一個角比直角大 35°。這個角是多少度？",
				"why": "90°+35°=125°。（算式4分，答案4分）",
				"kind": "text",
				"show": "90°+35°=125°。",
				"keys": ["125"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "估計一個角約為 90°、180° 或 360° 之一；若兩條射線方向相反，應選哪個？",
				"why": "180°，即平角。（選擇4分，名稱4分）",
				"figure": {
					"kind": "angle",
					"deg": 180,
					"name": "平角"
				},
				"kind": "text",
				"show": "180°，平角",
				"keys": ["180", "平角"],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "∠PQR=125°。指出頂點及這個角屬於哪一類。",
				"why": "頂點是 Q；125° 是鈍角。（頂點4分，分類4分）",
				"kind": "text",
				"show": "頂點是 Q；125° 是鈍角。",
				"keys": ["Q", "鈍角"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "用量角器畫一個 70° 的角，並命名為 ∠ABC。",
				"why": "畫出頂點為B、兩射線夾角為 70° 的圖形，並標記 ∠ABC。（角度正確6分，頂點及命名6分）",
				"figure": {
					"kind": "protractor",
					"deg": 70
				},
				"kind": "text",
				"show": "畫出頂點為B、兩射線夾角為 70° 的圖形，並標記 ∠ABC",
				"keys": ["70"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "描述如何用量角器畫出 210° 的角，並說明它是甚麼角。",
				"why": "先畫一直線作 180°，再在同一方向外加 30°，得到 210°；這是反角。（作圖描述8分，反角4分，角度2分）",
				"figure": {
					"kind": "angle",
					"deg": 210
				},
				"kind": "text",
				"show": "先畫一直線作 180°，再在同一方向外加 30°，得到 210°；這是反角",
				"keys": ["210", "反角"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6M2",
		"name": "6M2 體積（二）",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "1 cm³=",
				"why": "A",
				"kind": "choice",
				"choices": [
					"1 mL",
					"10 mL",
					"100 mL",
					"1 L"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "1 L=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"100 cm³",
					"1000 cm³",
					"10000 cm³",
					"1 cm³"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "長方體體積公式是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"長加闊加高",
					"長乘闊乘高",
					"長乘闊",
					"長加闊乘高"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "長 4 cm、闊 3 cm、高 2 cm 的長方體體積是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"9 cm³",
					"12 cm³",
					"24 cm³",
					"48 cm³"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "排水法中，物件體積等於：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"水位原有讀數",
					"浸入後讀數",
					"兩次讀數之差",
					"兩次讀數之和"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "物件放入前水位 60 mL，放入後 85 mL。物件體積是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"25 cm³",
					"60 cm³",
					"85 cm³",
					"145 cm³"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "1 m³=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"100 L",
					"1000 L",
					"10000 L",
					"1 L"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "邊長 5 cm 的正方體體積是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"25 cm³",
					"75 cm³",
					"125 cm³",
					"150 cm³"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "哪種物件不適合直接用排水法測量？",
				"why": "C",
				"kind": "choice",
				"choices": [
					"石頭",
					"金屬玩具",
					"會溶於水的糖",
					"小玻璃珠"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "兩個體積分別為 30 cm³ 和 45 cm³ 的立體拼在一起，總體積是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"15 cm³",
					"45 cm³",
					"75 cm³",
					"135 cm³"
				],
				"answer": 2
			},
			{
				"points": 3,
				"stem": "500 mL= ______ cm³",
				"why": "500",
				"kind": "number",
				"answer": 500
			},
			{
				"points": 3,
				"stem": "3 L= ______ cm³",
				"why": "3000",
				"kind": "number",
				"answer": 3e3
			},
			{
				"points": 3,
				"stem": "2 m³= ______ L",
				"why": "2000",
				"kind": "number",
				"answer": 2e3
			},
			{
				"points": 3,
				"stem": "10×5×4= ______ cm³",
				"why": "200",
				"kind": "number",
				"answer": 200
			},
			{
				"points": 3,
				"stem": "正方體邊長 6 cm，體積是 ______ cm³。",
				"why": "216",
				"kind": "number",
				"answer": 216
			},
			{
				"points": 3,
				"stem": "排水前讀數 120 mL，排水後讀數 158 mL，物件體積是 ______ cm³。",
				"why": "38",
				"kind": "number",
				"answer": 38
			},
			{
				"points": 3,
				"stem": "2500 cm³= ______ L",
				"why": "2.5",
				"kind": "number",
				"answer": 2.5
			},
			{
				"points": 3,
				"stem": "長方體體積 600 cm³，長 10 cm、闊 6 cm、高 ______ cm。",
				"why": "10",
				"kind": "number",
				"answer": 10
			},
			{
				"points": 3,
				"stem": "1 m³= ______ cm³",
				"why": "1,000,000",
				"kind": "number",
				"answer": 1e6
			},
			{
				"points": 3,
				"stem": "4 L 250 mL= ______ mL",
				"why": "4250",
				"kind": "number",
				"answer": 4250
			},
			{
				"points": 8,
				"stem": "一個長方體盒長 12 cm、闊 5 cm、高 4 cm。求體積。",
				"why": "12×5×4=240 cm³。（公式4分，答案4分）",
				"kind": "text",
				"show": "12×5×4=240 cm³。",
				"keys": ["240"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一個正方體容器邊長 8 cm。求容積，並以毫升表示。",
				"why": "8×8×8=512 cm³=512 mL。（體積6分，單位換算2分）",
				"kind": "text",
				"show": "8×8×8=512 cm³=512 mL。",
				"keys": ["512"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一個物件完全浸入量杯前讀數為 200 mL，浸入後為 236 mL。求物件體積。",
				"why": "236−200=36 mL=36 cm³。（相減4分，答案4分）",
				"kind": "text",
				"show": "236−200=36 mL=36 cm³。",
				"keys": ["36"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個長方體水缸長 30 cm、闊 20 cm、高 10 cm，已有 3 L 水。還可加入多少升水才滿？",
				"why": "容積 30×20×10=6000 cm³=6 L；尚可加入 6−3=3 L。（容積6分，換算3分，答案3分）",
				"kind": "text",
				"show": "容積 30×20×10=6000 cm³=6 L；尚可加入 6−3=3 L。",
				"keys": ["3"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "一個拼砌立體由兩個長方體組成，體積分別是 240 cm³ 和 180 cm³。求總體積，並以毫升表示。",
				"why": "240+180=420 cm³=420 mL。（相加8分，換算4分，單位2分）",
				"kind": "text",
				"show": "240+180=420 cm³=420 mL。",
				"keys": ["420"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6M3",
		"name": "6M3 周界（二）",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "圓周率可用哪個符號表示？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"α",
					"π",
					"θ",
					"∠"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "圓周公式是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"πr^2",
					"2πr",
					"π+r",
					"r^2"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑 7 cm，使用 π=22/7，圓周是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"22 cm",
					"44 cm",
					"154 cm",
					"14 cm"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "直徑 14 cm，使用 π=22/7，圓周是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"22 cm",
					"44 cm",
					"88 cm",
					"154 cm"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "圓周 31.4 cm，使用 π=3.14，直徑是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"5 cm",
					"10 cm",
					"15 cm",
					"20 cm"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "圓周 44 cm，使用 π=22/7，直徑是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"7 cm",
					"14 cm",
					"22 cm",
					"28 cm"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半圓的周界包括：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"只有弧",
					"弧和直徑",
					"兩條直徑",
					"只有直徑"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑 7 cm 的半圓周界，使用 π=22/7，是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"22 cm",
					"36 cm",
					"44 cm",
					"58 cm"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "四分之一圓的周界包括：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"四分之一圓弧和兩條半徑",
					"半圓弧和半徑",
					"全圓周",
					"只有弧"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "直徑為 28 cm 的圓，使用 π=22/7，圓周是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"44 cm",
					"88 cm",
					"154 cm",
					"176 cm"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "π≈ ______ 或 ______ 。",
				"why": "22/7、3.14",
				"kind": "text",
				"show": "22/7、3.14",
				"keys": ["22/7", "3.14"],
				"mode": "all"
			},
			{
				"points": 3,
				"stem": "半徑 5 cm，圓周（用 π=3.14）是 ______ cm。",
				"why": "31.4",
				"kind": "number",
				"answer": 31.4
			},
			{
				"points": 3,
				"stem": "直徑 21 cm，圓周（用 π=22/7）是 ______ cm。",
				"why": "66",
				"kind": "number",
				"answer": 66
			},
			{
				"points": 3,
				"stem": "圓周 62.8 cm，使用 π=3.14，直徑是 ______ cm。",
				"why": "20",
				"kind": "number",
				"answer": 20
			},
			{
				"points": 3,
				"stem": "直徑 10 m，半徑是 ______ m。",
				"why": "5",
				"kind": "number",
				"answer": 5
			},
			{
				"points": 3,
				"stem": "半徑 14 cm 的圓周（用 π=22/7）是 ______ cm。",
				"why": "88",
				"kind": "number",
				"answer": 88
			},
			{
				"points": 3,
				"stem": "半徑 7 cm 的半圓弧長（用 π=22/7）是 ______ cm。",
				"why": "22",
				"kind": "number",
				"answer": 22
			},
			{
				"points": 3,
				"stem": "四分之一圓半徑 14 cm，弧長（用 π=22/7）是 ______ cm。",
				"why": "22",
				"kind": "number",
				"answer": 22
			},
			{
				"points": 3,
				"stem": "半圓半徑 7 cm 的周界（包括直徑）是 ______ cm。",
				"why": "36",
				"kind": "number",
				"answer": 36
			},
			{
				"points": 3,
				"stem": "圓周 88 cm，使用 π=22/7，半徑是 ______ cm。",
				"why": "14",
				"kind": "number",
				"answer": 14
			},
			{
				"points": 8,
				"stem": "一個圓形花圃半徑 7 m，使用 π=22/7，求周界。",
				"why": "2×22/7×7=44 m。（公式4分，計算及單位4分）",
				"figure": {
					"kind": "circle",
					"mark": "r",
					"value": "7"
				},
				"kind": "text",
				"show": "2×22/7×7=44 m。",
				"keys": ["44"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "車輪直徑 70 cm，使用 π=22/7，轉一周前進多少厘米？",
				"why": "22/7×70=220 cm。（算式4分，答案4分）",
				"kind": "text",
				"show": "22/7×70=220 cm。",
				"keys": ["220"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "圓形桌面圓周為 94.2 cm，使用 π=3.14，求直徑和半徑。",
				"why": "94.2÷3.14=30 cm；半徑 =15 cm。（直徑5分，半徑3分）",
				"kind": "text",
				"show": "94.2÷3.14=30 cm；半徑 =15 cm。",
				"keys": ["30", "15"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個半圓形窗的半徑是 14 cm，使用 π=22/7。求窗框的總周界（包括直徑）。",
				"why": "半圓弧 =1/2×2×22/7×14=44 cm；總周界 =44+28=72 cm。（弧長7分，直徑及總周界5分）",
				"figure": {
					"kind": "semi",
					"value": "14",
					"as": "r"
				},
				"kind": "text",
				"show": "半圓弧 =1/2×2×22/7×14=44 cm；總周界 =44+28=72 cm。",
				"keys": ["72"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "一個圖形由半徑 7 cm 的四分之一圓和兩條半徑組成外周。使用 π=22/7，求外周長。",
				"why": "四分之一圓弧 =1/4×2×22/7×7=11 cm；總周界 =11+7+7=25 cm。（弧長8分，兩半徑及答案6分）",
				"figure": {
					"kind": "quarter",
					"value": "7"
				},
				"kind": "text",
				"show": "四分之一圓弧 =1/4×2×22/7×7=11 cm；總周界 =11+7+7=25 cm。",
				"keys": ["25"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6M4",
		"name": "6M4 速率",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "90 分鐘等於：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.5小時",
					"1.5小時",
					"2小時",
					"90小時"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "180 秒等於：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"2分鐘",
					"3分鐘",
					"4分鐘",
					"180分鐘"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "120 分鐘等於：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"1小時",
					"2小時",
					"12小時",
					"120小時"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "每小時行 60 km，速率是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"60 km/h",
					"60 m/s",
					"60 km",
					"1 km/h"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "同一段時間內，行走距離較遠的物體通常：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"較慢",
					"較快",
					"速率相同",
					"無法比較"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "行程圖的橫軸通常表示：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"距離",
					"時間",
					"速率",
					"重量"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "距離 120 km、時間 2 小時，速率是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"60 km/h",
					"120 km/h",
					"240 km/h",
					"30 km/h"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "2.5 小時等於：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"120分鐘",
					"150分鐘",
					"250分鐘",
					"25分鐘"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "行程圖中的水平線表示：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"距離不變",
					"距離增加",
					"速率增加",
					"時間停止"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "一人行 300 m 用 60 秒，平均速率是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3 m/s",
					"5 m/s",
					"30 m/s",
					"50 m/s"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "3 小時 = ______ 分鐘。",
				"why": "180",
				"kind": "number",
				"answer": 180
			},
			{
				"points": 3,
				"stem": "240 秒 = ______ 分鐘。",
				"why": "4",
				"kind": "number",
				"answer": 4
			},
			{
				"points": 3,
				"stem": "1.5 小時 = ______ 分鐘。",
				"why": "90",
				"kind": "number",
				"answer": 90
			},
			{
				"points": 3,
				"stem": "2 分鐘 = ______ 秒。",
				"why": "120",
				"kind": "number",
				"answer": 120
			},
			{
				"points": 3,
				"stem": "距離 80 km，時間 2 小時，速率是 ______ km/h。",
				"why": "40",
				"kind": "number",
				"answer": 40
			},
			{
				"points": 3,
				"stem": "距離 150 m，時間 30 秒，速率是 ______ m/s。",
				"why": "5",
				"kind": "number",
				"answer": 5
			},
			{
				"points": 3,
				"stem": "90 分鐘 = ______ 小時。",
				"why": "1.5",
				"kind": "number",
				"answer": 1.5
			},
			{
				"points": 3,
				"stem": "2.5 分鐘 = ______ 秒。",
				"why": "150",
				"kind": "number",
				"answer": 150
			},
			{
				"points": 3,
				"stem": "行程圖資料：0小時走0 km；1小時走40 km；2小時走80 km。每小時走 ______ km。",
				"why": "40",
				"kind": "number",
				"answer": 40
			},
			{
				"points": 3,
				"stem": "4 小時 30 分鐘 = ______ 小時。",
				"why": "4.5",
				"kind": "number",
				"answer": 4.5
			},
			{
				"points": 8,
				"stem": "一輛巴士以每小時 50 km 行駛 3 小時。共行多少公里？",
				"why": "50×3=150 km。（算式4分，答案4分）",
				"kind": "text",
				"show": "50×3=150 km。",
				"keys": ["150"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "小明跑 400 m 用 80 秒。平均速率是多少 m/s？",
				"why": "400÷80=5 m/s。（算式4分，答案4分）",
				"kind": "text",
				"show": "400÷80=5 m/s。",
				"keys": ["5"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一列火車以每小時 80 km 行駛 2.5 小時。行駛多少公里？",
				"why": "80×2.5=200 km。（算式4分，答案4分）",
				"kind": "text",
				"show": "80×2.5=200 km。",
				"keys": ["200"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "小巴早上 9:15 出發，上午 11:00 到達。行車時間是多少？若路程是 70 km，平均速率是多少？",
				"why": "時間 1 小時 45 分鐘 =1.75 小時；速率 70÷1.75=40 km/h。（時間6分，速率算式4分，答案2分）",
				"kind": "text",
				"show": "時間 1 小時 45 分鐘 =1.75 小時；速率 70÷1.75=40 km/h。",
				"keys": ["1.75", "40"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "行程圖讀數：0分鐘在 0 km，20分鐘到達 4 km，停留至 30分鐘仍是 4 km，50分鐘到達 8 km。（a）20分鐘時距離起點多少公里？（b）哪一段時間正在停留？（c）最初20分鐘的平均速率是多少 km/h？",
				"why": "（a）4 km。（6分） （b）20至30分鐘。（4分） （c）20分鐘 =1/3 小時；4÷1/3=12 km/h。（換算4分，計算及答案4分）",
				"kind": "text",
				"show": "（a）4 km（b）20至30分鐘（c）12 km/h",
				"keys": [
					"4",
					"20",
					"30",
					"12"
				],
				"mode": "all",
				"figure": {
					"kind": "trip",
					"xLabel": "時間（分鐘）",
					"yLabel": "距離（km）",
					"xMax": 50,
					"yMax": 8,
					"points": [
						[0, 0],
						[20, 4],
						[30, 4],
						[50, 8]
					]
				}
			}
		]
	},
	{
		"unitId": "6M5",
		"name": "6M5 面積（三）",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "圓面積公式是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"2πr",
					"πr×r",
					"πd",
					"r+r"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑 7 cm，使用 π=22/7，圓面積是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"44",
					"77",
					"154",
					"308平方厘米"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "半徑 3 cm，使用 π=3.14，圓面積是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"18.84",
					"28.26",
					"31.4",
					"9.42平方厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑 7 cm 的半圓面積是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"38.5",
					"77",
					"154",
					"308平方厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑 14 cm 的四分之一圓面積是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"154",
					"308",
					"616",
					"1232平方厘米"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "直徑 10 cm 的圓，半徑是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"2",
					"5",
					"10",
					"20 cm"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑 4 cm 的圓，使用 π=3.14，面積是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"25.12",
					"50.24",
					"100.48",
					"12.56平方厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑 7 cm 的四分之三圓面積是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"38.5",
					"77",
					"115.5",
					"154平方厘米"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "半徑 10 cm 的半圓，使用 π=3.14，面積是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"78.5",
					"157",
					"314",
					"628平方厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "正方形邊長 14 cm，內接最大的圓，圓半徑是：",
				"why": "B",
				"figure": {
					"kind": "rect",
					"length": "x+1.5 cm",
					"width": "x+1.5 cm",
					"note": "正方形"
				},
				"kind": "choice",
				"choices": [
					"5",
					"7",
					"14",
					"28 cm"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "π 的兩個常用近似值是 ______ 和 ______ 。",
				"why": "22/7、3.14",
				"kind": "text",
				"show": "22/7、3.14",
				"keys": ["22/7", "3.14"],
				"mode": "all"
			},
			{
				"points": 3,
				"stem": "半徑 5 cm，使用 π=3.14，圓面積是 ______ 平方厘米。",
				"why": "78.5",
				"kind": "number",
				"answer": 78.5
			},
			{
				"points": 3,
				"stem": "半徑 7 cm，使用 π=22/7，半圓面積是 ______ 平方厘米。",
				"why": "77",
				"kind": "number",
				"answer": 77
			},
			{
				"points": 3,
				"stem": "半徑 14 cm 的圓面積是 ______ 平方厘米。（使用 π=22/7）",
				"why": "616",
				"kind": "number",
				"answer": 616
			},
			{
				"points": 3,
				"stem": "直徑 8 cm，使用 π=3.14，圓面積是 ______ 平方厘米。",
				"why": "50.24",
				"kind": "number",
				"answer": 50.24
			},
			{
				"points": 3,
				"stem": "半徑 7 cm 的四分之一圓面積是 ______ 平方厘米。",
				"why": "38.5",
				"kind": "number",
				"answer": 38.5
			},
			{
				"points": 3,
				"stem": "半徑 14 cm 的四分之三圓面積是 ______ 平方厘米。",
				"why": "462",
				"kind": "number",
				"answer": 462
			},
			{
				"points": 3,
				"stem": "半徑 3 m，使用 π=3.14，圓面積是 ______ 平方米。",
				"why": "28.26",
				"kind": "number",
				"answer": 28.26
			},
			{
				"points": 3,
				"stem": "直徑 14 cm，使用 π=22/7，半圓面積是 ______ 平方厘米。",
				"why": "77",
				"kind": "number",
				"answer": 77
			},
			{
				"points": 3,
				"stem": "半徑 10 cm，使用 π=3.14，四分之一圓面積是 ______ 平方厘米。",
				"why": "78.5",
				"kind": "number",
				"answer": 78.5
			},
			{
				"points": 8,
				"stem": "一個圓形花壇半徑 7 m，使用 π=22/7，求面積。",
				"why": "22/7×7×7=154 平方米。（公式4分，答案4分）",
				"kind": "text",
				"show": "22/7×7×7=154 平方米。",
				"keys": ["154"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一張圓形桌面直徑 20 cm，使用 π=3.14，求面積。",
				"why": "半徑 =10 cm；面積 =3.14×10×10=314 平方厘米。（半徑4分，計算及答案4分）",
				"kind": "text",
				"show": "半徑 =10 cm；面積 =3.14×10×10=314 平方厘米。",
				"keys": ["314"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "半圓形花圃半徑 14 m，使用 π=22/7，求面積。",
				"why": "全圓面積 =616 平方米；半圓面積 =308 平方米。（全圓4分，取半及答案4分）",
				"kind": "text",
				"show": "全圓面積 =616 平方米；半圓面積 =308 平方米。",
				"keys": ["308"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個半徑 14 cm 的圓形紙片，剪去四分之一，求剩餘部分面積。使用 π=22/7。",
				"why": "全圓面積 =616 平方厘米；剩餘 =3/4×616=462 平方厘米。（全圓6分，剩餘計算6分）",
				"figure": {
					"kind": "quarter",
					"value": "14"
				},
				"kind": "text",
				"show": "剩餘 462 平方厘米",
				"keys": ["462"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "正方形花圃邊長 14 m，內有一個半徑 7 m 的圓形花壇。求正方形內、花壇外的面積。使用 π=22/7。",
				"why": "正方形面積 =14×14=196 平方米；圓面積 =154 平方米；差 =42 平方米。（正方形面積4分，圓面積6分，相減及答案4分）",
				"figure": {
					"kind": "circle",
					"mark": "r",
					"value": "7"
				},
				"kind": "text",
				"show": "正方形面積 =14×14=196 平方米；圓面積 =154 平方米；差 =42 平方米。",
				"keys": ["42"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6S1",
		"name": "6S1 對稱",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "圖形沿對稱軸對摺後，兩邊應能：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"相交",
					"完全重合",
					"平行",
					"變大"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "正方形有多少條對稱軸？",
				"why": "D",
				"kind": "choice",
				"choices": [
					"1",
					"2",
					"3",
					"4"
				],
				"answer": 3
			},
			{
				"points": 2,
				"stem": "非正方形長方形有多少條對稱軸？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"1",
					"2",
					"3",
					"4"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "一般等腰三角形有多少條對稱軸？",
				"why": "A",
				"kind": "choice",
				"choices": [
					"1",
					"2",
					"3",
					"0"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "等邊三角形有多少條對稱軸？",
				"why": "C",
				"kind": "choice",
				"choices": [
					"1",
					"2",
					"3",
					"4"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "圓有多少條對稱軸？",
				"why": "D",
				"kind": "choice",
				"choices": [
					"1",
					"2",
					"4",
					"無數條"
				],
				"answer": 3
			},
			{
				"points": 2,
				"stem": "圓的對稱軸必須通過：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"圓周上一點",
					"圓心",
					"任意點",
					"圓外一點"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "非正方形菱形有多少條對稱軸？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"1",
					"2",
					"3",
					"4"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "一對對應點到對稱軸的距離應：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"相等",
					"不相等",
					"相加為1",
					"無關"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "一個點位於對稱軸上，對摺後會：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"移到左邊",
					"移到右邊",
					"留在原位",
					"消失"
				],
				"answer": 2
			},
			{
				"points": 3,
				"stem": "正方形有 ______ 條對稱軸。",
				"why": "4",
				"kind": "number",
				"answer": 4
			},
			{
				"points": 3,
				"stem": "等邊三角形有 ______ 條對稱軸。",
				"why": "3",
				"kind": "number",
				"answer": 3
			},
			{
				"points": 3,
				"stem": "一般等腰三角形有 ______ 條對稱軸。",
				"why": "1",
				"kind": "number",
				"answer": 1
			},
			{
				"points": 3,
				"stem": "長方形兩條對稱軸都通過圖形的 ______ 。",
				"why": "中心",
				"kind": "text",
				"show": "中心",
				"keys": ["中心"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "對稱軸把圖形分成能完全 ______ 的兩部分。",
				"why": "重合",
				"kind": "text",
				"show": "重合",
				"keys": ["重合"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "菱形的對稱軸沿着兩條 ______ 。",
				"why": "對角線",
				"kind": "text",
				"show": "對角線",
				"keys": ["對角線"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "圓的每一條對稱軸都通過 ______ 。",
				"why": "圓心",
				"kind": "text",
				"show": "圓心",
				"keys": ["圓心"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "垂直對稱軸左方3格的點，其對應點在軸右方 ______ 格。",
				"why": "3",
				"kind": "number",
				"answer": 3
			},
			{
				"points": 3,
				"stem": "水平對稱軸上方2格的點，其對應點在軸下方 ______ 格。",
				"why": "2",
				"kind": "number",
				"answer": 2
			},
			{
				"points": 3,
				"stem": "若沿直線對摺後不能重合，該直線 ______ （是／不是）對稱軸。",
				"why": "不是",
				"kind": "text",
				"show": "不是",
				"keys": ["不是"],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "說明如何用對摺方法檢查圖形是否軸對稱。",
				"why": "沿候選直線對摺，檢查兩邊能否完全重合。（方法4分，判斷準則4分）",
				"kind": "text",
				"show": "沿候選直線對摺，檢查兩邊能否完全重合",
				"keys": ["重合"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "列出正方形、長方形、等邊三角形的對稱軸數目。",
				"why": "正方形4條、長方形2條、等邊三角形3條。（每項約2至3分）",
				"kind": "text",
				"show": "正方形 4 條、長方形 2 條、等邊三角形 3 條",
				"keys": [
					"4",
					"2",
					"3"
				],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "方格紙上垂直軸在第6直行。一點在第3直行，求對應點所在直行。",
				"why": "第9直行；軸左方3格對應軸右方3格。（距離4分，位置4分）",
				"figure": {
					"kind": "gridpt",
					"axis": "v",
					"axisAt": 4,
					"dots": [
						{
							"c": 3,
							"r": 1
						},
						{
							"c": 2,
							"r": 2
						},
						{
							"c": 0,
							"r": 3
						}
					],
					"note": "對稱軸在中間，補右半"
				},
				"kind": "text",
				"show": "第9直行；軸左方3格對應軸右方3格。",
				"keys": ["9"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個圖形的半邊頂點分別在垂直對稱軸左方1格、2格、4格。描述如何畫出另一半。",
				"why": "在軸右側相同距離標出對應點，依序連接，形成鏡像另一半。（對應位置8分，連線4分）",
				"figure": {
					"kind": "gridpt",
					"axis": "v",
					"axisAt": 4,
					"dots": [
						{
							"c": 3,
							"r": 1
						},
						{
							"c": 2,
							"r": 2
						},
						{
							"c": 0,
							"r": 3
						}
					],
					"note": "對稱軸在中間，補右半"
				},
				"kind": "text",
				"show": "在軸右方相同距離標點，再依序連線",
				"keys": ["右"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "一張紙沿中線對摺，在摺邊剪出一個三角形缺口。描述展開後的圖案特點，並指出摺線的作用。",
				"why": "展開後有兩個相同、分居摺線兩側的缺口；摺線是對稱軸。（圖案特點8分，摺線作用6分）",
				"kind": "text",
				"show": "展開後有兩個相同、分居摺線兩側的缺口；摺線是對稱軸",
				"keys": ["對稱軸"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6D1",
		"name": "6D1 平均數",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "求平均數，通常先把數據：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"相減",
					"相加",
					"相乘",
					"排序後取中間數"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "總和 24，共有 4 個數據，平均數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"4",
					"6",
					"8",
					"20"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "數據 2,4,6 的平均數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3",
					"4",
					"5",
					"6"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "數據 5,7,9,11 的平均數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"7",
					"8",
					"9",
					"10"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "5個數的平均數是8，總和是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"13",
					"40",
					"45",
					"80"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "4個數的平均數是10，其中三數和為26，第四數是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"10",
					"12",
					"14",
					"16"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "數據 10,12,14,16 的平均數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"12",
					"13",
					"14",
					"15"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "數據 1,3,5,7,9 的平均數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"4",
					"5",
					"6",
					"7"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "6個數的平均數是7，總和是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"13",
					"42",
					"49",
					"56"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "4個數據平均數是12，其中一數增加4，其他不變，新平均數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"12",
					"13",
					"14",
					"16"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "3,5,7 的平均數是 ______ 。",
				"why": "5",
				"kind": "number",
				"answer": 5
			},
			{
				"points": 3,
				"stem": "4,6,8,10 的平均數是 ______ 。",
				"why": "7",
				"kind": "number",
				"answer": 7
			},
			{
				"points": 3,
				"stem": "12,14,16 的平均數是 ______ 。",
				"why": "14",
				"kind": "number",
				"answer": 14
			},
			{
				"points": 3,
				"stem": "5個數的平均數是9，總和是 ______ 。",
				"why": "45",
				"kind": "number",
				"answer": 45
			},
			{
				"points": 3,
				"stem": "4個數的平均數是15，總和是 ______ 。",
				"why": "60",
				"kind": "number",
				"answer": 60
			},
			{
				"points": 3,
				"stem": "數據 2,4,6,8,10,12 的平均數是 ______ 。",
				"why": "7",
				"kind": "number",
				"answer": 7
			},
			{
				"points": 3,
				"stem": "數據 2.0,2.5,3.0,3.5 的平均數是 ______ 。",
				"why": "2.75",
				"kind": "number",
				"answer": 2.75
			},
			{
				"points": 3,
				"stem": "3個數的平均數是10，兩數是8和12，第三數是 ______ 。",
				"why": "10",
				"kind": "number",
				"answer": 10
			},
			{
				"points": 3,
				"stem": "5個數平均數是12，四數總和是46，第五數是 ______ 。",
				"why": "14",
				"kind": "number",
				"answer": 14
			},
			{
				"points": 3,
				"stem": "數據 18,20,22,24 的平均數是 ______ 。",
				"why": "21",
				"kind": "number",
				"answer": 21
			},
			{
				"points": 8,
				"stem": "4位同學的分數是70、80、90、100。求平均分。",
				"why": "(70+80+90+100)/(4)=85 分。（總和4分，除以4及答案4分）",
				"kind": "text",
				"show": "(70+80+90+100)/(4)=85 分。",
				"keys": ["85"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一星期5天的閱讀頁數為10、12、14、16、18頁。求平均每天閱讀頁數。",
				"why": "(10+12+14+16+18)/(5)=14 頁。（總和4分，平均4分）",
				"kind": "text",
				"show": "(10+12+14+16+18)/(5)=14 頁。",
				"keys": ["14"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "6個數據的平均數是8。求這組數據的總和。",
				"why": "8×6=48。（方法4分，答案4分）",
				"kind": "text",
				"show": "8×6=48。",
				"keys": ["48"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "4次測驗平均分是75分，其中三次得分為70、72、78分。求第四次分數。",
				"why": "總分 =75×4=300；第四次 =300−(70+72+78)=80 分。（總分4分，已知總分4分，答案4分）",
				"kind": "text",
				"show": "總分 =75×4=300；第四次 =300−(70+72+78)=80 分。",
				"keys": ["80"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "五位同學的零用錢平均是 30 元，四人分別有 25,28,32,35 元。求第五人的零用錢。",
				"why": "總額 =30×5=150 元；四人共 120 元；第五人 =30 元。（總額4分，已知總和4分，答案6分）",
				"kind": "text",
				"show": "總額 =30×5=150 元；四人共 120 元；第五人 =30 元。",
				"keys": ["30"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6D2",
		"name": "6D2 折線圖",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "折線圖較適合顯示：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"數據隨時間的變化",
					"只顯示物件形狀",
					"長度",
					"角度"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "折線圖的點通常按甚麼連接？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"任意次序",
					"時間或項目次序",
					"大小次序",
					"字母順序"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "折線圖中數據點通常表示：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"一項數據值",
					"一個標題",
					"一個單位",
					"一格紙"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "兩個相鄰數據相同，兩點連線是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"水平線",
					"垂直線",
					"斜線",
					"沒有線"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "數據由 10 增至 15，折線應：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"上升",
					"下降",
					"水平",
					"消失"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "折線圖縱軸每格代表1，與每格代表10相比，前者的變化通常看起來：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"較大",
					"較小",
					"相同",
					"無法比較"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "折線圖的縱軸通常表示：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"時間",
					"數據的數值",
					"圖表標題",
					"數據來源"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "與折線圖相比，棒形圖通常較適合：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"顯示不同類別數量的比較",
					"顯示連續時間的變化趨勢",
					"表示角度",
					"表示路線方向"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "雙折線圖最適合用來：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"比較兩組數據隨時間的變化",
					"顯示一個物件的形狀",
					"表示各部分佔整體的比例",
					"只記錄一個數據"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "折線圖的縱軸由較高數值開始而不是由零開始，可能會：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"令變化看起來比實際更明顯",
					"令所有數據變成零",
					"令橫軸消失",
					"令折線必定水平"
				],
				"answer": 0
			},
			{
				"points": 3,
				"stem": "折線圖的橫軸和縱軸相交的位置通常稱為原點，其縱軸起點一般是 ______ 。",
				"why": "0",
				"kind": "number",
				"answer": 0
			},
			{
				"points": 3,
				"stem": "折線圖上的每一個點代表一個 ______ 。",
				"why": "數據值",
				"kind": "text",
				"show": "數據值",
				"keys": ["數據值"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "由星期一至星期五的每日氣溫變化，適合用 ______ 圖表示。",
				"why": "折線",
				"kind": "text",
				"show": "折線",
				"keys": ["折線", "折線圖"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "若一個數據由12增加至17，增加了 ______ 。",
				"why": "5",
				"kind": "number",
				"answer": 5
			},
			{
				"points": 3,
				"stem": "若連接的兩點高度相同，表示數據在該段時間 ______ 。",
				"why": "不變",
				"kind": "text",
				"show": "不變",
				"keys": ["不變"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "折線圖的縱軸每格代表5，數據點在第4格，該數據是 ______ 。",
				"why": "20",
				"kind": "number",
				"answer": 20
			},
			{
				"points": 3,
				"stem": "顯示不同種類水果數量的比較，通常較適合用 ______ 圖。",
				"why": "棒形",
				"kind": "text",
				"show": "棒形",
				"keys": ["棒形", "棒形圖"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "雙折線圖上的每條折線應以不同的顏色或線型表示，並加上 ______ 以辨認數據組別。",
				"why": "圖例",
				"kind": "text",
				"show": "圖例",
				"keys": ["圖例"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "某折線圖數據依次為8、12、10、15。數據最大的一項是第 ______ 項。",
				"why": "四",
				"kind": "text",
				"show": "四",
				"keys": ["四"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "折線圖的縱軸每格代表2，數據點位於第6格，縱軸起點為0，數據值是 ______ 。",
				"why": "12",
				"kind": "number",
				"answer": 12
			},
			{
				"points": 8,
				"stem": "下表記錄一星期五天的氣溫。星期三的氣溫是多少？星期二至星期三的氣溫上升了多少度？。資料：日子　星期一　星期二　星期三　星期四　星期五；氣溫（°C）　20　22　25　24　21",
				"why": "星期三的氣溫是 25°C。星期二 22°C 至星期三 25°C，上升 3°C。",
				"figure": {
					"kind": "line",
					"xLabel": "日子",
					"yLabel": "數值",
					"cats": [
						"星期一",
						"星期二",
						"星期三",
						"星期四",
						"星期五"
					],
					"series": [{
						"name": "氣溫（°C）",
						"values": [
							20,
							22,
							25,
							24,
							21
						]
					}]
				},
				"kind": "text",
				"show": "星期三 25°C，上升 3°C",
				"keys": ["25", "3"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "下表記錄一間文具店四天售出的筆記簿數量。哪一天售出最多？星期二至星期三的數量有甚麼變化？。資料：日子　星期一　星期二　星期三　星期四；售出數量（本）　12　15　11　18",
				"why": "星期四售出最多；星期二至星期三減少 15−11=4 本。（判斷最多4分；比較及答案4分）",
				"figure": {
					"kind": "line",
					"xLabel": "日子",
					"yLabel": "數值",
					"cats": [
						"星期一",
						"星期二",
						"星期三",
						"星期四"
					],
					"series": [{
						"name": "售出數量（本）",
						"values": [
							12,
							15,
							11,
							18
						]
					}]
				},
				"kind": "text",
				"show": "星期四售出最多；星期二至星期三減少 15−11=4 本。",
				"keys": ["星期四", "4"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "小明想記錄一星期內每天的步行距離。應選用棒形圖還是折線圖？寫出一個理由。",
				"why": "選折線圖；因為要顯示每天隨時間變化的步行距離。（選擇4分；理由4分）",
				"kind": "text",
				"show": "選折線圖；因為要顯示每天隨時間變化的步行距離",
				"keys": ["折線圖"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "下表列出甲、乙兩隊在四場比賽所得的分數。（a）第幾場甲隊分數最高？（4分）（b）哪一隊在第四場比賽得分較高？高多少分？（4分）（c）雙折線圖中應如何辨認甲、乙兩隊的折線？（4分）。資料：比賽場次　第一場　第二場　第三場　第四場；甲隊分數　10　14　12　16；乙隊分數　12　13　15　14",
				"why": "（a）第四場。（4分） （b）甲隊較高，高 16−14=2 分。（比較2分；差額及單位2分） （c）用不同顏色或線型畫兩條折線，並加圖例標明甲隊和乙隊。（區分折線4分）",
				"figure": {
					"kind": "line",
					"xLabel": "比賽場次",
					"yLabel": "數值",
					"cats": [
						"第一場",
						"第二場",
						"第三場",
						"第四場"
					],
					"series": [{
						"name": "甲隊分數",
						"values": [
							10,
							14,
							12,
							16
						]
					}, {
						"name": "乙隊分數",
						"values": [
							12,
							13,
							15,
							14
						]
					}]
				},
				"kind": "text",
				"show": "第四場最高；第四場甲隊高 2 分",
				"keys": [
					"第四",
					"甲",
					"2"
				],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "下表記錄水族館六天的入場人數。請描述如何製作一幅折線圖，並寫出各日數據點的位置。橫軸表示日子，縱軸表示入場人數；縱軸由0開始，每格代表10人。。資料：日子　星期一　星期二　星期三　星期四　星期五　星期六；入場人數（人）　20　30　50　40　60　70",
				"why": "標明標題「水族館每日入場人數」。（2分）橫軸標示日子，縱軸標示入場人數並註明單位「人」。（4分）縱軸由0開始，每格代表10人。（2分）依次標出並連接各點：星期一20人、星期二30人、星期三50人、星期四40人、星期五60人、星期六70人。（6分）",
				"figure": {
					"kind": "line",
					"xLabel": "日子",
					"yLabel": "數值",
					"cats": [
						"星期一",
						"星期二",
						"星期三",
						"星期四",
						"星期五",
						"星期六"
					],
					"series": [{
						"name": "入場人數（人）",
						"values": [
							20,
							30,
							50,
							40,
							60,
							70
						]
					}]
				},
				"kind": "text",
				"show": "縱軸由 0 起，每格 10 人，標出星期一 20 人至星期六 70 人",
				"keys": ["星期一", "70"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6D3",
		"name": "6D3 圓形圖",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "圓形圖的全部部分合起來代表：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"25%",
					"50%",
					"100%",
					"360%"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "圓形圖中各部分的圓心角合計是：",
				"why": "D",
				"kind": "choice",
				"choices": [
					"90°",
					"180°",
					"270°",
					"360°"
				],
				"answer": 3
			},
			{
				"points": 2,
				"stem": "一個圓形圖以百分數表示，故事書佔25%。其餘部分合共佔：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"25%",
					"50%",
					"75%",
					"100%"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "圓形圖中，甲部分佔40%，乙部分佔30%。哪部分較大？",
				"why": "A",
				"kind": "choice",
				"choices": [
					"甲",
					"乙",
					"一樣大",
					"無法比較"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "一個圓形圖部分的圓心角是90°，它佔全圓的：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"四分之一",
					"三分之一",
					"二分之一",
					"四分之三"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "全班有40人，其中25%選擇足球作最喜愛的運動。選足球的有多少人？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"5人",
					"10人",
					"15人",
					"20人"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "若圓形圖中的三部分分別佔20%、35%和45%，合共是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"90%",
					"95%",
					"100%",
					"360%"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "比較不同種類物品的數量，通常較適合用：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"棒形圖",
					"圓形圖",
					"路線圖",
					"角度圖"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "一部分佔全圓的二分之一，其圓心角是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"45°",
					"90°",
					"180°",
					"270°"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "用圓形圖比較一組數據中各部分佔整體的比例，最好同時知道：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"整體總數",
					"圖表紙張大小",
					"圓的顏色",
					"作圖者姓名"
				],
				"answer": 0
			},
			{
				"points": 3,
				"stem": "一個圓形圖的總百分數是 ______ %。",
				"why": "100",
				"kind": "number",
				"answer": 100
			},
			{
				"points": 3,
				"stem": "一個圓形圖的總圓心角是 ______ °。",
				"why": "360",
				"kind": "number",
				"answer": 360
			},
			{
				"points": 3,
				"stem": "圓形圖三部分分別佔20%、30%和50%，三部分合計 ______ %。",
				"why": "100",
				"kind": "number",
				"answer": 100
			},
			{
				"points": 3,
				"stem": "圓形圖某部分的圓心角為90°，它佔全圓的 ______ %。",
				"why": "25",
				"kind": "number",
				"answer": 25
			},
			{
				"points": 3,
				"stem": "一班有40位學生，25%選擇足球。選擇足球的有 ______ 位。",
				"why": "10",
				"kind": "number",
				"answer": 10
			},
			{
				"points": 3,
				"stem": "圓形圖某部分的圓心角為45°，其餘部分的圓心角合共是 ______ °。",
				"why": "315",
				"kind": "number",
				"answer": 315
			},
			{
				"points": 3,
				"stem": "圓形圖某部分佔35%，另一部分佔40%，其餘部分佔 ______ %。",
				"why": "25",
				"kind": "number",
				"answer": 25
			},
			{
				"points": 3,
				"stem": "圓形圖某部分的圓心角為120°，它佔全圓的 ______ %。",
				"why": "33 1/3",
				"kind": "text",
				"show": "33 1/3",
				"keys": [
					"33 1/3",
					"100/3",
					"331/3"
				],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "一班有60位學生，20%選擇閱讀作課外活動。選擇閱讀的有 ______ 位。",
				"why": "12",
				"kind": "number",
				"answer": 12
			},
			{
				"points": 3,
				"stem": "圓形圖兩部分的圓心角分別是45°和90°，其餘部分的圓心角是 ______ °。",
				"why": "225",
				"kind": "number",
				"answer": 225
			},
			{
				"points": 8,
				"stem": "下表列出一班學生最喜愛的水果。哪種水果最受歡迎？蘋果比橙子多佔多少百分點？。資料：水果　蘋果　橙子　香蕉　其他；百分數　40%　25%　20%　15%",
				"why": "蘋果最受歡迎。（4分）蘋果比橙子多佔 40%−25%=15%，即多15個百分點。（列式及答案4分）",
				"figure": {
					"kind": "line",
					"xLabel": "水果",
					"yLabel": "數值",
					"cats": [
						"蘋果",
						"橙子",
						"香蕉",
						"其他"
					],
					"series": [{
						"name": "百分數",
						"values": [
							40,
							25,
							20,
							15
						]
					}]
				},
				"kind": "text",
				"show": "蘋果最受歡迎。蘋果比橙子多佔 40%−25%=15%，即多15個百分點。",
				"keys": ["蘋果", "15"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "一間學校有40位學生參加興趣活動，資料如下。參加音樂活動的有多少人？。資料：活動　音樂　體育　美術　其他；百分數　25%　35%　20%　20%",
				"why": "40×25%=10 人。（列式4分；答案及單位4分）",
				"figure": {
					"kind": "line",
					"xLabel": "活動",
					"yLabel": "數值",
					"cats": [
						"音樂",
						"體育",
						"美術",
						"其他"
					],
					"series": [{
						"name": "百分數",
						"values": [
							25,
							35,
							20,
							20
						]
					}]
				},
				"kind": "text",
				"show": "40×25%=10 人。",
				"keys": ["10"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "下表列出圖書館借出的書籍種類。各部分百分數合計是否為100%？寫出計算。。資料：書籍種類　故事書　科學書　歷史書　其他；百分數　40%　25%　20%　15%",
				"why": "40%+25%+20%+15%=100%，所以合計是100%。（列式6分；結論2分）",
				"figure": {
					"kind": "line",
					"xLabel": "書籍種類",
					"yLabel": "數值",
					"cats": [
						"故事書",
						"科學書",
						"歷史書",
						"其他"
					],
					"series": [{
						"name": "百分數",
						"values": [
							40,
							25,
							20,
							15
						]
					}]
				},
				"kind": "text",
				"show": "合計 100%",
				"keys": ["100"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "下表列出一個圓形圖各部分的圓心角。（a）哪一類佔最大部分？（4分）（b）哪兩類的圓心角合共是180°？（寫出一組即可）（4分）（c）驗算全部圓心角合計是否為360°。（4分）。資料：交通方式　步行　巴士　鐵路　其他；圓心角　45°　135°　90°　90°",
				"why": "（a）巴士。（4分） （b）鐵路和其他：90°+90°=180°（步行和巴士：45°+135°=180° 亦可）。（任何一組正確4分） （c）45°+135°+90°+90°=360°，合計正確。（計算4分）",
				"figure": {
					"kind": "pie",
					"slices": [
						{
							"label": "步行",
							"pct": 12.5
						},
						{
							"label": "巴士",
							"pct": 37.5
						},
						{
							"label": "鐵路",
							"pct": 25
						},
						{
							"label": "其他",
							"pct": 25
						}
					]
				},
				"kind": "text",
				"show": "巴士最大；各角合計 360°",
				"keys": ["巴士", "360"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "下表列出某社團會員喜愛的活動。（a）參加球類活動的有多少人？（6分）（b）參加音樂活動和閱讀活動的合共比球類活動多多少人？（4分）（c）若要比較各活動佔全部會員的比例，圓形圖和棒形圖各有甚麼用途？（4分）社團共有50位會員。。資料：活動　球類　音樂　閱讀　其他；百分數　40%　30%　20%　10%",
				"why": "（a）球類：50×40%=20 人。（計算4分；答案及單位2分） （b）音樂和閱讀合共50×(30%+20%)=25 人；比球類多25−20=5 人。（求兩類人數或合計4分） （c）圓形圖顯示各活動佔會員總數的比例；棒形圖方便比較各活動的人數。（每項用途2分）",
				"figure": {
					"kind": "line",
					"xLabel": "活動",
					"yLabel": "數值",
					"cats": [
						"球類",
						"音樂",
						"閱讀",
						"其他"
					],
					"series": [{
						"name": "百分數",
						"values": [
							40,
							30,
							20,
							10
						]
					}]
				},
				"kind": "text",
				"show": "球類 20 人，比球類多 5 人",
				"keys": ["20", "5"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6D4",
		"name": "6D4 統計的應用及誤用",
		"minutes": 60,
		"total": 100,
		"items": [
			{
				"points": 2,
				"stem": "用圖案表示數量，並以圖例說明每個圖案代表多少，這是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"象形圖",
					"折線圖",
					"圓形圖",
					"行程圖"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "比較不同班別借出的圖書數量，較適合用：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"棒形圖",
					"圓形圖",
					"折線圖",
					"路線圖"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "顯示一星期每日氣溫的變化，較適合用：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"象形圖",
					"折線圖",
					"圓形圖",
					"示意圖"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "顯示各種課外活動佔全校學生的比例，較適合用：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"圓形圖",
					"折線圖",
					"行程圖",
					"路線圖"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "圖表的標題應清楚說明：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"圖表所展示的資料",
					"作圖者喜愛的顏色",
					"紙張大小",
					"圖表有幾條線"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "若棒形圖的縱軸缺少單位，讀者可能：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"無法清楚知道數值代表甚麼",
					"知道更多資料",
					"自動找到單位",
					"不受影響"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "折線圖縱軸每格代表1，與每格代表10相比，前者的變化通常看起來：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"較大",
					"較小",
					"相同",
					"無法比較"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "圓形圖顯示兩個月份的儲蓄比例，但沒有兩個月的收入或支出總額。只根據比例：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"一定能判斷哪月儲蓄金額較多",
					"一定能判斷哪月儲蓄金額較少",
					"不能確定哪月儲蓄金額較多",
					"兩月儲蓄金額必定相同"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "象形圖中同一類別使用大小不一的圖案，可能會：",
				"why": "A",
				"figure": { "kind": "pics" },
				"kind": "choice",
				"choices": [
					"使讀者誤以為該類數量較多或較少",
					"令數據必定正確",
					"自動補上標題",
					"不影響圖表解讀"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "象形圖中同一類別使用大小不一的圖案，可能會：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"使讀者誤以為該類數量較多或較少",
					"令數據必定正確",
					"自動補上標題",
					"不影響圖表解讀"
				],
				"answer": 0
			},
			{
				"points": 3,
				"stem": "收集資料前，應先清楚訂定調查的 ______ 。",
				"why": "目的",
				"kind": "text",
				"show": "目的",
				"keys": ["目的"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "將調查所得資料分類、計數並記錄的過程，稱為整理 ______ 。",
				"why": "數據",
				"kind": "text",
				"show": "數據",
				"keys": ["數據"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "沒有標題的統計圖，讀者可能不清楚圖表展示的 ______ 。",
				"why": "內容",
				"kind": "text",
				"show": "內容",
				"keys": ["內容"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "圖表的縱軸沒有標示單位，讀者可能無法確定數值的 ______ 。",
				"why": "意義",
				"kind": "text",
				"show": "意義",
				"keys": ["意義"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "象形圖若圖案大小不一，會令數量比較變得 ______ 。",
				"why": "困難（或不公平）",
				"kind": "text",
				"show": "困難（或不公平）",
				"keys": ["困難", "不公平"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "用棒形圖比較不同類別的數量，應在各棒旁標示清楚的 ______ 或類別名稱。",
				"why": "數值（或單位）",
				"kind": "text",
				"show": "數值（或單位）",
				"keys": ["數值", "單位"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "陳先生一月支出80%、儲蓄20%；二月支出75%、儲蓄25%。若不知道兩月的收入總額，不能只憑百分數判斷哪月的儲蓄 ______ 。",
				"why": "金額",
				"kind": "text",
				"show": "金額",
				"keys": ["金額"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "折線圖的縱軸刻度比例不同，即使數據相同，圖上的變化看起來也可能 ______ 。",
				"why": "不同",
				"kind": "text",
				"show": "不同",
				"keys": ["不同"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "不準確或具誤導性的數據表達，可能令人作出 ______ 的決定。",
				"why": "錯誤",
				"kind": "text",
				"show": "錯誤",
				"keys": ["錯誤"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "用圓形圖表示各部分時，所有部分的百分數合計應為 ______ %。",
				"why": "100",
				"kind": "number",
				"answer": 100
			},
			{
				"points": 8,
				"stem": "一位老師想記錄一星期內每天的氣溫變化，並找出氣溫上升或下降的趨勢。建議使用哪一種統計圖？寫出理由。",
				"why": "使用折線圖。（4分）折線圖適合顯示氣溫隨時間的變化，並觀察上升或下降趨勢。（理由4分）",
				"kind": "text",
				"show": "使用折線圖",
				"keys": ["折線圖"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "學校想比較四個班級本月借出的圖書數量。建議使用哪一種統計圖？寫出兩項製圖時應標明的資料。",
				"why": "使用棒形圖。（4分）標明圖表標題，以及班級名稱和借書數量所用的單位。（每項標示2分）",
				"kind": "text",
				"show": "使用棒形圖",
				"keys": ["棒形圖"],
				"mode": "all"
			},
			{
				"points": 8,
				"stem": "小明想調查同學最喜愛的運動。寫出收集資料前應做的一件事，以及收集資料後整理資料的兩個步驟。",
				"why": "先訂定調查目的或問題。（2分）收集資料後，將答案分類並計數。（3分）把各類數量記錄在表格中，方便比較或製圖。（3分）",
				"kind": "text",
				"show": "先訂定調查目的或問題",
				"keys": ["先訂定調查目的或問題"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "某報告用折線圖比較兩週的氣溫，兩幅圖的縱軸比例不同，而且其中一幅縱軸由20°C開始。（a）縱軸比例不同可能如何影響讀者對變化的觀感？（4分）（b）縱軸由20°C開始可能造成甚麼觀感？（4分）（c）提出一項改善方法。（4分）",
				"why": "（a）每格代表的數值不同，會令同樣的溫度變化看起來較大或較小。（4分） （b）縱軸由20°C開始可能誇大數據之間的差異，使變化看起來特別明顯。（4分） （c）使用一致而清楚的刻度，並標明縱軸起點和單位。（4分）",
				"kind": "text",
				"show": "每格代表的數值不同，會令同樣的溫度變化看起來較大或較小",
				"keys": ["誇大"],
				"mode": "all"
			},
			{
				"points": 14,
				"stem": "陳先生一月的支出佔收入80%、儲蓄佔20%；二月的支出佔收入75%、儲蓄佔25%。（a）只根據百分數，能否斷定一月的儲蓄金額較少？為甚麼？（6分）（b）寫出一項圖表中可能出現的誤用，並說明它如何誤導讀者。（4分）（c）說明不準確或誤導的統計資料如何令人作出錯誤決定。（4分）",
				"why": "（a）不能。因為不知道兩月的收入總額；儲蓄比例較低不代表儲蓄金額一定較少。（說明資料不足3分；解釋比例與金額不同3分） （b）例：縱軸不從零開始，或缺少標題、單位，或象形圖的圖案大小不一。這些做法可能誇大差異或令讀者誤解數據。（指出一項誤用2分；說明誤導方式2分） （c）讀者若根據錯誤理解的數據作選擇，可能採取不合適的行動，例如錯誤判斷支出或儲蓄情況。（指出誤解數據2分；說明可能導致錯誤決定2分）",
				"kind": "text",
				"show": "不能",
				"keys": ["不能", "誇大"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6N1",
		"name": "6N1 小數（四）",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "6.4÷10=",
				"why": "C",
				"kind": "choice",
				"choices": [
					"64",
					"6.04",
					"0.64",
					"0.064"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "4.2÷0.1=",
				"why": "C",
				"kind": "choice",
				"choices": [
					"0.42",
					"4.2",
					"42",
					"420"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "7.2÷8=",
				"why": "A",
				"kind": "choice",
				"choices": [
					"0.9",
					"0.09",
					"9",
					"57.6"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "9.6÷0.8=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"1.2",
					"12",
					"120",
					"0.12"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "2.4÷100=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.24",
					"0.024",
					"0.0024",
					"240"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "8.4÷0.7+2=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"12",
					"14",
					"18",
					"20"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "9.3÷10=",
				"why": "0.93",
				"kind": "number",
				"answer": .93
			},
			{
				"points": 3,
				"stem": "6.3÷0.01=",
				"why": "630",
				"kind": "number",
				"answer": 630
			},
			{
				"points": 3,
				"stem": "15÷0.6=",
				"why": "25",
				"kind": "number",
				"answer": 25
			},
			{
				"points": 3,
				"stem": "8.4÷4=",
				"why": "2.1",
				"kind": "number",
				"answer": 2.1
			},
			{
				"points": 3,
				"stem": "把 5.28÷4 的商取近似值至最接近的百分位：",
				"why": "1.32",
				"kind": "number",
				"answer": 1.32
			},
			{
				"points": 3,
				"stem": "12.6÷3−1.2=",
				"why": "3",
				"kind": "number",
				"answer": 3
			},
			{
				"points": 8,
				"stem": "一條長 9.6 米的繩平均剪成 8 段。每段長多少米？",
				"why": "9.6÷8=1.2 米。（列式及計算4分；答案和單位4分）",
				"kind": "text",
				"show": "9.6÷8=1.2 米。",
				"keys": ["1.2"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一桶有 7.3 升果汁，每瓶盛 0.6 升。最多可裝滿多少瓶？餘下多少升果汁？",
				"why": "7.3÷0.6=12 餘 0.1。最多可裝滿12瓶，餘下0.1升。（除法及商餘數8分；答案和單位4分）",
				"kind": "text",
				"show": "7.3÷0.6=12 餘 0.1。最多可裝滿12瓶，餘下0.1升。",
				"keys": ["12", "0.1"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6N2",
		"name": "6N2 小數（五）",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "0.8 化成分母為10的分數是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"8/10",
					"8/100",
					"80/10",
					"1/8"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "7/20 化成小數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.27",
					"0.35",
					"0.7",
					"3.5"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "0.36 化成最簡分數是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"9/25",
					"9/20",
					"36/10",
					"3/5"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "5/8 化成小數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.58",
					"0.625",
					"0.8",
					"1.6"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "哪個較大？",
				"why": "A",
				"kind": "choice",
				"choices": [
					"3/4",
					"0.7",
					"一樣大",
					"無法比較"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "由小至大排列 0.55,3/5,0.58：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"0.55,0.58,3/5",
					"0.58,0.55,3/5",
					"3/5,0.58,0.55",
					"0.55,3/5,0.58"
				],
				"answer": 0
			},
			{
				"points": 3,
				"stem": "0.9= ______ （分母為10）",
				"why": "9/10",
				"kind": "text",
				"show": "9/10",
				"keys": ["9/10"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "0.375= ______ （最簡分數）",
				"why": "3/8",
				"kind": "text",
				"show": "3/8",
				"keys": ["3/8"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "13/20= ______ （小數）",
				"why": "0.65",
				"kind": "number",
				"answer": .65
			},
			{
				"points": 3,
				"stem": "0.08= ______ （最簡分數）",
				"why": "2/25",
				"kind": "text",
				"show": "2/25",
				"keys": ["2/25"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "7/25= ______ （小數）",
				"why": "0.28",
				"kind": "number",
				"answer": .28
			},
			{
				"points": 3,
				"stem": "由小至大排列 3/8,0.4,0.35：",
				"why": "0.35,3/8,0.4",
				"kind": "text",
				"show": "0.35,3/8,0.4",
				"keys": ["0.35,3/8,0.4"],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "一條絲帶用去 7/10 米。以小數表示用去的長度。",
				"why": "7/10=0.7 米。（轉換3分；答案和單位5分）",
				"kind": "text",
				"show": "7/10=0.7 米。",
				"keys": ["0.7"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "甲走了 3/8 公里，乙走了0.4公里。誰走得較遠？相差多少公里？",
				"why": "3/8=0.375，而 0.4=0.400；乙較遠，相差 0.400−0.375=0.025 公里。（化小數4分；比較4分；差額及單位4分）",
				"kind": "text",
				"show": "乙較遠，相差 0.025 公里",
				"keys": ["乙", "0.025"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6N3",
		"name": "6N3 百分數（一）",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "百分數以多少作分母？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"10",
					"100",
					"1000",
					"1"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "0.32 化成百分數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3.2%",
					"32%",
					"320%",
					"0.32%"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "7/10 化成百分數是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"7%",
					"17%",
					"70%",
					"700%"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "45% 化成最簡分數是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"9/20",
					"4/5",
					"45/10",
					"1/2"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "125% 化成小數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0.125",
					"1.25",
					"12.5",
					"125"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "哪個數值最大？",
				"why": "A",
				"kind": "choice",
				"choices": [
					"0.72",
					"70%",
					"7/10",
					"三者相等"
				],
				"answer": 0
			},
			{
				"points": 3,
				"stem": "6%= ______ （小數）",
				"why": "0.06",
				"kind": "number",
				"answer": .06
			},
			{
				"points": 3,
				"stem": "3/4= ______ %",
				"why": "75",
				"kind": "number",
				"answer": 75
			},
			{
				"points": 3,
				"stem": "0.45= ______ %",
				"why": "45",
				"kind": "number",
				"answer": 45
			},
			{
				"points": 3,
				"stem": "35%= ______ （最簡分數）",
				"why": "7/20",
				"kind": "text",
				"show": "7/20",
				"keys": ["7/20"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "1.6= ______ %",
				"why": "160",
				"kind": "number",
				"answer": 160
			},
			{
				"points": 3,
				"stem": "12.5%= ______ （最簡分數）",
				"why": "1/8",
				"kind": "text",
				"show": "1/8",
				"keys": ["1/8"],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "把 7/20 分別化成小數和百分數。",
				"why": "7/20=0.35=35%。（小數轉換4分；百分數轉換4分）",
				"kind": "text",
				"show": "0.35 = 35%",
				"keys": ["0.35", "35"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "將 3/5、58%和0.62由小至大排列，並寫出比較時使用的小數值。",
				"why": "3/5=0.6，58%=0.58，0.62=0.62；由小至大為58%、3/5、0.62。（化小數6分；正確排序6分）",
				"kind": "text",
				"show": "58%、3/5、0.62",
				"keys": ["58%、3/5、0.62"],
				"mode": "any"
			}
		]
	},
	{
		"unitId": "6N4",
		"name": "6N4 百分數（二）",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "18是60的百分之幾？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"20%",
					"30%",
					"40%",
					"60%"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "80的5%是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"4",
					"8",
					"16",
					"40"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "50增加20%後是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"55",
					"60",
					"65",
					"70"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "120減少10%後是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"12",
					"108",
					"110",
					"132"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "24是80的百分之幾？",
				"why": "C",
				"kind": "choice",
				"choices": [
					"20%",
					"25%",
					"30%",
					"40%"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "160減少25%後是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"40",
					"120",
					"135",
					"140"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "15是60的 ______ %。",
				"why": "25",
				"kind": "number",
				"answer": 25
			},
			{
				"points": 3,
				"stem": "200的12%是 ______ 。",
				"why": "24",
				"kind": "number",
				"answer": 24
			},
			{
				"points": 3,
				"stem": "75增加20%後是 ______ 。",
				"why": "90",
				"kind": "number",
				"answer": 90
			},
			{
				"points": 3,
				"stem": "90減少30%後是 ______ 。",
				"why": "63",
				"kind": "number",
				"answer": 63
			},
			{
				"points": 3,
				"stem": "48的12.5%是 ______ 。",
				"why": "6",
				"kind": "number",
				"answer": 6
			},
			{
				"points": 3,
				"stem": "64增加25%後是 ______ 。",
				"why": "80",
				"kind": "number",
				"answer": 80
			},
			{
				"points": 8,
				"stem": "一班有50位學生，其中36%參加合唱團。參加合唱團的有多少位？",
				"why": "50×36%=18 位。（列式4分；答案和單位4分）",
				"kind": "text",
				"show": "50×36%=18 位。",
				"keys": ["18"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個數的25%是18。設這個數為x，列方程求x，並驗算。",
				"why": "設原數為x，0.25x=18，所以x=72。驗算：72×25%=18。（列方程4分；解方程4分；驗算4分）",
				"kind": "text",
				"show": "x = 72",
				"keys": ["72"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6A1",
		"name": "6A1 簡易方程（二）",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "x+1.8=5，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"2.2",
					"3.2",
					"5.8",
					"6.8"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "4x=18，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"4",
					"4.5",
					"5",
					"72"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "3x−2=10，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3",
					"4",
					"6",
					"12"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "2(x+1.5)=11，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3",
					"4",
					"4.5",
					"7"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "0.4x=14，x=",
				"why": "C",
				"kind": "choice",
				"choices": [
					"3.5",
					"14.4",
					"35",
					"56"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "3x+2x=45，x=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"5",
					"9",
					"15",
					"25"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "x−3.5=4，x= ______ 。",
				"why": "7.5",
				"kind": "number",
				"answer": 7.5
			},
			{
				"points": 3,
				"stem": "(x)/(6)=2.5，x= ______ 。",
				"why": "15",
				"kind": "number",
				"answer": 15
			},
			{
				"points": 3,
				"stem": "5x+4=29，x= ______ 。",
				"why": "5",
				"kind": "number",
				"answer": 5
			},
			{
				"points": 3,
				"stem": "4(x−2)=20，x= ______ 。",
				"why": "7",
				"kind": "number",
				"answer": 7
			},
			{
				"points": 3,
				"stem": "2x+3x=28，x= ______ 。",
				"why": "5.6",
				"kind": "number",
				"answer": 5.6
			},
			{
				"points": 3,
				"stem": "3/4x=18，x= ______ 。",
				"why": "24",
				"kind": "number",
				"answer": 24
			},
			{
				"points": 8,
				"stem": "一個長方形的長是x+1 厘米，闊是x 厘米，周界為26厘米。列方程求x。",
				"why": "2(x+1)+2x=26，4x+2=26，x=6。（列方程4分；解方程4分）",
				"kind": "text",
				"show": "2(x+1)+2x=26，4x+2=26，x=6。",
				"keys": ["6"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個數的40%是26。設這個數為x，列方程求解並驗算。",
				"why": "0.4x=26，x=65。驗算：65×40%=26。（列方程4分；解方程4分；驗算4分）",
				"kind": "text",
				"show": "x = 65",
				"keys": ["65"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6M1",
		"name": "6M1 角（度）",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "180° 是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"直角",
					"平角",
					"周角",
					"銳角"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "360° 是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"平角",
					"反角",
					"周角",
					"直角"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "135° 屬於：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"銳角",
					"直角",
					"鈍角",
					"平角"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "225° 屬於：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"鈍角",
					"反角",
					"平角",
					"直角"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "∠MNP 的頂點是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"M",
					"N",
					"P",
					"∠"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "270° 比平角大：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"45°",
					"90°",
					"180°",
					"270°"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "直角是 ______ 度。",
				"why": "90",
				"kind": "number",
				"answer": 90
			},
			{
				"points": 3,
				"stem": "360° 的一半是 ______ 度。",
				"why": "180",
				"kind": "number",
				"answer": 180
			},
			{
				"points": 3,
				"stem": "145° 比平角少 ______ 度。",
				"why": "35",
				"kind": "number",
				"answer": 35
			},
			{
				"points": 3,
				"stem": "∠ABC=70°，角的頂點是 ______ 。",
				"why": "B",
				"kind": "text",
				"show": "B",
				"keys": ["B"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "估計一個角約為180°。這個角稱為 ______ 。",
				"why": "平角",
				"figure": {
					"kind": "angle",
					"deg": 180,
					"name": "平角"
				},
				"kind": "text",
				"show": "平角",
				"keys": ["平角"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "周角的四分之一是 ______ 度。",
				"why": "90",
				"kind": "number",
				"answer": 90
			},
			{
				"points": 8,
				"stem": "一個角比直角大28°。求這個角的度數。",
				"why": "90°+28°=118°。（列式4分；答案4分）",
				"kind": "text",
				"show": "90°+28°=118°。",
				"keys": ["118"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "用文字說明如何用量角器畫出一個65° 的角，並標示為∠XYZ。",
				"why": "先畫射線YX 作為角的一邊，再以Y 為頂點放置量角器並標出65°，最後畫出另一射線YZ 並標示∠XYZ。（頂點及第一射線3分；量度標記及角度5分；第二射線、命名4分）",
				"kind": "text",
				"show": "先畫射線YX 作為角的一邊，再以Y 為頂點放置量角器並標出65°，最後畫出另一射線YZ 並標示∠XYZ",
				"keys": ["65"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6M2",
		"name": "6M2 體積（二）",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "1 cm³=",
				"why": "A",
				"kind": "choice",
				"choices": [
					"1 mL",
					"10 mL",
					"100 mL",
					"1 L"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "1 m³=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"100 L",
					"1000 L",
					"10000 L",
					"1 L"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "長方體長4厘米、闊3厘米、高5厘米，體積是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"12 cm³",
					"20 cm³",
					"60 cm³",
					"120 cm³"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "排水法中，物件體積等於：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"浸入前讀數",
					"浸入後讀數",
					"兩次讀數之差",
					"兩次讀數之和"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "2.5 L=",
				"why": "B",
				"kind": "choice",
				"choices": [
					"250 cm³",
					"2500 cm³",
					"25000 cm³",
					"2500000 cm³"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "兩個拼砌部分的體積分別為35 cm³ 和48 cm³，總體積是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"13 cm³",
					"48 cm³",
					"83 cm³",
					"1680 cm³"
				],
				"answer": 2
			},
			{
				"points": 3,
				"stem": "750 mL= ______ cm³",
				"why": "750",
				"kind": "number",
				"answer": 750
			},
			{
				"points": 3,
				"stem": "4 L= ______ cm³",
				"why": "4000",
				"kind": "number",
				"answer": 4e3
			},
			{
				"points": 3,
				"stem": "8×5×3= ______ cm³",
				"why": "120",
				"kind": "number",
				"answer": 120
			},
			{
				"points": 3,
				"stem": "正方體邊長4厘米，體積是 ______ cm³。",
				"why": "64",
				"kind": "number",
				"answer": 64
			},
			{
				"points": 3,
				"stem": "量杯水位由145 mL 升至178 mL。完全浸沒的物件體積是 ______ cm³。",
				"why": "33",
				"figure": {
					"kind": "beaker",
					"before": 145,
					"after": 178,
					"unit": "mL"
				},
				"kind": "number",
				"answer": 33
			},
			{
				"points": 3,
				"stem": "1.2 m³= ______ L",
				"why": "1200",
				"kind": "number",
				"answer": 1200
			},
			{
				"points": 8,
				"stem": "一個長方體水箱長25厘米、闊20厘米、高12厘米。求水箱的容量，以升表示。",
				"why": "25×20×12=6000 cm³；6000 cm³=6 L。（求體積6分；換算及答案2分）",
				"kind": "text",
				"show": "25×20×12=6000 cm³；6000 cm³=6 L。",
				"keys": ["6"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個不規則物件完全浸沒於水中，量杯讀數由320 mL 升至367 mL。求物件體積。",
				"why": "367−320=47 mL；因為1 mL=1 cm³，物件體積為47 cm³。（相減6分；單位關係及答案6分）",
				"figure": {
					"kind": "beaker",
					"before": 320,
					"after": 367,
					"unit": "mL"
				},
				"kind": "text",
				"show": "47 cm³",
				"keys": ["47"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6M3",
		"name": "6M3 周界（二）",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "圓周公式可寫成：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"πr^2",
					"πd",
					"r+d",
					"2r^2"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "直徑14厘米的圓，取π=22/7，圓周是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"22厘米",
					"44厘米",
					"88厘米",
					"154厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "圓周是31.4 厘米，取π=3.14，直徑是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"5厘米",
					"10厘米",
					"15厘米",
					"20厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑7厘米的半圓，弧長是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"11厘米",
					"22厘米",
					"36厘米",
					"44厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑14厘米的四分之一圓，弧長是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"11厘米",
					"22厘米",
					"44厘米",
					"88厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "圓周為62.8 厘米，取π=3.14，半徑是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"5厘米",
					"10厘米",
					"20厘米",
					"31.4厘米"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "π 常用的近似值為22/7 或 ______ 。",
				"why": "3.14",
				"kind": "number",
				"answer": 3.14
			},
			{
				"points": 3,
				"stem": "半徑6厘米，取π=3.14，圓周是 ______ 厘米。",
				"why": "37.68",
				"kind": "number",
				"answer": 37.68
			},
			{
				"points": 3,
				"stem": "直徑35米，取π=22/7，圓周是 ______ 米。",
				"why": "110",
				"kind": "number",
				"answer": 110
			},
			{
				"points": 3,
				"stem": "圓周為88 厘米，取π=22/7，直徑是 ______ 厘米。",
				"why": "28",
				"kind": "number",
				"answer": 28
			},
			{
				"points": 3,
				"stem": "半徑7厘米的半圓，其周界（包括直徑）是 ______ 厘米。",
				"why": "36",
				"kind": "number",
				"answer": 36
			},
			{
				"points": 3,
				"stem": "半徑7厘米的四分之一圓，弧長是 ______ 厘米。（取π=22/7）",
				"why": "11",
				"kind": "number",
				"answer": 11
			},
			{
				"points": 8,
				"stem": "一個圓形花圃的直徑是21米。取π=22/7，求花圃周界。",
				"why": "22/7×21=66 米。（選用公式4分；計算及單位4分）",
				"kind": "text",
				"show": "22/7×21=66 米。",
				"keys": ["66"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個半圓形窗的半徑是7厘米。取π=22/7，求包括直徑在內的窗框周界。",
				"why": "半圓弧長=1/2×2×22/7×7=22 厘米；周界=22+14=36 厘米。（弧長計算6分；加直徑及答案6分）",
				"figure": {
					"kind": "semi",
					"value": "7",
					"as": "r"
				},
				"kind": "text",
				"show": "半圓弧長=1/2×2×22/7×7=22 厘米；周界=22+14=36 厘米。",
				"keys": ["36"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6M4",
		"name": "6M4 速率",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "150 分鐘等於：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"1.5小時",
					"2小時",
					"2.5小時",
					"3小時"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "3 分鐘等於：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"30秒",
					"180秒",
					"300秒",
					"3000秒"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "距離90公里，時間1.5小時，速率是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"45 km/h",
					"60 km/h",
					"90 km/h",
					"135 km/h"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "行程圖的橫軸通常表示：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"時間",
					"距離",
					"速率",
					"重量"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "行程圖上的水平線通常表示：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"距離不變",
					"距離增加",
					"時間停止",
					"速率增加"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "同一時間內，小明走120米，小華走150米。誰的速率較快？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"小明",
					"小華",
					"一樣快",
					"無法比較"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "2.5 小時等於 ______ 分鐘。",
				"why": "150",
				"kind": "number",
				"answer": 150
			},
			{
				"points": 3,
				"stem": "360 秒等於 ______ 分鐘。",
				"why": "6",
				"kind": "number",
				"answer": 6
			},
			{
				"points": 3,
				"stem": "距離180 米，時間60 秒，速率是 ______ m/s。",
				"why": "3",
				"kind": "number",
				"answer": 3
			},
			{
				"points": 3,
				"stem": "距離150 公里，時間3 小時，速率是 ______ km/h。",
				"why": "50",
				"kind": "number",
				"answer": 50
			},
			{
				"points": 3,
				"stem": "行程資料：1小時行30公里，2小時行60公里。每小時行 ______ 公里。",
				"why": "30",
				"kind": "number",
				"answer": 30
			},
			{
				"points": 3,
				"stem": "1 小時20 分鐘等於 ______ 小時。",
				"why": "1 1/3",
				"kind": "text",
				"show": "1 1/3",
				"keys": [
					"1 1/3",
					"4/3",
					"11/3"
				],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "一輛巴士以每小時60公里行駛2.5小時。共行多少公里？",
				"why": "60×2.5=150 公里。（列式4分；答案和單位4分）",
				"kind": "text",
				"show": "60×2.5=150 公里。",
				"keys": ["150"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一名學生下午2時30分開始練習，下午4時結束。練習了多少時間？若他在這段時間步行6公里，平均速率是多少km/h？",
				"why": "時間為1小時30分鐘，即1.5小時；平均速率=6÷1.5=4 km/h。（求時間4分；換算成小時4分；速率計算及答案4分）",
				"kind": "text",
				"show": "1.5 小時，平均速率 4 km/h",
				"keys": ["1.5", "4"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6M5",
		"name": "6M5 面積（三）",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "圓面積公式是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"2πr",
					"π×r×r",
					"πd",
					"r+r"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑7厘米，取π=22/7，圓面積是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"77平方厘米",
					"154平方厘米",
					"308平方厘米",
					"44平方厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑5厘米，取π=3.14，圓面積是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"31.4平方厘米",
					"50平方厘米",
					"78.5平方厘米",
					"157平方厘米"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "半徑14厘米的半圓，取π=22/7，面積是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"154平方厘米",
					"308平方厘米",
					"616平方厘米",
					"1232平方厘米"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "半徑7厘米的四分之三圓，面積是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"38.5平方厘米",
					"77平方厘米",
					"115.5平方厘米",
					"154平方厘米"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "直徑12厘米的圓，半徑是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"3厘米",
					"6厘米",
					"12厘米",
					"24厘米"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "π 可用 ______ 或 ______ 作近似值。",
				"why": "22/7、3.14",
				"kind": "text",
				"show": "22/7、3.14",
				"keys": ["22/7", "3.14"],
				"mode": "all"
			},
			{
				"points": 3,
				"stem": "半徑3厘米，取π=3.14，圓面積是 ______ 平方厘米。",
				"why": "28.26",
				"kind": "number",
				"answer": 28.26
			},
			{
				"points": 3,
				"stem": "半徑14厘米的四分之一圓，取π=22/7，面積是 ______ 平方厘米。",
				"why": "154",
				"kind": "number",
				"answer": 154
			},
			{
				"points": 3,
				"stem": "直徑10厘米，取π=3.14，圓面積是 ______ 平方厘米。",
				"why": "78.5",
				"kind": "number",
				"answer": 78.5
			},
			{
				"points": 3,
				"stem": "半徑7米的四分之三圓，取π=22/7，面積是 ______ 平方米。",
				"why": "115.5",
				"kind": "number",
				"answer": 115.5
			},
			{
				"points": 3,
				"stem": "半徑6厘米的半圓，取π=3.14，面積是 ______ 平方厘米。",
				"why": "56.52",
				"kind": "number",
				"answer": 56.52
			},
			{
				"points": 8,
				"stem": "一個圓形花壇半徑6米，取π=3.14。求花壇面積。",
				"why": "3.14×6×6=113.04 平方米。（代入公式4分；計算及單位4分）",
				"kind": "text",
				"show": "3.14×6×6=113.04 平方米。",
				"keys": ["113.04"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一塊半圓形草地的直徑是28米。取π=22/7，求草地面積。",
				"why": "半徑=28÷2=14 米；全圓面積=22/7×14×14=616 平方米；半圓面積=616÷2=308 平方米。（求半徑3分；全圓面積5分；取半及答案4分）",
				"figure": {
					"kind": "semi",
					"value": "28",
					"as": "d"
				},
				"kind": "text",
				"show": "半徑=28÷2=14 米；全圓面積=22/7×14×14=616 平方米；半圓面積=616÷2=308 平方米。",
				"keys": ["308"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6S1",
		"name": "6S1 對稱",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "圖形沿對稱軸對摺後，兩邊應能：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"完全重合",
					"變大",
					"相交",
					"分開"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "非正方形長方形有多少條對稱軸？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"1",
					"2",
					"3",
					"4"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "等邊三角形有多少條對稱軸？",
				"why": "C",
				"kind": "choice",
				"choices": [
					"1",
					"2",
					"3",
					"4"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "圓的對稱軸必須通過：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"圓周上一點",
					"圓心",
					"圓外一點",
					"任意一點"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "一般等腰三角形有多少條對稱軸？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"0",
					"1",
					"2",
					"3"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "一點在對稱軸左方4格，其對應點應在：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"軸左方4格",
					"軸右方2格",
					"軸右方4格",
					"軸右方8格"
				],
				"answer": 2
			},
			{
				"points": 3,
				"stem": "正方形有 ______ 條對稱軸。",
				"why": "4",
				"kind": "number",
				"answer": 4
			},
			{
				"points": 3,
				"stem": "非正方形菱形有 ______ 條對稱軸。",
				"why": "2",
				"kind": "number",
				"answer": 2
			},
			{
				"points": 3,
				"stem": "軸對稱圖形沿對稱軸對摺後，兩部分能完全 ______ 。",
				"why": "重合",
				"kind": "text",
				"show": "重合",
				"keys": ["重合"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "圓有 ______ 條對稱軸。",
				"why": "無數",
				"kind": "text",
				"show": "無數",
				"keys": ["無數"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "對稱軸左方5格的點，其對應點在軸右方 ______ 格。",
				"why": "5",
				"kind": "number",
				"answer": 5
			},
			{
				"points": 3,
				"stem": "等邊三角形的每條對稱軸都通過一個頂點及對邊的 ______ 。",
				"why": "中點",
				"kind": "text",
				"show": "中點",
				"keys": ["中點"],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "說明如何用對摺方法判斷一個平面圖形是否軸對稱。",
				"why": "沿候選直線對摺圖形。（方法4分）檢查兩邊是否完全重合；若重合，該直線便是對稱軸，圖形是軸對稱圖形。（判斷準則4分）",
				"kind": "text",
				"show": "沿候選直線對摺圖形",
				"keys": ["重合", "對稱軸"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "方格紙上有一條垂直對稱軸，半個圖形的三個頂點分別在軸左方1格、2格和4格。說明如何在軸右方畫出另一半。",
				"why": "在軸右方相同水平位置，分別量出距軸1格、2格和4格的位置並標點。（對應距離6分）依原圖次序連接各點，完成另一半圖形。（連線及完整性6分）",
				"figure": {
					"kind": "gridpt",
					"axis": "v",
					"axisAt": 4,
					"dots": [
						{
							"c": 3,
							"r": 1
						},
						{
							"c": 2,
							"r": 2
						},
						{
							"c": 0,
							"r": 3
						}
					],
					"note": "對稱軸在中間，補右半"
				},
				"kind": "text",
				"show": "在軸右方 1 格、2 格、4 格標點再連線",
				"keys": ["右"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6D1",
		"name": "6D1 平均數",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "求平均數，應把總和除以：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"最大數",
					"最小數",
					"數據的個數",
					"數據總和"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "數據4、6、8的平均數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"5",
					"6",
					"7",
					"8"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "5個數的平均數是7，總和是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"12",
					"30",
					"35",
					"42"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "數據10、12、14、16的平均數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"12",
					"13",
					"14",
					"15"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "4個數的平均數是9，其中三個數的總和是25，第四個數是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"9",
					"10",
					"11",
					"12"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "數據18、20、22、24的平均數是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"20",
					"21",
					"22",
					"23"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "2、6、10的平均數是 ______ 。",
				"why": "6",
				"kind": "number",
				"answer": 6
			},
			{
				"points": 3,
				"stem": "5個數的平均數是8，總和是 ______ 。",
				"why": "40",
				"kind": "number",
				"answer": 40
			},
			{
				"points": 3,
				"stem": "數據3、5、7、9的平均數是 ______ 。",
				"why": "6",
				"kind": "number",
				"answer": 6
			},
			{
				"points": 3,
				"stem": "4個數的平均數是12，總和是 ______ 。",
				"why": "48",
				"kind": "number",
				"answer": 48
			},
			{
				"points": 3,
				"stem": "3個數的平均數是15，其中兩數是12和17，第三數是 ______ 。",
				"why": "16",
				"kind": "number",
				"answer": 16
			},
			{
				"points": 3,
				"stem": "5個數的平均數是10，其中四數總和是36，第五數是 ______ 。",
				"why": "14",
				"kind": "number",
				"answer": 14
			},
			{
				"points": 8,
				"stem": "5日的閱讀頁數分別是12、14、16、18、20頁。求平均每日閱讀頁數。",
				"why": "總頁數=12+14+16+18+20=80；平均=80÷5=16 頁。（求總和4分；除以數據個數及答案4分）",
				"kind": "text",
				"show": "總頁數=12+14+16+18+20=80；平均=80÷5=16 頁。",
				"keys": ["16"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "4次測驗的平均分是78分，其中三次得分為72、75、81分。求第四次得分。",
				"why": "四次總分=78×4=312；已知三次總分=72+75+81=228；第四次=312−228=84 分。（求總分4分；求已知總和4分；答案及單位4分）",
				"kind": "text",
				"show": "四次總分=78×4=312；已知三次總分=72+75+81=228；第四次=312−228=84 分。",
				"keys": ["84"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6D2",
		"name": "6D2 折線圖",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "折線圖最適合顯示：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"數據隨時間的變化",
					"物件的形狀",
					"圖案的顏色",
					"角的大小"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "折線圖上相鄰數據點通常按甚麼連接？",
				"why": "B",
				"kind": "choice",
				"choices": [
					"任意次序",
					"時間或項目次序",
					"大小次序",
					"字母次序"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "連線向上通常表示數據：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"增加",
					"減少",
					"不變",
					"遺漏"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "相鄰兩個數據相同，兩點之間的線段是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"上斜線",
					"下斜線",
					"水平線",
					"垂直線"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "若縱軸每格代表1，數據變化通常會比每格代表10看起來：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"較明顯",
					"較不明顯",
					"完全相同",
					"消失"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "比較一星期每天的氣溫變化，較合適的圖表是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"圓形圖",
					"折線圖",
					"示意圖",
					"摺紙圖"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "折線圖的水平軸稱為 ______ 軸。",
				"why": "橫",
				"kind": "text",
				"show": "橫",
				"keys": ["橫"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "折線圖的垂直軸通常表示數據的 ______ 。",
				"why": "數值",
				"kind": "text",
				"show": "數值",
				"keys": ["數值"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "數據由15升至21，增加了 ______ 。",
				"why": "6",
				"kind": "number",
				"answer": 6
			},
			{
				"points": 3,
				"stem": "棒形圖和折線圖都可以比較不同項目的 ______ 。",
				"why": "數量",
				"kind": "text",
				"show": "數量",
				"keys": ["數量"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "折線圖縱軸每格代表5，數據點在第6格，並由0起算，數據值是 ______ 。",
				"why": "30",
				"kind": "number",
				"answer": 30
			},
			{
				"points": 3,
				"stem": "雙折線圖若表示兩組數據，圖例應清楚標示每條線代表的 ______ 。",
				"why": "數據組別",
				"kind": "text",
				"show": "數據組別",
				"keys": ["數據組別"],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "一星期四天的氣溫依次是18°C、21°C、20°C、24°C。哪一天氣溫最高？星期二至星期三下降多少度？",
				"why": "星期四最高，為24°C。（判斷最高4分）星期二至星期三由21°C降至20°C，下降1°C。（相減2分；答案及單位2分）",
				"kind": "text",
				"show": "星期四最高，下降 1°C",
				"keys": ["星期四", "1"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一個水族館三天的入場人數為星期一30人、星期二50人、星期三40人。說明折線圖的標題、兩軸標籤及各點位置。",
				"why": "標題可寫「水族館三天入場人數」。（標題2分）橫軸標示日子，縱軸標示入場人數（人）。（軸標籤及單位4分）依次標出星期一30人、星期二50人、星期三40人，並按次序連線。（點的位置及連線6分）",
				"kind": "text",
				"show": "星期一 30 人、星期二 50 人、星期三 40 人",
				"keys": [
					"30",
					"50",
					"40"
				],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6D3",
		"name": "6D3 圓形圖",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "圓形圖全部部分的百分數合計是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"50%",
					"90%",
					"100%",
					"360%"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "圓形圖全部部分的圓心角合計是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"180°",
					"270°",
					"360°",
					"400°"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "圓形圖中一部分的圓心角是90°，該部分佔全圓：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"四分之一",
					"三分之一",
					"二分之一",
					"四分之三"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "全班有40人，25%參加合唱團。參加的有：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"5人",
					"10人",
					"15人",
					"20人"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "圓形圖以百分數列出三類：25%、35%、40%。最大部分是：",
				"why": "C",
				"kind": "choice",
				"choices": [
					"第一類",
					"第二類",
					"第三類",
					"三類一樣大"
				],
				"answer": 2
			},
			{
				"points": 2,
				"stem": "圓心角為45°的部分佔全圓：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"1/8",
					"1/4",
					"1/2",
					"3/4"
				],
				"answer": 0
			},
			{
				"points": 3,
				"stem": "圓形圖全部部分代表 ______ %。",
				"why": "100",
				"kind": "number",
				"answer": 100
			},
			{
				"points": 3,
				"stem": "圓形圖所有圓心角合共 ______ 度。",
				"why": "360",
				"kind": "number",
				"answer": 360
			},
			{
				"points": 3,
				"stem": "一部分的圓心角為180°，佔全圓 ______ %。",
				"why": "50",
				"kind": "number",
				"answer": 50
			},
			{
				"points": 3,
				"stem": "四部分百分數為15%、25%、30%、30%，合計 ______ %。",
				"why": "100",
				"kind": "number",
				"answer": 100
			},
			{
				"points": 3,
				"stem": "一部分佔全圓25%，若總數為80，該部分數量是 ______ 。",
				"why": "20",
				"kind": "number",
				"answer": 20
			},
			{
				"points": 3,
				"stem": "圓形圖一部分圓心角為135°，該部分佔全圓 ______ %。",
				"why": "37.5",
				"kind": "number",
				"answer": 37.5
			},
			{
				"points": 8,
				"stem": "某班最喜愛的水果比例為蘋果35%、橙子25%、香蕉20%、其他20%。哪種水果最受歡迎？蘋果比橙子多佔多少百分點？",
				"why": "蘋果最受歡迎。（判斷2分）蘋果比橙子多35%−25%=10 個百分點。（列式及答案6分）",
				"kind": "text",
				"show": "蘋果最受歡迎。蘋果比橙子多35%−25%=10 個百分點。",
				"keys": ["蘋果", "10"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一班有40人，圓形圖以圓心角表示交通方式：步行90°、巴士135°、鐵路90°、其他45°。求乘巴士的學生人數，並驗算各角合共是否為360°。",
				"why": "巴士佔135/360=3/8，人數=40×3/8=15 人。（比例或換算4分；人數計算及單位4分）圓心角合計=90°+135°+90°+45°=360°。（列式2分；結論2分）",
				"kind": "text",
				"show": "巴士 15 人，各角合計 360°",
				"keys": ["15", "360"],
				"mode": "all"
			}
		]
	},
	{
		"unitId": "6D4",
		"name": "6D4 統計的應用及誤用",
		"minutes": 20,
		"total": 50,
		"items": [
			{
				"points": 2,
				"stem": "比較四個班的借書數量，較合適的統計圖是：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"棒形圖",
					"圓形圖",
					"折線圖",
					"路線圖"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "顯示一星期每天氣溫的變化，較合適的統計圖是：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"象形圖",
					"折線圖",
					"圓形圖",
					"位置圖"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "圓形圖最適合顯示：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"數據隨時間的升降",
					"各部分與總數的比例",
					"物件的周界",
					"距離和方向"
				],
				"answer": 1
			},
			{
				"points": 2,
				"stem": "統計圖沒有標示單位，讀者可能：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"不知道數值代表甚麼",
					"自動知道單位",
					"不受影響",
					"確定數據正確"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "折線圖縱軸每格代表1，與每格代表10相比，變化通常看起來：",
				"why": "A",
				"kind": "choice",
				"choices": [
					"較大",
					"較小",
					"相同",
					"不會顯示"
				],
				"answer": 0
			},
			{
				"points": 2,
				"stem": "圓形圖只有百分數、沒有總數時，通常不能確定：",
				"why": "B",
				"kind": "choice",
				"choices": [
					"哪部分比例最大",
					"實際數量是多少",
					"百分數合共多少",
					"有幾個部分"
				],
				"answer": 1
			},
			{
				"points": 3,
				"stem": "收集數據前，應先訂定調查的 ______ 。",
				"why": "目的（或問題）",
				"kind": "text",
				"show": "目的（或問題）",
				"keys": ["目的", "問題"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "圓形圖各部分百分數合計應為 ______ %。",
				"why": "100",
				"kind": "number",
				"answer": 100
			},
			{
				"points": 3,
				"stem": "棒形圖應清楚標示標題、類別及數據 ______ 。",
				"why": "單位",
				"kind": "text",
				"show": "單位",
				"keys": ["單位"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "象形圖若圖案大小不一，可能造成視覺 ______ 。",
				"why": "誤導",
				"kind": "text",
				"show": "誤導",
				"keys": ["誤導"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "不同縱軸刻度會影響讀者對數據變化的 ______ 。",
				"why": "觀感",
				"kind": "text",
				"show": "觀感",
				"keys": ["觀感"],
				"mode": "any"
			},
			{
				"points": 3,
				"stem": "不準確地呈現數據可能使讀者作出 ______ 決定。",
				"why": "錯誤",
				"kind": "text",
				"show": "錯誤",
				"keys": ["錯誤"],
				"mode": "any"
			},
			{
				"points": 8,
				"stem": "學校想比較五種午餐的選購人數。選用哪種統計圖較合適？寫出一個理由。",
				"why": "選用棒形圖。（選擇4分）棒形圖適合比較不同類別的數量。（理由4分）",
				"kind": "text",
				"show": "選用棒形圖",
				"keys": ["棒形圖"],
				"mode": "all"
			},
			{
				"points": 12,
				"stem": "一幅折線圖顯示同一數據由星期一的50人上升至星期五的54人，縱軸由49人開始。說明這種畫法可能造成的觀感，並提出一項改善方法。",
				"why": "縱軸由49人開始會令50至54人的小幅增加看起來特別大，可能誇大變化。（觀感說明6分）改善方法例如從0開始，或清楚標示縱軸起點及刻度，並確保刻度合適一致。（提出改善方法6分）",
				"figure": {
					"kind": "line",
					"xLabel": "日子",
					"yLabel": "人數",
					"cats": [
						"一",
						"二",
						"三",
						"四",
						"五"
					],
					"series": [{
						"name": "人數",
						"values": [
							50,
							51,
							52,
							53,
							54
						]
					}]
				},
				"kind": "text",
				"show": "縱軸由 49 開始會誇大變化，應由 0 開始",
				"keys": ["誇大"],
				"mode": "all"
			}
		]
	}
];
var EXAM_UNIT_IDS = [
	"6N1",
	"6N2",
	"6N3",
	"6N4",
	"6A1",
	"6M1",
	"6M2",
	"6M3",
	"6M4",
	"6M5",
	"6S1",
	"6D1",
	"6D2",
	"6D3",
	"6D4"
];
function findPaper(unitId, minutes) {
	if (unitId === MIXED_PAPER.unitId && minutes === MIXED_PAPER.minutes) return MIXED_PAPER;
	return EXAM_PAPERS.find((paper) => paper.unitId === unitId && paper.minutes === minutes);
}
function norm(value) {
	return value.trim().replace(/\s+/g, "").replace(/（/g, "(").replace(/）/g, ")").replace(/／/g, "/").replace(/度/g, "°").replace(/，/g, ",").replace(/。/g, "").toLowerCase();
}
function hasKey(answer, key) {
	const a = norm(answer);
	const k = norm(key);
	if (!k) return true;
	if (k.length === 1) return a === k || a.startsWith(k);
	if (a.includes(k)) return true;
	const kn = Number(k);
	if (!Number.isFinite(kn)) return false;
	return (answer.match(/-?\d+(?:\.\d+)?/g) ?? []).some((n) => Math.abs(Number(n) - kn) < .011);
}
function examRight(item, picked) {
	const raw = picked.trim();
	if (!raw) return false;
	if (item.kind === "choice") return Number(raw) === item.answer;
	if (item.kind === "number") {
		const n = Number(raw.replace(/,/g, ""));
		return Number.isFinite(n) && Math.abs(n - item.answer) < .011;
	}
	if (item.mode === "any") return item.keys.some((key) => hasKey(raw, key));
	return item.keys.every((key) => hasKey(raw, key));
}
function examShow(item) {
	if (item.kind === "choice") return item.choices[item.answer] ?? "";
	if (item.kind === "number") return String(item.answer);
	return item.show;
}
//#endregion
export { examShow as a, examRight as i, EXAM_UNIT_IDS as n, findPaper as o, MIXED_PAPER as r, EXAM_PAPERS as t };
