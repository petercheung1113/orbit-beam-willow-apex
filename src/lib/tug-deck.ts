import { EXAM_PAPERS } from "@/data/exam-papers";
import { MIXED_PAPER } from "@/data/exam-mixed";
import { PRACTICE_BANK } from "@/data/practice-bank";
import { UNITS } from "@/data/units";
import type { Figure } from "@/data/figure";
import type { Drawn } from "@/lib/draw";

function unitName(id: string): { name: string; ride: string } {
  const unit = UNITS.find((item) => item.id === id);
  return { name: unit?.name ?? id, ride: unit?.ride ?? "" };
}

function add(list: Drawn[], seen: Set<string>, unitId: string, stem: string, choices: string[], answer: number, why: string, figure?: Figure) {
  const text = stem.trim();
  const options = choices.map((item) => item.trim()).filter(Boolean);
  if (!text || seen.has(text) || options.length < 2 || new Set(options).size !== options.length) return;
  if (answer < 0 || answer >= options.length) return;
  if (/^哪個(較大|較小|數值最小|數值最大)？$/.test(text)) return;
  seen.add(text);
  const meta = unitName(unitId);
  list.push({
    id: `${unitId}-t${list.length}`,
    unitId,
    unitName: meta.name,
    ride: meta.ride,
    question: { kind: "choice", stem: text, choices: options, answer, why, figure },
  });
}

function sheetFor(unitIds: string[]): Drawn[] {
  const ids = unitIds.length ? unitIds : UNITS.map((unit) => unit.id);
  const wanted = new Set(ids);
  const list: Drawn[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    for (const item of PRACTICE_BANK[id] ?? []) {
      add(list, seen, id, item.stem, item.choices, item.choices.indexOf(item.answer), item.why, item.figure);
    }
  }
  for (const paper of EXAM_PAPERS) {
    if (!wanted.has(paper.unitId)) continue;
    for (const item of paper.items) {
      if (item.kind !== "choice") continue;
      add(list, seen, paper.unitId, item.stem, item.choices, item.answer, item.why, item.figure);
    }
  }
  for (const item of MIXED_PAPER.items) {
    if (item.kind !== "choice" || !item.topic || !wanted.has(item.topic)) continue;
    add(list, seen, item.topic, item.stem, item.choices, item.answer, item.why, item.figure);
  }
  return list;
}

function nextRand(state: number): number {
  return (Math.imul(state, 1664525) + 1013904223) >>> 0;
}

export function choiceDeck(seed: number, unitIds: string[]): Drawn[] {
  const list = sheetFor(unitIds);
  let state = seed >>> 0 || 1;
  for (let i = list.length - 1; i > 0; i -= 1) {
    state = nextRand(state);
    const j = state % (i + 1);
    const swap = list[i]!;
    list[i] = list[j]!;
    list[j] = swap;
  }
  for (const item of list) {
    const question = item.question;
    if (question.kind !== "choice" || question.choices.length < 2) continue;
    const choices = [...question.choices];
    let correct = question.answer;
    for (let i = choices.length - 1; i > 0; i -= 1) {
      state = nextRand(state);
      const j = Math.floor((state / 4294967296) * (i + 1));
      const swap = choices[i]!;
      choices[i] = choices[j]!;
      choices[j] = swap;
      if (correct === i) correct = j;
      else if (correct === j) correct = i;
    }
    question.choices = choices;
    question.answer = correct;
  }
  return list;
}

export const SEAT_SALT = {
  red: [0, 104729],
  blue: [7919, 224737],
} as const;