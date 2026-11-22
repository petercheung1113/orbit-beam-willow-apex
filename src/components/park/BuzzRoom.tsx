import { useEffect, useState } from "react";
import { AvatarFace, choiceFor, type AvatarChoice } from "@/components/park/AvatarFace";
import { FigureView } from "@/components/park/FigureView";
import { MathText } from "@/components/park/MathText";
import { useClassChat } from "@/components/park/ParkChat";
import { liveAnswer, liveClose, liveNext, liveReveal, liveStart, liveSync, type LiveView } from "@/lib/live.functions";

const COLORS = [
  { bg: "#e15a3a", ink: "#fffaf4", mark: "▲" },
  { bg: "#2b6cb0", ink: "#fffaf4", mark: "◆" },
  { bg: "#e2b33c", ink: "#1c241c", mark: "●" },
  { bg: "#1c7a4a", ink: "#fffaf4", mark: "■" },
];

export function BuzzRoom({ pin, first, onLeave }: { pin: string; first: LiveView; onLeave: () => void }) {
  const chat = useClassChat();
  const [view, setView] = useState(first);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [left, setLeft] = useState(first.leftMs);

  useEffect(() => {
    setView(first);
  }, [first]);

  useEffect(() => {
    if (!chat.token) return;
    let stop = false;
    const pull = async () => {
      const result = await liveSync({ data: { token: chat.token ?? "", pin } });
      if (stop) return;
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setError("");
      setView(result.view);
    };
    const id = window.setInterval(() => void pull(), 1000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [chat.token, pin]);

  useEffect(() => {
    setLeft(view.leftMs);
    if (view.phase !== "question") return;
    const started = Date.now();
    const base = view.leftMs;
    const id = window.setInterval(() => setLeft(Math.max(0, base - (Date.now() - started))), 100);
    return () => window.clearInterval(id);
  }, [view.phase, view.qi, view.leftMs]);

  const act = async (run: () => Promise<{ ok: true; view: LiveView } | { ok: false; error: string } | { ok: true }>) => {
    setPending(true);
    try {
      const result = await run();
      if (!result.ok) setError(result.error);
      else if ("view" in result) {
        setError("");
        setView(result.view);
      }
    } catch {
      setError("暫時連不上，再試一次。");
    } finally {
      setPending(false);
    }
  };

  const close = async () => {
    setPending(true);
    try {
      const result = await liveClose({ data: { token, pin } });
      if (!result.ok) setError(result.error);
      else onLeave();
    } catch {
      setError("暫時連不上，再試一次。");
    } finally {
      setPending(false);
    }
  };

  const token = chat.token ?? "";
  const mine = view.players.find((player) => player.me);
  const rank = mine ? view.players.findIndex((player) => player.me) + 1 : 0;
  const secondsLeft = Math.ceil(left / 1000);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-coral">搶答 · {pin}</p>
          <h1 className="text-3xl text-ink">{view.phase === "podium" ? "成績" : view.phase === "lobby" ? "等候開場" : `第 ${view.qi + 1} / ${view.total} 題`}</h1>
        </div>
        <p className="text-sm font-bold text-muted">{view.players.length} 人加入</p>
      </div>
      {error ? <p className="mt-3 font-bold text-coral">{error}</p> : null}

      {view.phase === "lobby" ? (
        <section className="mt-5 rounded-3xl border-2 border-ink bg-paper p-5">
          <p className="text-center text-sm font-bold text-muted">告訴同學這個號碼</p>
          <p className="text-center text-6xl font-bold tracking-[0.2em] text-ink">{pin}</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {view.players.length === 0 ? <li className="text-muted">還沒有同學加入</li> : null}
            {view.players.map((player) => (
              <li key={player.account} className="flex items-center gap-2 rounded-full border border-line bg-cream px-2 py-1">
                <AvatarFace choice={choiceFor(player.account, chat.avatars[player.account])} online className="size-8" />
                <span className="text-sm font-bold">{player.name}</span>
              </li>
            ))}
          </ul>
          {view.host ? (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                disabled={pending}
                className="h-12 rounded-2xl bg-grass px-5 font-bold text-paper disabled:opacity-60"
                onClick={() => void act(() => liveStart({ data: { token, pin } }))}
              >
                開始
              </button>
              <button type="button" disabled={pending} className="h-12 rounded-2xl border-2 border-ink px-4 font-bold disabled:opacity-60" onClick={() => void close()}>
                結束
              </button>
            </div>
          ) : (
            <p className="mt-5 text-center font-bold text-grass">已加入，等老師開始。</p>
          )}
        </section>
      ) : null}

      {view.question ? (
        <section className="mt-5">
          <div className="rounded-3xl border-2 border-ink bg-ink px-4 py-5 text-paper">
            <p className="text-sm font-bold text-sun">{view.question.unitName}</p>
            <p className="mt-2 text-2xl font-bold leading-snug">
              <MathText text={view.question.stem} />
            </p>
          </div>
          {view.question.figure ? (
            <div className="mt-3 rounded-3xl border-2 border-ink bg-paper p-3">
              <FigureView figure={view.question.figure} />
            </div>
          ) : null}
          {view.phase === "question" ? (
            <div className="mt-3">
              <div className="h-3 overflow-hidden rounded-full bg-paper">
                <div className="h-full bg-coral" style={{ width: `${Math.max(0, Math.min(100, (left / (view.seconds * 1000)) * 100))}%` }} />
              </div>
              <p className="mt-1 text-right text-sm font-bold">{secondsLeft} 秒 · 已答 {view.answered}/{view.players.length}</p>
            </div>
          ) : (
            <p className="mt-3 font-bold">
              {view.correctCount ?? 0} 人答對
              {view.myPoints !== null ? ` · 你這題 ${view.myPoints > 0 ? `+${view.myPoints}` : "0 分"}` : ""}
              {rank ? ` · 暫列第 ${rank}` : ""}
            </p>
          )}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {view.question.choices.map((choice, index) => {
              const color = COLORS[index % COLORS.length]!;
              const picked = view.myChoice === index;
              const revealed = view.phase === "reveal";
              const right = revealed && view.answer === index;
              const wrongPick = revealed && picked && !right;
              return (
                <button
                  key={`${index}-${choice}`}
                  type="button"
                  disabled={view.host || view.phase !== "question" || pending || left <= 0}
                  className="flex min-h-20 items-center gap-3 rounded-3xl px-4 py-3 text-left text-lg font-bold disabled:opacity-80"
                  style={{
                    background: color.bg,
                    color: color.ink,
                    outline: right ? "4px solid #1c241c" : picked ? "4px solid #fffaf4" : "none",
                    opacity: wrongPick ? 0.45 : 1,
                  }}
                  onClick={() => void act(() => liveAnswer({ data: { token, pin, choice: index } }))}
                >
                  <span className="text-2xl">{color.mark}</span>
                  <span>
                    <MathText text={choice} />
                  </span>
                  {right ? <span className="ml-auto text-sm">正確</span> : null}
                </button>
              );
            })}
          </div>
          {view.phase === "reveal" && view.why ? (
            <p className="mt-3 rounded-2xl bg-paper px-4 py-3 text-sm font-bold text-ink">
              <MathText text={view.why} />
            </p>
          ) : null}
          {view.host && view.phase === "question" ? (
            <button type="button" disabled={pending} className="mt-4 h-12 rounded-2xl bg-ink px-5 font-bold text-paper disabled:opacity-60" onClick={() => void act(() => liveReveal({ data: { token, pin } }))}>
              提早揭曉
            </button>
          ) : null}
          {view.host && view.phase === "reveal" ? (
            <button type="button" disabled={pending} className="mt-4 h-12 rounded-2xl bg-grass px-5 font-bold text-paper disabled:opacity-60" onClick={() => void act(() => liveNext({ data: { token, pin } }))}>
              {view.qi + 1 >= view.total ? "看成績" : "下一題"}
            </button>
          ) : null}
          {view.host && view.phase !== "lobby" ? (
            <button type="button" disabled={pending} className="mt-3 block text-sm font-bold text-muted" onClick={() => void close()}>
              結束比賽
            </button>
          ) : null}
          {view.phase === "reveal" ? <Board players={view.players} avatars={chat.avatars} limit={5} /> : null}
        </section>
      ) : null}

      {view.phase === "podium" ? (
        <section className="mt-5">
          <Podium players={view.players} />
          <Board players={view.players} avatars={chat.avatars} />
          {view.host ? (
            <button type="button" disabled={pending} className="mt-4 h-12 rounded-2xl bg-ink px-5 font-bold text-paper disabled:opacity-60" onClick={() => void close()}>
              結束比賽
            </button>
          ) : (
            <p className="mt-4 font-bold text-grass">{mine ? `你得 ${mine.score} 分，第 ${rank} 名。` : "比賽完結。"}</p>
          )}
        </section>
      ) : null}
    </main>
  );
}

function Board({
  players,
  avatars,
  limit,
}: {
  players: LiveView["players"];
  avatars: Record<string, AvatarChoice | undefined>;
  limit?: number;
}) {
  const rows = typeof limit === "number" ? players.slice(0, limit) : players;
  return (
    <ol className="mt-4 space-y-2">
      {rows.map((player, index) => (
        <li key={player.account} className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-3 py-2">
          <span className="w-8 text-lg font-bold">{index + 1}</span>
          <AvatarFace choice={choiceFor(player.account, avatars[player.account])} online className="size-9" />
          <span className="min-w-0 flex-1 truncate font-bold">{player.name}</span>
          <span className="font-bold text-grass">{player.score}</span>
        </li>
      ))}
    </ol>
  );
}

function Podium({ players }: { players: LiveView["players"] }) {
  const top = [players[1], players[0], players[2]];
  const titles = ["亞軍", "冠軍", "季軍"];
  return (
    <div className="grid grid-cols-3 items-end gap-2">
      {top.map((player, index) => (
        <div key={titles[index]} className={index === 1 ? "rounded-3xl bg-ink px-2 py-4 text-center text-paper" : "rounded-3xl border-2 border-ink bg-paper px-2 py-3 text-center"}>
          <p className="text-sm font-bold">{titles[index]}</p>
          <p className="mt-1 truncate text-lg font-bold">{player?.name ?? "—"}</p>
          <p className="text-sm">{player ? player.score : ""}</p>
        </div>
      ))}
    </div>
  );
}
