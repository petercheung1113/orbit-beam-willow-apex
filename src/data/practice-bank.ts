import { UNITS } from "@/data/units";
import { buildWorksheetBanks, type BankQuestion, type Level } from "@/data/bank-build";

export type { BankQuestion, Level };

/** 題型對齊現代小學數學（第二版）敍述句版六年級工作紙和課本練習。情境用遊樂場，不照抄原句。 */
export const PRACTICE_BANK: Record<string, BankQuestion[]> = buildWorksheetBanks();

export function bankCounts(unitId: string): Record<Level, number> {
  const counts: Record<Level, number> = { basic: 0, core: 0, hard: 0 };
  for (const item of PRACTICE_BANK[unitId] ?? []) counts[item.level] += 1;
  return counts;
}

function rngOf(seed: number): () => number {
  let a = seed >>> 0 || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(rng: () => number, items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const left = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = left;
  }
  return copy;
}

function groupedByLevel(items: BankQuestion[]): boolean {
  const rank: Record<Level, number> = { basic: 0, core: 1, hard: 2 };
  const ranks = items.map((item) => rank[item.level]);
  return ranks.every((value, index) => index === 0 || value >= ranks[index - 1]!);
}

export function drawPractice(seed: number, unitIds: string[]) {
  const rng = rngOf(seed);
  const ids = unitIds.length ? unitIds : UNITS.map((unit) => unit.id);
  const buckets: Record<Level, BankQuestion[]> = { basic: [], core: [], hard: [] };
  for (const id of ids) {
    for (const item of PRACTICE_BANK[id] ?? []) buckets[item.level].push(item);
  }
  const picked: BankQuestion[] = [];
  for (const level of ["basic", "core", "hard"] as const) {
    picked.push(...shuffle(rng, buckets[level]).slice(0, 5));
  }
  let mixed = shuffle(rng, picked);
  for (let guard = 0; groupedByLevel(mixed) && guard < 8; guard += 1) mixed = shuffle(rng, mixed);
  return mixed.map((item, index) => {
    const choices = shuffle(rng, [...item.choices]);
    const unit = UNITS.find((entry) => entry.id === item.unitId);
    return {
      id: `${item.unitId}-p${index}-${seed}`,
      unitId: item.unitId,
      unitName: unit?.name ?? item.unitId,
      ride: unit?.ride ?? "",
      level: item.level,
      question: {
        kind: "choice" as const,
        stem: item.stem,
        choices,
        answer: choices.indexOf(item.answer),
        why: item.why,
        figure: item.figure,
      },
    };
  });
}
