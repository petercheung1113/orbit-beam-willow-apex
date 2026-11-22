import { createServerFn } from "@tanstack/react-start";
import type { TugView } from "@/lib/tug.server";

export type { TugView };

function tokenOf(input: unknown): string {
  return String((input as { token?: unknown } | null)?.token ?? "").trim();
}

export const tugCreate = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; mode: string; minutes: number; topics: string[]; invites: string[] } => {
    const raw = input as { mode?: unknown; minutes?: unknown; topics?: unknown; invites?: unknown } | null;
    const topics = Array.isArray(raw?.topics) ? raw.topics.map((item) => String(item)).slice(0, 20) : [];
    const invites = Array.isArray(raw?.invites) ? raw.invites.map((item) => String(item)).slice(0, 3) : [];
    return { token: tokenOf(input), mode: String(raw?.mode ?? ""), minutes: Number(raw?.minutes ?? 0), topics, invites };
  })
  .handler(async ({ data }) => {
    const { createTugRoom } = await import("@/lib/tug.server");
    return createTugRoom(data.token, data.mode, data.minutes, data.topics, data.invites);
  });

export const tugJoin = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string } => ({
    token: tokenOf(input),
    roomId: String((input as { roomId?: unknown } | null)?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8),
  }))
  .handler(async ({ data }): Promise<{ ok: true; view: TugView } | { ok: false; error: string }> => {
    const { joinTugRoom } = await import("@/lib/tug.server");
    return joinTugRoom(data.token, data.roomId);
  });

export const tugSync = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string } => ({
    token: tokenOf(input),
    roomId: String((input as { roomId?: unknown } | null)?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8),
  }))
  .handler(async ({ data }) => {
    const { syncTugRoom } = await import("@/lib/tug.server");
    return syncTugRoom(data.token, data.roomId);
  });

export const tugStart = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string } => ({
    token: tokenOf(input),
    roomId: String((input as { roomId?: unknown } | null)?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8),
  }))
  .handler(async ({ data }) => {
    const { startTugRoom } = await import("@/lib/tug.server");
    return startTugRoom(data.token, data.roomId);
  });

export const tugAnswer = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string; choice: number } => ({
    token: tokenOf(input),
    roomId: String((input as { roomId?: unknown } | null)?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8),
    choice: Number((input as { choice?: unknown } | null)?.choice ?? -1),
  }))
  .handler(async ({ data }) => {
    const { answerTug } = await import("@/lib/tug.server");
    return answerTug(data.token, data.roomId, data.choice);
  });

export const tugReplay = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string } => ({
    token: tokenOf(input),
    roomId: String((input as { roomId?: unknown } | null)?.roomId ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 8),
  }))
  .handler(async ({ data }) => {
    const { replayTug } = await import("@/lib/tug.server");
    return replayTug(data.token, data.roomId);
  });
