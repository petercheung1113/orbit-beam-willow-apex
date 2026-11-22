import { createServerFn } from "@tanstack/react-start";
import type { ChatMate, ChatMessage, ChatPing, ChatRoomInfo, StoredAvatar } from "@/lib/chat.server";

export type { ChatMate, ChatMessage, ChatPing, ChatRoomInfo, StoredAvatar };

function tokenOf(input: unknown): string {
  return String((input as { token?: unknown } | null)?.token ?? "").trim();
}

function roomOf(input: unknown): string {
  const room = String((input as { roomId?: unknown } | null)?.roomId ?? "hall").trim();
  return room || "hall";
}

export const chatSync = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string; after: number; rev: number } => {
    const raw = input as { after?: unknown; rev?: unknown } | null;
    const after = Number(raw?.after ?? 0);
    const rev = Number(raw?.rev ?? -1);
    return {
      token: tokenOf(input),
      roomId: roomOf(input),
      after: Number.isFinite(after) ? after : 0,
      rev: Number.isFinite(rev) ? rev : -1,
    };
  })
  .handler(async ({ data }) => {
    const { syncChat } = await import("@/lib/chat.server");
    return syncChat(data.token, data.roomId, data.after, data.rev);
  });

export const chatSend = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string; body: string } => ({
    token: tokenOf(input),
    roomId: roomOf(input),
    body: String((input as { body?: unknown } | null)?.body ?? ""),
  }))
  .handler(async ({ data }) => {
    const { sendChat } = await import("@/lib/chat.server");
    return sendChat(data.token, data.roomId, data.body);
  });

export const chatClear = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string } => ({
    token: tokenOf(input),
    roomId: roomOf(input),
  }))
  .handler(async ({ data }) => {
    const { clearRoomHistory } = await import("@/lib/chat.server");
    return clearRoomHistory(data.token, data.roomId);
  });

export const chatAvatar = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; kind: string; value: string } => {
    const raw = input as { kind?: unknown; value?: unknown } | null;
    return { token: tokenOf(input), kind: String(raw?.kind ?? ""), value: String(raw?.value ?? "") };
  })
  .handler(async ({ data }) => {
    const { saveAvatar } = await import("@/lib/chat.server");
    return saveAvatar(data.token, data.kind, data.value);
  });

export const chatProfile = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; name: string } => ({
    token: tokenOf(input),
    name: String((input as { name?: unknown } | null)?.name ?? ""),
  }))
  .handler(async ({ data }) => {
    const { saveProfile } = await import("@/lib/chat.server");
    return saveProfile(data.token, data.name);
  });

export const chatOpen = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; kind: "direct" | "group"; with: string; title: string; members: string[] } => {
    const raw = input as { kind?: unknown; with?: unknown; title?: unknown; members?: unknown } | null;
    const members = Array.isArray(raw?.members) ? raw.members.map((item) => String(item)).slice(0, 12) : [];
    return {
      token: tokenOf(input),
      kind: raw?.kind === "group" ? "group" : "direct",
      with: String(raw?.with ?? ""),
      title: String(raw?.title ?? ""),
      members,
    };
  })
  .handler(async ({ data }) => {
    if (data.kind === "group") {
      const { openGroup } = await import("@/lib/chat.server");
      return openGroup(data.token, data.title, data.members);
    }
    const { openDirect } = await import("@/lib/chat.server");
    return openDirect(data.token, data.with);
  });

export const chatAddMembers = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string; members: string[] } => {
    const raw = input as { members?: unknown } | null;
    const members = Array.isArray(raw?.members) ? raw.members.map((item) => String(item)).slice(0, 36) : [];
    return { token: tokenOf(input), roomId: roomOf(input), members };
  })
  .handler(async ({ data }) => {
    const { addGroupMembers } = await import("@/lib/chat.server");
    return addGroupMembers(data.token, data.roomId, data.members);
  });

export const chatDeleteGroup = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; roomId: string } => ({
    token: tokenOf(input),
    roomId: roomOf(input),
  }))
  .handler(async ({ data }) => {
    const { deleteGroup } = await import("@/lib/chat.server");
    return deleteGroup(data.token, data.roomId);
  });

export const chatPushKey = createServerFn({ method: "GET" }).handler(async () => {
  const { pushPublicKey } = await import("@/lib/chat-push.server");
  return { key: await pushPublicKey() };
});

export const chatPushSave = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { token: string; endpoint: string; p256dh: string; auth: string } => {
    const raw = input as { endpoint?: unknown; p256dh?: unknown; auth?: unknown } | null;
    return {
      token: tokenOf(input),
      endpoint: String(raw?.endpoint ?? ""),
      p256dh: String(raw?.p256dh ?? ""),
      auth: String(raw?.auth ?? ""),
    };
  })
  .handler(async ({ data }) => {
    const { savePushSubscription } = await import("@/lib/chat-push.server");
    return savePushSubscription(data.token, data.endpoint, data.p256dh, data.auth);
  });
