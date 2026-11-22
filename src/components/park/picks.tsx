import type { ReactNode } from "react";
import { UNITS, type Strand } from "@/data/units";

const STRANDS: Strand[] = ["數", "代數", "度量", "圖形與空間", "數據處理"];

export function chipClass(on: boolean) {
  return on
    ? "h-11 rounded-full bg-grass px-3 text-sm font-bold text-paper"
    : "h-11 rounded-full border-2 border-ink bg-paper px-3 text-sm font-bold text-ink";
}

export function UnitPicks({
  selected,
  onToggle,
  onAll,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onAll: () => void;
}) {
  const allOn = selected.length === UNITS.length;
  return (
    <div>
      <button type="button" className={chipClass(allOn)} onClick={onAll}>
        全部課題
      </button>
      {STRANDS.map((strand) => {
        const items = UNITS.filter((unit) => unit.strand === strand);
        if (items.length === 0) return null;
        return (
          <div key={strand} className="mt-4">
            <p className="text-sm font-bold text-muted">{strand}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {items.map((unit) => (
                <button key={unit.id} type="button" className={chipClass(selected.includes(unit.id))} onClick={() => onToggle(unit.id)}>
                  {unit.name}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PageIntro({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <>
      <p className="text-sm font-bold text-coral">{kicker}</p>
      <h1 className="text-4xl text-ink">{title}</h1>
      {children && <div className="mt-2 max-w-2xl text-muted">{children}</div>}
    </>
  );
}
