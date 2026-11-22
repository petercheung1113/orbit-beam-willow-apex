import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Shell } from "@/components/park/Shell";
import { FigureView } from "@/components/park/FigureView";
import { examRight, examShow, findPaper, EXAM_PAPERS, EXAM_UNIT_IDS, type ExamItem } from "@/data/exam-papers";
import { UNITS } from "@/data/units";
import { usePark } from "@/lib/park";
import { studentStamp } from "@/lib/student";
import { recordPractice } from "@/lib/teacher.functions";
import { MathText } from "@/components/park/MathText";

const LIVE_KEY = "playground-exam-v2";

type LiveExam = {
  unitId: string;
  minutes: 20 | 60;
  startedAt: number;
  endedAt?: number;
  index: number;
  answers: Record<string, string>;
  submitted: boolean;
};

type PaperRow = { id: string; item: ExamItem };

export const Route = createFileRoute("/exam")({
  component: ExamPage,
  head: () => ({ meta: [{ title: "試卷 · 數學遊樂場" }] }),
});

function readLive(): LiveExam | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const parsed = JSON.parse(sessionStorage.getItem(LIVE_KEY) ?? "") as LiveExam;
    if (!parsed || (parsed.minutes !== 20 && parsed.minutes !== 60)) return null;
    if (!findPaper(parsed.unitId, parsed.minutes)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeLive(live: LiveExam | null) {
  if (live) sessionStorage.setItem(LIVE_KEY, JSON.stringify(live));
  else sessionStorage.removeItem(LIVE_KEY);
}

function formatLeft(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function rowsOf(live: LiveExam): PaperRow[] {
  const paper = findPaper(live.unitId, live.minutes);
  if (!paper) return [];
  return paper.items.map((item, index) => ({ id: `${live.unitId}-${live.minutes}-${index}`, item }));
}

function ExamPage() {
  const addResult = usePark((s) => s.addResult);
  const [picked, setPicked] = useState<string>(EXAM_UNIT_IDS[0]);
  const [live, setLive] = useState<LiveExam | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [confirming, setConfirming] = useState(false);
  const [ready, setReady] = useState(false);
  const [recorded, setRecorded] = useState(false);

  useEffect(() => {
    const saved = readLive();
    if (saved) setLive(saved);
    setReady(true);
  }, []);

  const paperRows = useMemo(() => (live ? rowsOf(live) : []), [live]);
  const limit = (live?.minutes ?? 20) * 60 * 1000;
  const left = live ? limit - (now - live.startedAt) : limit;
  const expired = Boolean(live && !live.submitted && left <= 0);

  useEffect(() => {
    if (!live || live.submitted) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [live]);

  useEffect(() => {
    if (!expired || !live || live.submitted) return;
    const next = { ...live, submitted: true, endedAt: Date.now() };
    writeLive(next);
    setLive(next);
    setConfirming(false);
  }, [expired, live]);

  const patch = (next: LiveExam) => {
    writeLive(next);
    setLive(next);
  };

  const marked = useMemo(() => {
    if (!live?.submitted) return [];
    return paperRows.map((row) => {
      const pickedAnswer = live.answers[row.id] ?? "";
      return { ...row, picked: pickedAnswer, correct: examRight(row.item, pickedAnswer) };
    });
  }, [live, paperRows]);

  useEffect(() => {
    if (!live?.submitted || recorded || marked.length === 0) return;
    const sheet = findPaper(live.unitId, live.minutes);
    if (!sheet) return;
    setRecorded(true);
    const earned = marked.reduce((sum, row) => sum + (row.correct ? row.item.points : 0), 0);
    addResult(marked.map((row) => ({ unitId: row.item.topic ?? live.unitId, correct: row.correct })));
    const ended = live.endedAt ?? Date.now();
    const stamp = studentStamp();
    void recordPractice({
      data: {
        ...stamp,
        mode: "mock",
        correct: earned,
        total: sheet.total,
        seconds: Math.max(0, Math.round((ended - live.startedAt) / 1000)),
        topics: `${sheet.name} · ${sheet.minutes}分鐘`,
        breakdown: JSON.stringify([{ name: UNITS.find((unit) => unit.id === live.unitId)?.name ?? sheet.name, correct: earned, total: sheet.total }]),
      },
    });
  }, [addResult, live, marked, recorded]);

  const start = (minutes: 20 | 60, unitId = picked) => {
    const next: LiveExam = {
      unitId,
      minutes,
      startedAt: Date.now(),
      index: 0,
      answers: {},
      submitted: false,
    };
    setRecorded(false);
    patch(next);
    setNow(Date.now());
    setConfirming(false);
  };

  const reset = () => {
    writeLive(null);
    setLive(null);
    setConfirming(false);
    setRecorded(false);
  };

  return (
    <Shell>
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        {!ready && <p className="text-muted">正在準備試卷…</p>}
        {ready && !live && <Setup picked={picked} onPick={setPicked} onStart={start} onMixed={() => start(60, "ALL")} />}
        {ready && live && !live.submitted && (
          <Paper
            live={live}
            rows={paperRows}
            left={left}
            confirming={confirming}
            onJump={(index) => patch({ ...live, index })}
            onAnswer={(id, value) => patch({ ...live, answers: { ...live.answers, [id]: value } })}
            onConfirm={() => setConfirming(true)}
            onCancel={() => setConfirming(false)}
            onSubmit={() => patch({ ...live, submitted: true, endedAt: Date.now() })}
            onAbandon={reset}
          />
        )}
        {ready && live?.submitted && <Result live={live} rows={marked} onAgain={() => start(live.minutes, live.unitId)} onReset={reset} />}
      </main>
    </Shell>
  );
}

function Setup({
  picked,
  onPick,
  onStart,
  onMixed,
}: {
  picked: string;
  onPick: (id: string) => void;
  onStart: (minutes: 20 | 60) => void;
  onMixed: () => void;
}) {
  const units = EXAM_UNIT_IDS.map((id) => EXAM_PAPERS.find((paper) => paper.unitId === id && paper.minutes === 60)!);
  return (
    <section>
      <p className="text-sm font-bold text-coral">模擬試卷 · 交卷先對答案</p>
      <h1 className="text-4xl text-ink">揀課題開卷</h1>
      <button type="button" data-nav className="mt-4 w-full rounded-3xl border-2 border-ink bg-coral p-4 text-left text-paper" onClick={onMixed}>
        <p className="text-sm font-bold">全科</p>
        <p className="mt-1 text-2xl font-bold">60 分鐘綜合模擬考試</p>
        <p className="mt-1 text-sm text-paper/90">100 分 · 15 個課題 · 選擇 15 題、填充 10 題、應用 5 題</p>
      </button>
      <p className="mt-6 text-muted">或揀一個課題：20 分鐘 50 分，60 分鐘 100 分。題目次序跟該課題試卷。</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {units.map((paper) => (
          <button
            key={paper.unitId}
            type="button"
            onClick={() => onPick(paper.unitId)}
            className={
              "h-11 rounded-full px-3 text-sm font-bold " +
              (picked === paper.unitId ? "bg-grass text-paper" : "border-2 border-ink bg-paper text-ink")
            }
          >
            {paper.name}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button type="button" data-nav className="rounded-3xl border-2 border-ink bg-paper p-4 text-left" onClick={() => onStart(20)}>
          <p className="text-sm font-bold text-coral">短卷</p>
          <p className="mt-1 text-2xl font-bold">20 分鐘 · 50 分</p>
          <p className="mt-1 text-sm text-muted">選擇 6 題、填充 6 題、應用 2 題</p>
        </button>
        <button type="button" data-nav className="rounded-3xl border-2 border-ink bg-ink p-4 text-left text-paper" onClick={() => onStart(60)}>
          <p className="text-sm font-bold text-sun">長卷</p>
          <p className="mt-1 text-2xl font-bold">60 分鐘 · 100 分</p>
          <p className="mt-1 text-sm text-paper/80">選擇 10 題、填充 10 題、應用 5 題</p>
        </button>
      </div>
    </section>
  );
}

function Paper({
  live,
  rows,
  left,
  confirming,
  onJump,
  onAnswer,
  onConfirm,
  onCancel,
  onSubmit,
  onAbandon,
}: {
  live: LiveExam;
  rows: PaperRow[];
  left: number;
  confirming: boolean;
  onJump: (index: number) => void;
  onAnswer: (id: string, value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onAbandon: () => void;
}) {
  const sheet = findPaper(live.unitId, live.minutes);
  const row = rows[live.index];
  const answered = rows.filter((item) => live.answers[item.id]?.trim()).length;
  if (!row || !sheet) return <p>試卷還在整理，請再選一次課題。</p>;
  const q = row.item;
  const wide = q.kind === "text" && q.points >= 8;
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 border-ink bg-paper p-3">
        <div>
          <p className="text-xs font-bold text-muted">
            {sheet.name} · {sheet.minutes} 分鐘 · {sheet.total} 分
          </p>
          <p className={left < 5 * 60 * 1000 ? "text-4xl tabular-nums text-coral" : "text-4xl tabular-nums text-ink"}>{formatLeft(left)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold">
            已答 {answered} / {rows.length}
          </p>
          <button type="button" className="mt-1 text-xs font-bold text-muted underline" onClick={onAbandon}>
            放棄重選
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
        {rows.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onJump(index)}
            className={
              "h-9 rounded-lg border-2 border-ink text-sm font-bold " +
              (index === live.index ? "bg-ink text-paper" : live.answers[item.id]?.trim() ? "bg-grass text-paper" : "bg-paper")
            }
          >
            {index + 1}
          </button>
        ))}
      </div>
      <article className="rounded-3xl border-2 border-ink bg-paper p-4 sm:p-6">
        <p className="text-sm font-bold text-grass">
          第 {live.index + 1} 題 · {q.points} 分
        </p>
        <h2 className="mt-2 font-sans text-xl font-bold leading-relaxed">
          <MathText text={q.stem} />
        </h2>
        {q.figure && <FigureView figure={q.figure} />}
        {q.kind === "choice" ? (
          <div className="mt-4 grid gap-3">
            {q.choices.map((choice, choiceIndex) => {
              const on = live.answers[row.id] === String(choiceIndex);
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => onAnswer(row.id, String(choiceIndex))}
                  className={
                    "flex min-h-14 items-center gap-3 rounded-2xl border-2 border-ink px-4 py-3 text-left text-lg font-bold " +
                    (on ? "bg-grass text-paper" : "bg-cream")
                  }
                >
                  <span className={"grid size-8 shrink-0 place-items-center rounded-full text-sm " + (on ? "bg-paper text-ink" : "border-2 border-ink")}>
                    {String.fromCharCode(65 + choiceIndex)}
                  </span>
                  <MathText text={choice} />
                </button>
              );
            })}
          </div>
        ) : wide ? (
          <textarea
            value={live.answers[row.id] ?? ""}
            onChange={(event) => onAnswer(row.id, event.target.value)}
            rows={4}
            aria-label="答案"
            placeholder="寫下答案，應用題可列出主要步驟"
            className="mt-4 w-full rounded-2xl border-2 border-ink bg-cream px-3 py-2 font-bold"
          />
        ) : (
          <label className="mt-4 flex items-center gap-2 font-bold">
            <input
              inputMode={q.kind === "number" ? "decimal" : "text"}
              value={live.answers[row.id] ?? ""}
              onChange={(event) => onAnswer(row.id, event.target.value)}
              className="h-12 w-48 rounded-2xl border-2 border-ink bg-cream px-3"
              aria-label="答案"
            />
          </label>
        )}
      </article>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="h-12 rounded-2xl border-2 border-ink px-4 font-bold" disabled={live.index === 0} onClick={() => onJump(live.index - 1)}>
          上一題
        </button>
        <button
          type="button"
          className="h-12 rounded-2xl border-2 border-ink px-4 font-bold"
          disabled={live.index >= rows.length - 1}
          onClick={() => onJump(live.index + 1)}
        >
          下一題
        </button>
        <button type="button" className="h-12 rounded-2xl bg-ink px-4 font-bold text-paper" onClick={onConfirm}>
          交卷
        </button>
      </div>
      {confirming && (
        <div className="rounded-3xl border-2 border-ink bg-paper p-4">
          <p className="text-lg font-bold">
            {answered < rows.length ? `還有 ${rows.length - answered} 題未答，未答不給分。確定交卷？` : "確定交卷？交卷後才看答案。"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="h-12 rounded-2xl bg-coral px-4 font-bold text-paper" onClick={onSubmit}>
              確定交卷
            </button>
            <button type="button" className="h-12 rounded-2xl border-2 border-ink px-4 font-bold" onClick={onCancel}>
              返回作答
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Result({
  live,
  rows,
  onAgain,
  onReset,
}: {
  live: LiveExam;
  rows: { id: string; item: ExamItem; picked: string; correct: boolean }[];
  onAgain: () => void;
  onReset: () => void;
}) {
  const sheet = findPaper(live.unitId, live.minutes);
  const earned = rows.reduce((sum, row) => sum + (row.correct ? row.item.points : 0), 0);
  const total = sheet?.total ?? rows.reduce((sum, row) => sum + row.item.points, 0);
  const used = Math.min(live.minutes * 60 * 1000, Math.max(0, (live.endedAt ?? Date.now()) - live.startedAt));
  const seconds = Math.round(used / 1000);
  return (
    <section>
      <p className="text-sm font-bold text-coral">考試完畢 · {sheet?.name}</p>
      <h1 className="text-5xl tabular-nums text-ink">
        {earned} / {total}
      </h1>
      <p className="mt-2 text-lg">
        答對 {rows.filter((row) => row.correct).length} / {rows.length} 題，用了 {Math.floor(seconds / 60)} 分 {seconds % 60} 秒。
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="h-12 rounded-2xl bg-grass px-4 font-bold text-paper" onClick={onAgain}>
          再做一次
        </button>
        <button type="button" className="h-12 rounded-2xl border-2 border-ink px-4 font-bold" onClick={onReset}>
          改選課題
        </button>
        <Link to="/review" search={{ topic: live.unitId === "ALL" ? "6N1" : live.unitId }} className="inline-flex h-12 items-center rounded-2xl border-2 border-ink px-4 font-bold">
          去重溫
        </Link>
      </div>
      <div className="mt-5 space-y-3">
        {rows.map((row, index) => (
          <article key={row.id} className="rounded-3xl border-2 border-ink bg-paper p-4">
            <p className="text-xs font-bold text-muted">
              第 {index + 1} 題 · {row.item.points} 分 · {row.correct ? "答對" : row.picked.trim() ? "要再看" : "未作答"}
            </p>
            <p className="mt-1 font-bold">
              <MathText text={row.item.stem} />
            </p>
            {row.item.figure && <FigureView figure={row.item.figure} />}
            <p className="mt-2 text-sm leading-relaxed">{row.item.why}</p>
            {!row.correct && (
              <p className="mt-2 text-sm">
                參考答案：<MathText text={examShow(row.item)} />
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
