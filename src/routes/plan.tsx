import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Shell } from "@/components/park/Shell";
import { chipClass } from "@/components/park/picks";
import { CORE_UNITS } from "@/data/units";
import { usePark } from "@/lib/park";
import { addDays, buildSchedule, formatISODate, parseISODate, targetLine, todayISO, type DayPlan } from "@/lib/schedule";

export const Route = createFileRoute("/plan")({
  component: PlanPage,
  head: () => ({ meta: [{ title: "備試 · 數學遊樂場" }] }),
});

function PlanPage() {
  const plan = usePark((s) => s.plan);
  const setPlan = usePark((s) => s.setPlan);
  const clearPlan = usePark((s) => s.clearPlan);
  const toggleDay = usePark((s) => s.toggleDay);
  const ready = usePark((s) => s.ready);
  const [today, setToday] = useState("");
  const [examDate, setExamDate] = useState(plan?.examDate ?? "");
  const [target, setTarget] = useState(plan?.target ?? 80);
  const [minutes, setMinutes] = useState(plan?.minutes ?? 20);
  const [focus, setFocus] = useState<string[]>(plan?.focus ?? []);
  const [coverAll, setCoverAll] = useState(plan?.coverAll ?? true);

  useEffect(() => {
    const now = todayISO();
    setToday(now);
    setExamDate((current) => current || formatISODate(addDays(new Date(), 7)));
  }, []);

  useEffect(() => {
    if (!ready || !plan) return;
    setExamDate(plan.examDate);
    setTarget(plan.target);
    setMinutes(plan.minutes);
    setFocus(plan.focus);
    setCoverAll(plan.coverAll);
  }, [ready, plan]);

  const days = useMemo(() => {
    if (!today || !examDate) return [];
    return buildSchedule({ today, examDate, target, minutes, focus, coverAll });
  }, [today, examDate, target, minutes, focus, coverAll]);

  const save = () => {
    if (!examDate) return;
    setPlan({
      examDate,
      target,
      minutes,
      focus,
      coverAll,
      done: plan?.examDate === examDate ? plan.done : {},
    });
  };

  return (
    <Shell>
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p className="text-sm font-bold text-coral">考試準備</p>
        <h1 className="text-4xl text-ink">你的溫習時間表</h1>
        <p className="mt-2 max-w-2xl text-muted">點月曆上的一天，就知道那天要溫什麼。考前會有模擬小測和輕鬆重溫。</p>
        {days.length > 0 && (
          <MonthCalendar days={days} today={today} saved={Boolean(plan)} done={plan?.done ?? {}} onToggle={toggleDay} />
        )}
        {today && examDate && examDate < today && <p className="mt-4 font-bold text-coral">這個日子已經過了，請再選一次。</p>}
        <h2 className="mt-8 text-2xl text-ink">調整安排</h2>
        <form
          className="mt-3 space-y-5 rounded-3xl border-2 border-ink bg-paper p-4 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <label className="block font-bold">
            考試日期
            <input
              type="date"
              required
              value={examDate}
              min={today || undefined}
              onChange={(event) => setExamDate(event.target.value)}
              className="mt-2 h-12 w-full rounded-2xl border-2 border-ink bg-cream px-3"
            />
          </label>
          <div>
            <span className="font-bold">目標分數</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {[60, 70, 80, 90, 100].map((score) => (
                <button key={score} type="button" className={score === target ? chipClass(true) : chipClass(false)} onClick={() => setTarget(score)}>
                  {score}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted">{targetLine(target)} 練習和模擬考試都會從你選的課題抽題，題目上不會標難度。</p>
          </div>
          <label className="block font-bold">
            每天大約 {minutes} 分鐘
            <input type="range" min={10} max={45} step={5} value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} className="mt-3 w-full accent-grass" />
          </label>
          <div>
            <span className="font-bold">想多溫的課題</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {CORE_UNITS.map((unit) => {
                const on = focus.includes(unit.id);
                return (
                  <button
                    key={unit.id}
                    type="button"
                    className={on ? "h-11 rounded-full bg-coral px-3 text-sm font-bold text-paper" : chipClass(false)}
                    onClick={() => setFocus((prev) => (on ? prev.filter((id) => id !== unit.id) : [...prev, unit.id]))}
                  >
                    {unit.name}
                  </button>
                );
              })}
            </div>
          </div>
          <label className="flex items-center gap-3 font-bold">
            <input type="checkbox" checked={coverAll} onChange={(event) => setCoverAll(event.target.checked)} className="size-5 accent-grass" />
            其他課題也排一點
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="h-12 rounded-2xl bg-grass px-5 font-bold text-paper">
              生成時間表
            </button>
            {plan && (
              <button type="button" className="h-12 px-3 font-bold text-muted" onClick={clearPlan}>
                清除
              </button>
            )}
          </div>
        </form>
      </main>
    </Shell>
  );
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

function monthCells(year: number, month: number): Array<string | null> {
  const lead = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const cells: Array<string | null> = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= count; day += 1) cells.push(formatISODate(new Date(year, month, day)));
  while (cells.length % 7) cells.push(null);
  return cells;
}

function MonthCalendar({
  days,
  today,
  saved,
  done,
  onToggle,
}: {
  days: DayPlan[];
  today: string;
  saved: boolean;
  done: Record<string, boolean>;
  onToggle: (date: string) => void;
}) {
  const byDate = useMemo(() => new Map(days.map((day) => [day.date, day])), [days]);
  const anchor = parseISODate(today || days[0]?.date || formatISODate(new Date()));
  const [year, setYear] = useState(anchor.getFullYear());
  const [month, setMonth] = useState(anchor.getMonth());
  const [picked, setPicked] = useState(byDate.has(today) ? today : (days[0]?.date ?? ""));
  const cells = monthCells(year, month);
  const selected = byDate.get(picked);

  return (
    <div className="mt-5 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="rounded-3xl border-2 border-ink bg-paper p-3 sm:p-5" aria-label="溫習月曆">
        <div className="flex items-center justify-between gap-2">
          <button type="button" className="grid size-12 place-items-center rounded-2xl border-2 border-ink" onClick={() => shift(-1)} aria-label="上個月">
            <ChevronLeft className="size-5" />
          </button>
          <h2 className="text-3xl text-ink">
            {year}年{month + 1}月
          </h2>
          <button type="button" className="grid size-12 place-items-center rounded-2xl border-2 border-ink" onClick={() => shift(1)} aria-label="下個月">
            <ChevronRight className="size-5" />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 sm:gap-2">
          {WEEKDAYS.map((name) => (
            <div key={name} className="pb-1 text-center text-sm font-bold text-muted">
              {name}
            </div>
          ))}
          {cells.map((date, index) => {
            if (!date) return <div key={`blank-${index}`} />;
            const day = byDate.get(date);
            const on = date === picked;
            const finished = Boolean(day && done[date]);
            return (
              <button
                key={date}
                type="button"
                onClick={() => setPicked(date)}
                className={
                  "flex min-h-16 flex-col items-center justify-center rounded-2xl border-2 px-0.5 py-1 sm:min-h-24 " +
                  (on ? "border-ink bg-grass text-paper" : day?.kind === "exam" ? "border-ink bg-coral text-paper" : day ? "border-ink bg-cream text-ink" : "border-line bg-paper text-muted")
                }
              >
                <span className="flex items-center gap-0.5 text-xl leading-none">
                  {Number(date.slice(8))}
                  {finished && <Check className="size-3.5" aria-hidden />}
                </span>
                {day && <span className="max-w-full truncate text-xs font-bold">{day.kind === "exam" ? "考試" : day.kind === "mock" ? "小測" : day.kind === "review" ? "重溫" : day.title}</span>}
              </button>
            );
          })}
        </div>
      </section>
      <article className="rounded-3xl border-2 border-ink bg-paper p-4 sm:p-6 lg:sticky lg:top-24">
        {selected ? (
          <>
            <p className="text-sm font-bold text-muted">
              {selected.date} · 星期{selected.weekday}
              {selected.date === today ? " · 今天" : ""}
              {done[selected.date] ? " · 已完成" : ""}
            </p>
            <h2 className="mt-1 text-3xl text-ink">{selected.title}</h2>
            <p className="mt-3 text-lg leading-relaxed">{selected.detail}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.kind !== "exam" && saved && (
                <button type="button" className={done[selected.date] ? chipClass(true) : "h-12 rounded-2xl border-2 border-ink px-4 font-bold"} onClick={() => onToggle(selected.date)}>
                  {done[selected.date] ? "完成了" : "打卡"}
                </button>
              )}
              {selected.topic && (
                <>
                  <Link to="/review" search={{ topic: selected.topic }} className="inline-flex h-12 items-center rounded-2xl bg-grass px-4 font-bold text-paper">
                    去重溫
                  </Link>
                  <Link to="/practice" search={{ topic: selected.topic }} className="inline-flex h-12 items-center rounded-2xl border-2 border-ink px-4 font-bold">
                    去做題
                  </Link>
                </>
              )}
              {selected.kind === "mock" && (
                <Link to="/exam" className="inline-flex h-12 items-center rounded-2xl border-2 border-ink px-4 font-bold">
                  開始模擬考試
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl text-ink">這天休息</h2>
            <p className="mt-2 text-lg">沒有溫習安排。點有課題名字的日子，就知道要溫什麼。</p>
          </>
        )}
      </article>
    </div>
  );

  function shift(delta: number) {
    const next = new Date(year, month + delta, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  }
}
