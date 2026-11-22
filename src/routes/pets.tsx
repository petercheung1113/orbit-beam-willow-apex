import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EVOLVE_AT, FOODS, SPECIES, speciesOf, type FoodId } from "@/data/pets";
import { PetSprite } from "@/components/park/PetSprite";
import { Shell } from "@/components/park/Shell";
import { usePet } from "@/lib/pet";

export const Route = createFileRoute("/pets")({
  component: PetsPage,
  head: () => ({ meta: [{ title: "寵物 · 數學遊樂場" }] }),
});

function PetsPage() {
  return (
    <Shell>
      <PetsHome />
    </Shell>
  );
}

function PetsHome() {
  const save = usePet((s) => s.save);
  const choose = usePet((s) => s.choose);
  const buyFood = usePet((s) => s.buyFood);
  const feed = usePet((s) => s.feed);
  const [tab, setTab] = useState<"pet" | "shop">("pet");
  const [note, setNote] = useState("");
  const pet = speciesOf(save.species);

  const tell = (message: string) => setNote(message);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <p className="text-sm font-bold text-grass">遊樂場小夥伴</p>
      <h1 className="text-4xl text-ink">寵物</h1>
      <p className="mt-2 text-ink">完成一個課題得到 40 寵物錢。買糧食餵牠，吃夠就會進化。</p>
      {note ? <p className="mt-3 text-sm font-bold text-coral">{note}</p> : null}

      {!pet ? (
        <section className="mt-4">
          <h2 className="text-2xl text-ink">選一隻當寵物</h2>
          <p className="mt-1 text-sm text-muted">選定後不能更換。</p>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SPECIES.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full flex-col items-center rounded-2xl border-2 border-ink bg-paper p-3"
                  onClick={() => {
                    choose(item.id);
                    setTab("pet");
                    setNote("");
                  }}
                >
                  <PetSprite species={item.id} stage={1} className="h-28 w-28" />
                  <span className="text-lg font-bold">{item.name}</span>
                  <span className="text-sm text-muted">{item.blurb}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <>
          <div className="mt-4 flex gap-2">
            <button type="button" className={tab === "pet" ? "h-11 rounded-full bg-ink px-4 text-sm font-bold text-paper" : "h-11 rounded-full border-2 border-ink px-4 text-sm font-bold"} onClick={() => setTab("pet")}>
              我的寵物
            </button>
            <button type="button" className={tab === "shop" ? "h-11 rounded-full bg-ink px-4 text-sm font-bold text-paper" : "h-11 rounded-full border-2 border-ink px-4 text-sm font-bold"} onClick={() => setTab("shop")}>
              商城
            </button>
          </div>
          {tab === "pet" ? (
            <section className="mt-4 rounded-3xl border-2 border-ink bg-paper p-4">
              <div className="flex flex-wrap items-end gap-4">
                <PetSprite species={pet.id} stage={save.stage} className="h-40 w-40" />
                <div>
                  <h2 className="text-3xl text-ink">
                    {pet.name}
                    <span className="ml-2 text-base font-bold text-grass">{save.stage === 2 ? "已進化" : "幼年"}</span>
                  </h2>
                  <p className="mt-1 text-sm text-muted">{pet.blurb}</p>
                  <p className="mt-2 text-lg font-bold">寵物錢 {save.coins}</p>
                  <p className="mt-1 text-sm">
                    糧食 {Math.min(save.fed, EVOLVE_AT)} / {EVOLVE_AT}
                    {save.stage === 2 ? " · 已經進化" : " · 吃夠就進化"}
                  </p>
                  <div className="mt-2 h-3 w-48 overflow-hidden rounded-full border-2 border-ink">
                    <div className="h-full bg-sun" style={{ width: `${Math.min(100, (save.fed / EVOLVE_AT) * 100)}%` }} />
                  </div>
                </div>
              </div>
              <h3 className="mt-5 text-xl">糧食背包</h3>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {FOODS.map((item) => {
                  const count = save.food[item.id] ?? 0;
                  return (
                    <li key={item.id} className="flex items-center gap-3 rounded-2xl border border-line p-2">
                      <img src={`/art/pets/${item.id}.png`} alt="" className="size-14 object-contain" />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-muted">剩 {count} · 飽足 +{item.feed}</p>
                      </div>
                      <button
                        type="button"
                        className="h-11 rounded-xl bg-coral px-3 text-sm font-bold text-paper disabled:opacity-40"
                        disabled={count < 1}
                        onClick={() => tell(feed(item.id as FoodId))}
                      >
                        餵
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : (
            <Shop coins={save.coins} onFood={(id) => tell(buyFood(id))} />
          )}
        </>
      )}
    </main>
  );
}

function Shop({ coins, onFood }: { coins: number; onFood: (id: FoodId) => void }) {
  return (
    <section className="mt-4">
      <p className="text-lg font-bold">寵物錢 {coins}</p>
      <h2 className="mt-4 text-2xl">糧食</h2>
      <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FOODS.map((item) => (
          <li key={item.id} className="rounded-2xl border-2 border-ink bg-paper p-3">
            <img src={`/art/pets/${item.id}.png`} alt="" className="mx-auto size-24 object-contain" />
            <p className="mt-1 font-bold">{item.name}</p>
            <p className="text-sm text-muted">
              {item.price} 寵物錢 · 飽足 +{item.feed}
            </p>
            <button type="button" className="mt-2 h-11 w-full rounded-xl bg-coral text-sm font-bold text-paper" onClick={() => onFood(item.id)}>
              買一份
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
