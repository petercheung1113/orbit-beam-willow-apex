import { BUILTIN_IDS, defaultBuiltin, isBuiltinId, type BuiltinId } from "@/data/avatars";

export type AvatarChoice = { kind: "builtin"; id: BuiltinId } | { kind: "upload"; src: string };

const TONE: Record<BuiltinId, string> = {
  fox: "bg-coral",
  bear: "bg-sun",
  duck: "bg-paper",
  frog: "bg-grass",
  lion: "bg-sun",
  fish: "bg-meadow",
  bird: "bg-coral",
  cube: "bg-ink",
  star: "bg-sun",
  kite: "bg-meadow",
  boat: "bg-paper",
  sun: "bg-sun",
};

export function choiceFor(account: string, saved?: AvatarChoice): AvatarChoice {
  return saved ?? { kind: "builtin", id: defaultBuiltin(account) };
}

export function AvatarFace({
  choice,
  online,
  className = "size-10",
}: {
  choice: AvatarChoice;
  online: boolean;
  className?: string;
}) {
  return (
    <span className={`relative inline-flex shrink-0 ${className}`}>
      <span className={"block size-full overflow-hidden rounded-full border-2 border-ink " + (online ? "" : "grayscale")}>
        {choice.kind === "upload" ? (
          <img src={choice.src} alt="" className="size-full object-cover" />
        ) : (
          <BuiltinFace id={choice.id} light={choice.id === "cube"} />
        )}
      </span>
      {online ? <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-paper bg-grass" aria-hidden /> : null}
    </span>
  );
}

export function BuiltinFace({ id, light = false }: { id: BuiltinId; light?: boolean }) {
  const eye = light ? "bg-paper" : "bg-ink";
  return (
    <span className={`relative block size-full ${TONE[id]}`}>
      {id === "fox" || id === "bear" || id === "lion" ? (
        <>
          <span className={`absolute top-0 left-[12%] size-[28%] rounded-full border-2 border-ink ${TONE[id]}`} />
          <span className={`absolute top-0 right-[12%] size-[28%] rounded-full border-2 border-ink ${TONE[id]}`} />
        </>
      ) : null}
      {id === "duck" || id === "bird" ? <span className="absolute top-1/2 left-1/2 h-[18%] w-[34%] -translate-x-1/2 rounded-full bg-sun" /> : null}
      {id === "frog" ? (
        <>
          <span className="absolute top-[18%] left-[18%] size-[22%] rounded-full border-2 border-ink bg-paper" />
          <span className="absolute top-[18%] right-[18%] size-[22%] rounded-full border-2 border-ink bg-paper" />
        </>
      ) : null}
      <span className={`absolute top-[42%] left-[28%] size-[12%] rounded-full ${eye}`} />
      <span className={`absolute top-[42%] right-[28%] size-[12%] rounded-full ${eye}`} />
      {id === "fish" ? <span className="absolute right-0 bottom-[18%] h-[28%] w-[22%] rounded-full bg-coral" /> : null}
      {id === "star" || id === "sun" ? <span className="absolute bottom-[16%] left-1/2 h-[10%] w-[28%] -translate-x-1/2 rounded-full bg-coral" /> : null}
    </span>
  );
}

export function builtinChoices(): BuiltinId[] {
  return [...BUILTIN_IDS];
}

export function parseChoice(kind: string, value: string): AvatarChoice | null {
  if (kind === "builtin" && isBuiltinId(value)) return { kind: "builtin", id: value };
  if (kind === "upload" && value.startsWith("data:image/jpeg;base64,")) return { kind: "upload", src: value };
  return null;
}
