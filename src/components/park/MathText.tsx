type Piece =
  | { kind: "text"; raw: string }
  | { kind: "frac"; raw: string; whole: string; num: string; den: string };

const FRAC =
  /(\d+)\s*又\s*(\d+)\s*\/\s*(\d+)|(?<![0-9])(\d+)\s+(\d+)\s*\/\s*(\d+)|(?<![0-9.×xX])([×xX]?\d+)\s*\/\s*([×xX]?\d+)(?![0-9])/g;

export function parseMath(text: string): Piece[] {
  const pieces: Piece[] = [];
  let last = 0;
  for (const match of text.matchAll(FRAC)) {
    const index = match.index ?? 0;
    if (index > last) pieces.push({ kind: "text", raw: text.slice(last, index) });
    if (match[1]) pieces.push({ kind: "frac", raw: match[0], whole: match[1], num: match[2]!, den: match[3]! });
    else if (match[4]) pieces.push({ kind: "frac", raw: match[0], whole: match[4], num: match[5]!, den: match[6]! });
    else pieces.push({ kind: "frac", raw: match[0], whole: "", num: match[7]!, den: match[8]! });
    last = index + match[0].length;
  }
  if (last < text.length) pieces.push({ kind: "text", raw: text.slice(last) });
  return pieces;
}

export function visiblePieces(text: string, count: number): Piece[] {
  const out: Piece[] = [];
  let used = 0;
  for (const piece of parseMath(text)) {
    if (used >= count) break;
    if (piece.kind === "frac") {
      if (used + piece.raw.length > count) break;
      out.push(piece);
      used += piece.raw.length;
      continue;
    }
    const take = Math.min(piece.raw.length, count - used);
    out.push({ kind: "text", raw: piece.raw.slice(0, take) });
    used += take;
  }
  return out;
}

function Fraction({ whole, num, den }: { whole: string; num: string; den: string }) {
  return (
    <span className="mx-[0.12em] inline-flex items-center align-middle">
      {whole ? <span className="mr-[0.15em]">{whole}</span> : null}
      <span className="inline-flex flex-col items-center leading-none" style={{ fontSize: "0.68em" }}>
        <span>{num}</span>
        <span className="my-[0.08em] h-[0.09em] w-full min-w-[1.15em] rounded-full bg-current" />
        <span>{den}</span>
      </span>
    </span>
  );
}

export function MathText({ text }: { text: string }) {
  return (
    <>
      {parseMath(text).map((piece, index) =>
        piece.kind === "text" ? <span key={index}>{piece.raw}</span> : <Fraction key={index} whole={piece.whole} num={piece.num} den={piece.den} />,
      )}
    </>
  );
}

export function MathPieces({ pieces }: { pieces: Piece[] }) {
  return (
    <>
      {pieces.map((piece, index) =>
        piece.kind === "text" ? <span key={index}>{piece.raw}</span> : <Fraction key={index} whole={piece.whole} num={piece.num} den={piece.den} />,
      )}
    </>
  );
}
