import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Shell } from "@/components/park/Shell";
import { teacherBoard, resetClassPassword, type StudentReport } from "@/lib/teacher.functions";
import { usePark } from "@/lib/park";
import { isTeacherAccount } from "@/lib/teacher-account";
import { holdNav, releaseNav } from "@/lib/nav-loading";

export const Route = createFileRoute("/teacher")({
  component: TeacherPage,
  head: () => ({ meta: [{ title: "老師後台 · 數學遊樂場" }] }),
});

function when(ms: number): string {
  if (!ms) return "未做過";
  return new Intl.DateTimeFormat("zh-HK", {
    timeZone: "Asia/Hong_Kong",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(ms));
}

function rate(correct: number, total: number): string {
  if (!total) return "—";
  return `${Math.round((correct / total) * 100)}%`;
}

function TeacherPage() {
  const hydrate = usePark((s) => s.hydrate);
  const ready = usePark((s) => s.ready);
  const student = usePark((s) => s.student);
  const token = usePark((s) => s.chatToken);
  const [error, setError] = useState("");
  const [students, setStudents] = useState<StudentReport[] | null>(null);
  const [picked, setPicked] = useState("");
  const holding = useRef(false);
  if (ready && isTeacherAccount(student) && token && students === null && !holding.current) {
    holding.current = true;
    holdNav();
  }

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!ready || !isTeacherAccount(student) || !token) return;
    let live = true;
    void teacherBoard({ data: { token } }).then((result) => {
      if (!live) return;
      if (!result.ok) {
        setError(result.error);
        setStudents([]);
      } else {
        setStudents(result.students);
        setPicked(result.students[0]?.studentId ?? "");
      }
      if (holding.current) {
        holding.current = false;
        releaseNav();
      }
    }).catch(() => {
      if (!live || !holding.current) return;
      holding.current = false;
      releaseNav();
      setError("暫時打不開紀錄");
      setStudents([]);
    });
    return () => {
      live = false;
    };
  }, [ready, student, token]);

  const current = students?.find((item) => item.studentId === picked) ?? students?.[0];
  const totals = useMemo(() => {
    return (students ?? []).reduce(
      (sum, item) => ({
        sessions: sum.sessions + item.sessions,
        correct: sum.correct + item.correct,
        total: sum.total + item.total,
        chats: sum.chats + item.tutorCount,
      }),
      { sessions: 0, correct: 0, total: 0, chats: 0 },
    );
  }, [students]);

  if (ready && !student) return <Navigate to="/login" />;
  if (ready && !isTeacherAccount(student)) {
    return (
      <Shell>
        <main className="mx-auto max-w-md px-4 py-10">
          <h1 className="text-3xl text-ink">老師後台</h1>
          <p className="mt-2 text-muted">這頁只給 6D 老師。請先登出，再用老師帳號登入。</p>
        </main>
      </Shell>
    );
  }

  if (ready && !token) {
    return (
      <Shell>
        <main className="mx-auto max-w-md px-4 py-10">
          <h1 className="text-3xl text-ink">老師後台</h1>
          <p className="mt-2 text-muted">登入時未能連接紀錄。請登出，再用老師帳號登入一次。</p>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p className="text-sm font-bold text-coral">6D 老師</p>
        <h1 className="text-4xl text-ink">老師後台</h1>
        <p className="mt-2 max-w-2xl text-muted">每個學生幾時做練習、答對率、有沒有問過導師，以及較弱的課題。</p>
        <Link to="/buzz" className="mt-4 inline-flex h-12 items-center rounded-2xl bg-coral px-4 font-bold text-paper">
          開搶答比賽
        </Link>
        {students === null && <p className="mt-6 font-bold">正在打開…</p>}
        {error ? <p className="mt-4 font-bold text-coral">{error}</p> : null}
        {students && (
          <>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <Stat label="全班學生" value={String(students.length)} />
              <Stat label="練習次數" value={String(totals.sessions)} />
              <Stat label="全班答對率" value={rate(totals.correct, totals.total)} />
              <Stat label="問導師次數" value={String(totals.chats)} />
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <ul className="max-h-[70dvh] space-y-2 overflow-auto">
                {students.map((item) => {
                  const on = item.studentId === current?.studentId;
                  return (
                    <li key={item.studentId}>
                      <button
                        type="button"
                        className={on ? "w-full rounded-2xl bg-ink p-3 text-left text-paper" : "w-full rounded-2xl border border-line bg-paper p-3 text-left"}
                        onClick={() => setPicked(item.studentId)}
                      >
                        <span className="block text-xl">{item.name}</span>
                        <span className={on ? "text-xs" : "text-xs text-muted"}>
                          {when(item.lastAt)} · 答對 {rate(item.correct, item.total)} · {item.tutorCount ? `問過 ${item.tutorCount} 次` : "未問導師"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {current ? <StudentDetail key={current.studentId} student={current} /> : null}
            </div>
          </>
        )}
      </main>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-line bg-paper p-3">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="text-3xl text-ink">{value}</p>
    </div>
  );
}

function StudentDetail({ student }: { student: StudentReport }) {
  const token = usePark((s) => s.chatToken);
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [note, setNote] = useState("");

  const reset = () => {
    if (!token || pending) return;
    setPending(true);
    void resetClassPassword({ data: { token, account: student.studentId } })
      .then((result) => {
        if (!result.ok) setNote(result.error);
        else setNote(`已重設。請叫 ${result.name} 用最初的密碼登入：${result.password}`);
      })
      .catch(() => setNote("暫時重設不到，請再試一次。"))
      .finally(() => {
        setPending(false);
        setConfirming(false);
      });
  };

  return (
    <div className="space-y-4">
      <section className="rounded-3xl border border-line bg-paper p-4">
        <h2 className="text-2xl">{student.name}</h2>
        <p className="mt-1 text-sm text-muted">
          練習 {student.sessions} 次 · 答對 {student.correct}/{student.total || 0}（{rate(student.correct, student.total)}） · {student.tutorCount ? `問過導師 ${student.tutorCount} 次` : "未問過導師"}
        </p>
        {/^6DStudent\d{2}$/.test(student.studentId) ? (
          <div className="mt-3">
            {confirming ? (
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold">重設後，{student.name} 要改回最初的密碼登入。</p>
                <button type="button" disabled={pending} className="h-11 rounded-2xl bg-coral px-4 text-sm font-bold text-paper disabled:opacity-60" onClick={reset}>
                  {pending ? "重設中…" : "確定重設"}
                </button>
                <button type="button" className="h-11 rounded-2xl border-2 border-ink px-4 text-sm font-bold" onClick={() => setConfirming(false)}>
                  取消
                </button>
              </div>
            ) : (
              <button type="button" className="h-11 rounded-2xl border-2 border-ink px-4 text-sm font-bold" onClick={() => setConfirming(true)}>
                重設密碼
              </button>
            )}
            {note ? <p className="mt-2 text-sm font-bold text-coral">{note}</p> : null}
          </div>
        ) : null}
        <h3 className="mt-4 text-lg">較弱課題</h3>
        {student.weak.length === 0 ? (
          <p className="mt-1">{student.sessions ? "暫時未見明顯較弱課題。" : "未有練習紀錄，未能分析。"}</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {student.weak.map((item) => (
              <li key={item.name} className="rounded-2xl border-2 border-ink px-3 py-2">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-muted">
                  {item.total ? `答對率 ${rate(item.correct, item.total)}（${item.correct}/${item.total}）` : "未做這個課題的練習"}
                  {item.tutor ? ` · 問過導師 ${item.tutor} 次` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="rounded-3xl border border-line bg-paper p-4">
        <h2 className="text-2xl">練習時間</h2>
        {student.practices.length === 0 ? (
          <p className="mt-3">未做過練習。</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {student.practices.map((item, index) => (
              <li key={`${item.at}-${index}`} className="rounded-2xl border-2 border-ink px-3 py-2">
                <p className="font-bold">
                  {when(item.at)} · {item.mode === "mock" ? "模擬試卷" : "課題練習"} · {item.correct}/{item.total}（{rate(item.correct, item.total)}）
                </p>
                <p className="text-sm text-muted">
                  用了 {item.seconds} 秒{item.topics ? ` · ${item.topics}` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="rounded-3xl border border-line bg-paper p-4">
        <h2 className="text-2xl">問導師</h2>
        {student.chats.length === 0 ? (
          <p className="mt-3">未問過導師。</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {student.chats.map((item, index) => (
              <li key={`${item.at}-${index}`} className="rounded-2xl border-2 border-ink p-3">
                <p className="text-xs font-bold text-muted">
                  {when(item.at)} · {item.mode === "lesson" ? "重溫" : "提問"} · {item.topic}
                </p>
                <p className="mt-2 font-bold">學生：{item.question}</p>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed">導師：{item.reply}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
