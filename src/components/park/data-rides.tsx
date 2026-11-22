import { useMemo, useState } from "react";
import { CheckNote, Panel } from "@/components/park/bits";

const SCORES = [4, 8, 6, 10];

export function MeanRide({ onClear }: { onClear: () => void }) {
  const [flat, setFlat] = useState(false);
  const mean = 7;
  const shown = flat ? SCORES.map(() => mean) : SCORES;
  return (
    <Panel kicker="6D1 · 動手" title="把柱子填平">
      <p className="text-sm text-muted">先估一條橫線，再想像把高出的部分填去矮柱。填平之後就是平均數。</p>
      <div className="mt-4 flex h-40 items-end gap-3">
        {shown.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-t-lg bg-grass" style={{ height: `${v * 10}%` }} />
            <span className="text-sm tabular-nums">{v}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper"
        onClick={() => {
          setFlat(true);
          onClear();
        }}
      >
        {flat ? `平均值是 ${mean}` : "試着填平"}
      </button>
    </Panel>
  );
}

const HOURS = ["10", "11", "12", "13", "14", "15"];

export function LineRide({ onClear }: { onClear: () => void }) {
  const [vals, setVals] = useState([40, 40, 40, 40, 40, 40]);
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const spread = max - min;
  const peak = HOURS[vals.indexOf(max)];
  const ready = spread >= 40;
  const pts = vals
    .map((v, i) => `${20 + i * 36},${120 - v * 0.7}`)
    .join(" ");

  return (
    <Panel kicker="6D2 · 動手" title="砌一條人龍折線">
      <p className="text-sm text-muted">調每小時的人數。高低差至少 40 人，折線才看得出趨勢。只畫一組數據。</p>
      <svg viewBox="0 0 220 130" className="mt-2 w-full">
        <polyline points={pts} fill="none" className="stroke-coral" strokeWidth="3" />
        {vals.map((v, i) => (
          <circle key={HOURS[i]} cx={20 + i * 36} cy={120 - v * 0.7} r="3" className="fill-ink" />
        ))}
      </svg>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {HOURS.map((h, i) => (
          <label key={h} className="text-center text-sm">
            <span className="block text-muted">{h}時</span>
            <span className="tabular-nums">{vals[i]}</span>
            <span className="mt-1 flex justify-center gap-1">
              <button
                type="button"
                className="min-h-11 min-w-11 rounded-full border border-line"
                onClick={() => setVals((prev) => prev.map((v, j) => (j === i ? Math.max(20, v - 10) : v)))}
              >
                −
              </button>
              <button
                type="button"
                className="min-h-11 min-w-11 rounded-full border border-line"
                onClick={() => setVals((prev) => prev.map((v, j) => (j === i ? Math.min(140, v + 10) : v)))}
              >
                +
              </button>
            </span>
          </label>
        ))}
      </div>
      <CheckNote ok={ready ? true : null}>
        {ready ? `最高在 ${peak} 時，有 ${max} 人。線向上是增加，向下是減少。` : "再把某一小時調高或調低。"}
      </CheckNote>
      {ready && (
        <button type="button" className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper" onClick={onClear}>
          折線完成，蓋章
        </button>
      )}
    </Panel>
  );
}

function Arc({ frac, color, offset }: { frac: number; color: string; offset: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const len = frac * c;
  return (
    <circle
      cx="21"
      cy="21"
      r={r}
      fill="none"
      stroke={color}
      strokeWidth="8"
      strokeDasharray={`${len} ${c - len}`}
      strokeDashoffset={-offset * c}
    />
  );
}

export function PieRide({ onClear }: { onClear: () => void }) {
  const [seen, setSeen] = useState(false);
  const parts = useMemo(
    () => [
      { name: "遊戲", frac: 0.5, color: "var(--color-grass)" },
      { name: "小食", frac: 0.25, color: "var(--color-sun)" },
      { name: "休息", frac: 0.25, color: "var(--color-coral)" },
    ],
    [],
  );
  let acc = 0;
  return (
    <Panel kicker="6D3 · 動手" title="一整天的圓">
      <div className="flex flex-wrap items-center gap-4">
        <svg viewBox="0 0 42 42" className="size-36 -rotate-90">
          {parts.map((p) => {
            const el = <Arc key={p.name} frac={p.frac} color={p.color} offset={acc} />;
            acc += p.frac;
            return el;
          })}
        </svg>
        <ul className="text-sm">
          <li>遊戲 180°，佔一半</li>
          <li>小食 90°</li>
          <li>休息 90°</li>
          <li className="mt-1 text-muted">角度都是 45° 的倍數，不用自己量。</li>
        </ul>
      </div>
      <button type="button" className="mt-3 min-h-11 rounded-full border border-line px-4" onClick={() => setSeen(true)}>
        看兩個月的宣傳費
      </button>
      {seen && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p className="rounded-2xl bg-cream p-3 text-sm">一月收入 2000 元，宣傳費 20%，即 400 元。</p>
          <p className="rounded-2xl bg-cream p-3 text-sm">二月收入 800 元，宣傳費 25%，即 200 元。</p>
        </div>
      )}
      <CheckNote ok={seen ? true : null}>百分數較大，不代表金額較大。只看兩幅圓，不能比較實際銀碼。</CheckNote>
      {seen && (
        <button type="button" className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper" onClick={onClear}>
          看懂了，蓋章
        </button>
      )}
    </Panel>
  );
}

const SERIES = [100, 108, 104, 118, 112];

function Poly({ from, to }: { from: number; to: number }) {
  const pts = SERIES.map((v, i) => {
    const x = 16 + i * 40;
    const y = 90 - ((v - from) / (to - from)) * 70;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 190 100" className="w-full">
      <polyline points={pts} fill="none" className="stroke-coral" strokeWidth="3" />
    </svg>
  );
}

export function MisuseRide({ onClear }: { onClear: () => void }) {
  const [pick, setPick] = useState<string | null>(null);
  const ok = pick === "same";
  return (
    <Panel kicker="6D4 · 動手" title="兩張海報">
      <p className="text-sm text-muted">同一組排隊人數。左圖縱軸 0 到 200，右圖 90 到 130。</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <div>
          <Poly from={0} to={200} />
          <p className="text-center text-sm">從 0 起</p>
        </div>
        <div>
          <Poly from={90} to={130} />
          <p className="text-center text-sm">從 90 起</p>
        </div>
      </div>
      <div className="mt-3 grid gap-2">
        {[
          ["more", "右圖的人數升得比較多"],
          ["same", "數據相同，右圖把變化誇大了"],
          ["left", "左圖一定印錯"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={
              "min-h-11 rounded-xl border px-3 text-left " +
              (pick === id ? "border-grass bg-cream" : "border-line")
            }
            onClick={() => setPick(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <CheckNote ok={pick === null ? null : ok}>
        {ok ? "縱軸比例會改變觀感。不誠實的圖，可能讓人加開太多閘口。" : "先看兩圖用的是不是同一組數。"}
      </CheckNote>
      {ok && (
        <button type="button" className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper" onClick={onClear}>
          破案，蓋章
        </button>
      )}
    </Panel>
  );
}

const LEFT: [number, number][] = [
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
  [5, 3],
];

function key(r: number, c: number) {
  return `${r}-${c}`;
}

export function MirrorRide({ onClear }: { onClear: () => void }) {
  const left = useMemo(() => new Set(LEFT.map(([r, c]) => key(r, c))), []);
  const expect = useMemo(() => new Set(LEFT.map(([r, c]) => key(r, 7 - c))), []);
  const [picked, setPicked] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const got = new Set(picked);
  const ok = checked && picked.length === expect.size && picked.every((k) => expect.has(k));

  return (
    <Panel kicker="6S1 · 動手" title="沿軸畫另一半">
      <p className="mb-3 text-sm text-muted">只塗右邊。對摺後要和左邊重合。圖形上的花紋不用理。</p>
      <div className="overflow-x-auto">
        <div className="grid w-max grid-cols-8 gap-1">
          {Array.from({ length: 48 }, (_, i) => {
            const r = Math.floor(i / 8);
            const c = i % 8;
            const k = key(r, c);
            const fixed = c < 4;
            const on = fixed ? left.has(k) : got.has(k);
            const bad = checked && !fixed && on !== expect.has(k);
            return (
              <button
                key={k}
                type="button"
                disabled={fixed}
                aria-pressed={on}
                onClick={() => {
                  setChecked(false);
                  setPicked((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
                }}
                className={
                  "size-9 rounded-md border sm:size-11 " +
                  (bad ? "border-coral bg-coral/30" : on ? "border-grass bg-grass" : "border-line bg-paper")
                }
              />
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper"
        onClick={() => {
          setChecked(true);
          const match = picked.length === expect.size && picked.every((k) => expect.has(k));
          if (match) onClear();
        }}
      >
        對摺檢查
      </button>
      <CheckNote ok={checked ? ok : null}>
        {ok ? "兩邊重合，中間就是對稱軸。" : "紅色的格子還未和左邊成鏡像。"}
      </CheckNote>
    </Panel>
  );
}

export function TurnRide({ onClear }: { onClear: () => void }) {
  const [turns, setTurns] = useState(0);
  const back = turns > 0 && turns % 4 === 0;
  return (
    <Panel kicker="增潤 · 不是核心單位" title="風車轉一轉">
      <p className="text-sm text-muted">校本有旋轉對稱。對齊課程闡釋時，必學的是軸對稱，這一站只作增潤。</p>
      <div className="my-4 flex justify-center" style={{ transform: `rotate(${turns * 90}deg)` }}>
        <div className="grid size-24 grid-cols-2">
          <div className="rounded-tl-full bg-coral" />
          <div className="rounded-tr-full bg-sun" />
          <div className="rounded-bl-full bg-grass" />
          <div className="rounded-br-full bg-ink" />
        </div>
      </div>
      <button type="button" className="min-h-11 rounded-full border border-line px-4" onClick={() => setTurns((n) => n + 1)}>
        轉 90°（已轉 {turns} 次）
      </button>
      <CheckNote ok={turns === 0 ? null : back}>{back ? "轉了 4 次 90°，回到原來的樣子。" : "還沒回到出發時的方向。"}</CheckNote>
      {back && (
        <button type="button" className="mt-3 min-h-11 rounded-full bg-sun px-4 text-ink" onClick={onClear}>
          增潤蓋章
        </button>
      )}
    </Panel>
  );
}

export function DozenRide({ onClear }: { onClear: () => void }) {
  const [raw, setRaw] = useState("");
  const ok = Number(raw) === 36;
  return (
    <Panel kicker="增潤 · 不是核心單位" title="一打不是十個">
      <p className="text-sm text-muted">非十進制單位是校本增潤。1 米 = 100 厘米仍然是十進制，不要混在一起。</p>
      <label className="mt-3 flex flex-wrap items-center gap-2">
        <span>3 打氣球 =</span>
        <input
          inputMode="numeric"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
        />
        <span>個</span>
        <button type="button" className="min-h-11 rounded-full bg-sun px-4 text-ink" onClick={() => ok && onClear()}>
          核對
        </button>
      </label>
      <CheckNote ok={raw === "" ? null : ok}>{ok ? "3 × 12 = 36。1 小時 = 60 分鐘，也是非十進制。" : "一打是 12，不是 10。"}</CheckNote>
    </Panel>
  );
}
