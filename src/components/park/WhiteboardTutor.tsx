import { useEffect, useRef, useState } from "react";
import { MathPieces, visiblePieces } from "@/components/park/MathText";
import { WHITEBOARD_LESSONS, type BoardStep, type Mark } from "@/data/whiteboard-lessons";

function stepHeight(step: BoardStep) {
  if (step.h) return step.h;
  let max = 72;
  for (const mark of step.marks) {
    if (mark.kind === "text") {
      const extra = mark.text.includes("/") ? Math.round((mark.size ?? 32) * 0.85) : 16;
      max = Math.max(max, mark.y + extra);
    } else if (mark.kind === "line") max = Math.max(max, mark.y1, mark.y2);
    else if (mark.kind === "rect") max = Math.max(max, mark.y + mark.h);
    else if (mark.kind === "circle") max = Math.max(max, mark.cy + mark.r);
    else {
      const nums = mark.d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
      for (const value of nums) max = Math.max(max, value);
    }
  }
  return Math.ceil(max + 32);
}

function MarkShape({ mark, live }: { mark: Mark; live: boolean }) {
  if (mark.kind === "text") return null;
  const draw = live ? "wb-draw" : undefined;
  if (mark.kind === "line") {
    return (
      <line
        x1={mark.x1}
        y1={mark.y1}
        x2={mark.x2}
        y2={mark.y2}
        stroke={mark.stroke ?? "#1c241c"}
        strokeWidth={mark.width ?? 3}
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        className={draw}
      />
    );
  }
  if (mark.kind === "rect") {
    return (
      <rect
        x={mark.x}
        y={mark.y}
        width={mark.w}
        height={mark.h}
        stroke={mark.stroke ?? "#1c241c"}
        strokeWidth={3}
        fill="none"
        pathLength={1}
        className={draw}
      />
    );
  }
  if (mark.kind === "circle") {
    return (
      <circle
        cx={mark.cx}
        cy={mark.cy}
        r={mark.r}
        stroke={mark.stroke ?? "#1c241c"}
        strokeWidth={3}
        fill="none"
        pathLength={1}
        className={draw}
      />
    );
  }
  return (
    <path
      d={mark.d}
      stroke={mark.stroke ?? "#1c241c"}
      strokeWidth={mark.width ?? 3}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      pathLength={1}
      className={draw}
    />
  );
}

function WriteText({ mark, live, boardHeight }: { mark: Extract<Mark, { kind: "text" }>; live: boolean; boardHeight: number }) {
  const [count, setCount] = useState(live ? 0 : mark.text.length);
  useEffect(() => {
    if (!live) {
      setCount(mark.text.length);
      return;
    }
    setCount(0);
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= mark.text.length) window.clearInterval(timer);
    }, 120);
    return () => window.clearInterval(timer);
  }, [live, mark.text]);
  const size = mark.size ?? 32;
  return (
    <p
      className="absolute m-0 whitespace-nowrap font-bold leading-none"
      style={{
        left: `${(mark.x / 760) * 100}%`,
        top: `${(mark.y / boardHeight) * 100}%`,
        transform: "translateY(-100%)",
        fontSize: `${(size / 760) * 100}cqw`,
        color: mark.fill ?? "#1c241c",
        fontFamily: '"ZCOOL KuaiLe", "Noto Sans TC", "PingFang HK", sans-serif',
      }}
    >
      <MathPieces pieces={visiblePieces(mark.text, count)} />
    </p>
  );
}

export function WhiteboardTutor({ unitId, title }: { unitId: string; title: string }) {
  const steps = WHITEBOARD_LESSONS[unitId] ?? [];
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [step, setStep] = useState(0);
  const [pen, setPen] = useState(0);
  const [run, setRun] = useState(0);
  const current = steps[step];
  const board = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const box = board.current;
    if (!box) return;
    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }, [step, pen]);

  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    if (!current || !started) return;
    let alive = true;
    let moved = false;
    setPen(1);
    const audio = new Audio(`/tutor/${unitId}-${step}.mp3`);
    audioRef.current = audio;
    const timers: number[] = [];
    const clearTimers = () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.length = 0;
    };
    const goNext = () => {
      if (!alive || moved) return;
      moved = true;
      clearTimers();
      setStep((value) => {
        if (value + 1 >= steps.length) {
          setPlaying(false);
          return value;
        }
        return value + 1;
      });
    };
    const plan = (ms: number) => {
      if (!alive) return;
      clearTimers();
      const count = Math.max(current.marks.length, 1);
      const slice = ms / count;
      for (let index = 1; index < count; index += 1) {
        timers.push(window.setTimeout(() => setPen(index + 1), slice * index));
      }
    };
    let fallback = 0;
    const silent = (ms: number) => {
      window.clearTimeout(fallback);
      const fire = () => {
        if (!alive || moved) return;
        if (!playingRef.current) {
          fallback = window.setTimeout(fire, 400);
          return;
        }
        goNext();
      };
      fallback = window.setTimeout(fire, ms);
    };
    audio.onloadedmetadata = () => {
      const ms = Math.max(2800, (Number.isFinite(audio.duration) ? audio.duration : 4) * 1000);
      plan(ms);
      timers.push(
        window.setTimeout(() => {
          if (!alive || moved) return;
          if (audio.ended || audio.currentTime >= Math.max(0, (audio.duration || 0) - 0.3)) goNext();
        }, ms + 900),
      );
    };
    audio.onended = () => {
      if (!alive) return;
      window.setTimeout(() => {
        if (alive) goNext();
      }, 420);
    };
    audio.onerror = () => {
      const ms = Math.max(4200, current.say.length * 170);
      plan(ms);
      silent(ms + 400);
    };
    if (playingRef.current) {
      void audio.play().catch(() => {
        const ms = Math.max(4200, current.say.length * 170);
        plan(ms);
        silent(ms + 400);
      });
    } else {
      const ms = Math.max(4200, current.say.length * 170);
      plan(ms);
    }
    return () => {
      alive = false;
      moved = true;
      window.clearTimeout(fallback);
      clearTimers();
      audio.onended = null;
      audio.onerror = null;
      audio.onloadedmetadata = null;
      audio.pause();
      audio.src = "";
    };
  }, [step, unitId, run, current, steps.length, started]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    if (!playing) {
      audio.pause();
      return;
    }
    if (audio.paused && audio.currentTime < (audio.duration || 0) - 0.2) void audio.play().catch(() => {});
  }, [muted, playing]);

  if (!current) return null;

  const jump = (next: number) => {
    setStarted(true);
    setPlaying(true);
    setStep(Math.max(0, Math.min(steps.length - 1, next)));
  };

  return (
    <section className="rounded-3xl border-2 border-ink bg-paper p-4">
      <div className="flex flex-wrap items-center gap-3">
        <img src="/park/login-fox.jpg" alt="" className="size-12 rounded-full border-2 border-ink object-cover" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-coral">白板家教 · 邊講邊畫</p>
          <h2 className="truncate text-xl text-ink">{title}</h2>
        </div>
        <p className="text-sm font-bold text-muted">
          {step + 1} / {steps.length}
        </p>
      </div>
      <p className="mt-3 min-h-14 rounded-2xl bg-cream px-4 py-3 text-base font-bold leading-relaxed text-ink">{started ? current.say : "按「播放」，這課先會邊講邊畫。"}</p>
      <div ref={board} className="relative mt-3 h-[32rem] overflow-y-auto rounded-2xl border-2 border-ink bg-[#f6f0e4]" style={{ containerType: "inline-size" }}>
        <div
          className="min-h-full"
          style={{
            backgroundImage: "linear-gradient(#eadfce 1px, transparent 1px), linear-gradient(90deg, #eadfce 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        >
          {steps.slice(0, started ? step + 1 : 0).map((item, index) => {
            const height = stepHeight(item);
            return (
              <div key={index} className="relative" style={{ height: `calc(${height} / 760 * 100cqw)` }}>
                <svg viewBox={`0 0 760 ${height}`} className="absolute inset-0 h-full w-full">
                  {item.marks.slice(0, index === step ? pen : item.marks.length).map((mark, markIndex) => (
                    <MarkShape key={`${index}-${markIndex}`} mark={mark} live={index === step && markIndex === pen - 1} />
                  ))}
                </svg>
                {item.marks.slice(0, index === step ? pen : item.marks.length).map((mark, markIndex) =>
                  mark.kind === "text" ? (
                    <WriteText key={`${index}-t-${markIndex}`} mark={mark} live={index === step && markIndex === pen - 1} boardHeight={height} />
                  ) : null,
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="h-12 rounded-2xl bg-ink px-4 font-bold text-paper"
          onClick={() => {
            if (!started) {
              setStarted(true);
              setPlaying(true);
              return;
            }
            if (!playing && step + 1 >= steps.length) {
              setRun((value) => value + 1);
              setStep(0);
              setPlaying(true);
              return;
            }
            setPlaying((value) => !value);
          }}
        >
          {!started ? "播放" : playing ? "暫停" : step + 1 >= steps.length ? "再看一次" : "繼續"}
        </button>
        <button type="button" className="h-12 rounded-2xl border-2 border-ink px-4 font-bold" onClick={() => jump(step - 1)}>
          上一步
        </button>
        <button
          type="button"
          className="h-12 rounded-2xl border-2 border-ink px-4 font-bold"
          onClick={() => {
            setRun((value) => value + 1);
            setStarted(true);
            setPlaying(true);
            setStep(0);
          }}
        >
          重看
        </button>
        <button type="button" className={"h-12 rounded-2xl border-2 px-4 font-bold " + (muted ? "border-coral text-coral" : "border-ink")} onClick={() => setMuted((value) => !value)}>
          {muted ? "已靜音" : "有聲"}
        </button>
      </div>
    </section>
  );
}
