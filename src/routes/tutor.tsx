import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MathText } from "@/components/park/MathText";
import { Shell } from "@/components/park/Shell";
import { FAQ_PER_UNIT } from "@/data/tutor-faq";
import { UNITS } from "@/data/units";
import { studentStamp } from "@/lib/student";
import { recordTutor } from "@/lib/teacher.functions";
import { tutorReply } from "@/lib/tutor-reply";
import { hasProfanity, PROFANITY_ERROR } from "@/lib/profanity";

type Chat = { role: "user" | "tutor"; text: string };

export const Route = createFileRoute("/tutor")({
  component: TutorPage,
  head: () => ({ meta: [{ title: "導師 · 數學遊樂場" }] }),
});

const SUGGESTIONS = [
  "除以 10、100、1000，小數點怎樣走？",
  "百分數和小數怎樣互化？",
  "圓的周界和面積用哪條式？",
  "速率、時間和距離怎樣找？",
  "折線圖和棒形圖有什麼分別？",
];

function TutorPage() {
  const [topic, setTopic] = useState("all");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Chat[]>([]);

  const send = (message: string) => {
    const clean = message.trim();
    if (!clean) return;
    if (hasProfanity(clean)) {
      setMessages((prev) => [...prev, { role: "user", text: clean }, { role: "tutor", text: PROFANITY_ERROR }]);
      setText("");
      return;
    }
    const answer = tutorReply(clean, topic);
    setMessages((prev) => [...prev, { role: "user", text: clean }, { role: "tutor", text: answer.text }]);
    setText("");
    const stamp = studentStamp();
    void recordTutor({
      data: {
        ...stamp,
        topic: answer.topic,
        mode: "chat",
        question: clean,
        reply: answer.text,
      },
    });
  };

  return (
    <Shell>
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="flex items-center gap-3">
          <img src="/park/mascot.jpg" alt="" className="size-16 rounded-full border-2 border-ink object-cover" />
          <div>
            <p className="text-sm font-bold text-coral">課本導師</p>
            <h1 className="text-4xl text-ink">問樂樂</h1>
          </div>
        </div>
        <p className="mt-2 text-muted">
          每個課題預備了 {FAQ_PER_UNIT.toLocaleString("zh-HK")} 條學生可能會問的問題。樂樂只會一步一步引導，不會直接把答案告訴你。
        </p>
        <label className="mt-4 block text-sm font-bold">
          這題關於
          <select value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-3">
            <option value="all">我不太確定</option>
            {UNITS.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-4 space-y-3">
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((item) => (
                <button key={item} type="button" className="rounded-2xl border-2 border-ink bg-paper px-3 py-2 text-left text-sm font-bold" onClick={() => send(item)}>
                  {item}
                </button>
              ))}
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className={message.role === "user" ? "ml-8 rounded-2xl bg-grass p-4 text-paper" : "mr-6 whitespace-pre-wrap rounded-3xl border-2 border-ink bg-paper p-4 leading-relaxed"}>
              <MathText text={message.text} />
            </div>
          ))}
        </div>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            send(text);
          }}
        >
          <label className="sr-only" htmlFor="ask">
            你的問題
          </label>
          <textarea
            id="ask"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={3}
            maxLength={600}
            placeholder="例如：36 除以 10，小數點怎樣走？"
            className="min-h-24 flex-1 rounded-2xl border-2 border-ink bg-paper p-3"
          />
          <button type="submit" disabled={text.trim().length === 0} className="h-12 self-end rounded-2xl bg-coral px-4 font-bold text-paper">
            發送
          </button>
        </form>
      </main>
    </Shell>
  );
}
