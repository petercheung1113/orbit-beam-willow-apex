import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BuzzRoom } from "@/components/park/BuzzRoom";
import { chipClass, PageIntro, UnitPicks } from "@/components/park/picks";
import { useClassChat } from "@/components/park/ParkChat";
import { Shell } from "@/components/park/Shell";
import { UNITS } from "@/data/units";
import { liveCreate, liveJoin, livePeek, type LiveView } from "@/lib/live.functions";
import { isTeacherAccount } from "@/lib/teacher-account";

export const Route = createFileRoute("/buzz")({
  component: BuzzPage,
  head: () => ({ meta: [{ title: "搶答 · 數學遊樂場" }] }),
});

function BuzzPage() {
  return (
    <Shell>
      <BuzzGate />
    </Shell>
  );
}

function BuzzGate() {
  const chat = useClassChat();
  const teacher = isTeacherAccount(chat.me);
  const [pin, setPin] = useState("");
  const [view, setView] = useState<LiveView | null>(null);
  const [openPin, setOpenPin] = useState("");
  const [openCount, setOpenCount] = useState(0);
  const [typed, setTyped] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [count, setCount] = useState(10);
  const [seconds, setSeconds] = useState(20);
  const [selected, setSelected] = useState<string[]>(UNITS.map((unit) => unit.id));

  useEffect(() => {
    if (!chat.token || view) return;
    let stop = false;
    const look = async () => {
      const result = await livePeek({ data: { token: chat.token ?? "" } });
      if (stop || !result.ok) return;
      if (result.game && teacher && result.game.host) {
        const joined = await liveJoin({ data: { token: chat.token ?? "", pin: result.game.id } });
        if (!stop && joined.ok) {
          setPin(result.game.id);
          setView(joined.view);
        }
        return;
      }
      if (result.game && !teacher) {
        const saved = window.sessionStorage.getItem("buzz-pin") ?? "";
        if (saved === result.game.id) {
          const joined = await liveJoin({ data: { token: chat.token ?? "", pin: result.game.id } });
          if (!stop && joined.ok) {
            setPin(result.game.id);
            setView(joined.view);
            return;
          }
          window.sessionStorage.removeItem("buzz-pin");
        }
      }
      setOpenPin(result.game?.id ?? "");
      setOpenCount(result.game?.players ?? 0);
    };
    void look();
    const id = window.setInterval(() => void look(), 2000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [chat.token, teacher, view]);

  const join = async (code: string) => {
    if (!chat.token) return;
    setPending(true);
    setError("");
    try {
      const result = await liveJoin({ data: { token: chat.token, pin: code } });
      if (!result.ok) setError(result.error);
      else {
        setPin(result.view.id);
        setView(result.view);
        window.sessionStorage.setItem("buzz-pin", result.view.id);
      }
    } catch {
      setError("暫時加入不到，再試一次。");
    } finally {
      setPending(false);
    }
  };

  if (!chat.token) {
    return (
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <h1 className="text-3xl text-ink">搶答</h1>
        <p className="mt-2 text-muted">請先登出，再登入一次。</p>
      </main>
    );
  }

  if (view && pin) {
    return (
      <BuzzRoom
        pin={pin}
        first={view}
        onLeave={() => {
          window.sessionStorage.removeItem("buzz-pin");
          setView(null);
          setPin("");
          setOpenPin("");
        }}
      />
    );
  }

  if (!teacher) {
    return (
      <main className="mx-auto w-full max-w-md px-4 py-8">
        <PageIntro kicker="6D" title="搶答">
          只有老師可以開場。老師開場後，輸入號碼加入。答得越快，分數越高。
        </PageIntro>
        {openPin ? (
          <button type="button" disabled={pending} className="mt-6 h-16 w-full rounded-3xl bg-grass text-xl font-bold text-paper disabled:opacity-60" onClick={() => void join(openPin)}>
            加入 {openPin}
            {openCount ? ` · ${openCount} 人` : ""}
          </button>
        ) : (
          <p className="mt-6 font-bold text-muted">老師還沒開比賽。</p>
        )}
        <form
          className="mt-4 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void join(typed);
          }}
        >
          <input
            inputMode="numeric"
            value={typed}
            placeholder="輸入號碼"
            onChange={(event) => setTyped(event.target.value.replace(/\D/g, "").slice(0, 4))}
            className="h-12 min-w-0 flex-1 rounded-2xl border-2 border-ink bg-paper px-4 text-lg"
          />
          <button type="submit" disabled={pending || typed.length !== 4} className="h-12 rounded-2xl bg-ink px-4 font-bold text-paper disabled:opacity-60">
            加入
          </button>
        </form>
        {error ? <p className="mt-3 font-bold text-coral">{error}</p> : null}
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <PageIntro kicker="老師" title="開搶答比賽">
        同學在「搶答」頁會見到號碼。每題限時作答，答對而且越快，分數越高，最快約 1000 分。
      </PageIntro>
      <div className="mt-5 flex flex-wrap gap-2">
        {[5, 10, 15].map((item) => (
          <button key={item} type="button" className={chipClass(count === item)} onClick={() => setCount(item)}>
            {item} 題
          </button>
        ))}
        {[10, 20, 30].map((item) => (
          <button key={item} type="button" className={chipClass(seconds === item)} onClick={() => setSeconds(item)}>
            每題 {item} 秒
          </button>
        ))}
      </div>
      <div className="mt-5">
        <UnitPicks
          selected={selected}
          onToggle={(id) => setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))}
          onAll={() => setSelected(selected.length === UNITS.length ? [] : UNITS.map((unit) => unit.id))}
        />
      </div>
      <button
        type="button"
        disabled={pending}
        className="mt-6 h-14 rounded-3xl bg-coral px-6 text-lg font-bold text-paper disabled:opacity-60"
        onClick={() => {
          if (!chat.token) return;
          setPending(true);
          setError("");
          void liveCreate({ data: { token: chat.token, topics: selected, count, seconds } })
            .then(async (created) => {
              if (!created.ok || !chat.token) {
                setError(created.ok ? "暫時開不到場。" : created.error);
                return;
              }
              const joined = await liveJoin({ data: { token: chat.token, pin: created.id } });
              if (!joined.ok) setError(joined.error);
              else {
                setPin(created.id);
                setView(joined.view);
                window.sessionStorage.setItem("buzz-pin", created.id);
              }
            })
            .catch(() => setError("暫時開不到場，再試一次。"))
            .finally(() => setPending(false));
        }}
      >
        {pending ? "開場中…" : "開場"}
      </button>
      {error ? <p className="mt-3 font-bold text-coral">{error}</p> : null}
    </main>
  );
}
