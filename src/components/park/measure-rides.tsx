import { useMemo, useState } from "react";
import { CheckNote, Panel } from "@/components/park/bits";

function kindOf(deg: number) {
  if (deg === 0 || deg === 360) return "0° 和 360° 不用量";
  if (deg < 90) return "銳角";
  if (deg === 90) return "直角";
  if (deg < 180) return "鈍角";
  if (deg === 180) return "平角";
  if (deg < 360) return "反角";
  return "";
}

export function AngleRide({ onClear }: { onClear: () => void }) {
  const [deg, setDeg] = useState(35);
  const target = 60;
  const hit = Math.abs(deg - target) <= 2;
  const rad = ((360 - deg) * Math.PI) / 180;
  const x2 = 100 + Math.cos(rad) * 68;
  const y2 = 100 + Math.sin(rad) * 68;

  return (
    <Panel kicker="6M1 · 動手" title="滑梯量角器">
      <p className="text-sm text-muted">把活動的一邊調到 60°。量度前先估計：比直角小一點。</p>
      <svg viewBox="0 0 200 200" className="mx-auto mt-2 w-full max-w-64">
        <circle cx="100" cy="100" r="72" fill="none" className="stroke-line" strokeWidth="8" />
        <line x1="100" y1="100" x2="168" y2="100" className="stroke-ink" strokeWidth="3" />
        <line x1="100" y1="100" x2={x2} y2={y2} className="stroke-coral" strokeWidth="3" />
        <circle cx="100" cy="100" r="4" className="fill-ink" />
        <text x="100" y="28" textAnchor="middle" className="fill-ink text-lg">
          {deg}°
        </text>
      </svg>
      <p className="text-center text-sm text-muted">{kindOf(deg)}</p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button type="button" className="min-h-11 min-w-11 rounded-full border border-line" onClick={() => setDeg((d) => (d + 359) % 360)}>
          −1°
        </button>
        <input
          type="range"
          min={0}
          max={359}
          value={deg}
          aria-label="角度"
          onChange={(e) => setDeg(Number(e.target.value))}
          className="w-40 accent-grass"
        />
        <button type="button" className="min-h-11 min-w-11 rounded-full border border-line" onClick={() => setDeg((d) => (d + 1) % 360)}>
          +1°
        </button>
      </div>
      <CheckNote ok={hit ? true : deg === 0 ? false : null}>
        {hit ? "60°，是銳角。用量角器畫角時，也是先對準頂點和其中一邊。" : "0° 不用量，把一邊拖開。"}
      </CheckNote>
      {hit && (
        <button type="button" className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper" onClick={onClear}>
          角度正確，蓋章
        </button>
      )}
    </Panel>
  );
}

export function VolumeRide({ onClear }: { onClear: () => void }) {
  const before = 250;
  const [after, setAfter] = useState(410);
  const [floats, setFloats] = useState(false);
  const vol = after - before;
  const [raw, setRaw] = useState("");
  const n = Number(raw);
  const ok = !floats && raw !== "" && n === vol;

  return (
    <Panel kicker="6M2 · 動手" title="排水量杯">
      <div className="mx-auto flex h-40 w-24 items-end overflow-hidden rounded-b-xl border-2 border-ink bg-paper">
        <div className="w-full bg-grass/50" style={{ height: `${(after / 800) * 100}%` }} />
      </div>
      <p className="mt-2 text-center tabular-nums text-sm">水面 {after} mL　原來 {before} mL</p>
      <input
        type="range"
        min={before}
        max={700}
        value={after}
        aria-label="水面"
        onChange={(e) => setAfter(Number(e.target.value))}
        className="mt-2 w-full accent-grass"
        disabled={floats}
      />
      <label className="mt-2 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={floats} onChange={(e) => setFloats(e.target.checked)} />
        這次放進去的是會浮起的皮球
      </label>
      {floats ? (
        <p className="mt-2 text-sm text-coral">皮球沒有完全被水蓋過，排水法不適用。</p>
      ) : (
        <label className="mt-3 flex flex-wrap items-center gap-2">
          <span>體積</span>
          <input
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
            aria-label="體積"
          />
          <span>cm³</span>
          <button type="button" className="min-h-11 rounded-full bg-grass px-4 text-paper" onClick={() => ok && onClear()}>
            核對
          </button>
        </label>
      )}
      <CheckNote ok={floats ? false : raw === "" ? null : ok}>
        {ok ? `${after} − ${before} = ${vol} mL = ${vol} cm³。1 立方米則等於 1000 升。` : "用上升了的水來算。1 mL = 1 cm³。"}
      </CheckNote>
    </Panel>
  );
}

const CIRCLES = [
  { name: "摩天輪", ask: "圓周", answer: 31.4, why: "πd = 3.14 × 10 = 31.4 米" },
  { name: "直徑 7 米的圓池", ask: "圓周", answer: 22, why: "π 取 22/7：22/7 × 7 = 22 米" },
  { name: "直徑 14 米的半圓拱門", ask: "周界（半圓周 + 直徑）", answer: 36, why: "全圓周 44，一半是 22，加直徑 14，得 36 米" },
];

export function CircleRide({ onClear }: { onClear: () => void }) {
  const [i, setI] = useState(0);
  const [raw, setRaw] = useState("");
  const item = CIRCLES[i];
  const n = Number(raw);
  const ok = raw !== "" && Math.abs(n - item.answer) < 0.02;

  return (
    <Panel kicker="6M3 · 動手" title="繞着圓走">
      <div className="mb-3 flex justify-center">
        <div className="flex size-28 items-center justify-center rounded-full border-4 border-coral bg-cream text-sm">
          {item.name}
        </div>
      </div>
      <p className="text-sm text-muted">π 只用 3.14 或 22/7。不用圓心角求弧長。</p>
      <label className="mt-3 flex flex-wrap items-center gap-2">
        <span>{item.ask}</span>
        <input
          inputMode="decimal"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
        />
        <span>米</span>
      </label>
      <CheckNote ok={raw === "" ? null : ok}>{ok ? item.why : "先寫圓周 = π × 直徑。半圓拱門還要加回那條直徑。"}</CheckNote>
      {ok &&
        (i < CIRCLES.length - 1 ? (
          <button
            type="button"
            className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper"
            onClick={() => {
              setI((n) => n + 1);
              setRaw("");
            }}
          >
            下一個圓
          </button>
        ) : (
          <button type="button" className="mt-3 min-h-11 rounded-full bg-grass px-4 text-paper" onClick={onClear}>
            三個都算過，蓋章
          </button>
        ))}
    </Panel>
  );
}

export function AreaRide({ onClear }: { onClear: () => void }) {
  const [raw, setRaw] = useState("");
  const n = Number(raw);
  const ok = raw !== "" && n === 154;
  return (
    <Panel kicker="6M5 · 動手" title="旋轉杯地板">
      <p className="text-sm text-muted">半徑 7 米，π 取 22/7。只由半徑求面積，不反推半徑。</p>
      <div className="mx-auto my-4 size-28 rounded-full bg-sun/40 ring-4 ring-sun" />
      <label className="flex flex-wrap items-center gap-2">
        <span>圓面積</span>
        <input
          inputMode="decimal"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
        />
        <span>平方米</span>
        <button type="button" className="min-h-11 rounded-full bg-grass px-4 text-paper" onClick={() => ok && onClear()}>
          核對
        </button>
      </label>
      <CheckNote ok={raw === "" ? null : ok}>
        {ok ? "22/7 × 7 × 7 = 154。半圓就是 77，四分一圓是 38.5。" : "圓面積 = π × 半徑 × 半徑。"}
      </CheckNote>
    </Panel>
  );
}

export function SpeedRide({ onClear }: { onClear: () => void }) {
  const [ran, setRan] = useState(false);
  const [raw, setRaw] = useState("");
  const n = Number(raw);
  const ok = raw !== "" && n === 45;
  const points = useMemo(() => "0,80 60,40 120,40 200,8", []);

  return (
    <Panel kicker="6M4 · 動手" title="小火車">
      <p className="text-sm text-muted">兩輛車跑了同樣的 4 秒。行得遠的較快。不做追趕，也不把 m/s 化成 km/h。</p>
      <div className="mt-3 space-y-2">
        <div className="h-3 overflow-hidden rounded-full bg-line">
          <div className={"h-full rounded-full bg-coral transition-all duration-700 " + (ran ? "w-2/5" : "w-0")} />
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-line">
          <div className={"h-full rounded-full bg-grass transition-all duration-700 " + (ran ? "w-4/5" : "w-0")} />
        </div>
      </div>
      <button type="button" className="mt-3 min-h-11 rounded-full border border-line px-4" onClick={() => setRan(true)}>
        {ran ? "紅車 12 米，綠車 20 米" : "開跑 4 秒"}
      </button>
      {ran && <p className="mt-2 text-sm">紅車 12÷4 = 3 m/s，綠車 20÷4 = 5 m/s。同一時間，綠車較快。</p>}
      <svg viewBox="0 0 220 100" className="mt-4 w-full">
        <polyline points={points} fill="none" className="stroke-grass" strokeWidth="3" />
        <text x="4" y="96" className="fill-muted text-[10px]">0</text>
        <text x="168" y="96" className="fill-muted text-[10px]">3 小時</text>
      </svg>
      <p className="text-sm text-muted">行程圖：第一小時上升，第二小時是平線（停車），第三小時再上升。全程 90 公里、3 小時。</p>
      <label className="mt-2 flex flex-wrap items-center gap-2">
        <span>平均速率</span>
        <input
          inputMode="decimal"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="min-h-11 w-24 rounded-xl border border-line px-3 tabular-nums"
        />
        <span>km/h</span>
        <button type="button" className="min-h-11 rounded-full bg-grass px-4 text-paper" onClick={() => ok && onClear()}>
          核對
        </button>
      </label>
      <CheckNote ok={raw === "" ? null : ok}>{ok ? "90 ÷ 3 = 45 km/h。平線那一小時路程沒有增加。" : "平均速率 = 總路程 ÷ 總時間。"}</CheckNote>
    </Panel>
  );
}
