import { create } from "zustand";

type NavLoad = {
  visible: boolean;
  holds: number;
  routing: boolean;
  setRouting: (on: boolean) => void;
  hold: () => void;
  release: () => void;
};

function shown(holds: number, routing: boolean) {
  return holds > 0 || routing;
}

export const useNavLoading = create<NavLoad>((set) => ({
  visible: false,
  holds: 0,
  routing: false,
  setRouting: (routing) => set((state) => ({ routing, visible: shown(state.holds, routing) })),
  hold: () => set((state) => ({ holds: state.holds + 1, visible: true })),
  release: () =>
    set((state) => {
      const holds = Math.max(0, state.holds - 1);
      return { holds, visible: shown(holds, state.routing) };
    }),
}));

export function holdNav() {
  useNavLoading.getState().hold();
}

export function releaseNav() {
  useNavLoading.getState().release();
}

export function finishNav() {
  const state = useNavLoading.getState();
  if (state.holds > 0) state.release();
  state.setRouting(false);
}
