import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FigureView } from "@/components/park/FigureView";
import { MathText } from "@/components/park/MathText";
import { chipClass } from "@/components/park/picks";
import { Shell } from "@/components/park/Shell";
import { UNITS, type Question } from "@/data/units";
import { usePark } from "@/lib/park";
import { isTeacherAccount } from "@/lib/teacher-account";

export const Route = createFileRoute("/review")({
  validateSearch: (search: Record<string, unknown>) => ({
    topic: typeof search.topic === "string" && UNITS.some((unit) => unit.id === search.topic) ? search.topic : UNITS[0]?.id ?? "",
  }),
  component: ReviewPage,
  head: () => ({ meta: [{ title: "重溫 · 數學遊樂場" }] }),
});

function answerOf(question: Question) {
  if (question.kind === "number") return `${question.answer}${question.suffix ? ` ${question.suffix}` : ""}`;
  return question.choices[question.answer] ?? "";
}

function ReviewPage() {
  const { topic } = Route.useSearch();
  const mastery = usePark((s) => s.mastery);
  const student = usePark((s) => s.student);
  const teacher = isTeacherAccount(student);
  const [current, setCurrent] = useState(topic);
  const unit = UNITS.find((item) => item.id === current) ?? UNITS[0];
  if (!unit) return null;
  const stat = mastery[unit.id];

  return (
    <Shell>
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <p className="text-sm font-bold text-grass">課堂重溫</p>
        <h1 className="text-4xl text-ink">動手看懂</h1>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {UNITS.map((entry) => (
            <button key={entry.id} type="button" className={chipClass(entry.id === current) + " shrink-0"} onClick={() => setCurrent(entry.id)}>
              {entry.name}
            </button>
          ))}
        </div>
        <section className="mt-2 overflow-hidden rounded-3xl border-2 border-ink bg-paper">
          <img src={unit.art} alt="" className="h-48 w-full bg-meadow object-contain" />
          <div className="space-y-4 p-4 sm:p-6">
            <p className="text-sm font-bold text-muted">
              {unit.strand} · {unit.code} · {unit.ride}
              {stat ? ` · 練過 ${stat.seen} 題，對了 ${stat.correct}` : ""}
            </p>
            <h2 className="text-3xl text-ink">{unit.name}</h2>
            <p>{unit.blurb}</p>
            <ul className="space-y-2">
              {unit.learn.map((point) => (
                <li key={point} className="border-l-4 border-grass pl-3">
                  <MathText text={point} />
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <h3 className="text-2xl text-ink">例題</h3>
              {unit.questions.map((question, index) => (
                <article key={question.stem} className="rounded-2xl border-2 border-ink bg-cream p-4">
                  <p className="text-sm font-bold text-coral">例 {index + 1}</p>
                  <p className="mt-1 text-lg font-bold">
                    <MathText text={question.stem} />
                  </p>
                  {question.figure ? <FigureView figure={question.figure} /> : null}
                  <p className="mt-3 text-sm font-bold text-grass">點計</p>
                  <p className="mt-1 leading-relaxed">
                    <MathText text={question.why} />
                  </p>
                  <p className="mt-3 font-bold">
                    答案：<MathText text={answerOf(question)} />
                  </p>
                </article>
              ))}
            </div>
            {teacher ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {unit.focuses.map((focus) => (
                  <div key={focus} className="rounded-2xl border-2 border-ink bg-paper p-3">
                    <p className="text-sm font-bold text-coral">學習重點</p>
                    <p className="font-bold">{focus}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </Shell>
  );
}
