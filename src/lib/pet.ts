import { create } from "zustand";
import { COIN_PER_STAMP, EVOLVE_AT, FOODS, SPECIES, WEARS, type FoodId, type SpeciesId, type WearId } from "@/data/pets";
import { isTeacherAccount } from "@/lib/teacher-account";

const KEY = "park-pet-v1";
const TEACHER_COINS = 10000;

export type PetSave = {
  species: SpeciesId | null;
  stage: 1 | 2;
  coins: number;
  fed: number;
  food: Partial<Record<FoodId, number>>;
  owned: WearId[];
  worn: WearId | null;
  paid: string[];
  purse: boolean;
};

type PetState = {
  account: string | null;
  save: PetSave;
  flash: string;
  bind: (account: string | null, stamps: string[]) => void;
  clearFlash: () => void;
  choose: (species: SpeciesId) => void;
  buyWear: (id: WearId) => string;
  buyFood: (id: FoodId) => string;
  wear: (id: WearId | null) => void;
  feed: (id: FoodId) => string;
};

function empty(): PetSave {
  return { species: null, stage: 1, coins: 0, fed: 0, food: {}, owned: [], worn: null, paid: [], purse: false };
}

function speciesId(value: unknown): SpeciesId | null {
  return SPECIES.some((item) => item.id === value) ? (value as SpeciesId) : null;
}

function wearId(value: unknown): WearId | null {
  return WEARS.some((item) => item.id === value) ? (value as WearId) : null;
}

function sanitize(raw: unknown): PetSave {
  const base = empty();
  if (!raw || typeof raw !== "object") return base;
  const data = raw as Partial<PetSave>;
  const food: PetSave["food"] = {};
  if (data.food && typeof data.food === "object") {
    for (const item of FOODS) {
      const count = Number(data.food[item.id] ?? 0);
      if (Number.isInteger(count) && count > 0) food[item.id] = Math.min(count, 99);
    }
  }
  const owned = Array.isArray(data.owned) ? data.owned.map(wearId).filter((id): id is WearId => Boolean(id)) : [];
  const worn = wearId(data.worn);
  return {
    species: speciesId(data.species),
    stage: data.stage === 2 ? 2 : 1,
    coins: Math.max(0, Math.min(99999, Math.floor(Number(data.coins) || 0))),
    fed: Math.max(0, Math.min(999, Math.floor(Number(data.fed) || 0))),
    food,
    owned: [...new Set(owned)],
    worn: worn && owned.includes(worn) ? worn : null,
    paid: Array.isArray(data.paid) ? data.paid.filter((id) => typeof id === "string").slice(0, 80) : [],
    purse: data.purse === true,
  };
}

function readAll(): Record<string, PetSave> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (!data || typeof data !== "object") return {};
    return data as Record<string, PetSave>;
  } catch {
    return {};
  }
}

function persist(account: string, save: PetSave) {
  const all = readAll();
  all[account] = save;
  localStorage.setItem(KEY, JSON.stringify(all));
}

export const usePet = create<PetState>((set, get) => ({
  account: null,
  save: empty(),
  flash: "",
  clearFlash: () => set({ flash: "" }),
  bind: (account, stamps) => {
    if (!account) {
      set({ account: null, save: empty(), flash: "" });
      return;
    }
    const save = sanitize(readAll()[account]);
    const notes: string[] = [];
    if (isTeacherAccount(account) && !save.purse) {
      save.coins += TEACHER_COINS;
      save.purse = true;
      notes.push(`老師帳號，寵物錢 ${TEACHER_COINS}`);
    }
    const unpaid = stamps.filter((id) => !save.paid.includes(id));
    let flash = get().account === account ? get().flash : "";
    if (unpaid.length) {
      save.paid = [...save.paid, ...unpaid];
      save.coins += unpaid.length * COIN_PER_STAMP;
      notes.push(
        unpaid.length === 1
          ? `完成課題，寵物錢 +${COIN_PER_STAMP}`
          : `已完成 ${unpaid.length} 個課題，寵物錢 +${unpaid.length * COIN_PER_STAMP}`,
      );
    }
    if (notes.length) {
      persist(account, save);
      flash = notes.join("。");
    }
    set({ account, save, flash });
  },
  choose: (species) => {
    const { account, save } = get();
    if (!account || save.species) return;
    const next = { ...save, species };
    persist(account, next);
    set({ save: next, flash: "" });
  },
  buyWear: (id) => {
    const item = WEARS.find((wear) => wear.id === id);
    const { account, save } = get();
    if (!item || !account) return "暫時買不到。";
    if (!save.species) return "先選一隻寵物。";
    if (save.owned.includes(id)) return "這件衣服已經有了。";
    if (save.coins < item.price) return "寵物錢不夠。";
    const next: PetSave = { ...save, coins: save.coins - item.price, owned: [...save.owned, id], worn: id };
    persist(account, next);
    set({ save: next, flash: `穿上了${item.name}` });
    return "";
  },
  buyFood: (id) => {
    const item = FOODS.find((food) => food.id === id);
    const { account, save } = get();
    if (!item || !account) return "暫時買不到。";
    if (!save.species) return "先選一隻寵物。";
    if (save.coins < item.price) return "寵物錢不夠。";
    const next: PetSave = {
      ...save,
      coins: save.coins - item.price,
      food: { ...save.food, [id]: (save.food[id] ?? 0) + 1 },
    };
    persist(account, next);
    set({ save: next, flash: `買到${item.name}` });
    return "";
  },
  wear: (id) => {
    const { account, save } = get();
    if (!account) return;
    const worn = id && save.owned.includes(id) ? id : null;
    const next = { ...save, worn };
    persist(account, next);
    set({ save: next });
  },
  feed: (id) => {
    const item = FOODS.find((food) => food.id === id);
    const { account, save } = get();
    if (!item || !account || !save.species) return "先選一隻寵物。";
    const have = save.food[id] ?? 0;
    if (have < 1) return "背包裡沒有這個糧食。";
    const species = SPECIES.find((pet) => pet.id === save.species);
    const fed = save.fed + item.feed;
    const evolved = save.stage === 1 && fed >= EVOLVE_AT;
    const next: PetSave = {
      ...save,
      food: { ...save.food, [id]: have - 1 },
      fed,
      stage: evolved ? 2 : save.stage,
    };
    persist(account, next);
    set({
      save: next,
      flash: evolved ? `${species?.name ?? "寵物"}吃飽了，進化了！` : `${species?.name ?? "寵物"}吃了${item.name}，好好味。`,
    });
    return "";
  },
}));
