import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AvatarFace, builtinChoices, choiceFor } from "@/components/park/AvatarFace";
import { Shell } from "@/components/park/Shell";
import { useClassChat } from "@/components/park/ParkChat";
import { changePassword } from "@/lib/class-login";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "個人資料 · 數學遊樂場" }] }),
});

function ProfilePage() {
  return (
    <Shell>
      <ProfileForm />
    </Shell>
  );
}

function ProfileForm() {
  const room = useClassChat();
  const mine = room.mates.find((mate) => mate.account === room.me);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [passwordPending, setPasswordPending] = useState(false);
  const choice = choiceFor(room.me, room.avatars[room.me]);

  useEffect(() => {
    if (mine && mine.name !== mine.seat) setName((current) => current || mine.name);
  }, [mine]);

  if (!room.token) {
    return (
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <p className="text-sm text-muted">先在聊天室輸入密碼，就可以改名字、頭像和密碼。</p>
        <Link to="/chat" className="mt-4 inline-flex h-12 items-center rounded-2xl bg-grass px-4 font-bold text-paper">
          去聊天室
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-lg px-4 py-8">
      <p className="text-sm font-bold text-coral">6D</p>
      <h1 className="text-4xl text-ink">個人資料</h1>
      <p className="mt-2 text-sm text-muted">改完的名字和頭像，同學在聊天室都會見到。</p>
      <div className="mt-5 flex items-center gap-4">
        <AvatarFace choice={choice} online className="size-16" />
        <div>
          <p className="text-lg font-bold text-ink">{mine && mine.name !== mine.seat ? mine.name : "未改名"}</p>
          <p className="text-sm text-muted">班別學號 {mine?.seat ?? room.me}，改名後仍會顯示</p>
        </div>
      </div>
      <form
        className="mt-6"
        onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          const next = await room.saveName(name);
          setError(next);
          setNote(next ? "" : "已記住你的名字。班別學號不會變。");
          setPending(false);
        }}
      >
        <label className="text-sm font-bold" htmlFor="display-name">
          名字
        </label>
        <input
          id="display-name"
          value={name}
          maxLength={12}
          placeholder="例如小明"
          onChange={(event) => setName(event.target.value)}
          className="mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-4"
        />
        <button type="submit" disabled={pending} className="mt-3 h-11 rounded-2xl bg-ink px-4 font-bold text-paper disabled:opacity-60">
          {pending ? "儲存中…" : "儲存名字"}
        </button>
      </form>
      <form
        className="mt-8"
        onSubmit={async (event) => {
          event.preventDefault();
          if (!currentPassword) {
            setError("請先輸入現在的密碼。");
            setNote("");
            return;
          }
          if (nextPassword.length < 4) {
            setError("新密碼最少 4 個字。");
            setNote("");
            return;
          }
          if (nextPassword.length > 20) {
            setError("新密碼最多 20 個字。");
            setNote("");
            return;
          }
          if (nextPassword !== confirmPassword) {
            setError("兩次新密碼不相同。");
            setNote("");
            return;
          }
          if (!room.token) return;
          setPasswordPending(true);
          try {
            const result = await changePassword({ data: { token: room.token, current: currentPassword, next: nextPassword } });
            if (!result.ok) {
              setError(result.error);
              setNote("");
              return;
            }
            setCurrentPassword("");
            setNextPassword("");
            setConfirmPassword("");
            setError("");
            setNote("已更改密碼。下次登入請用新密碼。");
          } catch {
            setError("暫時改不到密碼，再試一次。");
            setNote("");
          } finally {
            setPasswordPending(false);
          }
        }}
      >
        <h2 className="text-xl text-ink">更改密碼</h2>
        <p className="mt-1 text-sm text-muted">要先輸入現在的密碼，才可以換成新密碼。</p>
        <label className="mt-3 block text-sm font-bold" htmlFor="current-password">
          現在的密碼
        </label>
        <input
          id="current-password"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          className="mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-4"
        />
        <label className="mt-3 block text-sm font-bold" htmlFor="next-password">
          新密碼
        </label>
        <input
          id="next-password"
          type="password"
          autoComplete="new-password"
          value={nextPassword}
          onChange={(event) => setNextPassword(event.target.value)}
          className="mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-4"
        />
        <label className="mt-3 block text-sm font-bold" htmlFor="confirm-password">
          再輸入新密碼
        </label>
        <input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-4"
        />
        <button type="submit" disabled={passwordPending} className="mt-3 h-11 rounded-2xl bg-grass px-4 font-bold text-paper disabled:opacity-60">
          {passwordPending ? "更改中…" : "更改密碼"}
        </button>
      </form>
      <h2 className="mt-8 text-xl text-ink">頭像</h2>
      <div className="mt-3 grid grid-cols-6 gap-2">
        {builtinChoices().map((id) => (
          <button
            key={id}
            type="button"
            aria-label={id}
            onClick={() => {
              void room.pickAvatar({ kind: "builtin", id }).then((next) => {
                setError(next);
                setNote(next ? "" : "已換成內置頭像。");
              });
            }}
          >
            <AvatarFace choice={{ kind: "builtin", id }} online className="size-12" />
          </button>
        ))}
      </div>
      <label className="mt-4 inline-flex h-11 cursor-pointer items-center rounded-2xl border-2 border-ink px-4 text-sm font-bold">
        上傳圖片
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="sr-only"
          onChange={(event) => {
            const image = event.target.files?.[0];
            event.target.value = "";
            if (!image) return;
            setError("");
            setNote("");
            setCropFile(image);
          }}
        />
      </label>
      {cropFile ? (
        <AvatarCrop
          file={cropFile}
          onCancel={() => setCropFile(null)}
          onSave={async (src) => {
            if (!src) {
              setError("圖片讀唔到，請換一張。");
              setNote("");
              return;
            }
            const next = await room.pickAvatar({ kind: "upload", src });
            setError(next);
            setNote(next ? "" : "已換上你的圖片。");
            if (!next) setCropFile(null);
          }}
        />
      ) : null}
      {error ? <p className="mt-3 text-sm font-bold text-coral">{error}</p> : null}
      {note ? <p className="mt-3 text-sm font-bold text-grass">{note}</p> : null}
    </main>
  );
}

const CROP = 240;

function AvatarCrop({ file, onCancel, onSave }: { file: File; onCancel: () => void; onSave: (src: string | null) => void }) {
  const [url, setUrl] = useState("");
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [busy, setBusy] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ distance: number; zoom: number } | null>(null);

  useEffect(() => {
    const next = URL.createObjectURL(file);
    setUrl(next);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    return () => URL.revokeObjectURL(next);
  }, [file]);

  const base = natural.w > 0 ? Math.max(CROP / natural.w, CROP / natural.h) : 1;
  const scale = base * zoom;
  const drawW = natural.w * scale;
  const drawH = natural.h * scale;
  const maxX = Math.max(0, (drawW - CROP) / 2);
  const maxY = Math.max(0, (drawH - CROP) / 2);
  const x = Math.min(maxX, Math.max(-maxX, offset.x));
  const y = Math.min(maxY, Math.max(-maxY, offset.y));

  const save = () => {
    const image = imageRef.current;
    if (!image || !natural.w) {
      onSave(null);
      return;
    }
    setBusy(true);
    const canvas = document.createElement("canvas");
    canvas.width = 72;
    canvas.height = 72;
    const pen = canvas.getContext("2d");
    if (!pen) {
      setBusy(false);
      onSave(null);
      return;
    }
    const left = CROP / 2 + x - drawW / 2;
    const top = CROP / 2 + y - drawH / 2;
    pen.drawImage(image, (0 - left) / scale, (0 - top) / scale, CROP / scale, CROP / scale, 0, 0, 72, 72);
    let quality = 0.72;
    let src = canvas.toDataURL("image/jpeg", quality);
    while (src.length > 60000 && quality > 0.4) {
      quality -= 0.08;
      src = canvas.toDataURL("image/jpeg", quality);
    }
    setBusy(false);
    onSave(src.length > 60000 ? null : src);
  };

  return (
    <div className="mt-4 rounded-3xl border-2 border-ink bg-cream p-4">
      <p className="font-bold text-ink">拖動照片調整位置，拉動滑桿調整大小。</p>
      <div
        className="relative mx-auto mt-3 size-60 touch-none overflow-hidden rounded-full border-4 border-ink bg-paper"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
          if (pointers.current.size === 2) {
            const [a, b] = [...pointers.current.values()];
            pinch.current = { distance: Math.hypot(a!.x - b!.x, a!.y - b!.y) || 1, zoom };
            drag.current = null;
            return;
          }
          drag.current = { x: event.clientX, y: event.clientY, ox: x, oy: y };
        }}
        onPointerMove={(event) => {
          const point = pointers.current.get(event.pointerId);
          if (point) {
            point.x = event.clientX;
            point.y = event.clientY;
          }
          if (pointers.current.size >= 2 && pinch.current) {
            const [a, b] = [...pointers.current.values()];
            const distance = Math.hypot(a!.x - b!.x, a!.y - b!.y) || 1;
            setZoom(Math.min(4, Math.max(1, pinch.current.zoom * (distance / pinch.current.distance))));
            return;
          }
          if (!drag.current) return;
          setOffset({ x: drag.current.ox + event.clientX - drag.current.x, y: drag.current.oy + event.clientY - drag.current.y });
        }}
        onPointerUp={(event) => {
          pointers.current.delete(event.pointerId);
          if (pointers.current.size < 2) pinch.current = null;
          drag.current = null;
        }}
        onPointerCancel={(event) => {
          pointers.current.delete(event.pointerId);
          pinch.current = null;
          drag.current = null;
        }}
      >
        {url ? (
          <img
            ref={imageRef}
            src={url}
            alt=""
            draggable={false}
            onLoad={(event) => setNatural({ w: event.currentTarget.naturalWidth, h: event.currentTarget.naturalHeight })}
            className="absolute max-w-none select-none"
            style={{ width: drawW || undefined, height: drawH || undefined, left: CROP / 2 + x - drawW / 2, top: CROP / 2 + y - drawH / 2 }}
          />
        ) : null}
      </div>
      <label className="mt-4 block text-sm font-bold text-ink">
        大小
        <input type="range" min={1} max={4} step={0.01} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="mt-1 w-full" />
      </label>
      <div className="mt-3 flex gap-2">
        <button type="button" disabled={busy} className="h-11 rounded-2xl bg-grass px-4 font-bold text-paper disabled:opacity-60" onClick={save}>
          {busy ? "處理中…" : "用這張"}
        </button>
        <button type="button" className="h-11 rounded-2xl border-2 border-ink px-4 font-bold" onClick={onCancel}>
          取消
        </button>
      </div>
    </div>
  );
}
