import { useEffect, useRef, useState } from "react";
import { answerText, isRight, type Drawn } from "@/lib/draw";
import { FigureView } from "@/components/park/FigureView";
import { MathText } from "@/components/park/MathText";
import { hasProfanity, PROFANITY_ERROR } from "@/lib/profanity";
import { studentStamp } from "@/lib/student";
import { recordTutor } from "@/lib/teacher.functions";
import { tutorReply } from "@/lib/tutor-reply";

export type PlayRow = { item: Drawn; picked: string; correct: boolean };

type Ask = { role: "user" | "tutor"; text: string };

export function PlayQuiz({
  items,
  timed,
  onDone,
}: {
  items: Drawn[];
  timed?: boolean;
  onDone: (rows: PlayRow[]) => void;
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [rows, setRows] = useState<PlayRow[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const [askOpen, setAskOpen] = useState(false);
  const [askText, setAskText] = useState("");
  const [asks, setAsks] = useState<Ask[]>([]);
  const start = useRef(Date.now());
  const item = items[index];

  useEffect(() => {
    start.current = Date.now();
    setNow(Date.now());
  }, [items]);

  useEffect(() => {
    if (!timed) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [timed, items]);

  if (!item) return null;
  const question = item.question;
  const revealed = picked !== null;
  const elapsed = Math.max(0, Math.round((now - start.current) / 1000));
  const clock = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

  function commit(value: string) {
    if (picked !== null) return;
    const row = { item, picked: value, correct: isRight(question, value) };
    const next = [...rows, row];
    setRows(next);
    setPicked(value);
  }

  function next() {
    if (index + 1 >= items.length) {
      onDone(rows);
      return;
    }
    setPicked(null);
    setDraft("");
    setAskOpen(false);
    setAskText("");
    setAsks([]);
    setIndex((value) => value + 1);
  }

  function ask(message: string) {
    const clean = message.trim();
    if (!clean) return;
    if (hasProfanity(clean)) {
      setAsks((prev) => [...prev, { role: "user", text: clean }, { role: "tutor", text: PROFANITY_ERROR }]);
      setAskText("");
      return;
    }
    const answer = tutorReply(clean, item.unitId, { stem: question.stem });
    setAsks((prev) => [...prev, { role: "user", text: clean }, { role: "tutor", text: answer.text }]);
    setAskText("");
    const stamp = studentStamp();
    void recordTutor({
      data: { ...stamp, topic: answer.topic, mode: "chat", question: clean, reply: answer.text },
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-bold text-ink">
        <span>
          第 {index + 1} / {items.length} 題
        </span>
        <span>{timed ? clock : "慢慢想"}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line">
        <div className="h-full bg-grass" style={{ width: `${(index / items.length) * 100}%` }} />
      </div>
      <article className="rounded-3xl border-2 border-ink bg-paper p-4 sm:p-6">
        <p className="text-sm font-bold text-grass">
          {item.ride} · {item.unitName}
        </p>
        <h2 className="mt-2 font-sans text-xl font-bold leading-relaxed text-ink">
          <MathText text={question.stem} />
        </h2>
        {question.figure && <FigureView figure={question.figure} />}
        {!timed && !revealed && (
          <div className="mt-4">
            <button type="button" className="h-10 rounded-2xl border-2 border-ink bg-cream px-4 text-sm font-bold" onClick={() => setAskOpen((open) => !open)}>
              {askOpen ? "收起樂樂" : "問樂樂"}
            </button>
            {askOpen && (
              <div className="mt-3 space-y-2 rounded-2xl border-2 border-ink bg-cream p-3">
                <p className="text-sm text-muted">樂樂只會引導你怎樣想，不會直接講這題的答案。</p>
                {asks.length === 0 && (
                  <button type="button" className="rounded-2xl border-2 border-ink bg-paper px-3 py-2 text-left text-sm font-bold" onClick={() => ask("這題怎樣想？")}>
                    這題怎樣想？
                  </button>
                )}
                {asks.map((row, askIndex) => (
                  <div key={askIndex} className={row.role === "user" ? "ml-6 rounded-2xl bg-grass p-3 text-sm text-paper" : "whitespace-pre-wrap rounded-2xl bg-paper p-3 text-sm leading-relaxed"}>
                    <MathText text={row.text} />
                  </div>
                ))}
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    ask(askText);
                  }}
                >
                  <input value={askText} onChange={(event) => setAskText(event.target.value)} maxLength={300} placeholder="例如：要先看哪一個數？" className="h-11 min-w-0 flex-1 rounded-2xl border-2 border-ink bg-paper px-3" />
                  <button type="submit" className="h-11 rounded-2xl bg-coral px-3 font-bold text-paper">
                    發送
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
        {revealed && (
          <p className={"mt-4 rounded-2xl border-2 border-ink p-3 font-bold " + (isRight(question, picked ?? "") ? "bg-grass text-paper" : "bg-coral text-paper")}>
            {isRight(question, picked ?? "") ? "答對了" : <>答錯了，答案是 <MathText text={answerText(question)} /></>}
          </p>
        )}
        {question.kind === "choice" ? (
          <div className="mt-4 grid gap-3">
            {question.choices.map((choice, choiceIndex) => {
              const on = picked === String(choiceIndex);
              const showRight = revealed && choiceIndex === question.answer;
              const showWrong = revealed && on && choiceIndex !== question.answer;
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => commit(String(choiceIndex))}
                  className={
                    "min-h-12 rounded-2xl border-2 border-ink px-4 py-3 text-left text-lg font-bold " +
                    (showRight ? "bg-grass text-paper" : showWrong ? "bg-coral text-paper" : "bg-cream text-ink")
                  }
                >
                  <MathText text={String(choice)} />
                </button>
              );
            })}
          </div>
        ) : (
          <form
            className="mt-4 flex flex-wrap items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!revealed) commit(draft);
            }}
          >
            <input
              inputMode="decimal"
              value={draft}
              disabled={revealed}
              onChange={(event) => setDraft(event.target.value)}
              aria-label="答案"
              className="h-12 w-36 rounded-2xl border-2 border-ink bg-cream px-3 tabular-nums"
            />
            {question.suffix && <span>{question.suffix}</span>}
            {!revealed && (
              <button type="submit" className="h-12 rounded-2xl bg-ink px-4 font-bold text-paper">
                確定
              </button>
            )}
          </form>
        )}
        {revealed && (
          <p className="mt-4 text-sm leading-relaxed text-ink">
            <MathText text={question.why} />
          </p>
        )}
        {revealed && (
          <button type="button" onClick={next} className="mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper">
            {index + 1 === items.length ? "看成績" : "下一題"}
          </button>
        )}
      </article>
    </div>
  );
}
