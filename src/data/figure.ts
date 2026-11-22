export type Figure =
  | { kind: "cuboid"; l: number; w: number; h: number; water?: number; unit?: string }
  | { kind: "beaker"; before: number; after: number; unit?: string }
  | { kind: "blocks"; x: number; y: number; z: number }
  | { kind: "lshape"; depth: number; baseL: number; baseH: number; topL: number; extraH: number }
  | { kind: "rise"; l: number; w: number; from: number; to: number }
  | { kind: "up"; l: number; w: number; rise: number }
  | { kind: "balance"; left: string; right: string }
  | { kind: "rect"; length: string; width: string; note: string }
  | { kind: "tri"; base: string; height: string; note: string }
  | { kind: "trap"; top: string; bottom: string; height: string; note: string }
  | { kind: "grid"; shaded: number; caption?: string }
  | { kind: "pbar"; parts: number; shaded: number }
  | { kind: "pline"; at: string }
  | { kind: "pchart"; known: string; value: string }
  | { kind: "pie"; slices: { label: string; pct: number }[] }
  | { kind: "vbars"; max: number; unit: string; items: { label: string; value: number }[] }
  | { kind: "grow"; from: number; pct: number }
  | { kind: "circle"; mark: "d" | "r"; value: string; caption?: string }
  | { kind: "semi"; value: string; as?: "d" | "r" }
  | { kind: "quarter"; value: string }
  | { kind: "capsule"; length: string; width: string }
  | { kind: "door"; side: string }
  | { kind: "wave"; value: string }
  | { kind: "angle"; deg: number; name?: string; turn?: "cw" | "ccw" }
  | { kind: "angles"; items: { name: string; deg: number }[] }
  | { kind: "protractor"; deg: number }
  | { kind: "folds" }
  | { kind: "named" }
  | { kind: "threeq"; value: string }
  | { kind: "inset"; side: string }
  | { kind: "sectors"; parts: number; shaded: number; note?: string }
  | { kind: "fans" }
  | { kind: "arcpair" }
  | { kind: "span"; from: string; to: string }
  | { kind: "clocks"; times: { label: string; h: number; m: number }[] }
  | { kind: "hbars"; unit: string; items: { label: string; value: number }[] }
  | { kind: "trip"; xLabel: string; yLabel: string; xMax: number; yMax: number; points: number[][] }
  | { kind: "line"; xLabel: string; yLabel: string; cats: string[]; series: { name: string; values: (number | null)[] }[] }
  | { kind: "bars"; unit: string; items: { label: string; value: number | null }[]; mean?: number }
  | { kind: "sym"; shape: "fold" | "square" | "rect" | "iso" | "equi" | "rhombus" | "circle" | "butterfly" | "trio"; axes?: "one" | "two" | "three" | "four" | "many" | "partial" | "mixed" | "ab" }
  | { kind: "gridpt"; axis: "v" | "h"; axisAt: number; dots: { c: number; r: number; name?: string }[]; note?: string }
  | { kind: "freq"; rows: { label: string; n: number }[] }
  | { kind: "pics" };
