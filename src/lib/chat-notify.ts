import { chatPushKey, chatPushSave } from "@/lib/chat.functions";
import { previewPathPrefix } from "@/lib/preview-path-prefix";

function decodeKey(key: string) {
  const padded = key + "=".repeat((4 - (key.length % 4)) % 4);
  const raw = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) out[i] = raw.charCodeAt(i);
  return out;
}

export function notesSupported() {
  return typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator;
}

export async function enableInviteNotes(token: string): Promise<string> {
  if (!notesSupported()) return "這部裝置未支援通知。";
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return "未允許通知，所以收不到邀請。";
  return subscribeInviteNotes(token);
}

export async function subscribeInviteNotes(token: string): Promise<string> {
  if (!notesSupported() || Notification.permission !== "granted") return "";
  try {
    const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
    const registration = await navigator.serviceWorker.register(`${prefix}/notify-sw.js`);
    const { key } = await chatPushKey();
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: decodeKey(key),
    });
    const json = subscription.toJSON();
    if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth) return "通知暫時開唔到。";
    const saved = await chatPushSave({
      data: { token, endpoint: json.endpoint, p256dh: json.keys.p256dh, auth: json.keys.auth },
    });
    if (!saved.ok) return saved.error === "expired" ? "請再進入一次。" : saved.error;
    return "";
  } catch {
    return "已允許通知。如果網頁完全關掉就收不到，請把數學遊樂場加到主畫面。";
  }
}

export async function showInviteNote(title: string, body: string, tag: string) {
  if (!notesSupported() || Notification.permission !== "granted") return;
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.showNotification(title, { body, tag, lang: "zh-Hant" });
      return;
    }
  } catch {
    /* fall through to the page notification */
  }
  try {
    new Notification(title, { body, tag, lang: "zh-Hant" });
  } catch {
    /* the in-app bell still shows the room */
  }
}
