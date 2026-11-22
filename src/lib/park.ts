import { create } from "zustand";

const KEY = "playground-park-v1";

export type SavedPlan = {
  examDate: string;
  target: number;
  minutes: number;
  focus: string[];
  coverAll: boolean;
  done: Record<string, boolean>;
};

export type Mastery = { correct: number; seen: number };

type Saved = {
  stamps: string[];
  teacher: boolean;
  nickname: string;
  student: string | null;
  chatToken: string | null;
  plan: SavedPlan | null;
  mastery: Record<string, Mastery>;
};

type ParkState = Saved & {
  ready: boolean;
  stamp: (id: string) => void;
  toggleTeacher: () => void;
  clearStamps: () => void;
  setNickname: (name: string) => void;
  signInStudent: (account: string, token: string, name?: string) => void;
  signOutStudent: () => void;
  dropChatToken: () => void;
  setPlan: (plan: SavedPlan) => void;
  clearPlan: () => void;
  toggleDay: (date: string) => void;
  addResult: (rows: { unitId: string; correct: boolean }[]) => void;
  hydrate: () => void;
};

function snapshot(state: ParkState): Saved {
  return {
    stamps: state.stamps,
    teacher: state.teacher,
    nickname: state.nickname,
    student: state.student,
    chatToken: state.chatToken,
    plan: state.plan,
    mastery: state.mastery,
  };
}

function write(state: ParkState) {
  if (typeof window === "undefined" || !state.ready) return;
  localStorage.setItem(KEY, JSON.stringify(snapshot(state)));
}

export const usePark = create<ParkState>((set, get) => ({
  stamps: [],
  teacher: false,
  nickname: "學生01",
  student: null,
  chatToken: null,
  plan: null,
  mastery: {},
  ready: false,
  stamp: (id) => {
    const { stamps } = get();
    if (stamps.includes(id)) return;
    set({ stamps: [...stamps, id] });
    write(get());
  },
  toggleTeacher: () => {
    set({ teacher: !get().teacher });
    write(get());
  },
  clearStamps: () => {
    set({ stamps: [] });
    write(get());
  },
  setNickname: (name) => {
    const nickname = name.trim().slice(0, 12);
    if (!nickname) return;
    set({ nickname });
    write(get());
  },
  signInStudent: (account, token, name) => {
    set({ student: account, nickname: (name || account).trim().slice(0, 12) || account, chatToken: token });
    write(get());
  },
  signOutStudent: () => {
    const nickname = get().nickname === get().student ? "學生01" : get().nickname;
    set({ student: null, chatToken: null, nickname });
    write(get());
  },
  dropChatToken: () => {
    set({ chatToken: null });
    write(get());
  },
  setPlan: (plan) => {
    set({ plan });
    write(get());
  },
  clearPlan: () => {
    set({ plan: null });
    write(get());
  },
  toggleDay: (date) => {
    const plan = get().plan;
    if (!plan) return;
    set({ plan: { ...plan, done: { ...plan.done, [date]: !plan.done[date] } } });
    write(get());
  },
  addResult: (rows) => {
    const mastery = { ...get().mastery };
    for (const row of rows) {
      const prev = mastery[row.unitId] ?? { correct: 0, seen: 0 };
      mastery[row.unitId] = {
        correct: prev.correct + (row.correct ? 1 : 0),
        seen: prev.seen + 1,
      };
    }
    set({ mastery });
    write(get());
  },
  hydrate: () => {
    if (get().ready || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const data = JSON.parse(raw) as Partial<Saved>;
        set({
          stamps: Array.isArray(data.stamps) ? data.stamps : [],
          teacher: Boolean(data.teacher),
          nickname: typeof data.nickname === "string" && data.nickname ? data.nickname.slice(0, 12) : "學生01",
          student: typeof data.student === "string" ? data.student : null,
          chatToken: typeof data.chatToken === "string" ? data.chatToken : null,
          plan: data.plan ?? null,
          mastery: data.mastery && typeof data.mastery === "object" ? data.mastery : {},
          ready: true,
        });
        return;
      }
    } catch {
      /* ignore broken storage */
    }
    set({ ready: true });
  },
}));
