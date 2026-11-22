import type { ReactNode } from "react";

export function Panel({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-line bg-paper p-4">
      {kicker && <p className="text-sm font-medium text-grass">{kicker}</p>}
      <h3 className="mb-3 text-xl text-ink">{title}</h3>
      {children}
    </section>
  );
}

export function CheckNote({ ok, children }: { ok: boolean | null; children: ReactNode }) {
  if (ok === null) return null;
  return (
    <p className={"mt-3 text-sm " + (ok ? "text-grass" : "text-coral")} role="status">
      {children}
    </p>
  );
}

export function tidy(n: number) {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 1e6) / 1e6;
  return String(r);
}

export function gcd(a: number, b: number): number {
  const x = Math.abs(a);
  const y = Math.abs(b);
  return y ? gcd(y, x % y) : x;
}
