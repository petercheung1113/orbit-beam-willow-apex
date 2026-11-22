import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useClassChat } from "@/components/park/ParkChat";
import { Shell } from "@/components/park/Shell";
import { TugWar, type Crew } from "@/components/park/tugwar";
import { tugAnswer, tugJoin, tugReplay, tugStart, tugSync, type TugView } from "@/lib/tug.functions";

export function TugRoom({ code }: { code: string }) {
  const navigate = useNavigate();
  const chat = useClassChat();
  const [view, setView] = useState<TugView | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!chat.token) return;
    let stop = false;
    const pull = async () => {
      const result = await tugSync({ data: { token: chat.token ?? "", roomId: code } });
      if (stop) return;
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setError("");
      setView(result.view);
    };
    void tugJoin({ data: { token: chat.token, roomId: code } }).then((result) => {
      if (stop) return;
      if (!result.ok) setError(result.error);
      else setView(result.view);
    });
    const id = window.setInterval(() => void pull(), 1000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [chat.token, code]);

  const leave = () => {
    void navigate({ to: "/race", search: { room: "" } });
  };

  if (!chat.token) {
    return (
      <Shell>
        <main className="mx-auto w-full max-w-md px-4 py-10">
        <p className="text-sm text-muted">先在聊天室輸入密碼，就可以進入拔河房間。</p>
        <button type="button" className="mt-4 h-12 rounded-2xl bg-grass px-4 font-bold text-paper" onClick={() => void navigate({ to: "/chat" })}>
          去聊天室
        </button>
      </main>
      </Shell>
    );
  }

  if (error && !view) {
    return (
      <Shell>
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <p className="text-lg font-bold text-coral">{error}</p>
        <button type="button" className="mt-4 h-12 rounded-2xl border-2 border-ink px-4 font-bold" onClick={leave}>
          返回
        </button>
      </main>
      </Shell>
    );
  }

  if (!view) {
    return (
      <Shell>
        <main className="px-4 py-10 text-muted">進入房間…</main>
      </Shell>
    );
  }

  if (view.phase !== "lobby" && view.snap && view.me) {
    const names: Crew = {
      red: [view.seats.find((seat) => seat.side === "red" && seat.slot === 0)?.name ?? "紅隊", view.seats.find((seat) => seat.side === "red" && seat.slot === 1)?.name ?? ""],
      blue: [view.seats.find((seat) => seat.side === "blue" && seat.slot === 0)?.name ?? "藍隊", view.seats.find((seat) => seat.side === "blue" && seat.slot === 1)?.name ?? ""],
    };
    return (
      <TugWar
        mode={view.mode}
        topics={view.topics}
        names={names}
        seconds={view.minutes * 60}
        seed={view.seed}
        onExit={leave}
        onReplay={() => {
          void tugReplay({ data: { token: chat.token ?? "", roomId: code } });
        }}
        online={{
          mine: view.me,
          snap: view.snap,
          replay: view.host === chat.me,
          onAnswer: (choice) => {
            void tugAnswer({ data: { token: chat.token ?? "", roomId: code, choice } });
          },
        }}
      />
    );
  }

  const ready = view.seats.every((seat) => seat.joined);
  return (
    <Shell>
    <main className="mx-auto w-full max-w-lg px-4 py-8">
      <p className="text-sm font-bold text-coral">房間 {view.id}</p>
      <h1 className="text-4xl text-ink">{view.mode === "duo" ? "二人拔河" : "四人拔河"}</h1>
      <p className="mt-2 text-sm text-muted">邀請已發到聊天室。同學按下「進入房間」就會出現在這裡。</p>
      <ul className="mt-4 space-y-2">
        {view.seats.map((seat) => (
          <li key={seat.account} className="flex items-center justify-between rounded-2xl border-2 border-ink bg-paper px-4 py-3">
            <span>
              <span className={seat.side === "red" ? "mr-2 text-sm font-bold text-coral" : "mr-2 text-sm font-bold text-grass"}>
                {seat.side === "red" ? "紅隊" : "藍隊"}
              </span>
              <span className="font-bold">{seat.name}</span>
            </span>
            <span className={seat.joined ? "text-sm font-bold text-grass" : "text-sm text-muted"}>{seat.joined ? "已入房" : "未入房"}</span>
          </li>
        ))}
      </ul>
      {error ? <p className="mt-3 text-sm font-bold text-coral">{error}</p> : null}
      {view.host === chat.me ? (
        <button
          type="button"
          disabled={!ready || pending}
          className="mt-4 h-12 rounded-2xl bg-coral px-5 font-bold text-paper disabled:opacity-50"
          data-nav
          onClick={() => {
            setPending(true);
            void tugStart({ data: { token: chat.token ?? "", roomId: code } }).then((result) => {
              if (!result.ok) setError(result.error);
              setPending(false);
            });
          }}
        >
          {ready ? "開始拔河" : "等齊同學再開"}
        </button>
      ) : (
        <p className="mt-4 text-sm text-muted">等房主開始。</p>
      )}
      <button type="button" className="mt-3 h-11 rounded-2xl border-2 border-ink px-4 text-sm font-bold" onClick={leave}>
        離開房間
      </button>
    </main>
    </Shell>
  );
}
