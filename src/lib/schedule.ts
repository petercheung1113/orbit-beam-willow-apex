import { CORE_UNITS } from "@/data/units";

export type DayKind = "study" | "mock" | "review" | "exam";

export type DayPlan = {
  date: string;
  weekday: string;
  title: string;
  detail: string;
  kind: DayKind;
  topic?: string;
};

const WEEK = ["日", "一", "二", "三", "四", "五", "六"];

export function parseISODate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year || 2026, (month || 1) - 1, day || 1);
}

export function formatISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function todayISO(): string {
  return formatISODate(new Date());
}

function queue(focus: string[], coverAll: boolean): string[] {
  const selected = focus.filter((id) => CORE_UNITS.some((unit) => unit.id === id));
  const base = coverAll || selected.length === 0 ? CORE_UNITS : CORE_UNITS.filter((unit) => selected.includes(unit.id));
  const list: string[] = [];
  for (const unit of base) {
    const boost = selected.includes(unit.id) ? 3 : 1;
    const copies = Math.max(1, Math.round((unit.hours / 8) * boost));
    for (let i = 0; i < copies; i += 1) list.push(unit.id);
  }
  return list.sort((a, b) => Number(!selected.includes(a)) - Number(!selected.includes(b)));
}

function dose(minutes: number): string {
  if (minutes <= 15) return "做 5 題";
  if (minutes <= 30) return "先看重溫，再做 8 題";
  return "重溫重點、做 12 題，再挑 1 題問導師";
}

export function targetLine(target: number): string {
  if (target >= 90) return `目標 ${target} 分：多做混合和應用題，錯了要看解釋。`;
  if (target <= 60) return `目標 ${target} 分：先穩做每個課題的第一類題。`;
  return `目標 ${target} 分：基礎和應用都要碰到。`;
}

export function buildSchedule(input: {
  today: string;
  examDate: string;
  target: number;
  minutes: number;
  focus: string[];
  coverAll: boolean;
}): DayPlan[] {
  const start = parseISODate(input.today);
  const exam = parseISODate(input.examDate);
  const span = Math.round((exam.getTime() - start.getTime()) / 86_400_000);
  if (span < 0) return [];

  const days: DayPlan[] = [];
  const push = (offset: number, item: Omit<DayPlan, "date" | "weekday">) => {
    const date = addDays(start, offset);
    days.push({ ...item, date: formatISODate(date), weekday: WEEK[date.getDay()] ?? "" });
  };

  if (span === 0) {
    push(0, {
      kind: "exam",
      title: "今天就是考試",
      detail: "早上只看一張重點，吃早餐，檢查文具。不要臨時追新課題。",
    });
    return days;
  }

  const topics = queue(input.focus, input.coverAll);
  let cursor = 0;
  for (let offset = 0; offset < span; offset += 1) {
    const daysLeft = span - offset;
    if (daysLeft === 1 && span >= 2) {
      push(offset, {
        kind: "review",
        title: "輕鬆重溫",
        detail: `用 ${input.minutes} 分鐘看錯題解釋和重點，今晚早點休息。`,
      });
      continue;
    }
    if (daysLeft === 2 && span >= 4) {
      push(offset, {
        kind: "mock",
        title: "模擬小測",
        detail: "做一場限時模擬考試。做完只改錯，不追新課題。",
      });
      continue;
    }
    const topicId = topics[cursor % topics.length] ?? CORE_UNITS[0]?.id ?? "";
    cursor += 1;
    const unit = CORE_UNITS.find((item) => item.id === topicId);
    push(offset, {
      kind: "study",
      topic: topicId,
      title: unit?.name ?? "溫習",
      detail: `${dose(input.minutes)}。${unit?.learn[0] ?? ""} ${targetLine(input.target)}`,
    });
  }

  push(span, {
    kind: "exam",
    title: "考試日",
    detail: "看一眼今天的重點就出發。先做會的題，不會的先跳過。",
  });
  return days;
}
