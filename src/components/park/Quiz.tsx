import { useState, type FormEvent } from "react";
import type { Question } from "@/data/units";
import { MathText } from "@/components/park/MathText";

export function Quiz({
  questions,
  onClear,
  title = "敘述句練習",
  submitLabel = "對答案並蓋章",
  doneLabel = "已蓋章",
}: {
  questions: Question[];
  onClear: () => void;
  title?: string;
  submitLabel?: string;
  doneLabel?: string;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => questions.map(() => null));
  const [texts, setTexts] = useState<string[]>(() => questions.map(() => ""));
  const [marked, setMarked] = useState(false);

  const results = questions.map((q, i) => {
    if (q.kind === "choice") return picks[i] === q.answer;
    const n = Number(texts[i].trim());
    const eps = q.eps ?? 0.001;
    return Number.isFinite(n) && Math.abs(n - q.answer) <= eps;
  });
  const allRight = marked && results.every(Boolean);

  function submit(e: FormEvent) {
    e.preventDefault();
    setMarked(true);
    const ok = questions.every((q, i) => {
      if (q.kind === "choice") return picks[i] === q.answer;
      const n = Number(texts[i].trim());
      return Number.isFinite(n) && Math.abs(n - q.answer) <= (q.eps ?? 0.001);
    });
    if (ok) onClear();
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-xl text-ink">{title}</h3>
        {allRight && (
          <span className="pop-in rounded-full bg-sun px-3 py-1 text-sm font-medium text-ink">{doneLabel}</span>
        )}
      </div>
      {questions.map((q, i) => {
        const right = marked && results[i];
        const wrong = marked && !results[i];
        return (
          <fieldset
            key={q.stem}
            className={
              "rounded-2xl border bg-cream/60 p-3 " +
              (right ? "border-grass" : wrong ? "border-coral" : "border-line")
            }
          >
            <legend className="px-1 text-sm font-medium text-muted">第 {i + 1} 題</legend>
            <p className="mb-3 text-ink">
              <MathText text={q.stem} />
            </p>
            {q.kind === "choice" ? (
              <div className="grid gap-2">
                {q.choices.map((c, ci) => {
                  const on = picks[i] === ci;
                  return (
                    <label
                      key={c}
                      className={
                        "flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2 " +
                        (on ? "border-grass bg-paper" : "border-line bg-paper")
                      }
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        className="size-4 accent-grass"
                        checked={on}
                        onChange={() => {
                          setPicks((prev) => prev.map((v, j) => (j === i ? ci : v)));
                          setMarked(false);
                        }}
                      />
                      <span>
                        <MathText text={String(c)} />
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <label className="flex items-center gap-2">
                <input
                  inputMode="decimal"
                  value={texts[i]}
                  onChange={(e) => {
                    setTexts((prev) => prev.map((v, j) => (j === i ? e.target.value : v)));
                    setMarked(false);
                  }}
                  className="min-h-11 w-32 rounded-xl border border-line bg-paper px-3 tabular-nums text-ink"
                  aria-label={`第 ${i + 1} 題答案`}
                />
                {q.suffix && <span className="text-muted">{q.suffix}</span>}
              </label>
            )}
            {marked && (
              <p className={"mt-3 text-sm " + (right ? "text-grass" : "text-coral")} role="status">
                {right ? "對。" : "再試一次。"} <MathText text={q.why} />
              </p>
            )}
          </fieldset>
        );
      })}
      <button
        type="submit"
        className="min-h-11 rounded-full bg-grass px-5 font-medium text-paper"
      >
        {marked && !allRight ? "改好了，再對一次" : submitLabel}
      </button>
    </form>
  );
}
