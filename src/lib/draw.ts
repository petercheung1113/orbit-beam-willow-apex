import { EXTRA } from "@/data/extra";
import { getUnit, UNITS, type Question } from "@/data/units";

export type Drawn = {
  id: string;
  unitId: string;
  unitName: string;
  ride: string;
  question: Question;
};

export function unitPool(unitIds: string[]): Drawn[] {
  const wanted = new Set(unitIds);
  const list: Drawn[] = [];
  for (const unit of UNITS) {
    if (!wanted.has(unit.id)) continue;
    const questions = [...unit.questions, ...(EXTRA[unit.id] ?? [])];
    questions.forEach((question, index) => {
      list.push({
        id: `${unit.id}-${index}`,
        unitId: unit.id,
        unitName: unit.name,
        ride: unit.ride,
        question,
      });
    });
  }
  return list;
}

export function shuffleDraw(seed: number, unitIds: string[], count: number): Drawn[] {
  const list = [...unitPool(unitIds)];
  let state = seed >>> 0 || 1;
  for (let i = list.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    const swap = list[i];
    list[i] = list[j]!;
    list[j] = swap!;
  }
  return list.slice(0, Math.min(count, list.length));
}

export function isRight(question: Question, picked: string): boolean {
  if (!picked.trim()) return false;
  if (question.kind === "choice") return Number(picked) === question.answer;
  const value = Number(picked.trim());
  return Number.isFinite(value) && Math.abs(value - question.answer) <= (question.eps ?? 0.001);
}

export function answerText(question: Question): string {
  if (question.kind === "choice") return question.choices[question.answer] ?? "";
  return `${question.answer}${question.suffix ? ` ${question.suffix}` : ""}`;
}

export function unitById(id: string) {
  return getUnit(id);
}
