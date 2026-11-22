export const BUILTIN_IDS = ["fox", "bear", "duck", "frog", "lion", "fish", "bird", "cube", "star", "kite", "boat", "sun"] as const;

export type BuiltinId = (typeof BUILTIN_IDS)[number];

export function isBuiltinId(value: string): value is BuiltinId {
  return (BUILTIN_IDS as readonly string[]).includes(value);
}

export function defaultBuiltin(account: string): BuiltinId {
  const n = Number(account.replace(/\D/g, "")) || 0;
  return BUILTIN_IDS[n % BUILTIN_IDS.length] ?? "fox";
}
