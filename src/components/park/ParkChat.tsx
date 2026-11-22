import { Link } from "@tanstack/react-router";
import { Bell, Paperclip, Send } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AvatarFace, choiceFor, parseChoice, type AvatarChoice } from "@/components/park/AvatarFace";
import { signInStudent } from "@/lib/class-login";
import { chatAddMembers, chatAvatar, chatClear, chatDeleteGroup, chatOpen, chatProfile, chatSend, chatSync, type ChatMate, type ChatMessage, type ChatPing, type ChatRoomInfo } from "@/lib/chat.functions";
import { CHAT_FILE_CHUNK, CHAT_FILE_MAX, formatBytes } from "@/lib/chat-upload";
import { usePark } from "@/lib/park";
import { enableInviteNotes, showInviteNote, subscribeInviteNotes } from "@/lib/chat-notify";

type Notice = { key: string; text: string };

type Room = {
  me: string;
  token: string | null;
  roomId: string;
  rooms: ChatRoomInfo[];
  mates: ChatMate[];
  messages: ChatMessage[];
  notices: Notice[];
  avatars: Record<string, AvatarChoice>;
  linkError: string;
  sendError: string;
  sending: boolean;
  send: (body: string) => Promise<boolean>;
  take: (bucket: string, message: ChatMessage) => void;
  pickAvatar: (choice: AvatarChoice) => Promise<string>;
  saveName: (name: string) => Promise<string>;
  openDirect: (account: string) => Promise<string>;
  openGroup: (title: string, members: string[]) => Promise<string>;
  addMembers: (roomId: string, members: string[]) => Promise<string>;
  deleteGroup: (roomId: string) => Promise<string>;
  clearTalk: () => Promise<string>;
  enter: (id: string) => void;
  unlock: (password: string) => Promise<string>;
  inbox: ChatPing[];
  seenRooms: Record<string, number>;
  bellPrimed: boolean;
};

const RoomContext = createContext<Room | null>(null);

function useRoom(): Room {
  const room = useContext(RoomContext);
  if (!room) throw new Error("聊天室未就緒");
  return room;
}

export function useClassChat(): Room {
  return useRoom();
}

function clock(at: number): string {
  const date = new Date(at);
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function who(name: string, seat: string): string {
  return name && name !== seat ? `${name} · ${seat}` : seat;
}

function unreadMates(inbox: ChatPing[], seenRooms: Record<string, number>, primed: boolean, me: string): ChatPing[] {
  if (!primed) return [];
  const latest = new Map<string, ChatPing>();
  for (const row of inbox) {
    if (row.account === me) continue;
    if (row.id <= (seenRooms[row.roomId] ?? 0)) continue;
    const prev = latest.get(row.account);
    if (!prev || row.id > prev.id) latest.set(row.account, row);
  }
  return [...latest.values()].sort((a, b) => b.at - a.at);
}

function pingText(row: ChatPing): string {
  if (row.body.trim()) return row.body;
  return row.fileName ? `檔案 · ${row.fileName}` : "傳送了檔案";
}

function pingWhere(rooms: ChatRoomInfo[], roomId: string): string {
  const found = rooms.find((item) => item.id === roomId);
  if (!found || found.kind === "hall") return "大堂";
  if (found.kind === "direct") return "私聊";
  return found.title || "群組";
}

type BellSeen = { primed: boolean; rooms: Record<string, number> };

function bellKey(account: string): string {
  return `park-chat-bell:${account}`;
}

function readBell(account: string): BellSeen {
  if (!account || typeof window === "undefined") return { primed: false, rooms: {} };
  try {
    const raw = localStorage.getItem(bellKey(account));
    if (!raw) return { primed: false, rooms: {} };
    const parsed = JSON.parse(raw) as BellSeen;
    if (!parsed || typeof parsed.rooms !== "object" || parsed.rooms === null) return { primed: false, rooms: {} };
    return { primed: Boolean(parsed.primed), rooms: parsed.rooms };
  } catch {
    return { primed: false, rooms: {} };
  }
}

function writeBell(account: string, seen: BellSeen) {
  if (!account || typeof window === "undefined") return;
  localStorage.setItem(bellKey(account), JSON.stringify(seen));
}

export function ClassChatProvider({ children }: { children: ReactNode }) {
  const me = usePark((s) => s.student) ?? "";
  const token = usePark((s) => s.chatToken);
  const remember = usePark((s) => s.signInStudent);
  const dropChatToken = usePark((s) => s.dropChatToken);
  const [mates, setMates] = useState<ChatMate[]>([]);
  const [rooms, setRooms] = useState<ChatRoomInfo[]>([{ id: "hall", kind: "hall", title: "大堂", members: [] }]);
  const [roomId, setRoomId] = useState("hall");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [avatars, setAvatars] = useState<Record<string, AvatarChoice>>({});
  const [linkError, setLinkError] = useState("");
  const [sendError, setSendError] = useState("");
  const [sending, setSending] = useState(false);
  const [inbox, setInbox] = useState<ChatPing[]>([]);
  const [seen, setSeen] = useState<BellSeen>({ primed: false, rooms: {} });
  const roomRef = useRef("hall");
  const afters = useRef<Record<string, number>>({});
  const caches = useRef<Record<string, ChatMessage[]>>({});
  const rev = useRef(-1);
  const seenOnline = useRef<Set<string> | null>(null);
  const inboxRef = useRef<ChatPing[]>([]);
  const knownRooms = useRef<Set<string>>(new Set(["hall"]));
  const roomsReady = useRef(false);

  const enter = (id: string) => {
    roomRef.current = id;
    setRoomId(id);
    setMessages(caches.current[id] ?? []);
    setSeen((prev) => {
      let max = prev.rooms[id] ?? 0;
      for (const ping of inboxRef.current) if (ping.roomId === id) max = Math.max(max, ping.id);
      for (const row of caches.current[id] ?? []) max = Math.max(max, row.id);
      if (max <= (prev.rooms[id] ?? 0)) return prev;
      const next = { primed: prev.primed, rooms: { ...prev.rooms, [id]: max } };
      writeBell(me, next);
      return next;
    });
  };

  useEffect(() => {
    roomsReady.current = false;
    knownRooms.current = new Set(["hall"]);
  }, [token, me]);

  useEffect(() => {
    if (!token) return;
    void subscribeInviteNotes(token);
  }, [token]);

  useEffect(() => {
    if (!token) return;
    let stop = false;
    const pull = async () => {
      try {
        const asked = roomRef.current;
        const result = await chatSync({ data: { token, roomId: asked, after: afters.current[asked] ?? 0, rev: rev.current } });
        if (stop) return;
        if (!result.ok) {
          dropChatToken();
          return;
        }
        setLinkError("");
        setMates(result.mates);
        setRooms(result.rooms);
        if (!roomsReady.current) {
          for (const item of result.rooms) knownRooms.current.add(item.id);
          roomsReady.current = true;
        } else {
          for (const item of result.rooms) {
            if (item.kind === "hall" || knownRooms.current.has(item.id)) continue;
            knownRooms.current.add(item.id);
            const title = item.kind === "direct" ? "私聊邀請" : "群組邀請";
            const body = item.kind === "direct" ? `${item.title} 邀請你傾偈` : `你被邀請加入「${item.title}」`;
            void showInviteNote(title, body, `invite:${item.id}`);
            setNotices((prev) => [...prev, { key: `invite-${item.id}`, text: body }].slice(-8));
          }
        }
        const mine = result.mates.find((mate) => mate.account === me);
        if (mine && usePark.getState().nickname !== mine.name) usePark.getState().setNickname(mine.name);
        rev.current = result.rev;
        if (result.avatars) {
          const next: Record<string, AvatarChoice> = {};
          for (const row of result.avatars) {
            const choice = parseChoice(row.kind, row.value);
            if (choice) next[row.account] = choice;
          }
          setAvatars(next);
        }
        if (result.replace) {
          const bucket = result.roomId;
          const had = (caches.current[bucket] ?? []).length > 0;
          caches.current[bucket] = result.messages;
          afters.current[bucket] = result.messages.at(-1)?.id ?? 0;
          if (had && result.messages.length === 0) {
            setNotices((prev) => [...prev, { key: `wipe-${bucket}-${Date.now()}`, text: "對話記錄已刪除" }].slice(-8));
          }
        } else if (result.messages.length) {
          const last = result.messages[result.messages.length - 1];
          const bucket = result.roomId;
          if (last) afters.current[bucket] = Math.max(afters.current[bucket] ?? 0, last.id);
          const prev = caches.current[bucket] ?? [];
          const map = new Map(prev.map((row) => [row.id, row]));
          for (const row of result.messages) map.set(row.id, row);
          caches.current[bucket] = [...map.values()].sort((a, b) => a.id - b.id).slice(-200);
        }
        if (asked !== roomRef.current) return;
        if (result.roomId !== asked) enter(result.roomId);
        else setMessages(caches.current[result.roomId] ?? []);
        const pings = result.pings;
        inboxRef.current = pings;
        setInbox(pings);
        setSeen((prev) => {
          if (prev.primed) return prev;
          const rooms = { ...prev.rooms };
          for (const ping of pings) rooms[ping.roomId] = Math.max(rooms[ping.roomId] ?? 0, ping.id);
          const next = { primed: true, rooms };
          writeBell(me, next);
          return next;
        });
        const now = new Set(result.mates.filter((mate) => mate.online).map((mate) => mate.account));
        const before = seenOnline.current;
        seenOnline.current = now;
        if (before) {
          const lines: Notice[] = [];
          for (const mate of result.mates) {
            if (mate.online && !before.has(mate.account) && mate.account !== me) {
              lines.push({ key: `in-${mate.account}-${Date.now()}`, text: `${who(mate.name, mate.seat)} 上線了` });
            }
            if (!mate.online && before.has(mate.account) && mate.account !== me) {
              lines.push({ key: `out-${mate.account}-${Date.now()}`, text: `${who(mate.name, mate.seat)} 離開了` });
            }
          }
          if (lines.length) setNotices((prev) => [...prev, ...lines].slice(-8));
        }
      } catch {
        if (!stop) setLinkError("對講暫時斷線，會再試。");
      }
    };
    void pull();
    const id = window.setInterval(() => void pull(), 2500);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [dropChatToken, me, token]);

  useEffect(() => {
    setSeen(readBell(me));
  }, [me]);

  const take = (bucket: string, message: ChatMessage) => {
    afters.current[bucket] = Math.max(afters.current[bucket] ?? 0, message.id);
    const prev = caches.current[bucket] ?? [];
    caches.current[bucket] = prev.some((row) => row.id === message.id) ? prev : [...prev, message];
    if (roomRef.current === bucket) setMessages(caches.current[bucket] ?? []);
  };

  const send = async (body: string) => {
    if (!token || sending) return false;
    const current = roomRef.current;
    setSending(true);
    setSendError("");
    try {
      const result = await chatSend({ data: { token, roomId: current, body } });
      if (!result.ok) {
        if (result.error === "expired") dropChatToken();
        else setSendError(result.error);
        return false;
      }
      afters.current[current] = Math.max(afters.current[current] ?? 0, result.message.id);
      const prev = caches.current[current] ?? [];
      caches.current[current] = prev.some((row) => row.id === result.message.id) ? prev : [...prev, result.message];
      if (roomRef.current === current) setMessages(caches.current[current] ?? []);
      return true;
    } catch {
      setSendError("送唔出，再試一次。");
      return false;
    } finally {
      setSending(false);
    }
  };

  const pickAvatar = async (choice: AvatarChoice) => {
    if (!token) return "請先進入聊天室。";
    const value = choice.kind === "upload" ? choice.src : choice.id;
    try {
      const result = await chatAvatar({ data: { token, kind: choice.kind, value } });
      if (!result.ok) {
        if (result.error === "expired") dropChatToken();
        return result.error;
      }
      setAvatars((prev) => ({ ...prev, [me]: choice }));
      rev.current = -1;
      return "";
    } catch {
      return "頭像暫時存唔到。";
    }
  };

  const saveName = async (name: string) => {
    if (!token) return "請先進入聊天室。";
    try {
      const result = await chatProfile({ data: { token, name } });
      if (!result.ok) {
        if (result.error === "expired") dropChatToken();
        return result.error;
      }
      usePark.getState().setNickname(result.name);
      setMates((prev) => prev.map((mate) => (mate.account === me ? { ...mate, name: result.name } : mate)));
      return "";
    } catch {
      return "名字暫時存唔到。";
    }
  };

  const rememberRoom = (room: ChatRoomInfo) => {
    knownRooms.current.add(room.id);
    setRooms((prev) => (prev.some((item) => item.id === room.id) ? prev.map((item) => (item.id === room.id ? room : item)) : [...prev, room]));
    enter(room.id);
  };

  const openDirect = async (account: string) => {
    if (!token) return "請先進入聊天室。";
    try {
      const result = await chatOpen({ data: { token, kind: "direct", with: account, title: "", members: [] } });
      if (!result.ok) return result.error === "expired" ? (dropChatToken(), "請再進入一次。") : result.error;
      rememberRoom(result.room);
      return "";
    } catch {
      return "私聊暫時開唔到。";
    }
  };

  const openGroup = async (title: string, members: string[]) => {
    if (!token) return "請先進入聊天室。";
    try {
      const result = await chatOpen({ data: { token, kind: "group", with: "", title, members } });
      if (!result.ok) return result.error === "expired" ? (dropChatToken(), "請再進入一次。") : result.error;
      rememberRoom(result.room);
      return "";
    } catch {
      return "群組暫時開唔到。";
    }
  };

  const addMembers = async (roomId: string, members: string[]) => {
    if (!token) return "請先進入聊天室。";
    try {
      const result = await chatAddMembers({ data: { token, roomId, members } });
      if (!result.ok) return result.error === "expired" ? (dropChatToken(), "請再進入一次。") : result.error;
      rememberRoom(result.room);
      return "";
    } catch {
      return "暫時加唔到人，再試一次。";
    }
  };

  const deleteGroup = async (roomId: string) => {
    if (!token) return "請先進入聊天室。";
    try {
      const result = await chatDeleteGroup({ data: { token, roomId } });
      if (!result.ok) return result.error === "expired" ? (dropChatToken(), "請再進入一次。") : result.error;
      setRooms((prev) => prev.filter((item) => item.id !== roomId));
      delete caches.current[roomId];
      delete afters.current[roomId];
      if (roomRef.current === roomId) enter("hall");
      return "";
    } catch {
      return "暫時刪除不到，再試一次。";
    }
  };

  const unlock = async (password: string) => {
    try {
      const result = await signInStudent({ data: { account: me, password } });
      if (!result.ok || !result.token) return result.ok ? "聊天室暫時入唔到" : "密碼不正確";
      remember(result.account, result.token);
      return "";
    } catch {
      return "暫時入唔到，再試一次";
    }
  };

  const clearTalk = async () => {
    if (!token) return "請先進入聊天室。";
    const current = roomRef.current;
    try {
      const result = await chatClear({ data: { token, roomId: current } });
      if (!result.ok) {
        if (result.error === "expired") dropChatToken();
        return result.error;
      }
      caches.current[current] = [];
      afters.current[current] = 0;
      if (roomRef.current === current) setMessages([]);
      setNotices((prev) => [...prev, { key: `wipe-${current}-${Date.now()}`, text: "對話記錄已刪除" }].slice(-8));
      return "";
    } catch {
      return "暫時刪除不到，再試一次。";
    }
  };

  return (
    <RoomContext.Provider value={{ me, token, roomId, rooms, mates, messages, notices, avatars, linkError, sendError, sending, send, take, pickAvatar, saveName, openDirect, openGroup, addMembers, deleteGroup, clearTalk, enter, unlock, inbox, seenRooms: seen.rooms, bellPrimed: seen.primed }}>
      {children}
    </RoomContext.Provider>
  );
}

export function ParkChat({ dock = false }: { dock?: boolean }) {
  const room = useRoom();
  const [open, setOpen] = useState(true);
  const [panel, setPanel] = useState<"talk" | "direct" | "group">("talk");
  const [draft, setDraft] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [groupTitle, setGroupTitle] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [dropAsk, setDropAsk] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [gate, setGate] = useState("");
  const [password, setPassword] = useState("");
  const [pendingGate, setPendingGate] = useState(false);
  const [wipeAsk, setWipeAsk] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notesOn, setNotesOn] = useState(false);
  const stick = useRef(true);
  const scroller = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLInputElement>(null);
  const attachment = useRef<HTMLInputElement>(null);
  const bellBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWipeAsk(false);
  }, [room.roomId]);

  useEffect(() => {
    setNotesOn(typeof Notification !== "undefined" && Notification.permission === "granted");
  }, [room.token]);

  useEffect(() => {
    if (!bellOpen) return;
    const close = (event: PointerEvent) => {
      if (!bellBox.current?.contains(event.target as Node)) setBellOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [bellOpen]);

  useEffect(() => {
    if (!dock) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    setOpen(wide.matches);
  }, [dock]);

  useEffect(() => {
    const node = scroller.current;
    if (!node || !stick.current) return;
    node.scrollTop = node.scrollHeight;
  }, [room.messages, room.notices, open]);

  const unread = unreadMates(room.inbox, room.seenRooms, room.bellPrimed, room.me);
  const badge = Math.min(unread.length, 2);

  if (dock && !open) {
    return (
      <aside className="flex h-full w-16 shrink-0 flex-col border-l-2 border-ink bg-paper/95 max-lg:fixed max-lg:top-20 max-lg:right-0 max-lg:bottom-0 max-lg:z-30">
        <button type="button" onClick={() => setOpen(true)} className="relative border-b border-line px-1 py-3 text-xs font-bold text-ink">
          聊天
          {badge > 0 ? <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[10px] leading-none font-bold text-paper">{badge}</span> : null}
        </button>
        <ul className="flex flex-1 flex-col items-center gap-2 overflow-y-auto py-2" aria-label="同學">
          {room.mates.map((mate) => (
            <li key={mate.account} title={mate.online ? `${who(mate.name, mate.seat)} 在線` : `${who(mate.name, mate.seat)} 不在線`}>
              <AvatarFace choice={choiceFor(mate.account, room.avatars[mate.account])} online={mate.online} className="size-9" />
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  const current = room.rooms.find((item) => item.id === room.roomId) ?? room.rooms[0];
  const onlineCount = room.mates.filter((mate) => mate.online).length;
  const shown = !current || current.kind === "hall" ? room.mates : room.mates.filter((mate) => current.members.includes(mate.account));

  return (
    <aside
      className={
        dock
          ? "flex h-full w-80 shrink-0 flex-col border-l-2 border-ink bg-paper/95 max-lg:fixed max-lg:top-20 max-lg:right-0 max-lg:bottom-0 max-lg:z-30 max-lg:h-auto max-lg:w-[min(22rem,100vw)]"
          : "flex h-full min-h-[70dvh] flex-col overflow-hidden rounded-3xl border-2 border-ink bg-paper"
      }
    >
      <header className="flex items-center gap-2 border-b border-line px-3 py-2">
        <div className="min-w-0">
          <p className="text-xs font-bold text-coral">{current?.kind === "direct" ? "私聊" : current?.kind === "group" ? "群組" : "大堂"}</p>
          <h2 className="truncate text-lg leading-tight text-ink">{current?.title ?? "聊天室"}</h2>
        </div>
        {room.token ? (
          wipeAsk ? (
            <span className="ml-auto flex shrink-0 gap-1">
              <button
                type="button"
                className="h-9 rounded-xl bg-coral px-2 text-xs font-bold text-paper"
                onClick={() => {
                  void room.clearTalk().then((error) => {
                    setFormError(error);
                    setWipeAsk(false);
                  });
                }}
              >
                確定刪除
              </button>
              <button type="button" className="h-9 rounded-xl border-2 border-ink px-2 text-xs font-bold" onClick={() => setWipeAsk(false)}>
                取消
              </button>
            </span>
          ) : (
            <button type="button" onClick={() => setWipeAsk(true)} className="ml-auto h-9 shrink-0 rounded-xl border-2 border-coral px-2 text-xs font-bold text-coral">
              刪除記錄
            </button>
          )
        ) : null}
        <p className={(room.token ? "" : "ml-auto ") + "text-xs font-bold text-grass"}>{onlineCount} 在線</p>
        {dock ? (
          <button type="button" onClick={() => setOpen(false)} className="h-9 rounded-xl border-2 border-ink px-2 text-xs font-bold">
            收起
          </button>
        ) : null}
      </header>
      {!room.token ? (
        <form
          className="flex flex-1 flex-col gap-3 p-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setPendingGate(true);
            const error = await room.unlock(password);
            setGate(error);
            if (!error) setPassword("");
            setPendingGate(false);
          }}
        >
          <p className="text-sm text-muted">{room.me} 再輸入一次密碼，就可以同同學對話。</p>
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 rounded-2xl border-2 border-ink bg-cream px-4"
            aria-label="密碼"
          />
          {gate ? <p className="text-sm font-bold text-coral">{gate}</p> : null}
          <button type="submit" disabled={pendingGate} className="h-12 rounded-2xl bg-grass font-bold text-paper disabled:opacity-60">
            {pendingGate ? "核對中…" : "進入"}
          </button>
        </form>
      ) : (
        <>
          <div className="flex items-center gap-1 border-b border-line px-2 py-2">
            <button type="button" onClick={() => setPanel("talk")} className={"h-8 shrink-0 rounded-full px-3 text-xs font-bold " + (panel === "talk" ? "bg-ink text-paper" : "bg-cream text-ink")}>
              對話
            </button>
            <button type="button" onClick={() => setPanel("direct")} className={"h-8 shrink-0 rounded-full px-3 text-xs font-bold " + (panel === "direct" ? "bg-ink text-paper" : "bg-cream text-ink")}>
              私聊
            </button>
            <button type="button" onClick={() => setPanel("group")} className={"h-8 shrink-0 rounded-full px-3 text-xs font-bold " + (panel === "group" ? "bg-ink text-paper" : "bg-cream text-ink")}>
              群組
            </button>
            <button
              type="button"
              onClick={() => {
                setPanel("talk");
                room.enter("hall");
              }}
              className={"h-8 shrink-0 rounded-full px-3 text-xs font-bold " + (panel === "talk" && room.roomId === "hall" ? "bg-grass text-paper" : "bg-cream text-ink")}
            >
              大堂
            </button>
            <button
              type="button"
              onClick={() => {
                if (!room.token) {
                  setFormError("請先進入聊天室。");
                  return;
                }
                void enableInviteNotes(room.token).then((error) => {
                  setNotesOn(typeof Notification !== "undefined" && Notification.permission === "granted");
                  setFormError(error);
                });
              }}
              className={"h-8 shrink-0 rounded-full px-3 text-xs font-bold " + (notesOn ? "bg-grass text-paper" : "bg-cream text-ink")}
            >
              {notesOn ? "通知已開" : "開啟通知"}
            </button>
            <div ref={bellBox} className="relative ml-auto shrink-0">
              <button
                type="button"
                aria-label="新訊息"
                aria-expanded={bellOpen}
                onClick={() => setBellOpen((value) => !value)}
                className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink"
              >
                <Bell className="size-4" />
                {badge > 0 ? <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[10px] leading-none font-bold text-paper">{badge}</span> : null}
              </button>
              {bellOpen ? (
                <div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[4px_4px_0_#1c241c]">
                  <p className="border-b border-line px-3 py-2 text-xs font-bold text-ink">新訊息</p>
                  {unread.length === 0 ? (
                    <p className="px-3 py-4 text-sm text-muted">未有新訊息</p>
                  ) : (
                    <ul className="max-h-72 overflow-y-auto" aria-label="新訊息預覽">
                      {unread.map((row) => (
                        <li key={row.account}>
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-cream"
                            onClick={() => {
                              room.enter(row.roomId);
                              setPanel("talk");
                              setBellOpen(false);
                            }}
                          >
                            <AvatarFace choice={choiceFor(row.account, room.avatars[row.account])} online className="size-9 shrink-0" />
                            <span className="min-w-0 flex-1">
                              <span className="flex items-baseline justify-between gap-2">
                                <span className="truncate text-sm font-bold text-ink">{row.name === row.seat ? row.seat : row.name}</span>
                                <span className="shrink-0 text-[10px] text-muted">{clock(row.at)}</span>
                              </span>
                              <span className="block truncate text-xs text-muted">{pingText(row)}</span>
                              <span className="text-[10px] font-bold text-grass">{pingWhere(room.rooms, row.roomId)}</span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          {panel === "direct" ? (
            <ul className="min-h-0 flex-1 overflow-y-auto px-2 py-2" aria-label="揀同學私聊">
              {room.mates
                .filter((mate) => mate.account !== room.me)
                .map((mate) => (
                  <li key={mate.account}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded-2xl px-2 py-1.5 text-left hover:bg-cream"
                      onClick={() => {
                        void room.openDirect(mate.account).then((error) => {
                          setFormError(error);
                          if (!error) setPanel("talk");
                        });
                      }}
                    >
                      <AvatarFace choice={choiceFor(mate.account, room.avatars[mate.account])} online={mate.online} className="size-9" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-ink">{mate.name === mate.seat ? mate.seat : mate.name}</span>
                        {mate.name !== mate.seat ? <span className="block text-xs text-muted">{mate.seat}</span> : null}
                      </span>
                    </button>
                  </li>
                ))}
              {formError ? <p className="px-2 py-2 text-sm font-bold text-coral">{formError}</p> : null}
            </ul>
          ) : panel === "group" ? (
            <form
              className="flex min-h-0 flex-1 flex-col"
              onSubmit={(event) => {
                event.preventDefault();
                const done = (error: string) => {
                  setFormError(error);
                  if (!error) {
                    setPanel("talk");
                    setGroupTitle("");
                    setPicked([]);
                    setAddingTo(null);
                  }
                };
                if (addingTo) void room.addMembers(addingTo, picked).then(done);
                else void room.openGroup(groupTitle, picked).then(done);
              }}
            >
              <div className="px-3 pt-3">
                {addingTo ? (
                  <p className="text-sm font-bold text-ink">加入「{room.rooms.find((item) => item.id === addingTo)?.title ?? "群組"}」</p>
                ) : (
                  <input
                    value={groupTitle}
                    maxLength={12}
                    placeholder="群組名稱"
                    onChange={(event) => setGroupTitle(event.target.value)}
                    className="h-11 w-full rounded-2xl border-2 border-ink bg-cream px-3"
                  />
                )}
              </div>
              {room.rooms.some((item) => item.kind === "group") ? (
                <ul className="max-h-28 space-y-1 overflow-y-auto px-3 pt-2" aria-label="已開的群組">
                  {room.rooms
                    .filter((item) => item.kind === "group")
                    .map((item) => (
                      <li key={item.id} className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            room.enter(item.id);
                            setPanel("talk");
                          }}
                          className={"h-8 min-w-0 flex-1 truncate rounded-full px-3 text-left text-xs font-bold " + (addingTo === item.id ? "bg-ink text-paper" : "bg-cream text-ink")}
                        >
                          {item.title}
                        </button>
                        <button
                          type="button"
                          className="h-8 shrink-0 rounded-full bg-cream px-2 text-xs font-bold text-ink"
                          onClick={() => {
                            setAddingTo(item.id);
                            setPicked([]);
                            setDropAsk(null);
                            setFormError("");
                          }}
                        >
                          加人
                        </button>
                        {dropAsk === item.id ? (
                          <>
                            <button
                              type="button"
                              className="h-8 shrink-0 rounded-full bg-coral px-2 text-xs font-bold text-paper"
                              onClick={() => {
                                void room.deleteGroup(item.id).then((error) => {
                                  setFormError(error);
                                  if (!error) {
                                    setDropAsk(null);
                                    if (addingTo === item.id) setAddingTo(null);
                                  }
                                });
                              }}
                            >
                              確定
                            </button>
                            <button type="button" className="h-8 shrink-0 rounded-full bg-cream px-2 text-xs font-bold" onClick={() => setDropAsk(null)}>
                              取消
                            </button>
                          </>
                        ) : (
                          <button type="button" className="h-8 shrink-0 rounded-full bg-cream px-2 text-xs font-bold text-coral" onClick={() => setDropAsk(item.id)}>
                            刪除
                          </button>
                        )}
                      </li>
                    ))}
                </ul>
              ) : null}
              <ul className="mt-2 grid min-h-0 flex-1 grid-cols-4 gap-1 overflow-y-auto px-2" aria-label="揀群組成員">
                {room.mates
                  .filter((mate) => mate.account !== room.me)
                  .filter((mate) => {
                    if (!addingTo) return true;
                    const group = room.rooms.find((item) => item.id === addingTo);
                    return !group?.members.includes(mate.account);
                  })
                  .map((mate) => {
                    const on = picked.includes(mate.account);
                    return (
                      <li key={mate.account}>
                        <button
                          type="button"
                          onClick={() => setPicked((prev) => (on ? prev.filter((item) => item !== mate.account) : [...prev, mate.account]))}
                          className={"flex w-full flex-col items-center rounded-2xl px-1 py-1 " + (on ? "bg-meadow" : "")}
                        >
                          <AvatarFace choice={choiceFor(mate.account, room.avatars[mate.account])} online={mate.online} className="size-9" />
                          <span className="mt-0.5 max-w-full truncate text-xs font-bold text-ink">{mate.name === mate.seat ? mate.seat : mate.name}</span>
                          {mate.name !== mate.seat ? <span className="max-w-full truncate text-xs text-muted">{mate.seat}</span> : null}
                        </button>
                      </li>
                    );
                  })}
              </ul>
              {formError ? <p className="px-3 text-sm font-bold text-coral">{formError}</p> : null}
              <div className="m-3 flex gap-2">
                {addingTo ? (
                  <button type="button" className="h-11 rounded-2xl border-2 border-ink px-3 text-sm font-bold" onClick={() => { setAddingTo(null); setPicked([]); }}>
                    開新群組
                  </button>
                ) : null}
                <button type="submit" className="h-11 flex-1 rounded-2xl bg-grass font-bold text-paper">
                  {addingTo ? `加入（${picked.length}）` : `開群組（${picked.length}）`}
                </button>
              </div>
            </form>
          ) : (
            <>
          <ul className="grid max-h-44 grid-cols-4 gap-1 overflow-y-auto border-b border-line px-2 py-2" aria-label="同學">
            {shown.map((mate) => (
              <li key={mate.account} className="flex flex-col items-center">
                {mate.account === room.me || room.roomId !== "hall" ? (
                  <AvatarFace choice={choiceFor(mate.account, room.avatars[mate.account])} online={mate.online} className="size-9" />
                ) : (
                  <button
                    type="button"
                    title={`同${who(mate.name, mate.seat)}私聊`}
                    onClick={() => {
                      void room.openDirect(mate.account).then((error) => {
                        setFormError(error);
                        if (!error) setPanel("talk");
                      });
                    }}
                  >
                    <AvatarFace choice={choiceFor(mate.account, room.avatars[mate.account])} online={mate.online} className="size-9" />
                  </button>
                )}
                <span className={"mt-0.5 max-w-full truncate text-xs font-bold " + (mate.online ? "text-ink" : "text-muted")}>
                  {mate.account === room.me ? "你" : mate.name === mate.seat ? mate.seat : mate.name}
                </span>
                {mate.account === room.me || mate.name !== mate.seat ? (
                  <span className="max-w-full truncate text-xs text-muted">{mate.seat}</span>
                ) : null}
              </li>
            ))}
          </ul>
          <div
            ref={scroller}
            className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3"
            onScroll={(event) => {
              const node = event.currentTarget;
              stick.current = node.scrollHeight - node.scrollTop - node.clientHeight < 80;
            }}
          >
            {room.messages.length === 0 && room.notices.length === 0 ? (
              <p className="m-auto text-center text-sm text-muted">未有人出聲。你做第一個。</p>
            ) : null}
            {room.messages.map((row) => {
              const self = row.account === room.me;
              return (
                <article key={row.id} className={"flex max-w-[92%] items-end gap-2 " + (self ? "ml-auto flex-row-reverse" : "mr-auto")}>
                  <AvatarFace choice={choiceFor(row.account, room.avatars[row.account])} online className="size-8" />
                  <div>
                    <p className={"mb-1 text-xs text-muted " + (self ? "text-right" : "")}>
                      {self ? `你 · ${row.seat}` : who(row.name, row.seat)} · {clock(row.at)}
                    </p>
                    {row.file ? <FileBubble file={row.file} token={room.token} mine={self} /> : null}
                    {row.body ? <ChatBody body={row.body} mine={self} /> : null}
                  </div>
                </article>
              );
            })}
            {room.notices.map((row) => (
              <p key={row.key} className="text-center text-xs font-bold text-muted">
                {row.text}
              </p>
            ))}
          </div>
          <form
            className="border-t border-line p-3"
            onSubmit={(event) => {
              event.preventDefault();
              const body = draft.trim();
              if (!body) return;
              void room.send(body).then((ok) => {
                if (!ok) return;
                setDraft("");
                stick.current = true;
                box.current?.focus();
              });
            }}
          >
            {room.sendError || room.linkError || formError ? <p className="mb-2 text-sm font-bold text-coral">{room.sendError || room.linkError || formError}</p> : null}
            {uploading ? <p className="mb-2 text-sm font-bold text-grass">上傳中 {progress}%</p> : null}
            <div className="flex gap-2">
              <button type="button" disabled={uploading} onClick={() => attachment.current?.click()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-ink disabled:opacity-50" aria-label="上傳圖片或檔案">
                <Paperclip className="size-4" />
              </button>
              <input
                ref={attachment}
                type="file"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (!file || !room.token) return;
                  if (file.size <= 0) {
                    setFormError("檔案是空的。");
                    return;
                  }
                  if (file.size > CHAT_FILE_MAX) {
                    setFormError("檔案不可超過 1GB。");
                    return;
                  }
                  const roomId = room.roomId;
                  const total = Math.max(1, Math.ceil(file.size / CHAT_FILE_CHUNK));
                  setUploading(true);
                  setProgress(0);
                  setFormError("");
                  void (async () => {
                    let uploadId = "";
                    try {
                      for (let index = 0; index < total; index += 1) {
                        const response = await fetch("/api/chat-file", {
                          method: "POST",
                          headers: {
                            "x-chat-token": room.token ?? "",
                            "x-room-id": roomId,
                            "x-file-name": encodeURIComponent(file.name),
                            "x-file-mime": file.type || "application/octet-stream",
                            "x-file-size": String(file.size),
                            "x-upload-id": uploadId,
                            "x-chunk-index": String(index),
                            "x-chunk-total": String(total),
                          },
                          body: file.slice(index * CHAT_FILE_CHUNK, (index + 1) * CHAT_FILE_CHUNK),
                        });
                        const data = (await response.json()) as { ok: boolean; error?: string; uploadId?: string; message?: ChatMessage };
                        if (!data.ok || !data.uploadId) {
                          setFormError(data.error || "上傳失敗，請再試一次。");
                          return;
                        }
                        uploadId = data.uploadId;
                        setProgress(Math.round(((index + 1) / total) * 100));
                        if (data.message) {
                          room.take(roomId, data.message);
                          stick.current = true;
                        }
                      }
                    } catch {
                      setFormError("上傳中斷，請再試一次。");
                    } finally {
                      setUploading(false);
                    }
                  })();
                }}
              />
              <input
                ref={box}
                value={draft}
                maxLength={80}
                placeholder="同同學講句話"
                onChange={(event) => setDraft(event.target.value)}
                className="h-11 min-w-0 flex-1 rounded-2xl border-2 border-ink bg-cream px-3"
              />
              <button type="submit" disabled={room.sending || !draft.trim()} className="flex h-11 shrink-0 items-center gap-1 rounded-2xl bg-grass px-3 text-sm font-bold text-paper disabled:opacity-50" aria-label="送出">
                <Send className="size-4" />
              </button>
            </div>
          </form>
            </>
          )}
        </>
      )}
    </aside>
  );
}

function ChatBody({ body, mine }: { body: string; mine: boolean }) {
  const invite = body.match(/^\[\[tug:([A-Za-z0-9]{4,8})\]\]\s*(.*)$/);
  if (invite) {
    return (
      <div className={"rounded-2xl px-3 py-2 text-sm leading-snug " + (mine ? "bg-grass text-paper" : "bg-cream text-ink")}>
        <p>{invite[2] || "你被邀請加入拔河"}</p>
        <Link to="/race" search={{ room: invite[1] ?? "" }} className="mt-2 inline-flex h-9 items-center rounded-xl bg-coral px-3 text-sm font-bold text-paper">
          進入房間
        </Link>
      </div>
    );
  }
  return <p className={"rounded-2xl px-3 py-2 text-sm leading-snug " + (mine ? "bg-grass text-paper" : "bg-cream text-ink")}>{body}</p>;
}

function FileBubble({ file, token, mine }: { file: NonNullable<ChatMessage["file"]>; token: string | null; mine: boolean }) {
  const href = `/api/chat-file/${file.id}?token=${encodeURIComponent(token ?? "")}`;
  const preview = file.mime.startsWith("image/") && !file.mime.includes("svg") && file.size <= 40 * 1024 * 1024;
  if (preview) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        <img src={href} alt={file.name} referrerPolicy="no-referrer" className="max-h-48 max-w-full rounded-2xl border border-line object-cover" />
      </a>
    );
  }
  return (
    <a
      href={href}
      download={file.name}
      referrerPolicy="no-referrer"
      className={"block rounded-2xl px-3 py-2 text-sm font-bold underline " + (mine ? "bg-grass text-paper" : "bg-cream text-ink")}
    >
      {file.name}
      <span className="mt-1 block text-xs font-normal no-underline">{formatBytes(file.size)}</span>
    </a>
  );
}

export function shrinkAvatar(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 72;
      canvas.height = 72;
      const pen = canvas.getContext("2d");
      if (!pen) {
        URL.revokeObjectURL(url);
        resolve(null);
        return;
      }
      const scale = Math.max(72 / image.width, 72 / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      pen.drawImage(image, (72 - width) / 2, (72 - height) / 2, width, height);
      URL.revokeObjectURL(url);
      const src = canvas.toDataURL("image/jpeg", 0.72);
      resolve(src.length > 60000 ? null : src);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    image.src = url;
  });
}
