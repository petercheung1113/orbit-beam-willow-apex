import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { signInStudent } from "@/lib/class-login";
import { usePark } from "@/lib/park";
import { holdNav, finishNav } from "@/lib/nav-loading";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "登入 · 數學遊樂場" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const hydrate = usePark((s) => s.hydrate);
  const ready = usePark((s) => s.ready);
  const student = usePark((s) => s.student);
  const remember = usePark((s) => s.signInStudent);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (ready && student) void navigate({ to: "/" });
  }, [navigate, ready, student]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f3eee4] px-4 py-10">
      <form
        className="w-full max-w-[22rem] rounded-[1.75rem] border-[3px] border-ink bg-paper px-6 pt-8 pb-6 shadow-[8px_8px_0_#1c241c]"
        onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          setError("");
          holdNav();
          try {
            const result = await signInStudent({ data: { account, password } });
            if (!result.ok) {
              setError("帳號或密碼不正確");
              finishNav();
              return;
            }
            remember(result.account, result.token, result.name);
            await navigate({ to: "/" });
            finishNav();
          } catch {
            setError("登入暫時失敗，請再試一次");
            finishNav();
          } finally {
            setPending(false);
          }
        }}
      >
        <img src="/park/login-fox.jpg" alt="" className="mx-auto size-24 rounded-full border-2 border-ink object-cover" />
        <h1 className="mt-4 text-center font-sans text-4xl font-bold tracking-wide text-ink">登入</h1>
        <label className="mt-6 block text-sm font-bold" htmlFor="account">
          帳號
        </label>
        <input
          id="account"
          value={account}
          autoComplete="username"
          onChange={(event) => setAccount(event.target.value)}
          className="mt-1 h-12 w-full rounded-full border-2 border-ink bg-[#f6f1e6] px-4"
        />
        <label className="mt-4 block text-sm font-bold" htmlFor="password">
          密碼
        </label>
        <input
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 h-12 w-full rounded-full border-2 border-ink bg-[#f6f1e6] px-4"
        />
        {error ? <p className="mt-3 text-center text-sm font-bold text-coral">{error}</p> : null}
        <button
          type="submit"
          data-nav
          disabled={pending}
          className="mt-5 h-14 w-full rounded-full bg-ink text-lg font-bold text-paper disabled:opacity-60"
        >
          {pending ? "進入中…" : "進入"}
        </button>
      </form>
    </main>
  );
}
