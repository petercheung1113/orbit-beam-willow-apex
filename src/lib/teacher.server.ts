import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";
import { rosterAll } from "@/lib/class-roster.server";
import { sessionAccount } from "@/lib/chat.server";
import { TEACHER_ACCOUNT } from "@/lib/teacher-account";

export type PracticeRow = {
  at: number;
  mode: "practice" | "mock";
  correct: number;
  total: number;
  seconds: number;
  topics: string;
};

export type TutorRow = {
  at: number;
  topic: string;
  mode: "chat" | "lesson";
  question: string;
  reply: string;
};

export type WeakTopic = {
  name: string;
  correct: number;
  total: number;
  tutor: number;
};

export type StudentReport = {
  studentId: string;
  name: string;
  lastAt: number;
  sessions: number;
  correct: number;
  total: number;
  tutorCount: number;
  practices: PracticeRow[];
  chats: TutorRow[];
  weak: WeakTopic[];
};

function hashPin(pin: string): string {
  return createHash("sha256").update(`park-teacher-v1:${pin}`).digest("hex");
}

function pinsMatch(stored: string, pin: string): boolean {
  const next = Buffer.from(hashPin(pin));
  const prev = Buffer.from(stored);
  if (prev.length !== next.length) return false;
  return timingSafeEqual(prev, next);
}

function asNumber(value: unknown): number {
  const n = typeof value === "bigint" ? Number(value) : Number(value);
  return Number.isFinite(n) ? n : 0;
}

async function pinHash(): Promise<string | null> {
  const sql = await getSql();
  const rows = await sql<{ pin_hash: string }>`SELECT pin_hash FROM teacher_pin WHERE id = 1`;
  return rows[0]?.pin_hash ?? null;
}

export async function classPinReady(): Promise<boolean> {
  return Boolean(await pinHash());
}

export async function saveTeacherPin(pin: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (pin.length < 4) return { ok: false, error: "密碼至少 4 個字。" };
  if (await pinHash()) return { ok: false, error: "老師密碼已經設定，請直接登入。" };
  const sql = await getSql();
  await sql`INSERT INTO teacher_pin (id, pin_hash) VALUES (1, ${hashPin(pin)})`;
  return { ok: true };
}

export async function loadClassBoard(token: string): Promise<{ ok: true; students: StudentReport[] } | { ok: false; error: string }> {
  const account = await sessionAccount(token);
  if (account !== TEACHER_ACCOUNT) return { ok: false, error: "請用老師帳號登入。" };
  const sql = await getSql();
  const practices = await sql<{
    student_id: string;
    student_name: string;
    mode: string;
    correct: number;
    total: number;
    seconds: number;
    topics: string;
    breakdown: string;
    at: unknown;
  }>`
    SELECT student_id, student_name, mode, correct, total, seconds, topics, breakdown,
           CAST(EXTRACT(EPOCH FROM finished_at) * 1000 AS BIGINT) AS at
    FROM practice_sessions
    ORDER BY finished_at DESC
    LIMIT 2000
  `;
  const chats = await sql<{
    student_id: string;
    student_name: string;
    topic: string;
    mode: string;
    question: string;
    reply: string;
    at: unknown;
  }>`
    SELECT student_id, student_name, topic, mode, question, reply,
           CAST(EXTRACT(EPOCH FROM created_at) * 1000 AS BIGINT) AS at
    FROM tutor_messages
    ORDER BY created_at DESC
    LIMIT 2000
  `;

  const byId = new Map<string, StudentReport>();
  for (const student of rosterAll()) {
    byId.set(student.account, {
      studentId: student.account,
      name: student.name,
      lastAt: 0,
      sessions: 0,
      correct: 0,
      total: 0,
      tutorCount: 0,
      practices: [],
      chats: [],
      weak: [],
    });
  }
  const touch = (id: string, name: string, at: number) => {
    const current = byId.get(id) ?? {
      studentId: id,
      name,
      lastAt: at,
      sessions: 0,
      correct: 0,
      total: 0,
      tutorCount: 0,
      practices: [],
      chats: [],
      weak: [],
    };
    if (!byId.has(id) && at >= current.lastAt) current.name = name;
    if (at >= current.lastAt) current.lastAt = at;
    byId.set(id, current);
    return current;
  };

  const topicScores = new Map<string, Map<string, { correct: number; total: number; tutor: number }>>();
  const addTopic = (id: string, name: string, correct: number, total: number, tutor: number) => {
    const label = name.trim();
    if (!label) return;
    const bag = topicScores.get(id) ?? new Map();
    const current = bag.get(label) ?? { correct: 0, total: 0, tutor: 0 };
    current.correct += correct;
    current.total += total;
    current.tutor += tutor;
    bag.set(label, current);
    topicScores.set(id, bag);
  };

  for (const row of practices) {
    const at = asNumber(row.at);
    const student = touch(row.student_id, row.student_name, at);
    student.sessions += 1;
    student.correct += Number(row.correct) || 0;
    student.total += Number(row.total) || 0;
    student.practices.push({
      at,
      mode: row.mode === "mock" ? "mock" : "practice",
      correct: Number(row.correct) || 0,
      total: Number(row.total) || 0,
      seconds: Number(row.seconds) || 0,
      topics: row.topics,
    });
    for (const part of partsOf(row.breakdown, row.topics, Number(row.correct) || 0, Number(row.total) || 0)) {
      addTopic(row.student_id, part.name, part.correct, part.total, 0);
    }
  }
  for (const row of chats) {
    const at = asNumber(row.at);
    const student = touch(row.student_id, row.student_name, at);
    student.tutorCount += 1;
    student.chats.push({
      at,
      topic: row.topic,
      mode: row.mode === "lesson" ? "lesson" : "chat",
      question: row.question,
      reply: row.reply,
    });
    addTopic(row.student_id, row.topic, 0, 0, 1);
  }

  for (const [id, student] of byId) {
    const bag = topicScores.get(id);
    student.weak = bag
      ? [...bag.entries()]
          .map(([name, score]) => ({ name, ...score }))
          .filter((item) => (item.total > 0 && item.correct / item.total < 0.7) || (item.tutor > 0 && item.total === 0))
          .sort((a, b) => (a.total ? a.correct / a.total : 1) - (b.total ? b.correct / b.total : 1))
      : [];
  }

  const rosterIds = new Set(rosterAll().map((student) => student.account));
  return {
    ok: true,
    students: [...byId.values()]
      .filter((item) => item.studentId !== TEACHER_ACCOUNT)
      .sort((a, b) => {
        const ar = rosterIds.has(a.studentId) ? 0 : 1;
        const br = rosterIds.has(b.studentId) ? 0 : 1;
        if (ar !== br) return ar - br;
        return a.studentId.localeCompare(b.studentId, "en");
      }),
  };
}

function partsOf(breakdown: string, topics: string, correct: number, total: number): { name: string; correct: number; total: number }[] {
  if (breakdown) {
    try {
      const parsed = JSON.parse(breakdown) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.flatMap((item) => {
          if (!item || typeof item !== "object") return [];
          const row = item as { name?: unknown; correct?: unknown; total?: unknown };
          const name = String(row.name ?? "").trim();
          const nextTotal = Number(row.total);
          const nextCorrect = Number(row.correct);
          if (!name || !Number.isFinite(nextTotal) || nextTotal <= 0) return [];
          return [{ name, correct: Number.isFinite(nextCorrect) ? nextCorrect : 0, total: nextTotal }];
        });
      }
    } catch {
      // old rows keep the plain topic label
    }
  }
  const name = topics.split("·")[0]?.trim() ?? "";
  if (!name || name.includes("、")) return [];
  return [{ name, correct, total }];
}

export async function savePractice(input: {
  studentId: string;
  name: string;
  mode: "practice" | "mock";
  correct: number;
  total: number;
  seconds: number;
  topics: string;
  breakdown: string;
}): Promise<void> {
  const sql = await getSql();
  const id = `p-${Date.now().toString(36)}-${randomBytes(3).toString("hex")}`;
  await sql`
    INSERT INTO practice_sessions (id, student_id, student_name, mode, total, correct, seconds, topics, breakdown)
    VALUES (${id}, ${input.studentId}, ${input.name}, ${input.mode}, ${input.total}, ${input.correct}, ${input.seconds}, ${input.topics}, ${input.breakdown})
  `;
}

export async function logTutorTurn(input: {
  studentId: string;
  name: string;
  topic: string;
  mode: "chat" | "lesson";
  question: string;
  reply: string;
}): Promise<void> {
  const sql = await getSql();
  const id = `t-${Date.now().toString(36)}-${randomBytes(3).toString("hex")}`;
  await sql`
    INSERT INTO tutor_messages (id, student_id, student_name, topic, mode, question, reply)
    VALUES (
      ${id},
      ${input.studentId.replace(/[^\w-]/g, "").slice(0, 64) || "guest"},
      ${input.name.trim().slice(0, 12) || "未命名同學"},
      ${input.topic.slice(0, 40)},
      ${input.mode === "lesson" ? "lesson" : "chat"},
      ${input.question.trim().slice(0, 600)},
      ${input.reply.trim().slice(0, 2000)}
    )
  `;
}
