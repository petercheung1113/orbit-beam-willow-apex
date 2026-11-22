import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PlayQuiz, type PlayRow } from "@/components/park/PlayQuiz";
import { ScratchPad } from "@/components/park/ScratchPad";
import { UnitPicks } from "@/components/park/picks";
import { Shell } from "@/components/park/Shell";
import { UNITS } from "@/data/units";
import { drawPractice } from "@/data/practice-bank";
import { type Drawn } from "@/lib/draw";
import { FigureView } from "@/components/park/FigureView";
import { MathText } from "@/components/park/MathText";
import { usePark } from "@/lib/park";
import { studentStamp, topicBreakdown } from "@/lib/student";
import { recordPractice } from "@/lib/teacher.functions";

export const Route = createFileRoute("/practice")({
  validateSearch: (search: Record<string, unknown>) => ({
    topic: typeof search.topic === "string" && UNITS.some((unit) => unit.id === search.topic) ? search.topic : "all",
  }),
  component: PracticePage,
  head: () => ({ meta: [{ title: "練習 · 數學遊樂場" }] }),
});

function PracticePage() {
  const { topic } = Route.useSearch();
  const target = usePark((s) => s.plan?.target ?? 80);
  const addResult = usePark((s) => s.addResult);
  const [selected, setSelected] = useState<string[]>(topic === "all" ? [] : [topic]);
  const [paper, setPaper] = useState<Drawn[] | null>(null);
  const [timed, setTimed] = useState(false);
  const [result, setResult] = useState<PlayRow[] | null>(null);
  const [startedAt, setStartedAt] = useState(0);

  const start = (nextTimed: boolean) => {
    const ids = nextTimed ? UNITS.map((unit) => unit.id) : selected;
    const seed = Math.floor(Math.random() * 0x7fffffff) + 1;
    setTimed(nextTimed);
    setResult(null);
    setStartedAt(Date.now());
    setPaper(drawPractice(seed, ids.length ? ids : UNITS.map((unit) => unit.id)));
  };

  const finish = (rows: PlayRow[]) => {
    setResult(rows);
    addResult(rows.map((row) => ({ unitId: row.item.unitId, correct: row.correct })));
    const stamp = studentStamp();
    const topics = [...new Set(rows.map((row) => UNITS.find((unit) => unit.id === row.item.unitId)?.name ?? row.item.unitId))].join("、");
    void recordPractice({
      data: {
        ...stamp,
        mode: timed ? "mock" : "practice",
        correct: rows.filter((row) => row.correct).length,
        total: rows.length,
        seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
        topics,
        breakdown: topicBreakdown(rows.map((row) => ({ name: UNITS.find((unit) => unit.id === row.item.unitId)?.name ?? row.item.unitId, correct: row.correct }))),
      },
    });
  };

  const score = result ? Math.round((result.filter((row) => row.correct).length / (result.length || 1)) * 100) : 0;

  return (
    <Shell>
      <main className={"mx-auto w-full px-4 py-8 " + (paper && !result ? "max-w-6xl" : "max-w-3xl")}>
        {!paper && (
          <>
            <p className="text-sm font-bold text-grass">練習及模擬小測</p>
            <h1 className="text-4xl text-ink">揀課題練習</h1>
            <p className="mt-2 text-muted">
              每個課題 100 題，分基礎、鞏固、高階，題型對齊課本和工作紙。開始後抽 15 題：基礎 5、鞏固 5、高階 5，次序隨機打散，題目上不標難度。想限時交卷才對答案，用
              <Link to="/exam" className="font-bold text-ink">
                模擬考試
              </Link>
              。
            </p>
            <div className="mt-4">
              <UnitPicks
                selected={selected}
                onToggle={(id) => setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))}
                onAll={() => setSelected(selected.length === UNITS.length ? [] : UNITS.map((unit) => unit.id))}
              />
            </div>
            <p className="mt-4 text-sm font-bold text-ink">每次 15 題，基礎、鞏固、高階各 5 題，次序已經打散。</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" data-nav className="h-12 rounded-2xl bg-grass px-5 font-bold text-paper" onClick={() => start(false)} disabled={selected.length === 0}>
                開始練習
              </button>
              <button type="button" data-nav className="h-12 rounded-2xl border-2 border-ink bg-paper px-5 font-bold" onClick={() => start(true)}>
                15 題模擬小測
              </button>
            </div>
          </>
        )}
        {paper && !result && (
          <div className="grid items-stretch gap-4 md:grid-cols-2">
            <PlayQuiz items={paper} timed={timed} onDone={finish} />
            <ScratchPad />
          </div>
        )}
        {result && (
          <section>
            <p className="text-sm font-bold text-coral">成績</p>
            <h1 className="text-5xl tabular-nums text-ink">{score} 分</h1>
            <p className="mt-2 text-lg">
              答對 {result.filter((row) => row.correct).length} / {result.length} 題。
              {score >= target ? `達到你的目標 ${target} 分。` : `距離目標 ${target} 分還差一點，看看下面的解釋。`}
            </p>
            <button
              type="button"
              className="mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper"
              onClick={() => {
                setPaper(null);
                setResult(null);
              }}
            >
              再練一組
            </button>
            <div className="mt-5 space-y-3">
              {result.map((row) => (
                <article key={row.item.id} className="rounded-3xl border-2 border-ink bg-paper p-4">
                  <p className="text-xs font-bold text-muted">
                    {row.item.unitName} · {row.correct ? "答對" : "要再看"}
                  </p>
                  <p className="mt-1 font-bold">
                    <MathText text={row.item.question.stem} />
                  </p>
                  {row.item.question.figure && <FigureView figure={row.item.question.figure} />}
                  <p className="mt-2 text-sm leading-relaxed">{row.item.question.why}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </Shell>
  );
}
