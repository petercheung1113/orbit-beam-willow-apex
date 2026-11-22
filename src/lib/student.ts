import { usePark } from "@/lib/park";

export function studentStamp(): { studentId: string; name: string } {
  const state = usePark.getState();
  if (state.student) {
    return { studentId: state.student, name: state.nickname.trim().slice(0, 12) || state.student };
  }
  const key = "park-session";
  let studentId = window.localStorage.getItem(key) ?? "";
  if (!/^[\w-]{4,64}$/.test(studentId)) {
    studentId = `s-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(key, studentId);
  }
  const name = state.nickname.trim().slice(0, 12) || "未命名同學";
  return { studentId, name };
}

export function topicBreakdown(rows: { name: string; correct: boolean }[]): string {
  const map = new Map<string, { name: string; correct: number; total: number }>();
  for (const row of rows) {
    const name = row.name.trim().slice(0, 40);
    if (!name) continue;
    const current = map.get(name) ?? { name, correct: 0, total: 0 };
    current.total += 1;
    if (row.correct) current.correct += 1;
    map.set(name, current);
  }
  return JSON.stringify([...map.values()]).slice(0, 2000);
}