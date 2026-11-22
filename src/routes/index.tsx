import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shell } from "@/components/park/Shell";
import { HomePark } from "@/components/park/HomePark";
import { ParkChat, useClassChat } from "@/components/park/ParkChat";
import { usePark } from "@/lib/park";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "數學遊樂場 · 六年級" }],
  }),
});

function Home() {
  const hydrate = usePark((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return (
    <Shell heading>
      <div className="flex h-[calc(100dvh-5.25rem)] min-h-0">
        <div className="min-w-0 flex-1 overflow-auto">
          <Hello />
          <HomePark />
        </div>
        <ParkChat dock />
      </div>
    </Shell>
  );
}

function Hello() {
  const room = useClassChat();
  const mine = room.mates.find((mate) => mate.account === room.me);
  const called = mine && mine.name !== mine.seat ? mine.name : mine?.seat || usePark.getState().nickname;
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
      <div>
        <p className="text-sm font-bold text-grass">馬鞍山靈糧小學</p>
        <p className="text-2xl text-ink">你好，{called}</p>
        {mine && mine.name !== mine.seat ? <p className="text-sm text-muted">{mine.seat}</p> : null}
      </div>
      <div className="flex gap-2">
        <Link to="/pets" className="inline-flex h-11 items-center rounded-2xl bg-grass px-4 text-sm font-bold text-paper">
          寵物
        </Link>
        <Link to="/profile" className="inline-flex h-11 items-center rounded-2xl border-2 border-ink bg-paper px-4 text-sm font-bold">
          個人資料
        </Link>
      </div>
    </div>
  );
}
