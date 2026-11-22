import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { chipClass, UnitPicks } from "@/components/park/picks";
import { useClassChat } from "@/components/park/ParkChat";
import { AvatarFace, choiceFor } from "@/components/park/AvatarFace";
import { Shell } from "@/components/park/Shell";
import { TugRoom } from "@/components/park/TugRoom";
import { Puppet, TugWar, type BattleMode, type Crew } from "@/components/park/tugwar";
import { UNITS } from "@/data/units";
import { tugCreate } from "@/lib/tug.functions";
import { finishNav, holdNav } from "@/lib/nav-loading";

export const Route = createFileRoute("/race")({
  validateSearch: (search: Record<string, unknown>) => ({
    room: typeof search.room === "string" ? search.room.replace(/[^A-Za-z0-9]/g, "").slice(0, 8) : "",
  }),
  component: RacePage,
  head: () => ({ meta: [{ title: "對戰 · 數學遊樂場" }] }),
});

type Mode = BattleMode;

function RacePage() {
  const { room } = Route.useSearch();
  if (room) return <TugRoom code={room} />;
  return <RaceSetup />;
}

function RaceSetup() {
  const navigate = useNavigate();
  const chat = useClassChat();
  const classmates = useMemo(
    () =>
      chat.mates
        .filter((mate) => mate.account !== chat.me)
        .sort((a, b) => Number(b.online) - Number(a.online) || a.account.localeCompare(b.account)),
    [chat.mates, chat.me],
  );
  const onlineCount = classmates.filter((mate) => mate.online).length;
  const [mode, setMode] = useState<Mode>("quad");
  const [playing, setPlaying] = useState(false);
  const [round, setRound] = useState(0);
  const [seed, setSeed] = useState(1);
  const [minutes, setMinutes] = useState(3);
  const [selected, setSelected] = useState<string[]>(UNITS.map((unit) => unit.id));
  const [redA, setRedA] = useState("樂樂");
  const [redB, setRedB] = useState("小白");
  const [blueA, setBlueA] = useState("慢慢");
  const [blueB, setBlueB] = useState("柴柴");
  const [invites, setInvites] = useState<string[]>([]);
  const [roomError, setRoomError] = useState("");
  const [opening, setOpening] = useState(false);
  const need = mode === "duo" ? 1 : 3;

  const names: Crew = useMemo(
    () => ({
      red: [redA.trim() || "樂樂", redB.trim() || "小白"],
      blue: [blueA.trim() || "慢慢", blueB.trim() || "柴柴"],
    }),
    [redA, redB, blueA, blueB],
  );

  if (playing) {
    return (
      <TugWar
        key={`${round}-${mode}`}
        mode={mode}
        topics={selected.length ? selected : UNITS.map((unit) => unit.id)}
        names={names}
        seconds={minutes * 60}
        seed={seed}
        onExit={() => setPlaying(false)}
        onReplay={() => {
          setSeed(Math.floor(Math.random() * 0x7fffffff) + 1);
          setRound((value) => value + 1);
        }}
      />
    );
  }

  return (
    <Shell>
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <p className="text-sm font-bold text-coral">朋友對戰</p>
        <h1 className="text-4xl text-ink">拔河對戰</h1>
        <p className="mt-2 max-w-2xl text-muted">
          {mode === "duo"
            ? "二人對戰：一人坐左邊，一人坐右邊。兩個人同時答題，答對就拉繩，答錯不拉。"
            : "四人對戰：紅隊兩人、藍隊兩人。四個人各有一題，可以同時作答。答對就幫自己隊伍拉繩。"}
        </p>
        <div className="mt-4 flex gap-2">
          <button type="button" className={mode === "duo" ? chipClass(true) : chipClass(false)} onClick={() => { setMode("duo"); setInvites((prev) => prev.slice(0, 1)); }}>
            二人對戰
          </button>
          <button type="button" className={mode === "quad" ? "h-11 rounded-full bg-ink px-4 text-sm font-bold text-paper" : chipClass(false)} onClick={() => setMode("quad")}>
            四人對戰
          </button>
        </div>
        <div className="relative mt-4 h-40 overflow-hidden rounded-2xl border-2 border-ink sm:h-52">
          <img src="/art/tug-field.jpg" alt="" className="size-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 px-3">
            <Puppet name="fox" className="h-28 w-28" />
            {mode === "quad" && <Puppet name="ghost" className="h-24 w-24" />}
            <Puppet name="cat" className={mode === "quad" ? "h-24 w-24" : "h-28 w-28"} />
            {mode === "quad" && <Puppet name="shiba" className="h-28 w-28" />}
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <NameCard title="紅隊" tone="coral" mode={mode} a={redA} b={redB} setA={setRedA} setB={setRedB} />
          <NameCard title="藍隊" tone="teal" mode={mode} a={blueA} b={blueB} setA={setBlueA} setB={setBlueB} />
        </div>
        <p className="mt-4 font-bold">比賽時間</p>
        <div className="mt-2 flex gap-2">
          {[2, 3, 5].map((value) => (
            <button key={value} type="button" className={value === minutes ? "h-12 rounded-2xl bg-ink px-4 font-bold text-paper" : chipClass(false)} onClick={() => setMinutes(value)}>
              {value} 分鐘
            </button>
          ))}
        </div>
        <p className="mt-4 font-bold">入卷課題</p>
        <p className="text-sm text-muted">彩色會出題，再點一下就拿掉。</p>
        <div className="mt-2">
          <UnitPicks
            selected={selected}
            onToggle={(id) => setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))}
            onAll={() => setSelected(selected.length === UNITS.length ? [] : UNITS.map((unit) => unit.id))}
          />
        </div>
        <button
          type="button"
          className="mt-4 h-12 rounded-2xl bg-coral px-5 font-bold text-paper"
          data-nav
          disabled={selected.length === 0}
          onClick={() => {
            setSeed(Math.floor(Math.random() * 0x7fffffff) + 1);
            setPlaying(true);
          }}
        >
          開始拔河
        </button>
        <div className="mt-8 rounded-3xl border-2 border-ink bg-paper p-4">
          <h2 className="text-2xl text-ink">開房間</h2>
          <p className="mt-1 text-sm text-muted">
            {mode === "duo" ? "邀請 1 位同學，二人各坐一邊。" : "邀請 3 位同學，紅隊兩人、藍隊兩人。你是紅隊第一位。"}
            在線的排在前面，頭像有綠點就是在線。現在 {onlineCount} 人在線。
          </p>
          <ul className="mt-3 grid max-h-80 grid-cols-1 gap-2 overflow-auto sm:grid-cols-2">
            {classmates.map((mate) => {
                const on = invites.includes(mate.account);
                const renamed = mate.name !== mate.seat;
                return (
                  <li key={mate.account}>
                    <button
                      type="button"
                      className={"flex w-full items-center gap-2 rounded-2xl border-2 px-2 py-2 text-left text-sm font-bold " + (on ? "border-grass bg-meadow" : "border-ink")}
                      onClick={() =>
                        setInvites((prev) => {
                          if (prev.includes(mate.account)) return prev.filter((item) => item !== mate.account);
                          if (prev.length >= need) return prev;
                          return [...prev, mate.account];
                        })
                      }
                    >
                      <AvatarFace choice={choiceFor(mate.account, chat.avatars[mate.account])} online={mate.online} className="size-11" />
                      <span className="min-w-0">
                        <span className="block truncate">{renamed ? mate.name : mate.seat}</span>
                        <span className={"block truncate text-xs font-normal " + (mate.online ? "text-grass" : "text-muted")}>
                          {renamed ? `${mate.seat} · ` : ""}
                          {mate.online ? "在線" : "不在線"}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
          </ul>
          {roomError ? <p className="mt-3 text-sm font-bold text-coral">{roomError}</p> : null}
          <button
            type="button"
            disabled={opening || invites.length !== need || selected.length === 0 || !chat.token}
            data-nav
            className="mt-4 h-12 rounded-2xl bg-ink px-5 font-bold text-paper disabled:opacity-50"
            onClick={() => {
              if (!chat.token) {
                setRoomError("請先到聊天室輸入密碼。");
                finishNav();
                return;
              }
              holdNav();
              setOpening(true);
              setRoomError("");
              void tugCreate({
                data: { token: chat.token, mode, minutes, topics: selected, invites },
              })
                .then((result) => {
                  setOpening(false);
                  if (!result.ok) {
                    setRoomError(result.error);
                    finishNav();
                    return;
                  }
                  void navigate({ to: "/race", search: { room: result.id } }).then(() => finishNav());
                })
                .catch(() => {
                  setOpening(false);
                  setRoomError("開房失敗，請再試一次。");
                  finishNav();
                });
            }}
          >
            {opening ? "開房中…" : chat.token ? `建立房間並邀請（${invites.length}/${need}）` : "先進入聊天室先可開房"}
          </button>
        </div>
      </main>
    </Shell>
  );
}

function NameCard({
  title,
  tone,
  mode,
  a,
  b,
  setA,
  setB,
}: {
  title: string;
  tone: "coral" | "teal";
  mode: Mode;
  a: string;
  b: string;
  setA: (value: string) => void;
  setB: (value: string) => void;
}) {
  return (
    <div className="rounded-3xl border-2 border-ink bg-paper p-4">
      <p className={tone === "coral" ? "text-2xl text-coral" : "text-2xl text-grass"}>{title}</p>
      <label className="mt-2 block text-sm font-bold">
        {mode === "duo" ? "選手" : "隊員 1"}
        <input value={a} maxLength={6} onChange={(event) => setA(event.target.value)} className="mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-cream px-3" />
      </label>
      {mode === "quad" && (
        <label className="mt-2 block text-sm font-bold">
          隊員 2
          <input value={b} maxLength={6} onChange={(event) => setB(event.target.value)} className="mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-cream px-3" />
        </label>
      )}
    </div>
  );
}
