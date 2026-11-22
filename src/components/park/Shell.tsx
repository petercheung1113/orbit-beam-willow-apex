import type { ReactNode } from "react";
import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useClassChat } from "@/components/park/ParkChat";
import { usePark } from "@/lib/park";
import { usePet } from "@/lib/pet";
import { isTeacherAccount } from "@/lib/teacher-account";

const NAV = [
  { to: "/plan", label: "備試" },
  { to: "/exam", label: "試卷" },
  { to: "/practice", label: "練習" },
  { to: "/review", label: "重溫" },
  { to: "/tutor", label: "導師" },
  { to: "/race", label: "對戰" },
  { to: "/buzz", label: "搶答" },
  { to: "/pets", label: "寵物" },
  { to: "/profile", label: "個人資料" },
  { to: "/chat", label: "聊天" },
] as const;

export function Brand({ heading = false }: { heading?: boolean }) {
  const room = useClassChat();
  const mine = room.mates.find((mate) => mate.account === room.me);
  const called = mine ? (mine.name === mine.seat ? mine.seat : `${mine.name} · ${mine.seat}`) : usePark.getState().nickname;
  const title = heading ? (
    <h1 className="font-sans text-[1.65rem] font-bold leading-none tracking-tight text-ink">數學遊樂場</h1>
  ) : (
    <span className="block font-sans text-[1.65rem] font-bold leading-none tracking-tight text-ink">數學遊樂場</span>
  );
  return (
    <Link to="/" className="flex min-h-11 shrink-0 items-center gap-3">
      <img src="/park/mascot.jpg" alt="" className="size-14 rounded-full object-cover" />
      <span>
        {title}
        <span className="mt-1 block text-sm font-normal text-muted">{called} · 馬鞍山靈糧小學</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ heading = false }: { heading?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const student = usePark((s) => s.student);
  const signOutStudent = usePark((s) => s.signOutStudent);
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Brand heading={heading} />
        <nav className="ml-auto flex items-center gap-5 overflow-x-auto text-base font-medium text-ink sm:gap-7">
          {NAV.map((item) => {
            const on = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={on ? "page" : undefined}
                className="shrink-0 py-2 text-ink"
              >
                {item.label}
              </Link>
            );
          })}
          {isTeacherAccount(student) ? (
            <Link to="/teacher" aria-current={path === "/teacher" ? "page" : undefined} className="shrink-0 py-2 font-bold text-coral">
              老師後台
            </Link>
          ) : null}
          {student ? (
            <button type="button" onClick={signOutStudent} className="shrink-0 py-2 text-ink">
              登出
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

function PetFlash() {
  const flash = usePet((s) => s.flash);
  const clearFlash = usePet((s) => s.clearFlash);
  useEffect(() => {
    if (!flash) return;
    const timer = window.setTimeout(clearFlash, 2200);
    return () => window.clearTimeout(timer);
  }, [flash, clearFlash]);
  if (!flash) return null;
  return (
    <p className="mx-auto w-full max-w-6xl px-4 py-2 text-sm font-bold text-ink">
      <span className="inline-block rounded-2xl border-2 border-sun bg-paper px-3 py-2">{flash}</span>
    </p>
  );
}

export function Shell({ children, heading = false }: { children: ReactNode; heading?: boolean }) {
  const hydrate = usePark((s) => s.hydrate);
  const ready = usePark((s) => s.ready);
  const student = usePark((s) => s.student);
  const stamps = usePark((s) => s.stamps);
  const bindPet = usePet((s) => s.bind);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!ready) return;
    bindPet(student, stamps);
  }, [ready, student, stamps, bindPet]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#f3eee4]">
        <p className="text-3xl font-bold text-ink">加載中</p>
      </div>
    );
  }
  if (!student) return <Navigate to="/login" />;

  return (
    <div className="park-shell">
      <SiteHeader heading={heading} />
      <PetFlash />
      {children}
    </div>
  );
}
