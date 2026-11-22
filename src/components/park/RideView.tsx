import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { CORE_UNITS, nextUnit, type Unit } from "@/data/units";
import { EXTRA } from "@/data/extra";
import { usePark } from "@/lib/park";
import { Quiz } from "@/components/park/Quiz";
import { PlayQuiz, type PlayRow } from "@/components/park/PlayQuiz";
import { FigureView } from "@/components/park/FigureView";
import { studentStamp, topicBreakdown } from "@/lib/student";
import { recordPractice } from "@/lib/teacher.functions";
import { finishNav, holdNav } from "@/lib/nav-loading";
import { WhiteboardTutor } from "@/components/park/WhiteboardTutor";
import { MathText } from "@/components/park/MathText";
import {
  DecimalRide,
  FractionRide,
  PercentGrid,
  PercentShop,
  SeesawRide,
} from "@/components/park/number-rides";
import {
  AngleRide,
  AreaRide,
  CircleRide,
  SpeedRide,
  VolumeRide,
} from "@/components/park/measure-rides";
import {
  DozenRide,
  LineRide,
  MeanRide,
  MirrorRide,
  MisuseRide,
  PieRide,
  TurnRide,
} from "@/components/park/data-rides";

function Play({ id, onClear }: { id: string; onClear: () => void }) {
  switch (id) {
    case "6N1":
      return <DecimalRide onClear={onClear} />;
    case "6N2":
      return <FractionRide onClear={onClear} />;
    case "6N3":
      return <PercentGrid onClear={onClear} />;
    case "6N4":
      return <PercentShop onClear={onClear} />;
    case "6A1":
      return <SeesawRide onClear={onClear} />;
    case "6M1":
      return <AngleRide onClear={onClear} />;
    case "6M2":
      return <VolumeRide onClear={onClear} />;
    case "6M3":
      return <CircleRide onClear={onClear} />;
    case "6M5":
      return <AreaRide onClear={onClear} />;
    case "6M4":
      return <SpeedRide onClear={onClear} />;
    case "6D1":
      return <MeanRide onClear={onClear} />;
    case "6D2":
      return <LineRide onClear={onClear} />;
    case "6D3":
      return <PieRide onClear={onClear} />;
    case "6D4":
      return <MisuseRide onClear={onClear} />;
    case "6S1":
      return <MirrorRide onClear={onClear} />;
    case "enrich-turn":
      return <TurnRide onClear={onClear} />;
    case "enrich-base":
      return <DozenRide onClear={onClear} />;
    default:
      return null;
  }
}

function BoothPractice({ unit }: { unit: Unit }) {
  const target = usePark((s) => s.plan?.target ?? 80);
  const addResult = usePark((s) => s.addResult);
  const [paper, setPaper] = useState<PlayRow["item"][] | null>(null);
  const [result, setResult] = useState<PlayRow[] | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [busy, setBusy] = useState(false);

  const start = () => {
    holdNav();
    setBusy(true);
    void import("@/data/practice-bank")
      .then(({ drawPractice }) => {
        const seed = Math.floor(Math.random() * 0x7fffffff) + 1;
        setResult(null);
        setStartedAt(Date.now());
        setPaper(drawPractice(seed, [unit.id]));
        setBusy(false);
        finishNav();
      })
      .catch(() => {
        setBusy(false);
        finishNav();
      });
  };

  const finish = (rows: PlayRow[]) => {
    setResult(rows);
    addResult(rows.map((row) => ({ unitId: row.item.unitId, correct: row.correct })));
    const stamp = studentStamp();
    void recordPractice({
      data: {
        ...stamp,
        mode: "practice",
        correct: rows.filter((row) => row.correct).length,
        total: rows.length,
        seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
        topics: unit.name,
        breakdown: topicBreakdown(rows.map((row) => ({ name: unit.name, correct: row.correct }))),
      },
    });
  };

  const score = result ? Math.round((result.filter((row) => row.correct).length / (result.length || 1)) * 100) : 0;

  return (
    <section className="rounded-3xl border border-line bg-paper p-4">
      {!paper && (
        <>
          <h2 className="text-xl text-ink">練習</h2>
          <button
            type="button"
            className="mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper disabled:opacity-60"
            onClick={start}
            disabled={busy}
          >
            {busy ? "準備題目…" : "開始練習"}
          </button>
        </>
      )}
      {paper && !result && <PlayQuiz items={paper} onDone={finish} />}
      {result && (
        <div>
          <p className="text-sm font-bold text-coral">成績</p>
          <h2 className="text-4xl tabular-nums text-ink">{score} 分</h2>
          <p className="mt-2 text-ink">
            答對 {result.filter((row) => row.correct).length} / {result.length} 題。
            {score >= target ? `達到你的目標 ${target} 分。` : `距離目標 ${target} 分還差一點。`}
          </p>
          <button type="button" data-nav className="mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper" onClick={start}>
            再練一組
          </button>
          <div className="mt-4 space-y-3">
            {result.map((row) => (
              <article key={row.item.id} className="rounded-2xl border border-line bg-cream/60 p-3">
                <p className="text-xs font-bold text-muted">{row.correct ? "答對" : "要再看"}</p>
                <p className="mt-1 font-bold text-ink">
                  <MathText text={row.item.question.stem} />
                </p>
                {row.item.question.figure && <FigureView figure={row.item.question.figure} />}
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  <MathText text={row.item.question.why} />
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function RideView({ unit }: { unit: Unit }) {
  const stamped = usePark((s) => s.stamps.includes(unit.id));
  const stamp = usePark((s) => s.stamp);
  const onClear = useCallback(() => stamp(unit.id), [stamp, unit.id]);
  const nxt = nextUnit(unit.id);
  const order = CORE_UNITS.findIndex((u) => u.id === unit.id);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
      <Link to="/" className="min-h-11 self-start text-sm font-medium text-grass">
        ← 返回遊樂場
      </Link>
      <header>
        <p className="text-sm font-medium text-muted">
          {unit.book} · {unit.bookUnit}
          {unit.enrich ? " · 增潤" : ""}
        </p>
        <h1 className="mt-1 text-4xl text-ink">{unit.ride}</h1>
        <p className="mt-2 text-ink">{unit.blurb}</p>
        <p className="mt-2 text-sm text-muted">
          {unit.code} {unit.name} · {unit.strand}
          {!unit.enrich && order >= 0 ? ` · 核心第 ${order + 1} 站` : ""}
          {stamped ? " · 已蓋章" : ""}
        </p>
      </header>

      <img src={unit.art} alt="" className="h-52 w-full rounded-3xl object-cover sm:h-64" />

      <WhiteboardTutor unitId={unit.id} title={unit.name} />

      <Play id={unit.id} onClear={onClear} />

      <BoothPractice unit={unit} />

      <section className="rounded-3xl border border-line bg-paper p-4">
        <h2 className="text-xl text-ink">今日學懂</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
          {unit.learn.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-line bg-paper p-4">
        <Quiz questions={[...unit.questions, ...(EXTRA[unit.id] ?? [])]} onClear={onClear} />
      </section>

      {nxt && (
        <Link
          to="/ride/$id"
          params={{ id: nxt.id }}
          className="flex min-h-11 items-center justify-between rounded-full bg-ink px-5 text-paper"
        >
          <span>下一站</span>
          <span>{nxt.ride}</span>
        </Link>
      )}
    </main>
  );
}
