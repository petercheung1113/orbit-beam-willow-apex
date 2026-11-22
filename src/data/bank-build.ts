import type { Figure } from "@/data/figure";
import { volumeQuestions } from "@/data/volume-100";
import { equationQuestions } from "@/data/equation-100";
import { percentQuestions } from "@/data/percent-100";
import { percent2Questions } from "@/data/percent2-100";
import { perimeterQuestions } from "@/data/perimeter-100";
import { angleQuestions } from "@/data/angle-100";
import { speedQuestions } from "@/data/speed-100";
import { areaQuestions } from "@/data/area-100";
import { lineQuestions } from "@/data/line-100";
import { meanQuestions } from "@/data/mean-100";
import { misuseQuestions } from "@/data/misuse-100";
import { symmetryQuestions } from "@/data/symmetry-100";

export type Level = "basic" | "core" | "hard";

export type BankQuestion = {
  unitId: string;
  level: Level;
  stem: string;
  choices: string[];
  answer: string;
  why: string;
  figure?: Figure;
};

type Raw = { level: Level; stem: string; answer: string; wrong: string[]; why: string; figure?: Figure };

function fmt(n: number): string {
  const rounded = Math.round((n + Math.sign(n) * 1e-10) * 1_000_000) / 1_000_000;
  if (Object.is(rounded, -0)) return "0";
  return rounded.toString();
}

function money(n: number): number {
  return Math.round((n + Math.sign(n) * 1e-10) * 1000) / 1000;
}

function roundTo(n: number, places: number): number {
  const f = 10 ** places;
  return Math.round((n + Math.sign(n) * 1e-10) * f) / f;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
}

function frac(n: number, d: number): string {
  const g = gcd(n, d);
  const sign = n * d < 0 ? "-" : "";
  return `${sign}${Math.abs(Math.round(n)) / g}/${Math.abs(Math.round(d)) / g}`;
}

function decFrac(n: number): string {
  const text = fmt(Math.abs(n));
  const [head, tail = ""] = text.split(".");
  const den = 10 ** tail.length;
  const num = Number(head) * den + Number(tail || "0");
  return frac(n < 0 ? -num : num, den);
}

function uniqWrong(answer: string, seeds: string[]): string[] {
  const out: string[] = [];
  for (const seed of seeds) {
    if (!seed || seed === answer || out.includes(seed)) continue;
    out.push(seed);
    if (out.length === 3) return out;
  }
  return out;
}

function nq(level: Level, stem: string, answer: number, wrongs: number[], why: string): Raw {
  const text = fmt(answer);
  return { level, stem, answer: text, wrong: uniqWrong(text, wrongs.map(fmt)), why };
}

function tq(level: Level, stem: string, answer: string, wrongs: string[], why: string): Raw {
  return { level, stem, answer, wrong: uniqWrong(answer, wrongs), why };
}

function mix(groups: Raw[][]): Raw[] {
  const out: Raw[] = [];
  const max = Math.max(0, ...groups.map((group) => group.length));
  for (let i = 0; i < max; i += 1) for (const group of groups) if (group[i]) out.push(group[i]!);
  return out;
}

function take(unitId: string, basic: Raw[], core: Raw[], hard: Raw[]): BankQuestion[] {
  const parts: [Level, Raw[], number][] = [
    ["basic", basic, 34],
    ["core", core, 33],
    ["hard", hard, 33],
  ];
  const chosen: Raw[] = [];
  const missing: string[] = [];
  const stems = new Set<string>();
  for (const [level, list, count] of parts) {
    const picked: Raw[] = [];
    for (const item of list) {
      if (stems.has(item.stem)) continue;
      if (item.wrong.length < 3 || item.wrong.includes(item.answer)) continue;
      stems.add(item.stem);
      picked.push({ ...item, level });
      if (picked.length === count) break;
    }
    if (picked.length < count) missing.push(`${level} ${picked.length}/${count} of ${list.length}`);
    else chosen.push(...picked);
  }
  if (missing.length) throw new Error(`${unitId} ${missing.join(", ")}`);
  return chosen.map((item) => ({
    unitId,
    level: item.level,
    stem: item.stem,
    choices: [item.answer, ...item.wrong.slice(0, 3)],
    answer: item.answer,
    why: item.why,
    figure: item.figure,
  }));
}

function digitOk(a: number, b: number): boolean {
  if (b === 0) return false;
  const dec = (fmt(Math.abs(b)).split(".")[1] ?? "").length;
  const scale = 10 ** dec;
  const dividend = money(a * scale);
  const divisor = money(b * scale);
  if (!Number.isInteger(divisor) || divisor === 0) return false;
  const digits = (n: number) => (fmt(Math.abs(n)).replace(".", "").replace(/^0+/, "") || "0").length;
  return digits(dividend) <= 3 && digits(divisor) <= 2;
}

function exactQuot(a: number, b: number): number | null {
  if (!digitOk(a, b)) return null;
  const q = a / b;
  const rounded = Math.round(q * 1000) / 1000;
  if (Math.abs(q - rounded) > 1e-8) return null;
  return money(q);
}

function divBasic(): Raw[] {
  const shift: Raw[] = [];
  for (const n of [36, 7.5, 0.8, 56.2, 4.06, 230, 9.2, 0.15, 48, 1.28, 6.4, 70, 723, 2.48, 0.002, 98.4]) {
    for (const d of [10, 100, 1000, 0.1, 0.01, 0.001]) {
      const answer = n / d;
      const right = d < 1 ? "右" : "左";
      const places = d >= 1 ? Math.round(Math.log10(d)) : Math.round(Math.log10(1 / d));
      shift.push(nq("basic", `不用直式，只移動小數點：${fmt(n)} ÷ ${fmt(d)} = ？`, answer, [n * d, answer * 10, answer / 10, n], `除以 ${fmt(d)}，小數點向${right}移 ${places} 位，得 ${fmt(answer)}。`));
    }
  }
  const plain: Raw[] = [];
  const pairs: [number, number][] = [
    [9.6, 4], [8.4, 6], [7.5, 5], [14.4, 6], [25.5, 5], [36.9, 3], [12.8, 4], [18.9, 7], [4.8, 2], [15.6, 4],
    [21.6, 9], [32.4, 6], [7.2, 8], [9.2, 4], [6.4, 8], [18.6, 6], [7, 2], [9, 4], [13, 5], [11, 4], [19, 5],
    [17, 2], [21, 4], [15, 4], [3, 4], [7, 4], [18, 5], [22, 5], [8.4, 0.2], [9.6, 0.3], [7.2, 0.4], [6.3, 0.9],
    [4.8, 0.6], [3.6, 1.2], [4.5, 1.5], [2.4, 0.8], [6.4, 1.6], [7.5, 2.5], [8.4, 2.1], [9.6, 2.4], [0.75, 0.25],
    [1.25, 0.25], [3.6, 0.12], [2.4, 0.15], [8.8, 1.1], [9.9, 0.11], [4.8, 0.16], [6.4, 0.32], [1.44, 0.12],
  ];
  for (const [a, b] of pairs) {
    const answer = exactQuot(a, b);
    if (answer === null) continue;
    plain.push(nq("basic", `旋轉木馬票務：${fmt(a)} ÷ ${fmt(b)} = ？`, answer, [a * b, a - b, answer * 10, answer / 10], `先把除數化成整數。${fmt(a)} ÷ ${fmt(b)} = ${fmt(answer)}。化整後被除數不多於三位、除數不多於兩位。`));
  }
  const same: Raw[] = [];
  for (const [a, b] of [[0.36, 0.12], [0.48, 0.16], [2.4, 0.8], [0.84, 0.12], [1.5, 0.25], [4.5, 1.5], [0.63, 0.09], [7.2, 0.24], [3.6, 0.12], [8.4, 0.21]] as [number, number][]) {
    if (!digitOk(a, b)) continue;
    const right = `${fmt(a * 100)} ÷ ${fmt(b * 100)}`;
    same.push(tq("basic", `哪一式的結果與 ${fmt(a)} ÷ ${fmt(b)} 相同？`, right, [`${fmt(a * 10)} ÷ ${fmt(b)}`, `${fmt(a)} ÷ ${fmt(b * 10)}`, `${fmt(a * 100)} ÷ ${fmt(b)}`], `被除數和除數同時乘 100，商不變。`));
  }
  return mix([shift, plain, same]);
}

function divCore(): Raw[] {
  const approx: Raw[] = [];
  const rough: [number, number][] = [
    [4.6, 0.9], [8.12, 1.3], [5.38, 0.07], [9.99, 2.5], [7.4, 0.6], [3.14, 0.6], [11.5, 3], [8.7, 0.4],
    [6.25, 0.7], [13.4, 6], [2.47, 0.3], [9.5, 0.6], [4.83, 1.5], [7.77, 0.9], [15.2, 7], [8.06, 1.1],
    [3.55, 0.8], [12.7, 4], [6.18, 0.5], [9.43, 2], [7.15, 0.8], [10.4, 3], [5.67, 0.4], [2.89, 0.5],
  ];
  for (const [a, b] of rough) {
    if (!digitOk(a, b) || exactQuot(a, b) !== null) continue;
    const raw = a / b;
    for (const places of [1, 2]) {
      const answer = roundTo(raw, places);
      const cut = Math.trunc(raw * 10 ** places) / 10 ** places;
      const label = places === 1 ? "一位小數（十分位）" : "兩位小數（百分位）";
      approx.push(nq("core", `${fmt(a)} ÷ ${fmt(b)} 的商取至${label}，用 ≈ 應寫多少？`, answer, [cut, roundTo(raw, 0), answer + (places === 1 ? 0.1 : 0.01), answer - (places === 1 ? 0.1 : 0.01)], `${fmt(a)} ÷ ${fmt(b)} ≈ ${fmt(answer)}（${label}）。`));
    }
  }
  const words: Raw[] = [];
  for (const [a, b, thing] of [[92, 8, "份小禮物"], [7.5, 5, "杯果汁"], [14.4, 6, "張旋轉木馬票"], [36.9, 3, "盒爆谷"], [18.9, 7, "條彩旗"], [25.5, 5, "包棉花糖"], [12.8, 4, "個風車"], [48.6, 6, "張代幣卷"], [16.8, 4, "瓶汽水"], [27.5, 5, "個燈籠"]] as [number, number, string][]) {
    const answer = exactQuot(a, b);
    if (answer === null) continue;
    words.push(nq("core", `小賣部把 ${fmt(a)} 平均分成 ${fmt(b)} ${thing}。每份是多少？`, answer, [a * b, a - b, answer * 10], `${fmt(a)} ÷ ${fmt(b)} = ${fmt(answer)}。`));
  }
  const missing: Raw[] = [];
  for (const [a, q] of [[3.9, 1.5], [4.8, 1.2], [6.4, 0.8], [7.2, 1.8], [9.6, 1.6], [8.4, 2.1], [2.4, 0.6], [5.6, 0.7], [3.6, 0.9], [4.5, 1.5], [8.8, 1.1], [6.3, 0.9]] as [number, number][]) {
    const divisor = exactQuot(a, q);
    if (divisor === null) continue;
    missing.push(nq("core", `${fmt(a)} ÷ □ = ${fmt(q)}。□ 是多少？`, divisor, [a * q, q, a, divisor * 10], `□ = ${fmt(a)} ÷ ${fmt(q)} = ${fmt(divisor)}。`));
    const dividend = money(q * a);
    if (digitOk(dividend, a)) missing.push(nq("core", `□ ÷ ${fmt(a)} = ${fmt(q)}。□ 是多少？`, dividend, [q, a, dividend / 10, dividend * 10], `□ = ${fmt(a)} × ${fmt(q)} = ${fmt(dividend)}。`));
  }
  return mix([approx, words, missing]);
}

function divHard(): Raw[] {
  const mixed = [
    ["2.4 + 1.6 × 3", 7.2], ["(2.4 + 1.6) × 3", 12], ["8 − 1.5 × 4", 2], ["(8 − 1.5) × 4", 26], ["6.3 + 0.9 × 4", 9.9],
    ["10 − 2.5 × 2", 5], ["0.8 × 5 + 1.5", 5.5], ["9.6 − 1.2 × 3", 6], ["(12.6 − 2.6) ÷ 2", 5], ["3 × 1.5 + 2.5", 7],
    ["4.2 + 2.1 × 2", 8.4], ["(4.2 + 2.1) × 2", 12.6], ["36 ÷ (6.5 − 2.5)", 9], ["2.5 × (4.2 − 3.2)", 2.5], ["(3.6 + 2.4) ÷ 1.2", 5],
    ["8.4 ÷ 2 + 1.6", 5.8], ["15 − 2.4 × 5", 3], ["(9.6 + 2.4) ÷ 4", 3],
  ].map(([stem, answer]) => nq("hard", `${stem} = ？算式不多於四個數。`, answer as number, [(answer as number) + 1, (answer as number) * 2, (answer as number) / 2 || 1], `先括號，再乘除，後加減。答案是 ${fmt(answer as number)}。`));
  const bigger: Raw[] = [];
  const exprs: [string, number][] = [
    ["5.4 × 2 + 3.1", 13.9], ["5.4 + 2 × 3.1", 11.6], ["9.6 ÷ 3 + 1.2", 4.4], ["9.6 ÷ (3 + 1.2)", 9.6 / 4.2],
    ["1.5 × 4 − 2", 4], ["1.5 × (4 − 2)", 3], ["8 − 1.2 × 5", 2], ["(8 − 1.2) × 5", 34],
  ];
  for (let i = 0; i < exprs.length; i += 2) {
    const left = exprs[i]!;
    const right = exprs[i + 1]!;
    const answer = left[1] > right[1] ? left[0] : right[0];
    const other = answer === left[0] ? right[0] : left[0];
    bigger.push(tq("hard", `「${left[0]}」和「${right[0]}」，哪一道的結果較大？`, answer, [other, "兩式一樣大", "不能比較"], `${left[0]} = ${fmt(money(left[1]))}，${right[0]} = ${fmt(money(right[1]))}。`));
  }
  const lefts: Raw[] = [];
  for (const price of [1.5, 2.4, 2.5, 3.2, 3.6, 4.5, 4.8, 6.4, 7.5]) {
    for (const cash of [10, 12, 15, 20, 24, 30, 36, 40]) {
      const count = Math.floor((cash + 1e-9) / price);
      const spent = money(count * price);
      const left = money(cash - spent);
      if (count < 2 || left <= 0) continue;
      lefts.push(tq("hard", `旋轉木馬每張 ${fmt(price)} 元，口袋有 ${cash} 元。最多可買幾張？餘下多少元？`, `${count} 張，餘 ${fmt(left)} 元`, [`${count + 1} 張，剛剛好`, `${count} 張，餘 ${fmt(price)} 元`, `${count - 1} 張，餘 ${fmt(left)} 元`], `${fmt(price)} × ${count} = ${fmt(spent)}，${cash} − ${fmt(spent)} = ${fmt(left)}。`));
    }
  }
  const gifts: Raw[] = [];
  for (const price of [4, 5, 6, 8]) {
    for (const cash of [20, 26, 30, 36, 40, 50]) {
      const paid = Math.floor(cash / price);
      const free = Math.floor(paid / 3);
      if (paid < 3 || free < 1) continue;
      gifts.push(nq("hard", `糖畫每件 ${price} 元，「買三送一」。有 ${cash} 元，最多可得到多少件？`, paid + free, [paid, free, paid * 2], `付得起 ${paid} 件，每付 3 件送 1 件，送 ${free} 件，共 ${paid + free} 件。`));
    }
  }
  const halls: Raw[] = [];
  for (const [area, cm] of [[4.5, 50], [8.4, 70], [3.6, 80], [9.6, 60], [2.4, 40], [7.2, 90], [5.6, 80], [4.8, 60], [6.3, 70], [3.2, 40]] as [number, number][]) {
    const width = cm / 100;
    halls.push(nq("hard", `走廊面積 ${fmt(area)} 平方米，闊 ${cm} 厘米。長是多少米？注意單位。`, area / width, [area / cm, (area / width) * 100, width], `${cm} 厘米 = ${fmt(width)} 米。長 = ${fmt(area)} ÷ ${fmt(width)} = ${fmt(area / width)} 米。`));
  }
  const rice: Raw[] = [];
  for (const [stock, each, people] of [[6.8, 0.125, 4], [5.4, 0.2, 3], [4.8, 0.15, 4], [7.2, 0.25, 3], [3.6, 0.12, 5], [9, 0.25, 4]] as [number, number, number][]) {
    const meal = money(each * people);
    const times = Math.floor((stock + 1e-9) / meal);
    const left = money(stock - times * meal);
    if (times < 2) continue;
    rice.push(tq("hard", `米缸有 ${fmt(stock)} 公斤。每人每餐吃 ${fmt(each)} 公斤，全家 ${people} 人。最多夠吃多少餐？餘下多少公斤？`, `${times} 餐，餘 ${fmt(left)} 公斤`, [`${times + 1} 餐，剛剛好`, `${times} 餐，餘 ${fmt(meal)} 公斤`, `${people} 餐，餘 ${fmt(left)} 公斤`], `每餐 ${fmt(meal)} 公斤。${fmt(stock)} 最多夠 ${times} 餐，餘 ${fmt(left)} 公斤。`));
  }
  return mix([mixed, bigger, lefts, gifts, halls, rice]);
}

function fracBasic(): Raw[] {
  return [0.5, 0.2, 0.25, 0.4, 0.75, 0.8, 0.04, 0.08, 0.125, 0.375, 0.625, 0.005, 0.025, 0.16, 0.36, 1.5, 2.25, 10.5, 3.08, 0.004, 4.5, 0.06, 0.12, 1.25, 2.4, 6.5, 3.025, 0.008, 14.08, 1.75, 0.35, 0.45, 0.55, 0.65, 0.85, 2.5, 3.2, 0.128, 0.0008, 5.5].map((n) => {
    const answer = decFrac(n);
    const raw = `${fmt(n).split(".")[1] ?? fmt(n)}/${10 ** (fmt(n).split(".")[1]?.length ?? 1)}`;
    return tq("basic", `糖畫檔寫 ${fmt(n)}。化成最簡分數是？`, answer, [raw, `${fmt(n)}/1`, decFrac(n / 10) === answer ? `${fmt(n)}/100` : decFrac(n / 10)], `${fmt(n)} 先寫成分母是 10、100 或 1000 的分數，再約至最簡，得 ${answer}。`);
  });
}

function fracCore(): Raw[] {
  const exact: [number, number, number][] = [
    [1, 2, 0.5], [1, 4, 0.25], [3, 4, 0.75], [1, 5, 0.2], [2, 5, 0.4], [3, 5, 0.6], [4, 5, 0.8], [1, 8, 0.125],
    [3, 8, 0.375], [5, 8, 0.625], [7, 8, 0.875], [3, 25, 0.12], [7, 20, 0.35], [9, 20, 0.45], [11, 25, 0.44],
    [1, 25, 0.04], [7, 25, 0.28], [13, 20, 0.65], [17, 20, 0.85], [9, 50, 0.18], [7, 50, 0.14], [3, 40, 0.075],
    [1, 40, 0.025], [11, 8, 1.375], [9, 4, 2.25], [21, 2, 10.5], [7, 16, 0.4375], [5, 4, 1.25],
  ];
  const out: Raw[] = exact.map(([n, d, value]) => nq("core", `${frac(n, d)} 化成小數是多少？`, value, [n / 10, value * 10, value / 10, d / 100], `${n} ÷ ${d} = ${fmt(value)}。`));
  for (const [n, d] of [[1, 3], [2, 3], [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [1, 9], [2, 9], [5, 9], [4, 7], [5, 7], [1, 11], [2, 11]] as [number, number][]) {
    const answer = roundTo(n / d, 2);
    out.push(nq("core", `${frac(n, d)} 化成小數，取至兩位小數，應寫多少？`, answer, [roundTo(n / d, 1), Math.trunc((n / d) * 100) / 100, answer + 0.1], `${n} ÷ ${d} ≈ ${fmt(answer)}（百分位）。不用「循環小數」這個名稱。`));
  }
  return out;
}

function fracHard(): Raw[] {
  const out: Raw[] = [];
  const bank: [string, number][] = [
    ["0.7", 0.7], ["3/4", 0.75], ["0.8", 0.8], ["2/5", 0.4], ["0.66", 0.66], ["2/3", 2 / 3], ["0.666", 0.666],
    ["1/2", 0.5], ["0.45", 0.45], ["3.8", 3.8], ["3.11", 3.11], ["1.65", 1.65], ["1.7", 1.7], ["8/5", 1.6], ["7/4", 1.75],
  ];
  let made = 0;
  for (let i = 0; i < bank.length && made < 24; i += 1) {
    for (let j = i + 1; j < bank.length && made < 24; j += 1) {
      for (let k = j + 1; k < bank.length && made < 24; k += 1) {
        const rows = [bank[i]!, bank[j]!, bank[k]!];
        if (new Set(rows.map((row) => money(row[1] * 1000))).size < 3) continue;
        const ordered = [...rows].sort((a, b) => a[1] - b[1]);
        const answer = ordered.map((row) => row[0]).join(" < ");
        const reversed = [...ordered].reverse().map((row) => row[0]).join(" < ");
        const swapped = [ordered[0]![0], ordered[2]![0], ordered[1]![0]].join(" < ");
        const original = rows.map((row) => row[0]).join(" < ");
        if ([reversed, swapped, original].filter((item) => item !== answer).length < 3 && new Set([reversed, swapped, original, "不能排"]).size < 4) continue;
        out.push(tq("hard", `把 ${rows.map((row) => row[0]).join("、")} 由小至大排列。`, answer, [reversed, swapped, original === answer ? "三數一樣大" : original], `化成小數：${ordered.map((row) => `${row[0]}≈${fmt(money(row[1]))}`).join("，")}。`));
        made += 1;
      }
    }
  }
  const days: [string, number][] = [["卓文", 2.7], ["美欣", 1.3], ["子博", 1.95], ["阿凱", 2.25], ["小榆", 1.6]];
  for (let i = 0; i < days.length; i += 1) {
    for (let j = i + 1; j < days.length; j += 1) {
      const fast = days[i]![1] < days[j]![1] ? days[i]! : days[j]!;
      const slow = fast[0] === days[i]![0] ? days[j]! : days[i]!;
      const diff = money(Math.abs(days[i]![1] - days[j]![1]));
      const hours = Math.floor(diff + 1e-9);
      const mins = Math.round((diff - hours) * 60);
      out.push(tq("hard", `${days[i]![0]}今天用了 ${fmt(days[i]![1])} 小時，${days[j]![0]}今天用了 ${fmt(days[j]![1])} 小時。誰較快？相差多少？`, `${fast[0]}較快，相差 ${hours} 小時 ${mins} 分鐘`, [`${slow[0]}較快，相差 ${hours} 小時 ${mins} 分鐘`, "兩人一樣快", `${fast[0]}較快，相差 ${fmt(diff)} 分鐘`], `${fmt(slow[1])} − ${fmt(fast[1])} = ${fmt(diff)} 小時 = ${hours} 小時 ${mins} 分鐘。`));
    }
  }
  return out;
}

function meanBasic(): Raw[] {
  const sets = [[4, 8, 6, 10], [2, 4, 6, 8, 10], [1.5, 2.5, 4], [5, 7, 9, 3], [10, 20, 30], [1.2, 1.8, 2.4, 3], [6, 8, 7, 9, 5], [0, 4, 8, 12], [3.5, 4.5, 5.5, 6.5], [11, 13, 15], [2.2, 3.4, 4.6], [8, 8, 8, 8], [1, 2, 3, 4, 5, 6], [9.5, 10.5], [4.2, 5.8, 5], [7, 14, 21, 28], [0.5, 1.5, 2.5, 3.5], [12, 18, 24], [3, 6, 9, 12, 15], [2.5, 7.5], [16, 18, 20, 22], [1.1, 2.2, 3.3], [30, 40, 50, 60], [6.4, 7.6, 10], [9, 9, 9], [2, 2, 5], [14, 16, 18, 12], [0, 0, 6, 10], [1.5, 2.5, 3.5, 4.5], [20, 30], [7.2, 8.8], [4, 5, 6, 7, 8]];
  const out: Raw[] = sets.map((nums) => {
    const sum = money(nums.reduce((total, n) => total + n, 0));
    const answer = money(sum / nums.length);
    return nq("basic", `記分牌上的分數是 ${nums.join("、")}。平均數是多少？`, answer, [sum, nums[0]!, answer + 1, sum / (nums.length + 1)], `平均數 = ${fmt(sum)} ÷ ${nums.length} = ${fmt(answer)}。平均數也叫平均值。`);
  });
  out.push(tq("basic", "「平均數」還可以叫什麼？", "平均值", ["中位數", "眾數", "百分數"], "這個課題的平均數也可稱為平均值。"));
  out.push(tq("basic", "求平均數的方法是？", "總數 ÷ 項數", ["項數 ÷ 總數", "最大數 − 最小數", "把所有數相乘"], "先加起來，再除以有多少個數據。"));
  return out;
}

function meanCore(): Raw[] {
  const out: Raw[] = [];
  for (const [known, mean, count] of [[[6, 9, 7, 10], 8, 5], [[4, 8, 6], 7, 4], [[12, 15, 9, 18, 11], 14, 6], [[3, 5, 8, 4], 6, 5], [[20, 24, 16], 22, 4], [[7, 9, 11, 13], 10, 5], [[2, 6, 4, 8, 5], 6, 6], [[15, 18, 12, 21], 18, 5], [[8, 10, 12], 11, 4], [[1, 3, 5, 7], 5, 5]] as [number[], number, number][]) {
    const total = mean * count;
    const have = known.reduce((sum, n) => sum + n, 0);
    out.push(nq("core", `${count} 天售票，已知 ${known.join("、")} 張，平均是 ${mean} 張。未知那天售出多少張？`, total - have, [mean, have, total], `合計 ${total}。未知是 ${total} − ${have} = ${total - have}。`));
  }
  for (const week of [[12, 0, 18, 6, 24, 8, 16], [2, 4, 0, 6, 8, 10, 12], [4, 11, 9, 6, 18, 8, 14], [8, 8, 8, 8, 8, 8, 8], [1, 3, 5, 7, 9, 11, 13], [6, 9, 3, 12, 0, 15, 18], [4, 4, 4, 10, 10, 10, 7]]) {
    const sum = week.reduce((total, n) => total + n, 0);
    out.push(nq("core", `一星期雨量（毫米）是 ${week.join("、")}。平均每日雨量是多少毫米？`, sum / 7, [sum, week[0]!, sum / 5], `${sum} ÷ 7 = ${fmt(sum / 7)}。`));
  }
  for (let count = 3; count <= 8; count += 1) {
    for (const mean of [6, 8, 9, 10, 12, 15]) {
      const known = Array.from({ length: count - 1 }, (_, index) => mean - 1 + (index % 3));
      const have = known.reduce((sum, n) => sum + n, 0);
      const missing = mean * count - have;
      if (missing <= 0) continue;
      out.push(nq("core", `${count} 次遊戲得分，已知 ${known.join("、")}，平均是 ${mean} 分。餘下一次是多少分？`, missing, [mean, have, mean * count], `合計 ${mean * count}，減去 ${have}，餘下 ${missing}。`));
    }
  }
  return out;
}

function meanHard(): Raw[] {
  const out: Raw[] = [];
  for (const [count, mean, one] of [[4, 12, 18], [5, 80, 90], [4, 10, 16], [6, 70, 80], [3, 9, 12], [5, 14, 18], [4, 8, 11], [6, 20, 32], [4, 15, 21], [5, 10, 14], [3, 6, 9], [4, 11, 17], [5, 16, 20], [4, 9, 15], [6, 12, 18], [3, 8, 11], [5, 24, 30], [4, 13, 19]] as [number, number, number][]) {
    const rest = money((mean * count - one) / (count - 1));
    out.push(nq("hard", `${count} 人的平均集訓時間是 ${fmt(mean)} 小時，其中一人是 ${fmt(one)} 小時。其餘 ${count - 1} 人的平均是多少小時？`, rest, [mean, one, mean * count - one], `合計 ${fmt(mean * count)}。其餘 ${fmt(mean * count - one)} ÷ ${count - 1} = ${fmt(rest)}。`));
  }
  for (const [people, eachPay, extra, addPeople] of [[4, 12, 8, 1], [3, 10, 6, 1], [5, 8, 10, 1], [4, 9, 6, 1], [2, 15, 9, 1], [6, 5, 8, 2], [3, 18, 12, 1], [4, 6, 4, 1], [5, 12, 8, 1], [4, 20, 10, 1]] as [number, number, number, number][]) {
    const before = people * eachPay;
    const after = money((before + extra) / (people + addPeople));
    out.push(nq("hard", `${people} 人合資，平均每人付 ${fmt(eachPay)} 元。再有 ${addPeople} 人加入，並多買 ${fmt(extra)} 元小食。新的平均每人付多少元？`, after, [eachPay, extra, before], `原本合計 ${before} 元，之後 ${before + extra} 元 ÷ ${people + addPeople} = ${fmt(after)} 元。`));
  }
  return out;
}

function percentBasic(): Raw[] {
  const out: Raw[] = [
    tq("basic", "百分數用來表示什麼？", "部分佔全部的多少個百分之一", ["兩個數相差多少", "平均數", "一個角有幾度"], "百分數表示兩個同類量的關係，分母是 100。"),
    tq("basic", "100% 等於多少？", "1，也就是全部", ["10", "0.01", "1000"], "100% = 1，表示全部。"),
    tq("basic", "250% 讀作？", "百分之二百五十", ["百分之二十五", "百分之二點五", "二成五十"], "250% 比全部多。課程不把「成」當作必學。"),
  ];
  for (const n of [1, 5, 8, 12, 18, 20, 24, 25, 32, 35, 40, 48, 50, 57, 60, 75, 80, 99, 100, 4, 15, 36, 64, 7, 13, 45, 90, 3, 28, 66]) {
    out.push(tq("basic", `${n}/100 = ？`, `${n}%`, [`${fmt(n / 100)}%`, `${n * 10}%`, `${n}/10`], `${n} 個百分之一就是 ${n}%。`));
    out.push(tq("basic", `100 份彩旗裏塗了 ${n} 份。塗色的佔多少？`, `${n}%`, [`${fmt(n / 10)}%`, `${100 - n}%`, `${n * 2}%`], `${n}/100 = ${n}%。`));
  }
  return out;
}

function percentCore(): Raw[] {
  const rows: [number, number][] = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 8], [3, 8], [5, 8], [7, 8], [1, 20], [3, 20], [7, 20], [1, 25], [3, 25], [1, 40], [3, 40], [7, 40], [9, 40], [1, 50], [3, 50], [9, 10], [7, 10], [3, 10], [11, 20], [13, 20], [17, 20]];
  const out: Raw[] = [];
  for (const [n, d] of rows) {
    const pct = (n / d) * 100;
    out.push(tq("core", `${frac(n, d)} 化成百分數是？`, `${fmt(pct)}%`, [`${fmt(n / d)}%`, `${fmt(pct / 10)}%`, `${fmt(pct * 10)}%`], `${frac(n, d)} = ${fmt(pct)}%。`));
    out.push(tq("core", `${fmt(pct)}% 化成最簡分數是？`, frac(n, d), [`${fmt(pct)}/100`, `${n}/${d * 10}`, `${fmt(pct)}/10`], `${fmt(pct)}% = ${fmt(pct)}/100，約至最簡是 ${frac(n, d)}。`));
  }
  return out;
}

function percentHard(): Raw[] {
  const out: Raw[] = [];
  for (const n of [0.07, 0.5, 0.99, 1, 1.02, 1.22, 2.5, 0.075, 0.125, 3, 0.4, 0.08, 1.5, 0.01, 9.99, 0.6, 2, 0.25, 0.2, 4]) {
    out.push(nq("hard", `${fmt(n)} 化成百分數後，百分號前面是多少？`, n * 100, [n, n * 10, n * 1000], `小數點向右移兩位：${fmt(n)} = ${fmt(n * 100)}%。`));
    out.push(nq("hard", `${fmt(n * 100)}% 化成小數是？`, n, [n * 100, n / 10, n * 10], `${fmt(n * 100)}% = ${fmt(n)}。`));
  }
  for (const [a, b, nameA, nameB] of [[18, 25, "滿意", "無意見"], [32, 48, "牛油味", "綠茶味"], [24, 30, "橙", "蘋果"], [35, 40, "風景照", "人物照"], [15, 45, "紅旗", "藍旗"]] as [number, number, string, string][]) {
    out.push(nq("hard", `調查裏${nameA}佔 ${a}%，${nameB}佔 ${b}%。兩項合共佔百分之幾？`, a + b, [Math.abs(a - b), a * b, 100], `${a}% + ${b}% = ${a + b}%。`));
    out.push(nq("hard", `100 件禮品中，${nameA}佔 ${a}%，${nameB}佔 ${b}%，其餘是另一款。另一款有多少件？`, 100 - a - b, [a + b, a, b], `其餘 ${100 - a - b}%。100 件裏就是 ${100 - a - b} 件。`));
  }
  out.push(
    tq("hard", "蛋糕平均切成 8 份，妹妹吃了其中一份的一半。她吃了整個蛋糕的百分之幾？", "6.25%", ["50%", "12.5%", "8%"], "半份是 1/16。1/16 = 6.25%。"),
    tq("hard", "哥哥比妹妹多吃一份（妹妹吃了半份，蛋糕共 8 份）。哥哥吃了整個蛋糕的百分之幾？", "18.75%", ["25%", "12.5%", "50%"], "哥哥吃 1.5 份，1.5/8 = 18.75%。"),
    tq("hard", "全程 2 公里，已跑 0.2 公里。已跑的佔全程的百分之幾？", "10%", ["20%", "2%", "0.2%"], "0.2 ÷ 2 = 0.1 = 10%。"),
    tq("hard", "全程 2 公里，已跑 1.6 公里。未跑的佔全程的百分之幾？", "20%", ["80%", "1.6%", "40%"], "未跑 0.4 公里。0.4 ÷ 2 = 20%。"),
  );
  return out;
}

function percentUseBasic(): Raw[] {
  const out: Raw[] = [];
  for (const [part, whole] of [[30, 50], [15, 60], [18, 24], [12, 40], [9, 36], [21, 28], [16, 80], [45, 90], [8, 32], [25, 100], [7, 28], [24, 32], [35, 50], [18, 45], [40, 80], [6, 24], [27, 36], [14, 70], [22, 40], [48, 60], [10, 40], [36, 48]] as [number, number][]) {
    const pct = (part / whole) * 100;
    if (!Number.isInteger(pct)) continue;
    out.push(nq("basic", `${part} 枝是 ${whole} 枝的百分之幾？`, pct, [part, whole - part, pct / 10], `${part} ÷ ${whole} = ${pct}%。`));
    out.push(nq("basic", `${whole} 的 ${pct}% 是多少？`, part, [whole, pct, part + whole], `${whole} × ${pct}% = ${part}。`));
  }
  return out;
}

function percentUseCore(): Raw[] {
  const out: Raw[] = [];
  for (const base of [20, 40, 50, 60, 80, 100, 120, 200, 25, 75, 16, 32]) {
    for (const pct of [10, 20, 25, 50, 5]) {
      out.push(nq("core", `${base} 元加價 ${pct}% 後是多少元？`, money(base * (1 + pct / 100)), [base + pct, base, money(base * pct / 100)], `加價後是原來的 ${100 + pct}%。${base} × ${fmt((100 + pct) / 100)} = ${fmt(base * (1 + pct / 100))}。`));
      out.push(nq("core", `${base} 元減價 ${pct}% 後是多少元？`, money(base * (1 - pct / 100)), [base - pct, money(base * (1 + pct / 100)), base], `減價後是原來的 ${100 - pct}%。${base} × ${fmt((100 - pct) / 100)} = ${fmt(base * (1 - pct / 100))}。`));
    }
  }
  return out;
}

function percentUseHard(): Raw[] {
  const out: Raw[] = [];
  for (const [away, local, leave] of [[24, 20, 4], [18, 15, 3], [30, 25, 5], [36, 24, 6], [16, 12, 4], [48, 40, 8], [20, 16, 4], [42, 30, 6], [32, 24, 8], [60, 50, 10], [28, 16, 2], [40, 30, 10]] as [number, number, number][]) {
    const left = local - leave;
    if (left <= 0) continue;
    const pct = (away / left) * 100;
    if (!Number.isInteger(pct)) continue;
    out.push(nq("hard", `外地小童 ${away} 人，本地小童 ${local} 人。${leave} 名本地小童離場後，外地小童是餘下本地小童的百分之幾？`, pct, [Math.round((away / local) * 100), left, away], `餘下本地 ${left} 人。${away} ÷ ${left} = ${pct}%。這是「A 是 B 的百分之幾」，不是百分變化。`));
  }
  for (const [jars, litres, used] of [[8, 2, 75], [6, 2, 50], [4, 3, 25], [5, 2, 40], [10, 1, 30], [8, 2, 25], [4, 5, 20], [6, 3, 50], [9, 2, 25], [5, 4, 10]] as [number, number, number][]) {
    const total = jars * litres;
    const left = money(total * (1 - used / 100));
    out.push(nq("hard", `${jars} 個容器各盛 ${litres} 升茶。用去全部的 ${used}% 後，餘下多少升？`, left, [total, money(total * used / 100), used], `共 ${total} 升，餘下 ${100 - used}% ，即 ${fmt(left)} 升。`));
  }
  out.push(
    tq("hard", "下面哪一類不是這個課題要考的？", "折扣和利息", ["求一個數的 60% 是多少", "一個數增加 10% 後是多少", "求 A 是 B 的百分之幾"], "折扣、利息，以及「增加了百分之幾」，不在這個練習。"),
    tq("hard", "「某數的 75% 是 30，求該數」應該用哪個課題？", "簡易方程", ["百分數的應用", "平均數", "小數除法"], "倒過來求原數，留到方程。"),
    tq("hard", "加價 10% 之後再減價 10%，會回到原價嗎？", "不會", ["會，因為都是 10%", "會，因為 10% − 10% = 0", "只在原價是 100 時會"], "先乘 110%，再乘 90%，是原價的 99%。"),
  );
  return out;
}

function volumeBasic(): Raw[] {
  const out: Raw[] = [
    tq("basic", "1 立方厘米等於多少？", "1 毫升", ["1 升", "1000 毫升", "1 立方米"], "1 cm³ = 1 mL。"),
    tq("basic", "1 mL 等於多少？", "1 cm³", ["1 m³", "1 L", "1000 cm³"], "容量和體積在這裏對上：1 mL = 1 cm³。"),
    tq("basic", "1 立方米等於多少升？", "1000 升", ["100 升", "10 升", "1 升"], "1 m³ = 1000 L。"),
    tq("basic", "1 m³ 等於多少毫升？", "1000000 mL", ["1000 mL", "100000 mL", "10000 mL"], "1 m³ = 1000 L = 1 000 000 mL。"),
    tq("basic", "1 升等於多少立方厘米？", "1000 cm³", ["100 cm³", "10 cm³", "1 cm³"], "1 L = 1000 mL = 1000 cm³。"),
  ];
  for (const ml of [15, 80, 120, 250, 360, 500, 750, 900, 1250, 1500, 1800, 2000, 2400, 3000, 4200, 640]) {
    out.push(tq("basic", `${ml} 毫升等於多少立方厘米？`, `${ml} cm³`, [`${ml / 10} cm³`, `${ml} mL 不能換成 cm³`, `${ml} m³`], `1 mL = 1 cm³，所以是 ${ml} cm³。`));
    out.push(nq("basic", `${ml} 立方厘米等於多少毫升？`, ml, [ml / 10, ml * 10, ml / 1000], `1 cm³ = 1 mL。`));
  }
  for (const side of [2, 3, 4, 5, 6, 8, 10]) {
    const vol = side ** 3;
    out.push(nq("basic", `正方體容器邊長 ${side} cm，容量是多少立方厘米？`, vol, [side * 6, side * side, vol * 10], `容量 = ${side} × ${side} × ${side} = ${vol} cm³。`));
    out.push(nq("basic", `正方體容器邊長 ${side} cm，容量是多少毫升？`, vol, [side * side, vol / 10, vol * 1000], `${vol} cm³ = ${vol} mL。`));
  }
  for (const times of [2, 3, 4, 5]) {
    out.push(nq("basic", `容器 B 的邊長是容器 A 的 ${times} 倍。B 的容量是 A 的多少倍？`, times ** 3, [times, times * 2, times * times], `邊長變 ${times} 倍，體積變 ${times}³ = ${times ** 3} 倍。`));
  }
  return out;
}

function volumeCore(): Raw[] {
  const out: Raw[] = [];
  for (const before of [100, 150, 200, 250, 300, 400, 500, 600]) {
    for (const rise of [30, 45, 60, 80, 120, 150]) {
      if (before + rise > 1000) continue;
      out.push(
        nq(
          "core",
          `量杯原有水 ${before} 毫升。鐵鑄玩具完全沉入後，水面到 ${before + rise} 毫升。玩具體積是多少立方厘米？`,
          rise,
          [before + rise, before, rise * 10],
          `${before + rise} − ${before} = ${rise} mL = ${rise} cm³。物件要完全被水蓋過。`,
        ),
      );
    }
  }
  const boxes: [number, number, number][] = [
    [10, 8, 12], [20, 10, 15], [5, 4, 10], [12, 5, 8], [15, 10, 6], [8, 8, 10], [25, 4, 8], [6, 5, 10],
  ];
  for (const [l, w, h] of boxes) {
    const cm3 = l * w * h;
    out.push(nq("core", `長方體容器長 ${l} cm、闊 ${w} cm、高 ${h} cm。容量是多少升？`, cm3 / 1000, [cm3, cm3 / 100, cm3 / 10], `${l} × ${w} × ${h} = ${cm3} cm³ = ${fmt(cm3 / 1000)} L。`));
    const waterH = h / 2;
    if (Number.isInteger(waterH)) {
      out.push(nq("core", `這個容器的水位是 ${waterH} cm。水的體積是多少立方厘米？`, l * w * waterH, [cm3, l * waterH, w * waterH], `底面積 ${l * w} × 水深 ${waterH} = ${l * w * waterH} cm³。`));
    }
  }
  return out;
}

function volumeHard(): Raw[] {
  const out: Raw[] = [];
  const bad = [
    ["浮在水面的皮球", "它沒有完全沉沒，排開的水少於真實體積"],
    ["會溶化的糖", "溶掉之後不能代表原本的體積"],
    ["半浮的木船", "沒有完全被水蓋過"],
    ["露在水面外的盒子", "露出的部分沒有把水排開"],
  ];
  for (const [item, reason] of bad) {
    out.push(tq("hard", `量度「${item}」的體積，可不可以用排水法？`, "不適合", ["適合，因為水面一定上升", "適合，讀數就是真體積", "只看容器形狀就行"], `${reason}。排水法要求物件完全沉沒，而且不溶於水。`));
  }
  for (const [l, w, h, water, bead] of [
    [10, 8, 12, 640, 40], [10, 7, 11, 420, 35], [8, 5, 10, 200, 25], [12, 5, 8, 240, 30], [6, 5, 10, 150, 20], [20, 4, 8, 320, 40],
  ] as [number, number, number, number, number][]) {
    const space = l * w * h - water;
    const count = Math.floor(space / bead);
    if (count < 1) continue;
    out.push(
      nq(
        "hard",
        `容器 ${l}×${w}×${h} cm，已有水 ${water} cm³。每粒鐵珠 ${bead} cm³。最多可放入多少粒而不溢出？`,
        count,
        [count + 1, space, Math.ceil(water / bead)],
        `餘下空間 ${l * w * h} − ${water} = ${space} cm³。${space} ÷ ${bead} = ${fmt(space / bead)}，最多 ${count} 粒。`,
      ),
    );
  }
  for (const [baseL, baseW, removed] of [
    [25, 10, 750], [20, 10, 400], [15, 8, 360], [10, 10, 250], [30, 10, 900], [12, 10, 480],
  ] as [number, number, number][]) {
    const drop = removed / (baseL * baseW);
    if (!Number.isInteger(drop * 10)) continue;
    out.push(
      nq(
        "hard",
        `魚缸底是 ${baseL} cm × ${baseW} cm。取出體積共 ${removed} cm³ 的貝殼後，水位下降多少厘米？`,
        drop,
        [removed, baseL, drop * 10],
        `下降高度 = ${removed} ÷ (${baseL} × ${baseW}) = ${fmt(drop)} cm。`,
      ),
    );
  }
  for (const [side, litres] of [
    [4, 0.8], [5, 1], [2, 0.2], [4, 0.5], [10, 4],
  ] as [number, number][]) {
    const cube = side ** 3;
    const ml = litres * 1000;
    const count = Math.floor(ml / cube);
    out.push(nq("hard", `正方體容器邊長 ${side} cm。有 ${fmt(litres)} L 水，最多可注滿多少個這種容器？`, count, [Math.ceil(ml / cube), cube, count + 1], `每個 ${cube} cm³。${ml} ÷ ${cube} = ${fmt(ml / cube)}，最多注滿 ${count} 個。`));
  }
  return out;
}

function circleBasic(): Raw[] {
  const out: Raw[] = [
    tq("basic", "圓周率 π 在這級可以用哪個近似值？", "3.14 或 22/7", ["3", "22", "3.1416 必須用足"], "小學只用 3.14 或 22/7。"),
    tq("basic", "圓周公式是？", "π × 直徑", ["π × 半徑 × 半徑", "直徑 ÷ π", "半徑 × 半徑"], "圓周 = πd = 2πr。圓面積才是 πr²。"),
  ];
  for (const d of [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 20, 25]) {
    const answer = money(d * 3.14);
    out.push(nq("basic", `摩天輪直徑 ${d} 米，π 取 3.14。圓周約多少米？`, answer, [money(d * 3.14 * 2), money(answer / 2), money(d + 3.14)], `圓周 = 3.14 × ${d} = ${fmt(answer)}。`));
  }
  for (const d of [7, 14, 21, 28, 35, 42, 49, 56, 63]) {
    const answer = (22 / 7) * d;
    out.push(nq("basic", `圓池直徑 ${d} 米，π 取 22/7。圓周是多少米？`, answer, [d * 22, answer / 2, (22 / 7) * (d / 2)], `圓周 = 22/7 × ${d} = ${fmt(answer)}。`));
  }
  for (const r of [1, 2, 3, 4, 5, 6, 7, 8, 10, 14]) {
    const d = r * 2;
    const pi = r % 7 === 0 ? 22 / 7 : 3.14;
    const label = r % 7 === 0 ? "22/7" : "3.14";
    out.push(nq("basic", `半徑 ${r} 米，π 取 ${label}。圓周是多少米？`, pi * d, [pi * r, pi * r * r, d], `直徑 = ${d}。圓周 = ${label} × ${d} = ${fmt(pi * d)}。`));
  }
  return out;
}

function circleCore(): Raw[] {
  const out: Raw[] = [];
  for (const d of [7, 14, 21, 28, 35, 42]) {
    const full = (22 / 7) * d;
    out.push(nq("core", `半圓拱門直徑 ${d} 米，π 取 22/7。半個圓周加地面直徑，周界是多少米？`, full / 2 + d, [full, full / 2, full + d], `半圓周 ${fmt(full / 2)} + 直徑 ${d} = ${fmt(full / 2 + d)}。`));
    out.push(nq("core", `四分一圓直徑 ${d} 米，π 取 22/7。弧加兩條半徑，周界是多少米？`, full / 4 + d, [full / 4, full / 2, d / 2], `四分一圓周 ${fmt(full / 4)} + 兩條半徑（即一條直徑）${d} = ${fmt(full / 4 + d)}。`));
  }
  for (const d of [2, 4, 5, 6, 8, 10, 12, 16, 20]) {
    const full = money(3.14 * d);
    out.push(nq("core", `半圓直徑 ${d} 米，π 取 3.14。半圓周加直徑是多少米？`, full / 2 + d, [full, full / 2, d * 3.14], `半圓周 ${fmt(full / 2)} + 直徑 ${d} = ${fmt(full / 2 + d)}。`));
    out.push(nq("core", `四分一圓直徑 ${d} 米，π 取 3.14。弧加兩條半徑是多少米？`, full / 4 + d, [full / 4 + d / 2, full / 2, full], `四分一圓周 ${fmt(full / 4)} + 直徑 ${d} = ${fmt(full / 4 + d)}。`));
  }
  for (const [d, laps] of [[7, 3], [14, 2], [10, 4], [5, 3], [20, 2]] as [number, number][]) {
    const one = d % 7 === 0 ? (22 / 7) * d : money(3.14 * d);
    const label = d % 7 === 0 ? "22/7" : "3.14";
    out.push(nq("core", `圓形緩跑徑直徑 ${d} 米，沿邊走 ${laps} 圈。共走多少米？π 取 ${label}。`, one * laps, [one, one * laps + d, d * laps], `一圈 ${fmt(one)} 米，${laps} 圈是 ${fmt(one * laps)} 米。`));
  }
  return out;
}

function circleHard(): Raw[] {
  const out: Raw[] = [];
  for (const d of [7, 14, 21, 28, 35, 4, 5, 8, 10, 15, 20, 25]) {
    const piName = d % 7 === 0 ? "22/7" : "3.14";
    const c = d % 7 === 0 ? (22 / 7) * d : money(3.14 * d);
    out.push(nq("hard", `圓形燈帶長 ${fmt(c)} 米，π 取 ${piName}。直徑是多少米？`, d, [c / 2, d * 2, d / 2], `直徑 = 圓周 ÷ π = ${fmt(c)} ÷ ${piName} = ${d}。`));
    out.push(nq("hard", `燈帶長 ${fmt(c)} 米，π 取 ${piName}。半徑是多少米？`, d / 2, [d, c, d * 2], `半徑是直徑的一半：${d} ÷ 2 = ${fmt(d / 2)}。`));
  }
  out.push(
    nq("hard", "四個同樣的圓，圓周總和是 50.24 cm，π 取 3.14。一個圓的直徑是多少厘米？", 4, [8, 16, 2], "一個圓周 = 50.24 ÷ 4 = 12.56。直徑 = 12.56 ÷ 3.14 = 4 cm。"),
    nq("hard", "時鐘分針長 21 cm，π 取 22/7。半小時後針尖走了多少厘米？", 66, [132, 33, 21], "半小時分針走半圈。全圓周 = 2 × 22/7 × 21 = 132，半圈是 66 cm。不用任意圓心角的弧長公式。"),
    nq("hard", "車輪半徑 7 cm，π 取 22/7。車輪滾了 880 cm，轉了多少圈？", 20, [10, 40, 44], "一圈 = 2 × 22/7 × 7 = 44 cm。880 ÷ 44 = 20 圈。"),
  );
  for (const times of [2, 3, 4]) {
    out.push(nq("hard", `圓 B 的直徑是圓 A 的 ${times} 倍。圓 B 的圓周是圓 A 的多少倍？`, times, [times * times, times * 2, 1], `圓周和直徑成正比，直徑 ${times} 倍，圓周也是 ${times} 倍。`));
  }
  for (const cut of [22, 44, 11]) {
    const d = 21;
    const c = (22 / 7) * d;
    const left = c - cut;
    const small = left / (22 / 7);
    if (small <= 0) continue;
    out.push(
      nq(
        "hard",
        `鐵線剛好圍成直徑 ${d} cm 的圓，π 取 22/7。剪去 ${cut} cm 後再圍一個小圓，小圓直徑是多少厘米？`,
        small,
        [d - cut, left, cut],
        `原圓周 ${fmt(c)} cm，餘下 ${fmt(left)} cm。直徑 = ${fmt(left)} ÷ (22/7) = ${fmt(small)} cm。`,
      ),
    );
  }
  return out;
}

function areaBasic(): Raw[] {
  const out: Raw[] = [tq("basic", "圓面積公式是？", "π × 半徑 × 半徑", ["π × 直徑", "2 × π × 半徑", "直徑 × 直徑"], "面積用 πr²，圓周才用 πd。")];
  for (const r of [7, 14, 21, 28, 35]) {
    const answer = (22 / 7) * r * r;
    out.push(nq("basic", `旋轉杯地板半徑 ${r} 米，π 取 22/7。圓面積是多少平方米？`, answer, [(22 / 7) * r * 2, answer / 2, r * r], `πr² = 22/7 × ${r} × ${r} = ${fmt(answer)}。`));
  }
  for (const r of [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20]) {
    const answer = money(3.14 * r * r);
    out.push(nq("basic", `半徑 ${r} 米，π 取 3.14。圓面積是多少平方米？`, answer, [money(3.14 * r * 2), money(answer / 2), r * r], `3.14 × ${r} × ${r} = ${fmt(answer)}。不要把直徑當成半徑。`));
  }
  for (const d of [2, 4, 6, 8, 10, 14]) {
    const r = d / 2;
    const pi = d % 7 === 0 ? 22 / 7 : 3.14;
    const label = d % 7 === 0 ? "22/7" : "3.14";
    out.push(nq("basic", `直徑 ${d} 米，π 取 ${label}。圓面積是多少平方米？`, pi * r * r, [pi * d, pi * d * d, pi * r], `半徑是 ${fmt(r)}。面積 = ${label} × ${fmt(r)} × ${fmt(r)} = ${fmt(pi * r * r)}。`));
  }
  return out;
}

function areaCore(): Raw[] {
  const out: Raw[] = [];
  const wholes: [string, number][] = [];
  for (const r of [7, 14, 21]) wholes.push([`半徑 ${r} 米，π 取 22/7`, (22 / 7) * r * r]);
  for (const r of [2, 4, 5, 6, 10]) wholes.push([`半徑 ${r} 米，π 取 3.14`, money(3.14 * r * r)]);
  for (const [label, whole] of wholes) {
    for (const [name, part] of [
      ["半圓", 1 / 2],
      ["四分一圓", 1 / 4],
      ["四分三圓", 3 / 4],
    ] as [string, number][]) {
      out.push(nq("core", `${label}。${name}的面積是多少平方米？`, whole * part, [whole, whole * part * 2, whole + part], `${name}是全圓的 ${part}。${fmt(whole)} × ${part} = ${fmt(whole * part)}。不用由面積反推半徑，也不用扇形圓心角公式。`));
    }
  }
  return out;
}

function areaHard(): Raw[] {
  const out: Raw[] = [];
  for (const r of [2, 4, 5, 6, 7, 8, 10, 14]) {
    const pi = r % 7 === 0 ? 22 / 7 : 3.14;
    const label = r % 7 === 0 ? "22/7" : "3.14";
    const semi = (pi * r * r) / 2;
    const rect = r * 2 * r;
    out.push(nq("hard", `長方形長 ${r * 2} 米、闊 ${r} 米，闊邊外接半徑 ${r} 米的半圓，π 取 ${label}。合共面積是多少？`, rect + semi, [rect, semi, rect * 2], `長方形 ${fmt(rect)}，半圓 ${fmt(semi)}，合計 ${fmt(rect + semi)}。`));
    const whole = pi * r * r;
    out.push(nq("hard", `半徑 ${r} 米的圓用去四分之一，π 取 ${label}。餘下多少平方米？`, whole * 0.75, [whole / 4, whole / 2, whole], `全圓 ${fmt(whole)} 的四分之三是 ${fmt(whole * 0.75)}。`));
  }
  return out;
}

function angleName(d: number): string {
  if (d < 90) return "銳角";
  if (d === 90) return "直角";
  if (d < 180) return "鈍角";
  if (d === 180) return "平角";
  if (d < 360) return "反角";
  return "周角";
}

function angleBasic(): Raw[] {
  const names = ["銳角", "直角", "鈍角", "平角", "反角", "周角"];
  const degrees = [15, 35, 45, 60, 89, 90, 91, 120, 135, 150, 179, 180, 181, 200, 270, 300, 330, 359, 20, 75, 100, 210, 12, 48, 155, 250, 340, 80, 110, 160, 190, 225, 315, 350];
  const out = degrees.map((d) => {
    const answer = angleName(d);
    return tq("basic", `滑梯和地面夾成 ${d}°。這是什麼角？`, answer, names.filter((name) => name !== answer), `${d}° 是${answer}。直角 90°，平角 180°，周角 360°。大於平角、小於周角的是反角。不量 0° 和 360°。`);
  });
  out.push(
    tq("basic", "兩條幾何條連成一條直線時，形成的角是？", "平角", ["直角", "周角", "銳角"], "平角是 180°。"),
    tq("basic", "反角的範圍是？", "大於 180°，小於 360°", ["大於 90°，小於 180°", "大於 0°，小於 90°", "等於 360°"], "反角比平角大，比周角小。"),
    tq("basic", "1 周角等於多少度？", "360°", ["180°", "90°", "100°"], "轉完一圈是 360°。"),
  );
  return out;
}

function angleCore(): Raw[] {
  const out: Raw[] = [
    tq("core", "∠ABC 的頂點是哪個字母？", "B", ["A", "C", "三個都是"], "角的名字中間那個字母是頂點。"),
    tq("core", "∠PQR 的兩臂是？", "QP 和 QR", ["PR", "只有 PQ", "QR 和 PR"], "頂點是 Q，兩臂由 Q 連到 P 和 R。"),
    tq("core", "圓形手工紙對摺一次，摺痕兩旁大約是多少度？", "180°", ["90°", "45°", "360°"], "對摺一次約是平角。"),
    tq("core", "圓形手工紙對摺兩次，最小那只角大約是多少度？", "90°", ["180°", "45°", "60°"], "再對摺一次，約是直角。"),
    tq("core", "圓形手工紙對摺三次，最小那只角大約是多少度？", "45°", ["90°", "30°", "180°"], "第三次對摺約是 45°。"),
  ];
  for (const known of [20, 35, 40, 55, 60, 70, 80, 95, 110, 125, 140, 155]) {
    out.push(nq("core", `平角上已有 ${known}°，旁邊的角是多少度？`, 180 - known, [known, 90 - known, 360 - known], `平角 180°。180 − ${known} = ${180 - known}。`));
    if (known < 90) out.push(nq("core", `直角裏已有 ${known}°，餘下多少度？`, 90 - known, [180 - known, known, 90 + known], `90 − ${known} = ${90 - known}。`));
  }
  return out;
}

function angleHard(): Raw[] {
  const out: Raw[] = [];
  const groups: number[][] = [
    [90, 90, 80], [45, 45, 90], [120, 60, 30], [100, 80, 70], [150, 40, 50], [90, 45, 135], [60, 60, 60], [30, 40, 50],
  ];
  for (const group of groups) {
    const known = group.reduce((sum, n) => sum + n, 0);
    const answer = 360 - known;
    if (answer <= 0 || answer >= 360) continue;
    out.push(nq("hard", `繞同一點的四個角，已知 ${group.join("°、")}°。餘下的角是多少度？`, answer, [180 - (known % 180), known, 90], `周角 360°。360 − ${known} = ${answer}。`));
    out.push(tq("hard", `${answer}° 是什麼角？`, angleName(answer), ["銳角", "直角", "平角"].filter((name) => name !== angleName(answer)), `${answer}° 是${angleName(answer)}。`));
  }
  out.push(
    tq("hard", "量角之前應該先做什麼？", "先估計大約是哪一種角", ["先寫 0°", "先量 360°", "不用看角的大小"], "課程要求量度前先估計。0° 和 360° 不量。"),
    tq("hard", "下面哪個角不在這級的量度範圍？", "0° 和 360°", ["35°", "180°", "270°"], "只量大於 0°、小於 360° 的角。"),
  );
  return out;
}

function pieBasic(): Raw[] {
  const out: Raw[] = [
    tq("basic", "圓形圖主要顯示什麼？", "各部分佔整體的多少", ["數值隨時間怎樣上升下降", "兩組數據誰的平均較高", "一個角叫什麼名字"], "圓形圖看的是部分和全部的關係。"),
    tq("basic", "圓心角 180° 佔全圓的多少？", "1/2", ["1/4", "1/3", "全部"], "180 ÷ 360 = 1/2。"),
    tq("basic", "圓心角 90° 佔全圓的多少？", "1/4", ["1/2", "1/3", "90%"], "90 ÷ 360 = 1/4。"),
    tq("basic", "圓心角 45° 佔全圓的百分之幾？", "12.5%", ["45%", "25%", "8%"], "45 ÷ 360 = 0.125 = 12.5%。"),
  ];
  for (const [deg, total, unit] of [
    [180, 8, "小時"], [90, 8, "小時"], [45, 8, "小時"], [120, 360, "人"], [60, 120, "張票"], [270, 12, "小時"], [30, 120, "個氣球"], [300, 60, "分鐘"],
  ] as [number, number, string][]) {
    const answer = (deg / 360) * total;
    out.push(nq("basic", `大轉盤圓形圖裏，這一格是 ${deg}°，總數是 ${total} ${unit}。這一格是多少${unit}？`, answer, [deg, total / 2, answer * 2], `${deg}/360 × ${total} = ${fmt(answer)}。圓心角是 30° 或 45° 的倍數，不用自己量角。`));
  }
  for (const [pct, total] of [[25, 72], [50, 40], [20, 80], [75, 48], [10, 90], [30, 200], [15, 60], [40, 50]] as [number, number][]) {
    out.push(nq("basic", `圓形圖中某款糖果佔 ${pct}%，全日售出 ${total} 包。這款售出多少包？`, (pct / 100) * total, [pct, total, pct * total], `${total} × ${pct}% = ${fmt((pct / 100) * total)}。`));
  }
  return out;
}

function pieCore(): Raw[] {
  const out: Raw[] = [];
  const pies: { title: string; parts: [string, number][]; total: number }[] = [
    { title: "糖果", parts: [["可樂糖", 24], ["蘋果糖", 12], ["朱古力", 9], ["薄荷糖", 9], ["芒果糖", 18]], total: 72 },
    { title: "遊戲", parts: [["旋轉木馬", 20], ["摩天輪", 10], ["滑梯", 15], ["小火車", 5]], total: 50 },
    { title: "小食", parts: [["爆谷", 16], ["糖畫", 8], ["果汁", 8], ["熱狗", 8]], total: 40 },
  ];
  for (const pie of pies) {
    for (const [name, count] of pie.parts) {
      const pct = (count / pie.total) * 100;
      if (Math.abs(pct - Math.round(pct)) > 1e-6) continue;
      out.push(nq("core", `${pie.title}圓形圖：${pie.parts.map(([label, n]) => `${label} ${n}`).join("、")}，共 ${pie.total}。${name}佔百分之幾？`, pct, [count, pie.total, Math.round(pct / 10) || 1], `${count} ÷ ${pie.total} = ${fmt(pct)}%。`));
    }
    const [a, b] = [pie.parts[0]!, pie.parts[1]!];
    const ratio = frac(a[1], b[1]);
    out.push(tq("core", `${a[0]}的數量是${b[0]}的多少？用最簡分數。`, ratio, [frac(b[1], a[1]), `${a[1]}/${pie.total}`, `${a[1]}/${b[1] + a[1]}`], `${a[1]} ÷ ${b[1]} = ${ratio}。`));
  }
  return out;
}

function pieHard(): Raw[] {
  const out: Raw[] = [
    tq("hard", "兩個圓形圖都顯示「高年級佔 55%」。可以因此說兩個團體的高年級人數一樣多嗎？", "不可以，還要看總人數", ["可以，百分數一樣人數就一樣", "可以，圓形圖一定用同一總數", "只看顏色深淺"], "百分數相同，總數不同，實際人數就可以不同。"),
  ];
  const pairs: [string, number, number, string, number, number][] = [
    ["合唱團", 40, 55, "話劇團", 80, 45],
    ["甲班", 30, 50, "乙班", 50, 50],
    ["紅組", 20, 25, "藍組", 100, 20],
    ["上午場", 60, 40, "下午場", 40, 60],
  ];
  for (const [aName, aTotal, aPct, bName, bTotal, bPct] of pairs) {
    const aCount = (aPct / 100) * aTotal;
    const bCount = (bPct / 100) * bTotal;
    const answer = aCount > bCount ? aName : bCount > aCount ? bName : "一樣多";
    out.push(
      tq(
        "hard",
        `${aName}共 ${aTotal} 人，高年級佔 ${aPct}%。${bName}共 ${bTotal} 人，高年級佔 ${bPct}%。哪一組高年級人數較多？`,
        answer,
        [aName, bName, "一樣多"].filter((item, index, list) => list.indexOf(item) === index && item !== answer).concat(answer === "一樣多" ? [] : ["只看百分數較大的一組"]).slice(0, 3),
        `${aName}有 ${fmt(aCount)} 人，${bName}有 ${fmt(bCount)} 人。不能只比百分數。`,
      ),
    );
  }
  for (const [deg, total] of [[90, 240], [45, 160], [135, 80], [270, 36], [180, 50], [60, 180]] as [number, number][]) {
    out.push(nq("hard", `圓形圖用 ${deg}° 表示休息，全日 ${total} 人。休息的有多少人？`, (deg / 360) * total, [deg, total, (deg / 360) * total + deg], `${deg}/360 × ${total} = ${fmt((deg / 360) * total)}。`));
  }
  out.push(tq("hard", "六年級要不要用紙筆畫圓形圖？", "不用，重點是閱讀", ["要畫到每一度都準", "只可以畫棒形圖", "必須自己量圓心角"], "課程重點是闡釋圓形圖。圓心角若出現，會是 30° 或 45° 的倍數。"));
  return out;
}

function speedBasic(): Raw[] {
  const out: Raw[] = [
    tq("basic", "1 小時等於多少秒？", "3600 秒", ["60 秒", "600 秒", "100 秒"], "1 小時 = 60 分鐘，1 分鐘 = 60 秒，60 × 60 = 3600。"),
    tq("basic", "1 小時等於多少分鐘？", "60 分鐘", ["100 分鐘", "10 分鐘", "24 分鐘"], "時和分不是十進制。"),
    nq("basic", "864 分鐘等於多少小時？", 14.4, [8640, 86.4, 8.64], "864 ÷ 60 = 14.4 小時。"),
    tq("basic", "864 分鐘等於多少小時？用最簡分數。", "72/5 小時", ["864/100 小時", "14/60 小時", "864/10 小時"], "864 ÷ 60 = 72/5 小時。"),
  ];
  for (const mins of [30, 45, 90, 75, 120, 15, 150, 12, 24, 36, 48, 6, 18]) {
    out.push(nq("basic", `${mins} 分鐘等於多少小時？`, mins / 60, [mins / 10, mins / 100, mins], `${mins} ÷ 60 = ${fmt(mins / 60)} 小時。`));
  }
  for (const sec of [90, 120, 75, 150, 200, 45, 180, 240, 30, 100, 135, 853]) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    out.push(tq("basic", `${sec} 秒等於多少分鐘多少秒？`, `${m} 分鐘 ${s} 秒`, [`${sec} 分鐘 0 秒`, `${m + 1} 分鐘 ${s} 秒`, `${s} 分鐘 ${m} 秒`], `${sec} = ${m} × 60 + ${s}。`));
  }
  return out;
}

function speedCore(): Raw[] {
  const out: Raw[] = [];
  const trips: [string, number, number, number, number, string][] = [
    ["下午 10 時 35 分出發，翌日上午 8 時 58 分到達", 22 * 60 + 35, 8 * 60 + 58 + 24 * 60, 11, 23, ""],
    ["9:20 開始，11:05 結束", 9 * 60 + 20, 11 * 60 + 5, 1, 45, ""],
    ["14:10 進場，16:40 離場", 14 * 60 + 10, 16 * 60 + 40, 2, 30, ""],
    ["7:50 開車，8:16 到站", 7 * 60 + 50, 8 * 60 + 16, 0, 26, ""],
  ];
  for (const [stem, , , h, m] of trips) {
    out.push(tq("core", `${stem}。全程用了多久？`, `${h} 小時 ${m} 分鐘`, [`${h + 1} 小時 ${m} 分鐘`, `${h} 小時 ${m + 10} 分鐘`, `${m} 小時 ${h} 分鐘`], `把開始和結束化成分鐘再相減，得 ${h} 小時 ${m} 分鐘。`));
  }
  const speeds: [number, number, string][] = [
    [38.4, 0.4, "公里每小時"],
    [1.8, 0.2, "公里每小時"],
    [4.2, 0.25, "公里每小時"],
    [12, 0.5, "公里每小時"],
    [30, 0.75, "公里每小時"],
    [1800, 720, "米每秒"],
    [4200, 840, "米每秒"],
    [100, 20, "米每秒"],
    [250, 50, "米每秒"],
  ];
  for (const [distance, time, unit] of speeds) {
    const answer = money(distance / time);
    const timeLabel = unit === "公里每小時" ? `${fmt(time)} 小時` : `${fmt(time)} 秒`;
    out.push(
      nq(
        "core",
        `路程 ${fmt(distance)} ${unit.startsWith("公") ? "公里" : "米"}，時間 ${timeLabel}。速率是多少${unit}？`,
        answer,
        [money(distance * time), money(time / distance), money(answer * 10)],
        `速率 = 路程 ÷ 時間 = ${fmt(distance)} ÷ ${fmt(time)} = ${fmt(answer)} ${unit}。不要把米每秒和公里每小時互化。`,
      ),
    );
  }
  out.push(
    tq("core", "小火車先開出，後來和步行的小童距離愈來愈遠。誰的速率較高？", "小火車", ["步行的小童", "兩人一樣", "不能比較"], "如果後面的人較快，距離會縮短。距離愈來愈遠，就是前面的小火車較快。這題只比較，不計算追及。"),
    tq("core", "詠文先踏單車出發，佩兒稍後從同一地點出發，兩人同時到達。誰較快？", "佩兒", ["詠文", "一樣快", "看誰的車較新"], "用的時間較短而路程相同，佩兒較快。"),
  );
  return out;
}

function speedHard(): Raw[] {
  const out: Raw[] = [];
  const graphs: { name: string; legs: [string, number, number][] }[] = [
    {
      name: "朗程",
      legs: [
        ["家到泳池", 30, 2],
        ["泳池停留", 30, 0],
        ["泳池到郵局", 45, 1.5],
        ["郵局到書局", 15, 2],
      ],
    },
    {
      name: "小童",
      legs: [
        ["入口到摩天輪", 30, 2],
        ["摩天輪停留", 15, 0],
        ["摩天輪到小食亭", 45, 1.5],
        ["小食亭到出口", 12, 1],
      ],
    },
  ];
  for (const graph of graphs) {
    for (const [label, mins, km] of graph.legs) {
      if (km === 0) {
        out.push(tq("hard", `${graph.name}的行程：${label}用了 ${mins} 分鐘，路程 0 公里。這一段表示什麼？`, "停着不動", ["速率最高", "走回頭", "路程是 30 公里"], "行程圖上的平線表示停留。"));
      } else {
        const speed = money(km / (mins / 60));
        out.push(
          nq(
            "hard",
            `${graph.name}由「${label}」用了 ${mins} 分鐘，路程 ${fmt(km)} 公里。速率是多少公里每小時？`,
            speed,
            [money(km / mins), money(km * mins), mins],
            `${mins} 分鐘 = ${fmt(mins / 60)} 小時。${fmt(km)} ÷ ${fmt(mins / 60)} = ${fmt(speed)} 公里每小時。`,
          ),
        );
      }
    }
    const moving = graph.legs.filter((leg) => leg[2] > 0);
    const slowest = [...moving].sort((a, b) => a[2] / a[1] - b[2] / b[1])[0]!;
    out.push(
      tq(
        "hard",
        `${graph.name}的幾段路程裏，步行速率最低的是哪一段？`,
        slowest[0],
        moving.map((leg) => leg[0]).filter((name) => name !== slowest[0]),
        `${slowest[0]}的速率是 ${fmt(money(slowest[2] / (slowest[1] / 60)))} 公里每小時，是移動各段中最低的。`,
      ),
    );
  }
  for (const [distance, hours, find] of [
    [12, 0.5, "路程"],
    [96, 1.5, "時間"],
    [30, 0.75, "路程"],
  ] as [number, number, string][]) {
    if (find === "路程") {
      const speed = distance;
      out.push(nq("hard", `小火車速率 ${speed} 公里每小時，行了 ${fmt(hours)} 小時。路程是多少公里？`, money(speed * hours), [speed, hours, money(speed / hours)], `路程 = 速率 × 時間 = ${speed} × ${fmt(hours)} = ${fmt(speed * hours)}。`));
    }
  }
  out.push(
    nq("hard", "速率 4 米每秒，行了 50 秒。路程是多少米？", 200, [12.5, 54, 800], "路程 = 4 × 50 = 200 米。單位保持米和秒，不化成公里每小時。"),
    nq("hard", "路程 180 米，速率 3 米每秒。需要多少秒？", 60, [540, 183, 6], "時間 = 路程 ÷ 速率 = 180 ÷ 3 = 60 秒。"),
    tq("hard", "下面哪一種題不在這個練習？", "追及問題，以及米每秒和公里每小時互化", ["行程圖上的平線表示停留", "由路程和時間求速率", "由開始和結束時間求用了多久"], "課程不做速率單位互化，也不考追及。"),
  );
  return out;
}

function eqBasic(): Raw[] {
  const rows: [string, number][] = [
    ["x + 2.5 = 8", 5.5],
    ["x − 1.4 = 3.6", 5],
    ["x + 0.8 = 2", 1.2],
    ["3x = 7.5", 2.5],
    ["4x = 8.4", 2.1],
    ["0.5x = 3", 6],
    ["2x = 6.4", 3.2],
    ["x − 3.25 = 1.75", 5],
    ["5x = 6.5", 1.3],
    ["x + 7 = 7.5", 0.5],
    ["8x = 6.4", 0.8],
    ["x − 0.25 = 0.75", 1],
    ["6x = 9", 1.5],
    ["x + 4.5 = 10", 5.5],
    ["2.5x = 10", 4],
    ["x − 2.2 = 4.8", 7],
    ["0.4x = 2", 5],
    ["7x = 3.5", 0.5],
    ["x + 1.25 = 4", 2.75],
    ["9x = 4.5", 0.5],
  ];
  return rows.map(([stem, answer]) =>
    nq("basic", `解方程 ${stem}。x = ？`, answer, [answer + 1, answer * 2, money(answer / 2)], `等號兩邊做同一件事。答案 x = ${fmt(answer)}，代回去左邊等於右邊。`),
  );
}

function eqCore(): Raw[] {
  const rows: [string, number, string][] = [
    ["0.4x + 1.2 = 3.2", 5, "先減 1.2，得 0.4x = 2，x = 5。"],
    ["2(x + 1.5) = 7", 2, "兩邊除以 2，x + 1.5 = 3.5，x = 2。"],
    ["12x − 7x = 6.5", 1.3, "同類項在同一邊：5x = 6.5，x = 1.3。"],
    ["9 + 0.75x = 15", 8, "0.75x = 6，x = 8。"],
    ["(x − 4) × 0.5 = 3", 10, "x − 4 = 6，x = 10。"],
    ["1.6x + 4.2x + 2.7 = 11.4", 1.5, "5.8x = 8.7，x = 1.5。"],
    ["3(x − 2) = 12", 6, "x − 2 = 4，x = 6。"],
    ["0.2x + 0.3x = 4", 8, "0.5x = 4，x = 8。"],
    ["5(x + 1) = 20", 3, "x + 1 = 4，x = 3。"],
    ["8x − 3x = 2.5", 0.5, "5x = 2.5，x = 0.5。"],
    ["2.8x + 3.5 = 12.6", 3.25, "2.8x = 9.1，x = 3.25。"],
    ["(x − 70) × 0.75 = 45", 130, "x − 70 = 60，x = 130。"],
    ["4(x − 1.5) = 10", 4, "x − 1.5 = 2.5，x = 4。"],
    ["6x + 2x = 3.2", 0.4, "8x = 3.2，x = 0.4。"],
    ["0.5(x + 6) = 5", 4, "x + 6 = 10，x = 4。"],
    ["15x − 9x = 4.8", 0.8, "6x = 4.8，x = 0.8。"],
    ["x × 25% = 7", 28, "0.25x = 7，x = 28。已知一個數的百分數是多少，用方程求原數。"],
    ["x × 75% = 30", 40, "0.75x = 30，x = 40。"],
    ["3x + 1.5 = 9", 2.5, "3x = 7.5，x = 2.5。"],
    ["2(x − 0.5) = 7", 4, "x − 0.5 = 3.5，x = 4。"],
  ];
  return rows.map(([stem, answer, why]) => nq("core", `解方程 ${stem}。x = ？`, answer, [answer + 2, money(answer / 2) || 1, answer * 2], `${why} 代回原式核對。`));
}

function eqHard(): Raw[] {
  const out: Raw[] = [];
  const prices: [number, number][] = [
    [100, 25], [54, 8], [80, 25], [90, 20], [120, 50], [66, 10], [48, 20], [75, 25],
  ];
  for (const [dear, pct] of prices) {
    const base = money(dear / (1 + pct / 100));
    if (Math.abs(base * (1 + pct / 100) - dear) > 0.001) continue;
    out.push(
      nq(
        "hard",
        `禮品熊比氣球貴 ${pct}%，禮品熊售 ${dear} 元。氣球售多少元？用方程。`,
        base,
        [money(dear * (1 - pct / 100)), dear - pct, money(dear * pct / 100)],
        `設氣球 x 元。x × ${fmt(1 + pct / 100)} = ${dear}，x = ${fmt(base)}。`,
      ),
    );
  }
  for (const [one, mean] of [[8, 11], [9.2, 10.8], [6, 9], [4.5, 6], [12, 15], [7, 10]] as [number, number][]) {
    const other = money(mean * 2 - one);
    const diff = money(other - one);
    out.push(nq("hard", `兩袋砂糖平均 ${fmt(mean)} 公斤，其中一袋 ${fmt(one)} 公斤。另一袋重多少公斤？`, other, [mean, one, money(mean - one)], `合計 ${fmt(mean * 2)} 公斤。另一袋 = ${fmt(mean * 2)} − ${fmt(one)} = ${fmt(other)}。`));
    out.push(nq("hard", `沿用上一情況：另一袋比 ${fmt(one)} 公斤那袋重多少公斤？`, diff, [other, mean, one], `${fmt(other)} − ${fmt(one)} = ${fmt(diff)}。`));
  }
  out.push(
    nq("hard", "鬱金香售價是玫瑰的 2 倍，蘭花是玫瑰的 3 倍。三種各一束共 480 元。玫瑰售多少元？", 80, [160, 240, 60], "設玫瑰 x 元。x + 2x + 3x = 480，6x = 480，x = 80。"),
    nq("hard", "鐵線圍成邊長 22 cm 的正方形，再圍成圓，π 取 22/7。圓的半徑是多少厘米？", 14, [22, 7, 44], "周界 = 88 cm。2 × 22/7 × r = 88，r = 14。"),
    nq("hard", "慢的人速率 1.2 米每秒。40 秒後，快的人比他多行 24 米。快的人速率是多少米每秒？", 1.8, [1.2, 2.4, 0.6], "設速率 x。40x − 40 × 1.2 = 24，40x = 72，x = 1.8。這是方程題，不是追及專題。"),
    tq("hard", "解完方程還要做什麼？", "代回原式驗算", ["把未知數改成 y", "不用再看等號", "只估算就可以"], "左邊要真的等於右邊。"),
  );
  return out;
}

function lineBasic(): Raw[] {
  const out: Raw[] = [
    tq("basic", "要顯示今日每小時排隊人數怎樣變化，哪種圖最合適？", "折線圖", ["只看一張圓形圖", "象形圖", "不用圖"], "連續時間上的變化，用折線圖較清楚。"),
    tq("basic", "折線圖的線向上，通常表示什麼？", "數量增加", ["數量一定是 0", "時間停止", "百分數變成角度"], "向上是增加，向下是減少。"),
    tq("basic", "折線圖的橫軸常常是什麼？", "時間", ["只有百分數", "對稱軸", "圓周率"], "例如每一小時、每一天、每一月。"),
  ];
  const rows: number[][] = [
    [20, 30, 30, 45, 25, 10],
    [12, 18, 15, 22, 28, 16],
    [8, 8, 14, 11, 19, 19],
    [40, 35, 35, 50, 42, 60],
    [5, 9, 9, 4, 7, 11],
  ];
  const hours = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
  for (const values of rows) {
    let down = "";
    let up = "";
    let upBy = -1;
    for (let i = 1; i < values.length; i += 1) {
      const diff = values[i]! - values[i - 1]!;
      if (!down && diff < 0) down = hours[i]!;
      if (diff > upBy) {
        upBy = diff;
        up = hours[i]!;
      }
    }
    out.push(tq("basic", `每小時人數是 ${hours.map((hour, i) => `${hour} ${values[i]} 人`).join("，")}。哪一小時比上一小時減少了？最先出現的是？`, down, hours.filter((hour) => hour !== down).slice(0, 3), `${down} 的人數比前一小時少。`));
    out.push(tq("basic", `同一組人數，哪一小時比上一小時上升最多？`, up, hours.filter((hour) => hour !== up).slice(0, 3), `${up} 上升了 ${upBy} 人，是各段裏最多的。`));
  }
  return out;
}

function lineCore(): Raw[] {
  const out: Raw[] = [];
  const months = ["三月", "四月", "五月", "六月", "七月", "八月"];
  const pairs: [number[], number[]][] = [
    [[2, 3, 5, 4, 6, 3], [2.2, 4, 4.2, 5, 3, 6]],
    [[8, 10, 9, 12, 11, 7], [9, 9, 11, 10, 13, 8]],
    [[15, 18, 16, 20, 22, 19], [14, 17, 21, 18, 19, 23]],
  ];
  for (const [a, b] of pairs) {
    let closest = 0;
    let far = 0;
    for (let i = 1; i < a.length; i += 1) {
      if (Math.abs(a[i]! - b[i]!) < Math.abs(a[closest]! - b[closest]!)) closest = i;
      if (Math.abs(a[i]! - b[i]!) > Math.abs(a[far]! - b[far]!)) far = i;
    }
    const aMore = months.filter((_, i) => a[i]! > b[i]!);
    out.push(tq("core", `推銷員 A：${a.join("、")} 萬元；B：${b.join("、")} 萬元（${months.join("、")}）。哪一個月兩人最接近？`, months[closest]!, months.filter((month) => month !== months[closest]!).slice(0, 3), `${months[closest]}相差 ${fmt(Math.abs(a[closest]! - b[closest]!))} 萬元，是最小的。`));
    out.push(tq("core", `同一組營業額，哪一個月相差最多？`, months[far]!, months.filter((month) => month !== months[far]!).slice(0, 3), `${months[far]}相差 ${fmt(Math.abs(a[far]! - b[far]!))} 萬元。`));
    out.push(tq("core", `哪幾個月 A 的營業額比 B 多？`, aMore.join("、") || "沒有", ["每個月都是", "只看第一個月", "不能比較"], aMore.length ? `${aMore.join("、")}是 A 較高。` : "A 沒有一個月高過 B。"));
  }
  for (const n of [454, 222, 376, 493, 555, 238, 0, 61, 205, 349]) {
    const answer = Math.round(n / 10) * 10;
    out.push(nq("core", `入場人次 ${n}，取近似值至十位，應記多少？`, answer, [Math.trunc(n / 10) * 10, n, answer + 10], `${n} 取至十位是 ${answer}。製作折線圖前可以先這樣湊整。`));
  }
  return out;
}

function lineHard(): Raw[] {
  const out: Raw[] = [
    tq("hard", "縱軸從 36 斤開始，體重由 36.2 斤畫到 36.8 斤，線看起來很陡。實際增加了多少斤？", "0.6 斤", ["6 斤", "36 斤", "沒有增加"], "看數字差：36.8 − 36.2 = 0.6。縱軸不從 0 開始，會把變化放大。"),
    tq("hard", "同一折線圖適合放多少組折線？", "不多於兩組", ["越多越好", "至少五組", "只能有時間、不能有數量"], "課程不建議同一圖放多於兩組折線。"),
    tq("hard", "星期三入場人次是 0。較合理的解讀是？", "那天可能休館，要再查原因", ["折線圖一定畫錯", "0 代表 1000 人", "不用理橫軸"], "0 是一個數據。原因要回到情境，例如休館，不能憑空當它是畫錯。"),
  ];
  const income = [32, 44, 47, 39, 37, 26];
  const spend = [25, 38, 43, 43, 32, 25];
  const names = ["十一月", "十二月", "一月", "二月", "三月", "四月"];
  const loss = names.filter((_, i) => spend[i]! > income[i]!);
  out.push(tq("hard", `收入（萬元）${income.join("、")}，支出 ${spend.join("、")}，月份是${names.join("、")}。哪一個月支出比收入多？`, loss.join("、"), names.filter((name) => !loss.includes(name)).slice(0, 3), `${loss.join("、")}的支出高於收入。`));
  for (let i = 1; i < income.length; i += 1) {
    const diff = income[i]! - income[i - 1]!;
    out.push(
      tq(
        "hard",
        `攤檔收入由${names[i - 1]}的 ${income[i - 1]} 萬元變到${names[i]}的 ${income[i]} 萬元。這一段是？`,
        diff > 0 ? `增加 ${diff} 萬元` : diff < 0 ? `減少 ${-diff} 萬元` : "沒有改變",
        [`增加 ${Math.abs(diff) + 5} 萬元`, `減少 ${Math.abs(diff) + 3} 萬元`, "無法從兩個數看出變化"],
        `${income[i]} − ${income[i - 1]} = ${diff}。`,
      ),
    );
  }
  return out;
}

function misuseBasic(): Raw[] {
  const scenes: [string, string][] = [
    ["五款遊戲各自賣出多少張票", "棒形圖"],
    ["今日每小時排隊人數的變化", "折線圖"],
    ["一班同學最喜歡的攤檔佔全部的多少", "圓形圖"],
    ["過去 10 期雜誌銷量的變化", "折線圖"],
    ["六年級同學上學方法的分佈", "棒形圖"],
    ["去年每個月違例泊車的宗數", "棒形圖或折線圖"],
    ["兩天導賞團的兒童和成人人數", "複合棒形圖"],
    ["一個整體裏各部分的百分數", "圓形圖"],
  ];
  const all = ["折線圖", "棒形圖", "圓形圖", "棒形圖或折線圖", "複合棒形圖"];
  const out: Raw[] = [];
  for (const [scene, answer] of scenes) {
    out.push(tq("basic", `「${scene}」最適合哪種圖？`, answer, all.filter((item) => item !== answer), "看變化用折線，看各項數量用棒形，看佔全部多少用圓形。"));
  }
  const bad: [string, string, string][] = [
    ["用折線圖顯示上學方法的分佈", "不適合", "上學方法不是連續變化，棒形圖或圓形圖較合適"],
    ["用圓形圖顯示去年每個月的宗數", "不適合", "十二個月的數量變化，用棒形圖或折線圖較清楚"],
    ["用折線圖顯示過去 10 期銷量變化", "適合", "銷量隨期數變化，折線圖合適"],
    ["用棒形圖比較五款遊戲的票數", "適合", "各款是分開的項目，棒形圖合適"],
  ];
  for (const [scene, answer, why] of bad) {
    out.push(tq("basic", `${scene}。這個選擇適合嗎？`, answer, answer === "適合" ? ["不適合", "只有圓形圖可以", "統計圖都不能用"] : ["適合", "只可以改用象形圖", "沒有更合適的圖"], why));
  }
  return out;
}

function misuseCore(): Raw[] {
  const out: Raw[] = [
    tq("core", "合唱團高年級佔 55%，話劇團高年級佔 45%。可以說合唱團的低年級人數一定較少嗎？", "不可以，不知道兩團的總人數", ["可以，55% 比 45% 大", "可以，圓形圖已經寫了人數", "低年級一定是 0"], "百分數不是人數。總人數不同，低年級的實際人數就不能單憑百分數比較。"),
    tq("core", "星期六兒童 40 人，星期日兒童 80 人。職員說星期六是星期日的一半。對不對？", "對，40 是 80 的一半", ["不對，一定要看成人", "不對，棒形圖不能比較", "對，因為兩天的顏色一樣"], "40 ÷ 80 = 1/2。先看圖上的數，再判斷句子。"),
    tq("core", "星期六兒童 40 人，星期日兒童 70 人。職員說星期六是星期日的一半。對不對？", "不對，40 不是 70 的一半", ["對，看起來差不多", "對，棒形圖的一半不用計算", "無法判斷"], "70 的一半是 35，不是 40。"),
  ];
  for (const [start, from, to] of [[0, 20, 24], [36, 36.2, 36.8], [0, 100, 180], [50, 52, 58]] as [number, number, number][]) {
    out.push(
      tq(
        "core",
        `同一組數據，一幅縱軸從 ${start} 開始，另一幅從 0 開始。由 ${fmt(from)} 變到 ${fmt(to)}，哪句話對？`,
        "實際變化一樣，但從較大的數開始會看起來較陡",
        ["從較大的數開始，實際增加得更多", "縱軸起點不影響閱讀", "兩幅圖一定有人畫錯數"],
        `實際相差 ${fmt(to - from)}。縱軸比例和起點會改變觀感。`,
      ),
    );
  }
  return out;
}

function misuseHard(): Raw[] {
  const out: Raw[] = [];
  const cases: [string, string, string][] = [
    ["海報用很陡的折線說人數「暴升」，但縱軸每一格只代表 1 人，由 20 人升到 23 人", "有誤導，升幅只是 3 人", "3 人不是暴升。要看一格代表多少。"],
    ["兩個圓形圖都是「喜歡佔 50%」，海報說兩場的喜歡人數一樣", "未能確定，總人數可能不同", "50% 要乘總人數才是人數。"],
    ["用一張圓形圖同時比較星期一至日的售票變化", "不適合，變化用折線或棒形較好", "圓形圖適合看一次的各部分，不適合看一連七日的變化。"],
    ["棒形圖的縱軸從 90 分開始，78 分和 95 分看起來相差很遠", "觀感被放大了", "要先問縱軸從哪裏開始。"],
    ["把不同單位的兩組數畫在同一折線上，又不說明單位", "容易誤導", "單位不同不能直接把高低當成同一件事。"],
  ];
  for (const [scene, answer, why] of cases) {
    out.push(tq("hard", `${scene}。較嚴謹的判斷是？`, answer, ["圖畫得漂亮就沒有問題", "統計圖一定不能相信", "只看顏色深淺"], why));
  }
  for (const [aTotal, aPct, bTotal, bPct] of [
    [40, 55, 100, 30], [20, 80, 80, 20], [50, 40, 50, 60], [30, 50, 90, 20],
  ] as [number, number, number, number][]) {
    const a = (aPct / 100) * aTotal;
    const b = (bPct / 100) * bTotal;
    out.push(
      tq(
        "hard",
        `甲組 ${aTotal} 人中有 ${aPct}% 達標，乙組 ${bTotal} 人中有 ${bPct}% 達標。哪句對？`,
        a === b ? "達標人數一樣多" : a > b ? "甲組達標人數較多" : "乙組達標人數較多",
        ["百分數較高的一組，人數一定較多", "不能用乘法", "兩組百分數相加就是人數"],
        `甲組 ${fmt(a)} 人，乙組 ${fmt(b)} 人。`,
      ),
    );
  }
  return out;
}

function symBasic(): Raw[] {
  const facts: [string, string, string[], string][] = [
    ["正方形有多少條對稱軸？", "4 條", ["2 條", "1 條", "8 條"], "對邊中點、對角各一對，共 4 條。"],
    ["長方形（不是正方形）有多少條對稱軸？", "2 條", ["4 條", "1 條", "0 條"], "只有對邊中點那兩條，對角線對摺不會重合。"],
    ["菱形有多少條對稱軸？", "2 條", ["4 條", "1 條", "0 條"], "沿兩條對角線對摺可以重合。"],
    ["等邊三角形有多少條對稱軸？", "3 條", ["1 條", "2 條", "6 條"], "每個頂點到對邊中點都是一條。"],
    ["等腰三角形（不是等邊）有多少條對稱軸？", "1 條", ["3 條", "2 條", "0 條"], "只有頂角平分線那一條。"],
    ["圓有多少條對稱軸？", "無數條", ["1 條", "4 條", "0 條"], "每條直徑都可以做成對稱軸。"],
    ["一般平行四邊形（不是菱形或長方形）有多少條對稱軸？", "0 條", ["2 條", "4 條", "1 條"], "對摺後兩邊通常不會完全重合。"],
    ["什麼叫對稱軸？", "沿這條線對摺，兩邊完全重合", ["任何一條中線", "只可以是橫線", "把圖形剪開的線"], "判別時只看平面圖形本身，不看上面的花紋。"],
  ];
  const out = facts.map(([stem, answer, wrong, why]) => tq("basic", stem, answer, wrong, why));
  for (let n = 3; n <= 20; n += 1) {
    out.push(tq("basic", `正${["", "", "", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"][n]}邊形有多少條對稱軸？`, `${n} 條`, [`${n - 1} 條`, `${n * 2} 條`, "1 條"], `正多邊形的對稱軸條數等於邊數，正${n}邊形有 ${n} 條。`));
  }
  return out;
}

function symCore(): Raw[] {
  const out: Raw[] = [];
  const shapes: [string, string, string][] = [
    ["等腰梯形", "是，有 1 條對稱軸", "上下底平行，左右對摺可以重合。"],
    ["一般梯形", "不是", "只有一雙底平行時，通常不能對摺重合。"],
    ["等腰直角三角形", "是，有 1 條對稱軸", "兩條直角邊一樣長，斜邊上的中線是對稱軸。"],
    ["不等邊三角形", "不是", "三邊都不同，沒有對摺重合的軸。"],
    ["正五邊形", "是，有 5 條對稱軸", "正多邊形都是軸對稱圖形。"],
    ["圓形鏡屋的圓窗", "是，有無數條對稱軸", "每條直徑都可以。"],
  ];
  for (const [shape, answer, why] of shapes) {
    out.push(tq("core", `${shape}是不是軸對稱圖形？`, answer, ["不是", "是，有 4 條對稱軸", "是，但沒有對稱軸"].filter((item) => item !== answer), why));
  }
  for (const steps of [1, 2, 3, 4, 5, 6]) {
    out.push(nq("core", `方格紙上，一個點在對稱軸左面 ${steps} 格。另一半的對應點在右面多少格？`, steps, [steps + 1, steps - 1, steps * 2], "對應點和原點到對稱軸的距離相同，所以也是 " + steps + " 格。"));
    out.push(nq("core", `軸左面有 ${steps} 個方格塗了色。要畫成軸對稱，右面最少再塗多少格？`, steps, [steps * 2, 1, 0], `每一格在另一邊都有一格對應，所以再塗 ${steps} 格。`));
  }
  return out;
}

function symHard(): Raw[] {
  const out: Raw[] = [
    tq("hard", "沿對稱軸對摺後，兩邊應該怎樣？", "完全重合", ["只是面積相等", "只要邊數相同", "轉 90° 就可以"], "軸對稱看的是對摺重合，不是旋轉。"),
    tq("hard", "正方形的對角線是不是對稱軸？", "是", ["不是，只有對邊中點那兩條", "不是，正方形沒有對稱軸", "要看上面有沒有花紋"], "正方形的兩條對角線對摺後都會重合。長方形的對角線則不是。"),
    tq("hard", "長方形的對角線是不是對稱軸？", "不是", ["是，因為長方形有 4 條", "是，所有對角線都是", "長方形不是軸對稱"], "長方形沿對角線對摺，兩邊不會重合。它的對稱軸是對邊中點的連線。"),
    tq("hard", "判別軸對稱時，要不要理會圖形上的圖案？", "不用，只看平面圖形本身", ["要，顏色不同就不是", "要，文字也要對稱", "只看最大的那塊顏色"], "課程說明：不考慮圖形上的圖案。"),
  ];
  for (let n = 5; n <= 15; n += 1) {
    out.push(tq("hard", `正${n}邊形的所有對稱軸都畫出來，有多少條？`, `${n} 條`, [`${n - 1} 條`, `${n + 1} 條`, `${n * 2} 條`], `正多邊形的對稱軸數等於邊數。`));
    out.push(tq("hard", `只用剪刀剪一個最少有 ${n} 條對稱軸的圖形，哪種可以？`, n === 4 ? "正方形" : `正${n}邊形`, ["一般三角形", "一般平行四邊形", "不等邊四邊形"], "正多邊形可以，一般不規則圖形通常沒有那麼多對稱軸。"));
  }
  return out;
}

function turnBasic(): Raw[] {
  const shapes: [string, number, boolean][] = [
    ["正方形風車", 4, true],
    ["等邊三角形旗", 3, true],
    ["正六邊形窗", 6, true],
    ["長方形相框（不是正方形）", 2, true],
    ["等腰三角形（不是等邊）", 1, false],
    ["一般平行四邊形", 2, true],
    ["正五邊形", 5, true],
    ["沒有重複部分的不規則牌", 1, false],
    ["正八邊形", 8, true],
    ["圓形轉盤", 0, true],
  ];
  const out: Raw[] = [];
  for (const [name, order, yes] of shapes) {
    if (order > 0) {
      out.push(tq("basic", `${name}旋轉一周，和原來圖形重疊多少次？（包括轉回起點）`, `${order} 次`, [`${order + 1} 次`, "1 次", `${order * 2} 次`], yes && order > 1 ? `重疊 ${order} 次，大於 1，所以是旋轉對稱。` : "只在轉滿 360° 時重疊 1 次，不算旋轉對稱。"));
      out.push(tq("basic", `${name}是不是旋轉對稱圖形？`, yes && order > 1 ? "是" : "不是", yes && order > 1 ? ["不是", "只有軸對稱才算", "重疊 1 次才算"] : ["是，因為能轉一圈", "是，所有圖形都是", "要有 4 條對稱軸才算"], "旋轉一周裏重疊多於 1 次，才叫旋轉對稱。"));
    } else {
      out.push(tq("basic", `${name}旋轉任何少於 360° 的角度都能和自己重合嗎？`, "可以，圓有無限多個重合位置", ["不可以", "只有 90°", "只有 180°"], "圓繞圓心轉任何角度都重合，是特殊的旋轉對稱。"));
    }
  }
  for (let n = 3; n <= 12; n += 1) {
    out.push(nq("basic", `正${n}邊形旋轉一周，重疊多少次？`, n, [1, n * 2, n - 1], `正${n}邊形的旋轉重疊次數是 ${n}，所以它是旋轉對稱。`));
  }
  return out;
}

function angleWrongs(angle: number): number[] {
  return [30, 45, 60, 90, 120, 180, 360, angle * 2].filter((item, index, list) => item > 0 && item !== angle && list.indexOf(item) === index).slice(0, 3);
}

function turnCore(): Raw[] {
  const out: Raw[] = [];
  const rows: [string, number][] = [
    ["正方形", 90], ["等邊三角形", 120], ["正六邊形", 60], ["長方形", 180], ["正五邊形", 72], ["正八邊形", 45], ["正十邊形", 36],
    ["正十二邊形", 30], ["正九邊形", 40], ["正四邊形窗花", 90], ["兩片葉的風車", 180], ["三片葉的風車", 120],
    ["六片葉的風車", 60], ["八片葉的風車", 45], ["五片葉的風車", 72], ["十片葉的風車", 36], ["十二片葉的風車", 30], ["九片葉的風車", 40],
  ];
  for (const [name, angle] of rows) {
    const order = 360 / angle;
    out.push(nq("core", `${name}最少轉多少度就會和原來重合？`, angle, angleWrongs(angle), `360° ÷ ${fmt(order)} = ${angle}°。`));
    out.push(nq("core", `${name}要轉多少次 ${angle}° 才回到出發方向？（包括最後一次）`, order, [angle, 360, 1, order + 1].filter((item) => item !== order), `${angle}° × ${fmt(order)} = 360°。`));
  }
  out.push(
    tq("core", "只重疊 1 次的圖形，是不是旋轉對稱？", "不是", ["是", "只要它有顏色", "轉不滿一圈也算"], "只有轉回原位才重合，重疊次數是 1，不算旋轉對稱。"),
    tq("core", "旋轉中心的作用是？", "圖形繞這一點轉動", ["它一定是對稱軸", "它用來量圓周", "它是分數的分母"], "找重疊次數時，要先定旋轉中心。"),
    tq("core", "風車葉片繞中心每轉 90° 就重合。它的重疊次數是？", "4 次", ["2 次", "8 次", "90 次"], "360 ÷ 90 = 4。"),
    tq("core", "一個圖形轉 180° 才第一次重合。重疊次數是？", "2 次", ["180 次", "1 次", "4 次"], "360 ÷ 180 = 2，大於 1，所以是旋轉對稱。"),
  );
  return out;
}

function turnHard(): Raw[] {
  const out: Raw[] = [
    tq("hard", "等腰三角形（不是等邊）有軸對稱，也有旋轉對稱嗎？", "有軸對稱，但不是旋轉對稱", ["兩種都有", "兩種都沒有", "只有旋轉對稱"], "它只有 1 條對稱軸。旋轉一周只重疊 1 次。"),
    tq("hard", "正方形兩種對稱都有嗎？", "有軸對稱，也有旋轉對稱", ["只有軸對稱", "只有旋轉對稱", "兩種都沒有"], "正方形有 4 條對稱軸，旋轉一周重疊 4 次。"),
    tq("hard", "旋轉對稱是不是六年級核心必學？", "不是，校本把它列為增潤", ["是 6S1 的必學", "它取代軸對稱", "只可以在速率課題出現"], "核心要求的是軸對稱。旋轉對稱用來分開兩種對稱。"),
    tq("hard", "要在方格上設計一個旋轉一周最少重疊 4 次的圖形，哪種可以？", "繞中心每 90° 重複一次的圖形", ["只畫一個不規則三角形", "只畫一條沒有重複的曲線", "任何圖形轉一圈都會重疊 4 次"], "重疊 4 次，最小角是 90°。"),
  ];
  for (let order = 2; order <= 12; order += 1) {
    if (360 % order !== 0) continue;
    const angle = 360 / order;
    out.push(nq("hard", `一個圖形旋轉一周重疊 ${order} 次。最少轉多少度會再重合？`, angle, angleWrongs(angle), `360 ÷ ${order} = ${angle}。`));
    out.push(tq("hard", `重疊 ${order} 次的圖形是不是旋轉對稱？`, "是", ["不是", "要重疊 1 次才算", "必須同時有 10 條對稱軸"], "多於 1 次就是旋轉對稱。"));
    out.push(nq("hard", `最少角是 ${angle}° 的旋轉對稱圖形，旋轉一周重疊多少次？`, order, [angle, 1, order + 1], `${angle}° × ${order} = 360°。`));
  }
  return out;
}

function baseBasic(): Raw[] {
  const out: Raw[] = [
    tq("basic", "下面哪個是非十進制？", "1 小時 = 60 分鐘", ["1 米 = 100 厘米", "1 公斤 = 1000 克", "1 元 = 10 角"], "60 不是 10 的次方。"),
    tq("basic", "一打是多少個？", "12 個", ["10 個", "16 個", "60 個"], "一打 = 12，不是十進制。"),
    tq("basic", "1 斤等於多少両？", "16 両", ["10 両", "12 両", "100 両"], "斤和両是非十進制，1 斤 = 16 両。"),
    tq("basic", "1 呎等於多少吋？", "12 吋", ["10 吋", "16 吋", "100 吋"], "1 呎 = 12 吋。"),
    tq("basic", "1 磅等於多少安士？", "16 安士", ["10 安士", "12 安士", "60 安士"], "1 磅 = 16 安士。"),
  ];
  for (const dozen of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    out.push(nq("basic", `${dozen} 打氣球有多少個？`, dozen * 12, [dozen * 10, dozen, dozen * 16], `${dozen} × 12 = ${dozen * 12}。`));
  }
  for (const [catty, tael] of [[7, 9], [3, 5], [2, 8], [11, 12], [4, 0], [6, 4], [8, 11], [1, 3]] as [number, number][]) {
    out.push(nq("basic", `${catty} 斤 ${tael} 両等於多少両？（1 斤 = 16 両）`, catty * 16 + tael, [catty * 10 + tael, catty + tael, catty * 12 + tael], `${catty} × 16 + ${tael} = ${catty * 16 + tael} 両。`));
  }
  for (const [foot, inch] of [[8, 11], [3, 6], [5, 0], [2, 9], [6, 8], [4, 3], [7, 10]] as [number, number][]) {
    out.push(nq("basic", `${foot} 呎 ${inch} 吋等於多少吋？（1 呎 = 12 吋）`, foot * 12 + inch, [foot * 10 + inch, foot * 16 + inch, inch], `${foot} × 12 + ${inch} = ${foot * 12 + inch} 吋。`));
  }
  return out;
}

function baseCore(): Raw[] {
  const out: Raw[] = [];
  const checks: [string, string, boolean, string][] = [
    ["7 斤 9 両 = 79 両", "不正確，是 121 両", false, "7 × 16 + 9 = 121，不是 79。"],
    ["8 呎 11 吋 = 107 吋", "正確", true, "8 × 12 + 11 = 107。"],
    ["11 磅 12 安士 = 188 安士", "正確", true, "11 × 16 + 12 = 188。"],
    ["135 吋 = 8 呎 7 吋", "不正確，是 11 呎 3 吋", false, "135 ÷ 12 = 11 餘 3。"],
    ["200 両 = 12 斤 8 両", "正確", true, "200 ÷ 16 = 12 餘 8。"],
    ["147 安士 = 12 磅 3 安士", "不正確，是 9 磅 3 安士", false, "147 ÷ 16 = 9 餘 3。"],
  ];
  for (const [claim, answer, , why] of checks) {
    out.push(tq("core", `「${claim}」對嗎？`, answer, ["正確", "不正確，要當成十進制", "單位不能互換"].filter((item) => item !== answer), why));
  }
  for (const total of [121, 79, 200, 147, 135, 107, 188, 64, 80, 95, 160, 50]) {
    const catty = Math.floor(total / 16);
    const tael = total % 16;
    out.push(tq("core", `${total} 両等於多少斤多少両？`, `${catty} 斤 ${tael} 両`, [`${Math.floor(total / 10)} 斤 ${total % 10} 両`, `${total} 斤 0 両`, `${catty + 1} 斤 ${tael} 両`], `${total} ÷ 16 = ${catty} 餘 ${tael}。`));
    const foot = Math.floor(total / 12);
    const inch = total % 12;
    out.push(tq("core", `${total} 吋等於多少呎多少吋？`, `${foot} 呎 ${inch} 吋`, [`${Math.floor(total / 10)} 呎 ${total % 10} 吋`, `${foot} 呎 ${inch + 1} 吋`, `${inch} 呎 ${foot} 吋`], `${total} ÷ 12 = ${foot} 餘 ${inch}。`));
    const pound = Math.floor(total / 16);
    const ounce = total % 16;
    out.push(tq("core", `${total} 安士等於多少磅多少安士？`, `${pound} 磅 ${ounce} 安士`, [`${Math.floor(total / 10)} 磅 ${total % 10} 安士`, `${ounce} 磅 ${pound} 安士`, `${pound} 磅 ${16} 安士`], `${total} ÷ 16 = ${pound} 餘 ${ounce}。`));
  }
  return out;
}

function baseHard(): Raw[] {
  const out: Raw[] = [];
  const rows: [string, number, string][] = [
    ["2 呎 9 吋等於多少厘米？（1 吋 = 2.54 厘米）", 33 * 2.54, "33 × 2.54 = 83.82。"],
    ["1.3 米約等於多少吋？取至整數。（1 吋 = 2.54 厘米）", Math.round(130 / 2.54), "130 ÷ 2.54 ≈ 51.18，取至整數是 51。"],
    ["2 斤 8 両等於多少公斤？（1 斤 = 0.6 公斤，1 斤 = 16 両）", 2.5 * 0.6, "2 斤 8 両 = 2.5 斤。2.5 × 0.6 = 1.5 公斤。"],
    ["1.3 公斤約等於多少斤？取至兩位小數。（1 斤 = 0.6 公斤）", roundTo(1.3 / 0.6, 2), "1.3 ÷ 0.6 ≈ 2.17 斤。"],
    ["9.2 磅約等於多少公斤？取至兩位小數。（1 磅 = 0.454 公斤）", roundTo(9.2 * 0.454, 2), "9.2 × 0.454 = 4.1768，約 4.18 公斤。"],
    ["1500 克約等於多少磅？取至兩位小數。（1 磅 = 0.454 公斤）", roundTo(1.5 / 0.454, 2), "1.5 ÷ 0.454 ≈ 3.30 磅。"],
  ];
  for (const [stem, answer, why] of rows) {
    out.push(nq("hard", stem, answer, [roundTo(answer + 1, 2), roundTo(answer / 10, 2), roundTo(answer * 10, 2)], why));
  }
  const lastYearCm = 134.7;
  const thisFt = 4;
  const thisIn = 6;
  const thisCm = roundTo((thisFt * 12 + thisIn) * 2.54, 1);
  const lastKg = 28.1;
  const thisLb = 65.2;
  const thisKg = roundTo(thisLb * 0.454, 1);
  out.push(
    nq("hard", "今年身高 4 呎 6 吋。以 1 吋 = 2.54 厘米，約多少厘米？（取至一位小數）", thisCm, [lastYearCm, 46, 140], `54 × 2.54 = 137.16，取至一位小數是 ${fmt(thisCm)} 厘米。`),
    nq("hard", `今年 ${fmt(thisCm)} 厘米，去年 ${lastYearCm} 厘米。高了多少厘米？`, money(thisCm - lastYearCm), [thisCm, lastYearCm, 4.6], `${fmt(thisCm)} − ${lastYearCm} = ${fmt(thisCm - lastYearCm)}。`),
    nq("hard", "今年體重 65.2 磅。以 1 磅 = 0.454 公斤，約多少公斤？（取至一位小數）", thisKg, [65.2, 28.1, 6.5], `65.2 × 0.454 = 29.6008，約 ${fmt(thisKg)} 公斤。`),
    nq("hard", `今年約 ${fmt(thisKg)} 公斤，去年 ${lastKg} 公斤。重了多少公斤？`, money(thisKg - lastKg), [thisKg, lastKg, 65.2], `${fmt(thisKg)} − ${lastKg} = ${fmt(thisKg - lastKg)}。`),
  );
  for (const dozen of [2, 3, 4, 5, 6]) {
    for (const extra of [3, 5, 7, 8]) {
      out.push(nq("hard", `${dozen} 打又 ${extra} 個，共有多少個？`, dozen * 12 + extra, [dozen * 10 + extra, dozen * 16 + extra, extra * 12], `${dozen} × 12 + ${extra} = ${dozen * 12 + extra}。不要把它當成十進制。`));
    }
  }
  out.push(
    nq("hard", "橡皮糖成本每磅 20 元，售價每 100 克 8 元。每磅約賺多少元？（1 磅 = 0.454 公斤，取至一位小數）", roundTo(8 * 4.54 - 20, 1), [8, 20, 36.3], "454 克約是 4.54 個 100 克。8 × 4.54 − 20 = 16.32，約 16.3 元。"),
    tq("hard", "非十進制和小數的十進位，應該怎樣看？", "不要混成同一個必學目標", ["完全相同", "非十進制就是除以 10", "只在小數課題出現"], "斤両、呎吋、磅安士、打和時間都是增潤裏的非十進制。小數點移位在小數課題。"),
  );
  return out;
}

function topUps(): Record<string, Record<Level, Raw[]>> {
  const bag: Record<string, Record<Level, Raw[]>> = {};
  const add = (id: string, item: Raw) => {
    bag[id] ??= { basic: [], core: [], hard: [] };
    if (item.wrong.length >= 3) bag[id][item.level].push(item);
  };
  for (let count = 4; count <= 7; count += 1) {
    for (const mean of [8, 10, 12, 15, 18, 20]) {
      for (const one of [mean + 3, mean - 3, mean + 6]) {
        if (one <= 0) continue;
        const restTotal = mean * count - one;
        if (restTotal <= 0 || restTotal % (count - 1) !== 0) continue;
        const rest = restTotal / (count - 1);
        add("6D1", nq("hard", `記分牌：${count} 人平均 ${mean} 分，一人得 ${one} 分。其餘 ${count - 1} 人平均多少分？`, rest, [mean, one, restTotal], `合計 ${mean * count}。其餘 ${restTotal} ÷ ${count - 1} = ${rest}。`));
      }
    }
  }
  for (const whole of [20, 40, 50, 80, 100, 200]) {
    for (const part of [5, 10, 15, 20, 25, 30]) {
      if (part >= whole || (part / whole) * 100 % 1 !== 0) continue;
      const pct = (part / whole) * 100;
      add("6N4", nq("hard", `攤檔有 ${whole} 枝鉛筆，送出 ${part} 枝後，送出的是原來的百分之幾？`, pct, [part, whole - part, pct + 10], `${part} ÷ ${whole} = ${pct}%。`));
      add("6N4", nq("hard", `${whole} 元的禮品加價 ${pct}% ，新價錢是多少元？`, money(whole * (1 + pct / 100)), [whole + pct, whole - pct, pct], `${whole} × ${fmt(1 + pct / 100)} = ${fmt(whole * (1 + pct / 100))}。`));
    }
  }
  for (const [l, w, water, bead] of [[12, 10, 600, 30], [15, 8, 480, 40], [9, 8, 288, 24], [14, 5, 280, 20], [16, 6, 384, 32], [18, 4, 216, 18], [11, 8, 352, 22], [13, 6, 312, 26]] as [number, number, number, number][]) {
    const cap = l * w * 10;
    const space = cap - water;
    const count = Math.floor(space / bead);
    if (count < 1) continue;
    add("6M2", nq("hard", `沙池旁的箱是 ${l} cm × ${w} cm × 10 cm，已有水 ${water} cm³。每粒石 ${bead} cm³，最多放多少粒才不溢出？`, count, [count + 1, space, water], `空間 ${cap} − ${water} = ${space}。${space} ÷ ${bead} 得 ${count} 粒。`));
  }
  for (const d of [2, 3, 4, 5, 6, 8, 9, 11, 12, 13, 16, 18, 22, 24, 26, 30]) {
    add("6M3", nq("basic", `摩天輪外圈直徑 ${d} 米，π 取 3.14。一圈大約多少米？`, money(3.14 * d), [money(3.14 * d * 2), money(3.14 * d / 2), d + 3], `圓周 = 3.14 × ${d} = ${fmt(3.14 * d)}。`));
    add("6M3", nq("core", `半圓花拱直徑 ${d} 米，π 取 3.14。半圓周加直徑的周界是多少米？`, money(3.14 * d) / 2 + d, [money(3.14 * d), d, money(3.14 * d) / 2], `半圓周 ${fmt(money(3.14 * d) / 2)} + 直徑 ${d}。`));
    add("6M3", nq("hard", `燈帶長 ${fmt(money(3.14 * d))} 米剛好圍成一圈，π 取 3.14。直徑是多少米？`, d, [money(3.14 * d), d * 2, d / 2 || 1], `直徑 = 圓周 ÷ 3.14 = ${d}。`));
  }
  for (const r of [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 15]) {
    const area = money(3.14 * r * r);
    add("6M5", nq("basic", `旋轉杯圓台半徑 ${r} 米，π 取 3.14。面積是多少平方米？`, area, [money(3.14 * r * 2), money(area / 2), r * r], `πr² = 3.14 × ${r} × ${r} = ${fmt(area)}。`));
    add("6M5", nq("core", `半徑 ${r} 米的圓舞台用去一半，π 取 3.14。餘下多少平方米？`, area / 2, [area, area / 4, r], `全圓 ${fmt(area)} 的一半是 ${fmt(area / 2)}。`));
    add("6M5", nq("hard", `長 ${r * 2} 米、闊 ${r} 米的長方形，再加上半徑 ${r} 米的半圓，π 取 3.14。總面積是多少？`, r * 2 * r + area / 2, [r * 2 * r, area, area / 2], `長方形 ${r * 2 * r}，半圓 ${fmt(area / 2)}，合計 ${fmt(r * 2 * r + area / 2)}。`));
  }
  for (const known of [15, 25, 32, 48, 55, 63, 72, 81, 100, 110, 125, 140, 155, 20, 40, 75]) {
    add("6M1", nq("core", `滑梯扶手和地面成一平角，已畫了 ${known}°。另一邊是多少度？`, 180 - known, [known, 90 - (known % 90), 360 - known], `180 − ${known} = ${180 - known}。`));
    const left = 360 - known - 40;
    if (left > 0 && left < 360) add("6M1", nq("hard", `繞柱四角已知 ${known}°、40° 和 90°。最後一角是多少度？`, 360 - known - 40 - 90, [known, 180, 90], `360 − ${known} − 40 − 90 = ${360 - known - 130}。`));
  }
  for (const deg of [30, 45, 60, 90, 120, 135, 180, 270, 300, 45]) {
    for (const total of [60, 80, 120, 160, 240, 360]) {
      if ((deg / 360) * total % 1 !== 0) continue;
      const answer = (deg / 360) * total;
      add("6D3", nq("basic", `大轉盤上 ${deg}° 的一格，全日共 ${total} 人。這一格有多少人？`, answer, [deg, total, answer * 2 || 1], `${deg}/360 × ${total} = ${answer}。`));
      add("6D3", nq("core", `圓形圖用 ${deg}° 表示休息，總時間 ${total} 分鐘。休息了多少分鐘？`, answer, [deg, total / 2, answer + deg], `圓心角 ${deg}° 是全圓的 ${frac(deg, 360)}，所以是 ${answer} 分鐘。`));
      add("6D3", tq("hard", `甲場 ${total} 人中休息佔 ${deg}°，乙場 ${total * 2} 人中休息也佔 ${deg}°。哪句對？`, "乙場休息人數是甲場的 2 倍", ["兩場休息人數一樣", "甲場較多", "不能把角度化成人數"], `角度一樣，總數 2 倍，人數也是 2 倍：甲 ${answer} 人，乙 ${answer * 2} 人。`));
    }
  }
  for (const mins of [6, 9, 18, 21, 27, 33, 42, 54, 72, 84, 96, 108]) {
    add("6M4", nq("basic", `排隊 ${mins} 分鐘，等於多少小時？`, mins / 60, [mins / 10, mins / 100, mins], `${mins} ÷ 60 = ${fmt(mins / 60)} 小時。`));
  }
  for (const [km, hours] of [[12, 0.5], [18, 0.75], [24, 1.5], [30, 0.6], [36, 0.8], [48, 1.2], [15, 0.25], [21, 0.75], [40, 0.8], [54, 1.5], [16, 0.4], [28, 0.7]] as [number, number][]) {
    add("6M4", nq("core", `小火車行了 ${km} 公里，用了 ${fmt(hours)} 小時。速率是多少公里每小時？`, money(km / hours), [money(km * hours), hours, km], `${km} ÷ ${fmt(hours)} = ${fmt(km / hours)} 公里每小時。`));
    add("6M4", nq("hard", `速率 ${money(km / hours)} 公里每小時，行 ${fmt(hours)} 小時。路程是多少公里？`, km, [money(km / hours), hours, km * 10], `路程 = 速率 × 時間 = ${fmt(km / hours)} × ${fmt(hours)} = ${km}。`));
  }
  for (let i = 1; i <= 20; i += 1) {
    const addend = money(i * 0.5);
    add("6A1", nq("basic", `解方程 x + ${fmt(addend)} = ${fmt(addend + 4)}。x = ？`, 4, [addend, addend + 4, 8], `兩邊減 ${fmt(addend)}，x = 4。代回去核對。`));
    add("6A1", nq("core", `解方程 ${i}(x − 1) = ${i * 3}。x = ？`, 4, [3, i, i * 3], `兩邊除以 ${i}，x − 1 = 3，x = 4。`));
    add("6A1", nq("hard", `禮品比氣球貴 ${i * 5}%，禮品售 ${money(20 * (1 + (i * 5) / 100))} 元。氣球售多少元？`, 20, [money(20 * (1 + (i * 5) / 100)), i * 5, 25], `設氣球 x 元。x × ${fmt(1 + (i * 5) / 100)} = ${fmt(20 * (1 + (i * 5) / 100))}，x = 20。`));
  }
  const hours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  for (const start of [4, 6, 8, 10, 12, 15, 18]) {
    const values = hours.map((_, index) => start + index * 3 - (index === 4 ? 8 : 0));
    const downAt = values.findIndex((value, index) => index > 0 && value < values[index - 1]!);
    add("6D2", tq("basic", `人龍人數：${hours.map((hour, index) => `${hour} ${values[index]} 人`).join("，")}。哪一小時比上一小時少？`, hours[downAt] ?? hours[1]!, hours.filter((_, index) => index !== downAt).slice(0, 3), "向下的一段就是減少。"));
    add("6D2", nq("core", `同一條人龍，由 ${hours[0]} 的 ${values[0]} 人到 ${hours[5]} 的 ${values[5]} 人，相差多少人？`, Math.abs(values[5]! - values[0]!), [values[5]!, values[0]!, values[5]! + values[0]!], `${values[5]} − ${values[0]} = ${values[5]! - values[0]}。`));
    add("6D2", tq("hard", `如果把這條人龍的縱軸改成每格只代表 1 人，由 ${values[0]} 畫到 ${values[1]}，觀感會怎樣？`, "升幅看起來較陡，但實際只多了 3 人", ["人數真的多了 30 人", "折線圖不能表示人數", "縱軸不影響閱讀"], `實際是 ${values[1]} − ${values[0]} = 3 人。一格代表多少會改變觀感。`));
  }
  const scenes: [string, string][] = [
    ["比較四款糖果各自賣出多少包", "棒形圖"],
    ["顯示上午每小時入場人數的變化", "折線圖"],
    ["顯示一班最喜歡的遊戲佔全部的比例", "圓形圖"],
    ["比較兩天成人和兒童的人數", "棒形圖"],
    ["顯示六個月營業額的升跌", "折線圖"],
    ["顯示三種票種各佔當日總票數的多少", "圓形圖"],
  ];
  for (const [scene, answer] of scenes) {
    add("6D4", tq("basic", `海報想${scene}。哪種圖較合適？`, answer, ["折線圖", "棒形圖", "圓形圖", "不用畫圖"].filter((item) => item !== answer), "看各項數量用棒形，看變化用折線，看佔全部多少用圓形。"));
  }
  for (const [a, b] of [[30, 60], [40, 80], [25, 40], [18, 36], [22, 50], [15, 45], [16, 40], [28, 70]] as [number, number][]) {
    const half = a * 2 === b;
    add("6D4", tq("core", `星期六兒童 ${a} 人，星期日兒童 ${b} 人。有人說星期六是星期日的一半。這句話？`, half ? "正確" : "不正確", ["正確", "不正確", "棒形圖不能比較人數", "只要柱子較矮就是一半"].filter((item) => item !== (half ? "正確" : "不正確")), half ? `${a} × 2 = ${b}。` : `${b} 的一半是 ${b / 2}，不是 ${a}。`));
    add("6D4", tq("hard", `甲組 ${a} 人裏有一半達標，乙組 ${b} 人裏有 25% 達標。達標人數誰多？`, a / 2 === b / 4 ? "一樣多" : a / 2 > b / 4 ? "甲組" : "乙組", ["甲組", "乙組", "一樣多", "百分數高的一定人數多"].filter((item, index, list) => list.indexOf(item) === index && item !== (a / 2 === b / 4 ? "一樣多" : a / 2 > b / 4 ? "甲組" : "乙組")), `甲組 ${fmt(a / 2)} 人，乙組 ${fmt(b / 4)} 人。`));
  }
  for (let n = 3; n <= 16; n += 1) {
    add("6S1", tq("basic", `鏡屋裏的正${n}邊形窗，有多少條對稱軸？`, `${n} 條`, [`${n - 1} 條`, `${n + 1} 條`, "1 條"], `正多邊形的對稱軸數等於邊數。`));
    add("6S1", nq("core", `方格紙上，圖案在摺線左面 ${n} 格。右面的對應位置距離摺線多少格？`, n, [n + 1, Math.max(1, n - 1), n * 2], "到對稱軸的距離左右相同。"));
    add("6S1", tq("hard", `只沿一邊對摺，正${n}邊形還有沒有未畫出的對稱軸？`, n > 1 ? `還有 ${n - 1} 條` : "沒有", ["一條都沒有", `還有 ${n} 條`, "正多邊形沒有對稱軸"], `一共 ${n} 條，畫了一條還剩 ${n - 1} 條。`));
  }
  for (let order = 3; order <= 12; order += 1) {
    if (360 % order !== 0) continue;
    add("enrich-turn", nq("basic", `風車上的正${order}邊形，旋轉一周會重疊多少次？`, order, [1, order + 1, order * 2], `正${order}邊形重疊 ${order} 次，所以是旋轉對稱。`));
    add("enrich-turn", nq("core", `旋轉一周重疊 ${order} 次的風車，最少轉多少度會再重合？`, 360 / order, [order, 180, 360], `360 ÷ ${order} = ${fmt(360 / order)} 度。`));
    add("enrich-turn", tq("hard", `重疊 ${order} 次的圖形，和「只有 1 條對稱軸、旋轉只重疊 1 次」的旗相比，哪句對？`, "前者是旋轉對稱，後者不是", ["兩者都是旋轉對稱", "兩者都不是", "有對稱軸就一定有旋轉對稱"], "重疊多於 1 次才是旋轉對稱。軸對稱和旋轉對稱要分開看。"));
  }
  for (const dozen of [11, 12, 13, 14, 15]) add("enrich-base", nq("basic", `打氣檔賣出 ${dozen} 打氣球。一共多少個？`, dozen * 12, [dozen * 10, dozen * 16, dozen], `${dozen} × 12 = ${dozen * 12}。`));
  for (const total of [19, 27, 33, 41, 58]) {
    add("enrich-base", tq("hard", `${total} 両是多少斤多少両？（1 斤 = 16 両）`, `${Math.floor(total / 16)} 斤 ${total % 16} 両`, [`${Math.floor(total / 10)} 斤 ${total % 10} 両`, `${total} 斤`, `${total % 16} 斤 ${Math.floor(total / 16)} 両`], `${total} ÷ 16 = ${Math.floor(total / 16)} 餘 ${total % 16}。`));
  }
  const safe = (id: string, level: Level, stem: string, answer: number, why: string) => {
    const text = fmt(answer);
    const wrongs = [fmt(answer + 1), fmt(answer + 2), fmt(answer * 10), fmt(Math.abs(answer - 2))].filter((item) => item && item !== text);
    add(id, tq(level, stem, text, wrongs, why));
  };
  for (let n = 3; n <= 28; n += 1) {
    safe("6M2", "hard", `長 ${n} cm、闊 ${n + 1} cm、高 4 cm 的箱，容量是多少毫升？`, n * (n + 1) * 4, `${n} × ${n + 1} × 4 = ${n * (n + 1) * 4} mL。`);
    safe("6M5", "basic", `圓墊半徑 ${n} 厘米，π 取 3.14。面積是多少平方厘米？`, money(3.14 * n * n), `3.14 × ${n} × ${n} = ${fmt(3.14 * n * n)}。`);
    safe("6M5", "core", `半徑 ${n} 厘米的圓只取四分之一，π 取 3.14。面積是多少平方厘米？`, money(3.14 * n * n) / 4, "全圓的四分之一。");
    safe("6M5", "hard", `半徑 ${n} 厘米的圓減去四分之一，π 取 3.14。餘下多少平方厘米？`, money((3.14 * n * n * 3) / 4), "留下四分之三。");
    safe("6M1", "hard", `平角剪去 ${n}° 後，剩下多少度？`, 180 - n, `180 − ${n} = ${180 - n}。`);
    safe("6D3", "hard", `全日 ${n * 12} 張票，摩天輪在圓形圖佔 30°。摩天輪有多少張票？`, n, `30/360 = 1/12，${n * 12} 的十二分之一是 ${n}。`);
    safe("6M4", "core", `步行 ${n * 3} 公里用了半小時。速率是多少公里每小時？`, n * 6, `${n * 3} ÷ 0.5 = ${n * 6}。`);
    safe("6M4", "hard", `速率每秒 ${n * 2} 米，行了 ${n + 4} 秒。路程是多少米？`, n * 2 * (n + 4), "路程 = 速率 × 時間，單位保持米和秒。");
    safe("6D2", "basic", `人龍由 ${n * 5} 人變成 ${n * 5 - 2} 人。減少了多少人？`, 2, `${n * 5} − ${n * 5 - 2} = 2。`);
    safe("6D2", "core", `入場由 ${n * 8} 人升至 ${n * 8 + 6} 人。增加了多少人？`, 6, "後者減前者。");
    safe("6D2", "hard", `折線上升 2 格，每格代表 ${n} 人。實際增加多少人？`, n * 2, `2 × ${n} = ${n * 2}。線很陡不代表增加很多。`);
    safe("6D4", "basic", `用棒形圖比較 ${n} 款遊戲的票數。圖上應有多少條棒？`, n, "一款遊戲一條棒。");
    safe("6D4", "core", `圓形圖佔 ${n}%，總數 200 人。實際有多少人？`, n * 2, `200 × ${n}% = ${n * 2}。`);
    safe("6D4", "hard", `兩個圖都是 ${n}%。甲總數 200 人，乙總數 100 人。甲比乙多多少人？`, n, `甲 ${n * 2} 人，乙 ${n} 人。`);
    safe("6S1", "core", `摺痕左面 ${n + 2} 格處有一點。右面對應點離摺痕多少格？`, n + 2, "到對稱軸的距離相同。");
    if (360 % (n * 10) === 0) safe("enrich-turn", "core", `風車每 ${n * 10} 度重合一次。轉完一周重合多少次？`, 360 / (n * 10), `360 ÷ ${n * 10} = ${360 / (n * 10)}。`);
  }
  return bag;
}

export function buildWorksheetBanks(): Record<string, BankQuestion[]> {
  const extra = topUps();
  const jobs: [string, () => BankQuestion[]][] = [
    ["6N1", () => take("6N1", divBasic(), divCore(), divHard())],
    ["6N2", () => take("6N2", fracBasic(), fracCore(), fracHard())],
    ["6D1", () => {
      const sheet = meanQuestions();
      return take(
        "6D1",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6N3", () => {
      const sheet = percentQuestions();
      return take(
        "6N3",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6N4", () => {
      const sheet = percent2Questions();
      return take(
        "6N4",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6M2", () => {
      const sheet = volumeQuestions();
      return take(
        "6M2",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6M3", () => {
      const sheet = perimeterQuestions();
      return take(
        "6M3",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6M5", () => {
      const sheet = areaQuestions();
      return take(
        "6M5",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6M1", () => {
      const sheet = angleQuestions();
      return take(
        "6M1",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6D3", () => take("6D3", pieBasic().concat(extra["6D3"]?.basic ?? []), pieCore().concat(extra["6D3"]?.core ?? []), pieHard().concat(extra["6D3"]?.hard ?? []))],
    ["6M4", () => {
      const sheet = speedQuestions();
      return take(
        "6M4",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6A1", () => {
      const sheet = equationQuestions();
      return take(
        "6A1",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6D2", () => {
      const sheet = lineQuestions();
      return take(
        "6D2",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6D4", () => {
      const sheet = misuseQuestions();
      return take(
        "6D4",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["6S1", () => {
      const sheet = symmetryQuestions();
      return take(
        "6S1",
        sheet.filter((item) => item.level === "basic"),
        sheet.filter((item) => item.level === "core"),
        sheet.filter((item) => item.level === "hard"),
      );
    }],
    ["enrich-turn", () => take("enrich-turn", turnBasic().concat(extra["enrich-turn"]?.basic ?? []), turnCore().concat(extra["enrich-turn"]?.core ?? []), turnHard().concat(extra["enrich-turn"]?.hard ?? []))],
    ["enrich-base", () => take("enrich-base", baseBasic().concat(extra["enrich-base"]?.basic ?? []), baseCore(), baseHard().concat(extra["enrich-base"]?.hard ?? []))],
  ];
  const bank: Record<string, BankQuestion[]> = {};
  const errors: string[] = [];
  for (const [id, job] of jobs) {
    try {
      bank[id] = job();
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }
  if (errors.length) throw new Error(errors.join("\n"));
  return bank;
}
