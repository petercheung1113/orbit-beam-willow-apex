import { createServerFn } from "@tanstack/react-start";
import type { LivePeek, LiveView } from "@/lib/live.server";

export type { LivePeek, LiveView };

function tokenOf(input: unknown): string {
  return String((input as { token?: unknown } | null)?.token ?? "").trim();
}

function pinOf(input: unknown): string {
  return String((input as { pin?: unknown } | null)?.pin ?? "").replace(/\D/g, "").slice(0, 4);
}

export const livePeek = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string } => ({ token: tokenOf(input) }))
  .handler(async ({ data }) => {
    const { peekLive } = await import("@/lib/live.server");
    return peekLive(data.token);
  });

export const liveCreate = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; topics: string[]; count: number; seconds: number } => {
    const raw = input as { topics?: unknown; count?: unknown; seconds?: unknown } | null;
    const topics = Array.isArray(raw?.topics) ? raw.topics.map((item) => String(item)).slice(0, 20) : [];
    return { token: tokenOf(input), topics, count: Number(raw?.count ?? 0), seconds: Number(raw?.seconds ?? 0) };
  })
  .handler(async ({ data }) => {
    const { createLive } = await import("@/lib/live.server");
    return createLive(data.token, data.topics, data.count, data.seconds);
  });

export const liveJoin = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; pin: string } => ({ token: tokenOf(input), pin: pinOf(input) }))
  .handler(async ({ data }): Promise<{ ok: true; view: LiveView } | { ok: false; error: string }> => {
    const { joinLive } = await import("@/lib/live.server");
    return joinLive(data.token, data.pin);
  });

export const liveSync = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; pin: string } => ({ token: tokenOf(input), pin: pinOf(input) }))
  .handler(async ({ data }) => {
    const { syncLive } = await import("@/lib/live.server");
    return syncLive(data.token, data.pin);
  });

export const liveStart = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; pin: string } => ({ token: tokenOf(input), pin: pinOf(input) }))
  .handler(async ({ data }) => {
    const { startLive } = await import("@/lib/live.server");
    return startLive(data.token, data.pin);
  });

export const liveReveal = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; pin: string } => ({ token: tokenOf(input), pin: pinOf(input) }))
  .handler(async ({ data }) => {
    const { revealLive } = await import("@/lib/live.server");
    return revealLive(data.token, data.pin);
  });

export const liveNext = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; pin: string } => ({ token: tokenOf(input), pin: pinOf(input) }))
  .handler(async ({ data }) => {
    const { nextLive } = await import("@/lib/live.server");
    return nextLive(data.token, data.pin);
  });

export const liveClose = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; pin: string } => ({ token: tokenOf(input), pin: pinOf(input) }))
  .handler(async ({ data }) => {
    const { closeLive } = await import("@/lib/live.server");
    return closeLive(data.token, data.pin);
  });

export const liveAnswer = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; pin: string; choice: number } => ({
    token: tokenOf(input),
    pin: pinOf(input),
    choice: Math.round(Number((input as { choice?: unknown } | null)?.choice ?? -1)),
  }))
  .handler(async ({ data }) => {
    const { answerLive } = await import("@/lib/live.server");
    return answerLive(data.token, data.pin, data.choice);
  });

