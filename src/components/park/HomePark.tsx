import { Link } from "@tanstack/react-router";
import { useLayoutEffect, useRef, useState } from "react";
import { UNITS, type Unit } from "@/data/units";
import { usePark } from "@/lib/park";
import { PetWalker } from "@/components/park/PetWalker";

/** Fixed places on the big field, in curriculum order. x/y are percents. */
const SPOTS: Record<string, { x: number; y: number; s?: number }> = {
  "6N1": { x: 11, y: 1, s: 1.08 },
  "6N2": { x: 33, y: 3, s: 0.92 },
  "6D1": { x: 57, y: 0 },
  "6N3": { x: 80, y: 2 },
  "6N4": { x: 88, y: 22, s: 0.9 },
  "6M2": { x: 64, y: 20 },
  "6M3": { x: 40, y: 18, s: 1.24 },
  "6M5": { x: 15, y: 21 },
  "6M1": { x: 12, y: 42 },
  "6D3": { x: 36, y: 40, s: 1.05 },
  "6M4": { x: 61, y: 39, s: 1.12 },
  "6A1": { x: 85, y: 43 },
  "6D2": { x: 73, y: 63, s: 0.95 },
  "6D4": { x: 46, y: 65, s: 0.95 },
  "6S1": { x: 18, y: 62 },
  "enrich-turn": { x: 52, y: 85, s: 0.92 },
  "enrich-base": { x: 78, y: 82, s: 0.9 },
};

function trailPath(pts: { x: number; y: number }[]) {
  if (pts.length === 0) return "";
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}

function Station({ unit, done, start }: { unit: Unit; done: boolean; start: boolean }) {
  const spot = SPOTS[unit.id] ?? { x: 50, y: 50 };
  return (
    <li
      className="spot pointer-events-auto"
      style={{
        ["--x" as string]: `${spot.x}%`,
        ["--y" as string]: `${spot.y}%`,
        ["--s" as string]: String(spot.s ?? 1),
      }}
    >
      <Link to="/ride/$id" params={{ id: unit.id }} className="map-link relative flex flex-col">
        {start && (
          <span className="absolute top-0 right-0 z-20 rounded-full border-2 border-ink bg-paper px-2 py-0.5 text-xs font-bold text-ink">
            起點
          </span>
        )}
        <img src={unit.art} alt="" className="map-art" />
        <div className="map-label-wrap">
          <span
            className={
              "relative z-10 mx-auto flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 bg-paper px-2 text-center " +
              (done ? "border-sun" : unit.enrich ? "border-dashed border-ink" : "border-ink")
            }
          >
            <span className="line-clamp-2 text-sm font-bold leading-tight text-ink">{unit.name}</span>
            <span className="mt-0.5 max-w-full truncate text-xs font-medium text-ink">
              {unit.ride}
              {unit.enrich ? " · 增潤" : ""}
            </span>
            {done && <span className="sr-only">已蓋章</span>}
          </span>
          {done && (
            <span className="absolute -top-1 right-0 z-20 flex size-6 items-center justify-center rounded-full bg-sun text-xs font-bold text-ink">
              章
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}

export function HomePark() {
  const stamps = usePark((s) => s.stamps);
  const trailKey = UNITS.map((u) => u.id).join(".");
  const frameRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState("");

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const draw = () => {
      const box = frame.getBoundingClientRect();
      const pts = [...frame.querySelectorAll<HTMLElement>(".map-label-wrap")].map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      setTrail(trailPath(pts));
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [trailKey]);

  return (
    <div className="park-scroll border-x-8 border-b-8 border-sun">
      <div ref={frameRef} className="park-scene">
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden>
          <path d={trail} fill="none" stroke="var(--color-track)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={trail}
            fill="none"
            stroke="var(--color-sun)"
            strokeWidth="4"
            strokeDasharray="12 9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <img src="/park/tree.png" alt="" className="pointer-events-none absolute size-16" style={{ left: "46%", top: "10%" }} />
        <img src="/park/tree.png" alt="" className="flip-x pointer-events-none absolute size-14" style={{ left: "1%", top: "33%" }} />
        <img src="/park/tree.png" alt="" className="pointer-events-none absolute size-16" style={{ left: "91%", top: "54%" }} />
        <img src="/park/tree.png" alt="" className="flip-x pointer-events-none absolute size-14" style={{ left: "3%", top: "75%" }} />
        <span className="pointer-events-none absolute size-24 rounded-full bg-grass/15" style={{ left: "48%", top: "32%" }} />
        <span className="pointer-events-none absolute size-28 rounded-full bg-grass/10" style={{ left: "30%", top: "72%" }} />
        <span className="pointer-events-none absolute h-16 w-28 rounded-full bg-grass/10" style={{ left: "22%", top: "13%" }} />

        <ol className="pointer-events-none absolute inset-0 z-10">
          {UNITS.map((unit, index) => (
            <Station key={unit.id} unit={unit} done={stamps.includes(unit.id)} start={index === 0} />
          ))}
        </ol>
        <PetWalker />
      </div>
    </div>
  );
}
