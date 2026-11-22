import { createServerFn } from "@tanstack/react-start";
import type { StudentReport } from "@/lib/teacher.server";

export type { PracticeRow, StudentReport, TutorRow } from "@/lib/teacher.server";

type PracticeInput = {
  studentId: string;
  name: string;
  mode: "practice" | "mock";
  correct: number;
  total: number;
  seconds: number;
  topics: string;
  breakdown: string;
};

type TutorInput = {
  studentId: string;
  name: string;
  topic: string;
  mode: "chat" | "lesson";
  question: string;
  reply: string;
};

function cleanId(value: string): string {
  return value.replace(/[^\w-]/g, "").slice(0, 64) || "guest";
}

function cleanName(value: string): string {
  return value.trim().slice(0, 12) || "未命名同學";
}

export const teacherStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { classPinReady } = await import("@/lib/teacher.server");
  return { ready: await classPinReady() };
});

export const teacherSetup = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { pin: string } => ({
    pin: String((input as { pin?: unknown } | null)?.pin ?? "").trim().slice(0, 32),
  }))
  .handler(async ({ data }) => {
    const { saveTeacherPin } = await import("@/lib/teacher.server");
    return saveTeacherPin(data.pin);
  });

export const teacherBoard = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string } => ({
    token: String((input as { token?: unknown } | null)?.token ?? "").trim(),
  }))
  .handler(async ({ data }): Promise<{ ok: true; students: StudentReport[] } | { ok: false; error: string }> => {
    const { loadClassBoard } = await import("@/lib/teacher.server");
    return loadClassBoard(data.token);
  });

export const recordPractice = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): PracticeInput => {
    if (!input || typeof input !== "object") throw new Error("紀錄不完整");
    const raw = input as Record<string, unknown>;
    const total = Math.round(Number(raw.total));
    const correct = Math.round(Number(raw.correct));
    const seconds = Math.round(Number(raw.seconds));
    if (!Number.isFinite(total) || total < 1 || total > 100) throw new Error("題數不正確");
    if (!Number.isFinite(correct) || correct < 0 || correct > total) throw new Error("答對數不正確");
    if (!Number.isFinite(seconds) || seconds < 0 || seconds > 7200) throw new Error("時間不正確");
    return {
      studentId: cleanId(String(raw.studentId ?? "")),
      name: cleanName(String(raw.name ?? "")),
      mode: raw.mode === "mock" ? "mock" : "practice",
      correct,
      total,
      seconds,
      topics: String(raw.topics ?? "").trim().slice(0, 240),
      breakdown: String(raw.breakdown ?? "").trim().slice(0, 2000),
    };
  })
  .handler(async ({ data }) => {
    const { savePractice } = await import("@/lib/teacher.server");
    await savePractice(data);
    return { ok: true as const };
  });

export const recordTutor = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): TutorInput => {
    if (!input || typeof input !== "object") throw new Error("紀錄不完整");
    const raw = input as Record<string, unknown>;
    return {
      studentId: cleanId(String(raw.studentId ?? "")),
      name: cleanName(String(raw.name ?? "")),
      topic: String(raw.topic ?? "").trim().slice(0, 40),
      mode: raw.mode === "lesson" ? "lesson" : "chat",
      question: String(raw.question ?? "").trim().slice(0, 600),
      reply: String(raw.reply ?? "").trim().slice(0, 2000),
    };
  })
  .handler(async ({ data }) => {
    const { logTutorTurn } = await import("@/lib/teacher.server");
    await logTutorTurn(data);
    return { ok: true as const };
  });

export const resetClassPassword = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; account: string } => {
    const raw = (input ?? {}) as { token?: unknown; account?: unknown };
    return {
      token: String(raw.token ?? "").trim(),
      account: String(raw.account ?? "").trim().slice(0, 32),
    };
  })
  .handler(async ({ data }) => {
    const { resetStudentPassword } = await import("@/lib/class-roster.server");
    return resetStudentPassword(data.token, data.account);
  });
