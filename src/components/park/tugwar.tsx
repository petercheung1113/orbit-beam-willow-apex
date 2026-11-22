import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ScratchPad } from "@/components/park/ScratchPad";
import { choiceDeck } from "@/lib/tug-deck";
import { FigureView } from "@/components/park/FigureView";
import { MathText } from "@/components/park/MathText";
import type { Drawn } from "@/lib/draw";

const QUESTION_SECONDS = 30;
const LIMIT = 10;
const PULL = 2;

type Side = "red" | "blue";
type Slot = 0 | 1;
export type BattleMode = "duo" | "quad";

export type Crew = {
  red: [string, string];
  blue: [string, string];
};

type Seat = { qi: number; left: number; misses: number; frozen: number };
type Pair = [Seat, Seat];

type LogItem = { id: number; side: Side | "both"; text: string; tag: string };

type Game = {
  mode: BattleMode;
  tug: number;
  match: number;
  red: Pair;
  blue: Pair;
  log: LogItem[];
  seq: number;
  phase: "play" | "done";
  winner: "red" | "blue" | "tie" | null;
};

type Action =
  | { type: "tick"; names: Crew }
  | { type: "answer"; side: Side; slot: Slot; correct: boolean; names: Crew };

const CAST = [
  { side: "red" as const, slot: 0 as const, id: "fox" as const },
  { side: "red" as const, slot: 1 as const, id: "ghost" as const },
  { side: "blue" as const, slot: 0 as const, id: "cat" as const },
  { side: "blue" as const, slot: 1 as const, id: "shiba" as const },
];

const GIF = {
  fox: "/art/sprites/fox.gif",
  ghost: "/art/sprites/ghost.gif",
  cat: "/art/sprites/cat.gif",
  shiba: "/art/sprites/shiba.gif",
} as const;

export function Puppet({ name, className }: { name: keyof typeof GIF; className?: string }) {
  return <img src={GIF[name]} alt="" className={`tug-puppet object-contain object-bottom ${className ?? ""}`} />;
}

function clamp(n: number): number {
  return Math.max(-LIMIT, Math.min(LIMIT, n));
}

function freshSeat(qi: number, misses = 0, frozen = 0): Seat {
  return { qi, left: QUESTION_SECONDS, misses, frozen };
}

function slotsFor(mode: BattleMode): Slot[] {
  return mode === "quad" ? [0, 1] : [0];
}

function initial(arg: { seconds: number; mode: BattleMode }): Game {
  return {
    mode: arg.mode,
    tug: 0,
    match: arg.seconds,
    red: [freshSeat(0), freshSeat(0)],
    blue: [freshSeat(0), freshSeat(0)],
    log: [{ id: 0, side: "both", text: arg.mode === "quad" ? "四人拔河開始，每人一題" : "二人拔河開始，搶拉中", tag: "開波" }],
    seq: 1,
    phase: "play",
    winner: null,
  };
}

function withLog(state: Game, entry: Omit<LogItem, "id">, patch: Partial<Game>): Game {
  return {
    ...state,
    ...patch,
    seq: state.seq + 1,
    log: [{ ...entry, id: state.seq }, ...state.log].slice(0, 16),
  };
}

function putSeat(pair: Pair, slot: Slot, seat: Seat): Pair {
  const next: Pair = [pair[0], pair[1]];
  next[slot] = seat;
  return next;
}

function miss(state: Game, side: Side, slot: Slot, names: Crew): Game {
  const who = names[side][slot];
  return withLog(
    state,
    { side, text: `${who} · 時間到（不拉繩）`, tag: "超時" },
    { [side]: putSeat(state[side], slot, freshSeat(state[side][slot].qi + 1, state[side][slot].misses, state[side][slot].frozen)) },
  );
}

function tick(state: Game, names: Crew): Game {
  if (state.phase !== "play") return state;
  const live = slotsFor(state.mode);
  const cool = (seat: Seat, on: boolean): Seat => {
    if (!on) return seat;
    if (seat.frozen > 0) return { ...seat, frozen: seat.frozen - 1 };
    return { ...seat, left: seat.left - 1 };
  };
  let next: Game = {
    ...state,
    match: state.match - 1,
    red: state.red.map((seat, index) => cool(seat, live.includes(index as Slot))) as Pair,
    blue: state.blue.map((seat, index) => cool(seat, live.includes(index as Slot))) as Pair,
  };
  for (const side of ["red", "blue"] as const) {
    for (const slot of live) {
      if (next[side][slot].left <= 0) next = miss(next, side, slot, names);
    }
  }
  if (next.match <= 0) {
    const winner = next.tug < 0 ? "red" : next.tug > 0 ? "blue" : "tie";
    return { ...next, phase: "done", winner, match: 0 };
  }
  return next;
}

function answer(state: Game, side: Side, slot: Slot, correct: boolean, names: Crew): Game {
  if (state.phase !== "play") return state;
  if (state.mode === "duo" && slot !== 0) return state;
  const seat = state[side][slot];
  if (seat.frozen > 0) return state;
  const who = names[side][slot];
  const misses = correct ? 0 : seat.misses + 1;
  const banned = !correct && misses >= 3;
  const tug = correct ? clamp(state.tug + (side === "red" ? -PULL : PULL)) : state.tug;
  const next = withLog(
    state,
    {
      side,
      text: banned ? `${who} 連續答錯 3 題，停答 5 秒` : correct ? `${who} 答對，拉向${side === "red" ? "紅" : "藍"}方` : `${who} 答錯 · 不拉繩`,
      tag: banned ? "停答" : correct ? "答對" : "答錯",
    },
    { tug, [side]: putSeat(state[side], slot, freshSeat(seat.qi + 1, banned ? 0 : misses, banned ? 5 : 0)) },
  );
  if (tug <= -LIMIT) return { ...next, phase: "done", winner: "red" };
  if (tug >= LIMIT) return { ...next, phase: "done", winner: "blue" };
  return next;
}

function reduce(state: Game, action: Action): Game {
  if (action.type === "tick") return tick(state, action.names);
  return answer(state, action.side, action.slot, action.correct, action.names);
}

function clock(seconds: number): string {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

function lead(tug: number): string {
  if (tug === 0) return "平手 · 搶拉中";
  if (tug < 0) return `紅隊領先 ${-tug}`;
  return `藍隊領先 ${tug}`;
}

export function TugWar({
  mode,
  topics,
  names,
  seconds,
  seed,
  onExit,
  onReplay,
  online,
}: {
  mode: BattleMode;
  topics: string[];
  names: Crew;
  seconds: number;
  seed: number;
  onExit: () => void;
  onReplay: () => void;
  online?: {
    mine: { side: Side; slot: Slot };
    snap: {
      tug: number;
      match: number;
      phase: "play" | "done";
      winner: "red" | "blue" | "tie" | null;
      red: Pair;
      blue: Pair;
      log: LogItem[];
    };
    replay: boolean;
    onAnswer: (choice: number) => void;
  };
}) {
  const [game, dispatch] = useReducer(reduce, { seconds, mode }, initial);
  const locks = useRef<Record<string, boolean>>({});
  const quizzes = useMemo(
    () => ({
      red: [choiceDeck(seed, topics), choiceDeck(seed + 104729, topics)] as const,
      blue: [choiceDeck(seed + 7919, topics), choiceDeck(seed + 224737, topics)] as const,
    }),
    [seed, topics],
  );

  useEffect(() => {
    if (online || game.phase !== "play") return;
    const id = window.setInterval(() => dispatch({ type: "tick", names }), 1000);
    return () => window.clearInterval(id);
  }, [online, game.phase, names]);

  useEffect(() => {
    locks.current = {};
  }, [game.red[0].qi, game.red[1].qi, game.blue[0].qi, game.blue[1].qi]);

  const shown: Game = online
    ? {
        mode,
        tug: online.snap.tug,
        match: online.snap.match,
        red: online.snap.red,
        blue: online.snap.blue,
        log: online.snap.log.length ? online.snap.log : game.log,
        seq: online.snap.log.length,
        phase: online.snap.phase,
        winner: online.snap.winner,
      }
    : game;

  const pick = (side: Side, slot: Slot, choice: number, solution: number) => {
    if (online) {
      if (online.mine.side !== side || online.mine.slot !== slot || shown.phase !== "play") return;
      online.onAnswer(choice);
      return;
    }
    const key = `${side}-${slot}`;
    if (game.phase !== "play" || locks.current[key] || game[side][slot].frozen > 0) return;
    locks.current[key] = true;
    dispatch({ type: "answer", side, slot, correct: choice === solution, names });
  };

  const mineOnly = (side: Side, slot: Slot) => Boolean(online && (online.mine.side !== side || online.mine.slot !== slot));

  const [impulse, setImpulse] = useState("");
  const seen = useRef(0);
  useEffect(() => {
    const top = shown.log[0];
    if (!top || top.id === seen.current) return;
    seen.current = top.id;
    const kind = top.tag === "答對" ? (top.side === "red" ? "is-yank-red" : "is-yank-blue") : top.tag === "答錯" ? "is-shake" : "";
    if (!kind) return;
    setImpulse("");
    const frame = requestAnimationFrame(() => setImpulse(kind));
    const timer = window.setTimeout(() => setImpulse(""), 700);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [shown.log[0]?.id]);

  const winnerLine = shown.winner === "red" ? "紅隊拉贏了" : shown.winner === "blue" ? "藍隊拉贏了" : "平手";
  const tense = Math.abs(shown.tug) >= 4;
  const cast = mode === "duo" ? [CAST[0]!, CAST[2]!] : CAST;
  const quad = mode === "quad";
  const at = (side: Side, slot: Slot) => {
    const deck = quizzes[side][slot];
    return deck[shown[side][slot].qi % Math.max(deck.length, 1)];
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper text-ink">
      <div className="relative h-[36vh] min-h-52 shrink-0 overflow-hidden border-b-2 border-ink">
        <img src="/art/tug-field.jpg" alt="" className="tug-field absolute inset-0 size-full object-cover" />
        <span className="tug-cloud tug-cloud-a" />
        <span className="tug-cloud tug-cloud-b" />
        <button type="button" className="absolute top-3 left-3 z-30 h-11 rounded-2xl border-2 border-ink bg-paper px-3 text-sm font-bold" onClick={onExit}>
          離開
        </button>
        <div className="absolute top-3 left-1/2 z-30 -translate-x-1/2">
          <p className={(shown.match <= 20 ? "tug-clock is-low " : "") + "rounded-xl border-2 border-ink bg-grass px-4 py-1 text-3xl text-paper tabular-nums"}>
            {clock(shown.match)}
          </p>
        </div>
        <div className="tug-crew absolute inset-x-0 bottom-0 z-10 h-[82%]" style={{ transform: `translateX(${shown.tug * 2.2}%)` }}>
          <div className={tense ? `tug-stage is-tense ${impulse}` : `tug-stage ${impulse}`}>
            <div className="tug-rope" aria-hidden="true">
              {Array.from({ length: 16 }, (_, index) => (
                <span key={index} className="tug-knot" style={{ animationDelay: `${index * 0.05}s` }} />
              ))}
            </div>
            <div className="tug-flag" />
            {impulse === "is-yank-red" && <span className="tug-shout tug-shout-red text-coral">拉！</span>}
            {impulse === "is-yank-blue" && <span className="tug-shout tug-shout-blue text-grass">拉！</span>}
            <div className={quad ? "relative z-10 mx-auto grid h-full w-[92%] grid-cols-4 items-end" : "relative z-10 mx-auto grid h-full w-[70%] grid-cols-2 items-end"}>
              {cast.map((mate) => {
                const won = shown.phase === "done" && shown.winner === mate.side;
                const lost = shown.phase === "done" && shown.winner !== null && shown.winner !== "tie" && shown.winner !== mate.side;
                return (
                  <figure key={mate.id} className="flex flex-col items-center">
                    <span className={`tug-actor ${won ? "is-win" : ""} ${lost ? "is-lose" : ""}`}>
                      <Puppet name={mate.id} className={quad ? "h-24 w-24 sm:h-32 sm:w-32" : "h-28 w-28 sm:h-40 sm:w-40"} />
                    </span>
                    <figcaption className="mb-1 rounded-full border-2 border-ink bg-paper px-2 text-xs font-bold">{names[mate.side][mate.slot]}</figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
        {shown.phase === "done" && (
          <p className="absolute inset-x-0 bottom-3 z-30 text-center">
            <span className="inline-block rounded-2xl border-2 border-ink bg-paper px-4 py-2 text-3xl">{winnerLine}</span>
          </p>
        )}
      </div>

      {quad ? (
        <div className="flex min-h-0 flex-1 flex-col gap-2 p-2">
          <ScoreStrip game={shown} replay={!online || online.replay} onExit={onExit} onReplay={onReplay} />
          <div className="grid min-h-0 flex-1 grid-cols-4 gap-2">
            {(
              [
                ["red", 0],
                ["red", 1],
                ["blue", 0],
                ["blue", 1],
              ] as const
            ).map(([side, slot]) => {
              const pictured = at(side, slot)?.question.figure != null;
              return (
              <div key={`${side}-${slot}`} className="flex min-h-0 flex-col gap-2">
                <PlayerPane
                  className={pictured ? "min-h-0 flex-[1.7]" : "min-h-0 flex-1"}
                  side={side}
                  slot={slot}
                  name={names[side][slot]}
                  seat={shown[side][slot]}
                  item={at(side, slot)}
                  disabled={shown.phase !== "play" || mineOnly(side, slot)}
                  spectator={mineOnly(side, slot)}
                  compact
                  onPick={(choice, solution) => pick(side, slot, choice, solution)}
                />
                <div className={pictured ? "min-h-0 flex-1" : "min-h-0 flex-[1.15]"}>
                  <ScratchPad title={`${names[side][slot]}的算草`} fill />
                </div>
              </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2">
          <ScoreStrip game={shown} replay={!online || online.replay} onExit={onExit} onReplay={onReplay} />
          <div className={"grid min-h-0 flex-1 gap-2 " + (at("red", 0)?.question.figure || at("blue", 0)?.question.figure ? "grid-cols-[minmax(0,1.45fr)_minmax(8rem,0.7fr)_minmax(8rem,0.7fr)_minmax(0,1.45fr)]" : "grid-cols-[minmax(0,1.15fr)_minmax(9rem,0.85fr)_minmax(9rem,0.85fr)_minmax(0,1.15fr)]")}>
            <PlayerPane side="red" slot={0} name={names.red[0]} seat={shown.red[0]} item={at("red", 0)} disabled={shown.phase !== "play" || mineOnly("red", 0)} spectator={mineOnly("red", 0)} onPick={(choice, solution) => pick("red", 0, choice, solution)} />
            <ScratchPad title="紅隊算草" fill />
            <ScratchPad title="藍隊算草" fill />
            <PlayerPane side="blue" slot={0} name={names.blue[0]} seat={shown.blue[0]} item={at("blue", 0)} disabled={shown.phase !== "play" || mineOnly("blue", 0)} spectator={mineOnly("blue", 0)} onPick={(choice, solution) => pick("blue", 0, choice, solution)} />
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreStrip({ game, replay = true, onExit, onReplay }: { game: Game; replay?: boolean; onExit: () => void; onReplay: () => void }) {
  const headline = game.phase === "done" ? (game.winner === "red" ? "紅隊勝" : game.winner === "blue" ? "藍隊勝" : "平手") : lead(game.tug);
  const latest = game.log[0];
  return (
    <div className="flex shrink-0 items-center gap-2 rounded-2xl border-2 border-ink bg-paper px-3 py-2">
      <p className="shrink-0 text-sm font-bold">{headline}</p>
      <div className="min-w-16 flex-1">
        <Rope tug={game.tug} thin />
      </div>
      <p className="hidden min-w-0 flex-1 truncate text-sm sm:block">{latest ? latest.text : "四人各答各的題"}</p>
      {game.phase === "done" && (
        <div className="flex shrink-0 gap-2">
          {replay ? (
            <button type="button" className="h-9 rounded-xl bg-coral px-3 text-sm font-bold text-paper" onClick={onReplay}>
              再拉一局
            </button>
          ) : null}
          <button type="button" className="h-9 rounded-xl border-2 border-ink px-3 text-sm font-bold" onClick={onExit}>
            回大廳
          </button>
        </div>
      )}
    </div>
  );
}

function Rope({ tug, thin }: { tug: number; thin?: boolean }) {
  return (
    <div>
      <div className={"relative rounded-full border-2 border-ink " + (thin ? "h-3" : "mt-3 h-4")} aria-hidden="true">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-coral" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-grass" />
        <div className="tug-marker absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-paper" style={{ left: `${((tug + LIMIT) / (LIMIT * 2)) * 100}%` }} />
      </div>
      {!thin && (
        <p className="mt-2 flex items-center justify-between text-xs font-bold" aria-live="polite">
          <span className="text-coral">紅 −{LIMIT}</span>
          <span>{lead(tug)}</span>
          <span className="text-grass">藍 +{LIMIT}</span>
        </p>
      )}
    </div>
  );
}

function PlayerPane({
  className,
  side,
  slot,
  name,
  seat,
  item,
  disabled,
  spectator = false,
  compact = false,
  onPick,
}: {
  className?: string;
  side: Side;
  slot: Slot;
  name: string;
  seat: Seat;
  item: Drawn | undefined;
  disabled: boolean;
  spectator?: boolean;
  compact?: boolean;
  onPick: (choice: number, solution: number) => void;
}) {
  const red = side === "red";
  const locked = seat.frozen > 0;
  const question = item?.question.kind === "choice" ? item.question : null;
  const pictured = Boolean(question?.figure) && !spectator && !locked;
  return (
    <section className={`${className ?? ""} flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border-2 bg-paper ${red ? "border-coral" : "border-grass"}`}>
      <header className="flex shrink-0 items-center justify-between gap-2 border-b-2 border-ink px-3 py-1">
        <h2 className={compact ? "truncate text-base" : "truncate text-xl sm:text-2xl"}>
          <span className={red ? "mr-2 text-xs font-bold text-coral" : "mr-2 text-xs font-bold text-grass"}>
            {red ? "紅隊" : "藍隊"} {slot + 1}
          </span>
          {name}
        </h2>
        <p
          className={
            "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-base tabular-nums " +
            (locked || seat.left <= 5 ? "tug-clock is-low " : "") +
            (locked || red ? "border-coral text-coral" : "border-grass text-grass")
          }
          aria-label={locked ? `${name} 停答 ${seat.frozen} 秒` : `${name} 剩餘 ${seat.left} 秒`}
        >
          {locked ? seat.frozen : seat.left}
        </p>
      </header>
      <div className={pictured ? "flex min-h-0 flex-1 flex-col overflow-auto px-3 py-2" : "max-h-[42%] shrink-0 overflow-auto px-3 py-2"}>
        <p className={compact ? "text-base font-bold leading-snug sm:text-lg" : "text-lg font-bold leading-snug sm:text-xl"}>
          {locked ? "連續答錯 3 題，停答 5 秒。" : spectator ? "同學正在作答" : question?.stem ? <MathText text={question.stem} /> : "這個課題暫時沒有選擇題。"}
        </p>
        {pictured && question?.figure ? (
          <FigureView figure={question.figure} className="mx-auto h-auto max-h-56 w-full" />
        ) : null}
      </div>
      <div className={(pictured ? "grid shrink-0 " : "grid min-h-0 flex-1 ") + "grid-cols-2 grid-rows-2 gap-1.5 p-2"}>
        {spectator
          ? null
          : question?.choices.map((choice, index) => (
          <button
            key={choice}
            type="button"
            disabled={disabled || locked}
            className="tug-pad flex h-full min-h-11 items-center justify-center rounded-xl border-2 border-ink px-2 py-1 text-center text-base font-bold leading-tight sm:text-lg"
            onPointerUp={(event) => {
              if (disabled || event.button !== 0) return;
              onPick(index, question.answer);
            }}
          >
            <MathText text={choice} />
          </button>
        ))}
      </div>
    </section>
  );
}
