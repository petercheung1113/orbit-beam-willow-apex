import { useEffect, useState } from "react";
import { CheckNote, Panel, gcd, tidy } from "@/components/park/bits";

export function DecimalRide({ onClear }: { onClear: () => void }) {
  const [n, setN] = useState(36.9);
  const [note, setNote] = useState("按一下，看小數點怎樣走。");
  const [seenLeft, setSeenLeft] = useState(false);
  const [seenRight, setSeenRight] = useState(false);

  useEffect(() => {
    if (seenLeft && seenRight) onClear();
  }, [seenLeft, seenRight, onClear]);

  const ops = [
    { label: "÷ 10", by: 10, dir: "左", step: 1, side: "L" as const },
    { label: "÷ 100", by: 100, dir: "左", step: 2, side: "L" as const },
    { label: "÷ 1000", by: 1000, dir: "左", step: 3, side: "L" as const },
    { label: "÷ 0.1", by: 0.1, dir: "右", step: 1, side: "R" as const },
    { label: "÷ 0.01", by: 0.01, dir: "右", step: 2, side: "R" as const },
    { label: "÷ 0.001", by: 0.001, dir: "右", step: 3, side: "R" as const },
  ];

  return (
    <Panel kicker="6N1 · 動手" title="小數點滑軌">
      <p className="mb-3 text-sm text-muted">先估算，再按。左右兩邊都試過，就可以蓋章。</p>
      <p className="mb-4 text-center text-4xl tabular-nums text-ink">{tidy(n)}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ops.map((op) => (
          <button
            key={op.label}
            type="button"
            className="min-h-11 rounded-full border border-line bg-cream px-3 text-ink"
            onClick={() => {
              setN((v) => Math.round((v / op.by) * 1e6) / 1e6);
              setNote(`除以 ${op.by}，小數點向${op.dir}移 ${op.step} 位。`);
              if (op.side === "L") setSeenLeft(true);
              else setSeenRight(true);
            }}
          >
            {op.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-grass" role="status">{note}</p>
      <button type="button" className="mt-3 text-sm text-muted underline" onClick={() => setN(36.9)}>
        回到 36.9
      </button>
    </Panel>
  );
}

export function FractionRide({ onClear }: { onClear: () => void }) {
  const pairs = [
    { dec: "0.7", frac: "7/10", ok: "7/10" },
    { dec: "0.12", frac: "3/25", ok: "3/25" },
    { dec: "0.375", frac: "3/8", ok: "3/8" },
  ];
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const item = pairs[i];
  const choices = ["7/10", "3/25", "3/8", "1/4"];
  const right = pick === item.ok;

  return (
    <Panel kicker="6N2 · 動手" title="糖畫對對碰">
      <p className="text-sm text-muted">把小數和分數配成同一份糖。</p>
      <p className="my-4 text-center text-4xl tabular-nums">{item.dec}</p>
      <div className="grid grid-cols-2 gap-2">
        {choices.map((c) => (
          <button
            key={c}
            type="button"
            className={
              "min-h-11 rounded-xl border px-3 " +
              (pick === c ? "border-grass bg-cream" : "border-line bg-paper")
            }
            onClick={() => {
              setPick(c);
              if (c === item.ok) onClear();
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <CheckNote ok={pick === null ? null : right}>
        {right
          ? i < pairs.length - 1
            ? "對上了。"
            : "三款都對得上。3/8 = 0.375，可以用來和 0.4 比較。"
          : "再看分母。0.7 是十分位，0.12 是百分位。"}
      </CheckNote>
      {right && i < pairs.length - 1 && (
        <button
          type="button"
          className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper"
          onClick={() => {
            setI((n) => n + 1);
            setPick(null);
          }}
        >
          下一款
        </button>
      )}
    </Panel>
  );
}

export function PercentGrid({ onClear }: { onClear: () => void }) {
  const targets = [20, 35, 100];
  const [ti, setTi] = useState(0);
  const [on, setOn] = useState<boolean[]>(() => Array(100).fill(false));
  const count = on.filter(Boolean).length;
  const target = targets[ti];
  const hit = count === target;
  const g = gcd(count, 100);

  useEffect(() => {
    if (hit) onClear();
  }, [hit, onClear]);

  return (
    <Panel kicker="6N3 · 動手" title="一百面彩旗">
      <p className="text-sm text-muted">塗到 {target}% 。100% 就是全部旗。</p>
      <div className="mt-3 grid grid-cols-10 gap-1" aria-label="一百格">
        {on.map((cell, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={cell}
            className={"h-6 rounded-sm sm:h-7 " + (cell ? "bg-coral" : "bg-line")}
            onClick={() => setOn((prev) => prev.map((v, j) => (j === i ? !v : v)))}
          />
        ))}
      </div>
      <p className="mt-3 tabular-nums text-ink">
        {count}%　=　{count / 100}　=　{count === 0 ? "0" : `${count / g}/${100 / g}`}
      </p>
      <CheckNote ok={hit ? true : null}>塗好了。百分數、小數、最簡分數是同一件事的三種寫法。</CheckNote>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="min-h-11 rounded-full border border-line px-4" onClick={() => setOn(Array(100).fill(false))}>
          清空
        </button>
        {ti < targets.length - 1 && hit && (
          <button
            type="button"
            className="min-h-11 rounded-full bg-grass px-4 text-paper"
            onClick={() => {
              setTi((n) => n + 1);
              setOn(Array(100).fill(false));
            }}
          >
            下一個目標
          </button>
        )}
      </div>
    </Panel>
  );
}

export function PercentShop({ onClear }: { onClear: () => void }) {
  const [price, setPrice] = useState(50);
  const up = Math.round(price * 1.1 * 100) / 100;
  const down = Math.round(price * 0.9 * 100) / 100;
  const [guess, setGuess] = useState("");
  const n = Number(guess);
  const ok = Number.isFinite(n) && Math.abs(n - up) < 0.001;

  return (
    <Panel kicker="6N4 · 動手" title="加價與減價">
      <p className="text-sm text-muted">只做「增加或減少一個百分數之後是多少」。不做折扣和利息。</p>
      <label className="mt-3 flex items-center gap-3">
        <span>原價</span>
        <input
          inputMode="decimal"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value) || 0)}
          className="min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
        />
        <span>元</span>
      </label>
      <p className="mt-3">減少 10% 後：<span className="tabular-nums font-medium">{tidy(down)} 元</span></p>
      <label className="mt-3 flex flex-wrap items-center gap-2">
        <span>增加 10% 後是</span>
        <input
          inputMode="decimal"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
          aria-label="加價後的價錢"
        />
        <span>元</span>
        <button
          type="button"
          className="min-h-11 rounded-full bg-grass px-4 text-paper"
          onClick={() => {
            if (ok) onClear();
          }}
        >
          核對
        </button>
      </label>
      <CheckNote ok={guess === "" ? null : ok}>
        {ok ? `對。${tidy(price)} × 110% = ${tidy(up)}。` : `想想原價的 10% 是多少，再加回去。`}
      </CheckNote>
    </Panel>
  );
}

const EQUATIONS = [
  {
    label: "3x + 1.5 = 7.5",
    answer: 2,
    check: (x: number) => Math.abs(3 * x + 1.5 - 7.5) < 0.001,
    why: "兩邊減 1.5，得 3x = 6，x = 2。驗算：3×2 + 1.5 = 7.5。",
  },
  {
    label: "x + 2.5 = 8",
    answer: 5.5,
    check: (x: number) => Math.abs(x + 2.5 - 8) < 0.001,
    why: "兩邊減 2.5，x = 5.5。",
  },
  {
    label: "0.75x = 30",
    answer: 40,
    check: (x: number) => Math.abs(0.75 * x - 30) < 0.001,
    why: "兩邊除以 0.75，x = 40。這是「求原本的數」。",
  },
];

export function SeesawRide({ onClear }: { onClear: () => void }) {
  const [ei, setEi] = useState(0);
  const [raw, setRaw] = useState("");
  const eq = EQUATIONS[ei];
  const n = Number(raw);
  const known = raw.trim() !== "" && Number.isFinite(n);
  const ok = known && eq.check(n);
  const tilt = !known ? 0 : Math.max(-16, Math.min(16, (n - eq.answer) * 4));

  return (
    <Panel kicker="6A1 · 動手" title="蹺蹺板">
      <div className="mb-2 flex flex-wrap gap-2">
        {EQUATIONS.map((e, i) => (
          <button
            key={e.label}
            type="button"
            className={
              "min-h-11 rounded-full border px-3 text-sm " +
              (i === ei ? "border-grass bg-cream" : "border-line")
            }
            onClick={() => {
              setEi(i);
              setRaw("");
            }}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-6 h-28 w-full max-w-sm">
        <div className="relative h-16" style={{ transform: `rotate(${tilt}deg)` }}>
          <div className="absolute top-6 right-0 left-0 h-2 rounded-full bg-sun" />
          <div className="absolute top-0 left-2 flex size-14 items-center justify-center rounded-full bg-coral text-xs text-paper">
            左
          </div>
          <div className="absolute top-0 right-2 flex size-14 items-center justify-center rounded-full bg-grass text-xs text-paper">
            右
          </div>
        </div>
        <div className="mx-auto h-8 w-2 bg-ink" />
      </div>
      <label className="mt-2 flex items-center justify-center gap-2">
        <span>x =</span>
        <input
          inputMode="decimal"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
          aria-label="未知數"
        />
      </label>
      <CheckNote ok={known ? ok : null}>
        {ok ? eq.why : "板還沒有平。等號兩邊要一樣重。"}
      </CheckNote>
      {ok && (
        <button type="button" className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper" onClick={onClear}>
          驗算完成，蓋章
        </button>
      )}
    </Panel>
  );
}
