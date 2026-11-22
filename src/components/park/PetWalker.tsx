import { useEffect, useRef, useState } from "react";
import { speciesOf } from "@/data/pets";
import { usePet } from "@/lib/pet";
import { PetSprite } from "@/components/park/PetSprite";

const TRICKS = [
  { id: "cozy", line: "撒嬌" },
  { id: "pat", line: "摸摸頭" },
  { id: "hop", line: "蹦一下" },
] as const;

type TrickId = (typeof TRICKS)[number]["id"];

export function PetWalker() {
  const species = usePet((s) => s.save.species);
  const stage = usePet((s) => s.save.stage);
  const acting = useRef(false);
  const turn = useRef(0);
  const timer = useRef(0);
  const [trick, setTrick] = useState<TrickId | null>(null);
  const [pose, setPose] = useState(0);
  const [faceRight, setFaceRight] = useState(false);
  const [pos, setPos] = useState({ x: 18, y: 8 });

  useEffect(() => {
    if (!species) return;
    let x = 18;
    let y = 8;
    let tx = 62;
    let ty = 28;
    const id = window.setInterval(() => {
      if (acting.current) return;
      const dx = tx - x;
      const dy = ty - y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1.5) {
        tx = 8 + Math.random() * 80;
        ty = 6 + Math.random() * 78;
        return;
      }
      x += (dx / dist) * 0.18;
      y += (dy / dist) * 0.18;
      setFaceRight(dx > 0.4);
      setPos({ x, y });
    }, 50);
    return () => window.clearInterval(id);
  }, [species, stage]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pet = speciesOf(species);
  if (!species || !pet) return null;

  const play = () => {
    if (acting.current) return;
    const next = TRICKS[turn.current % TRICKS.length]!;
    turn.current += 1;
    acting.current = true;
    setTrick(next.id);
    setPose((value) => value + 1);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      acting.current = false;
      setTrick(null);
    }, 1400);
  };

  const line = TRICKS.find((item) => item.id === trick)?.line;

  return (
    <div className="pointer-events-none absolute z-30 w-28" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
      <div className="relative">
        {line ? <p className="pet-say">{line}</p> : null}
        <button type="button" className="pointer-events-auto mx-auto block h-20 w-20 bg-transparent p-0" onClick={play} aria-label={`摸一摸${pet.name}`}>
          <span className={faceRight ? "pet-face-right block" : "block"}>
            <span key={`${trick ?? "walk"}-${pose}`} className={trick ? "pet-pose relative pet-pose-" + trick : "pet-bob relative block"}>
              <PetSprite species={species} stage={stage} className="h-20 w-20" />
              {trick === "pat" ? <span className="pet-hand" aria-hidden="true" /> : null}
              {trick === "cozy" ? (
                <>
                  <span className="pet-heart pet-heart-a" aria-hidden="true" />
                  <span className="pet-heart pet-heart-b" aria-hidden="true" />
                </>
              ) : null}
            </span>
          </span>
        </button>
      </div>
      <p className="pointer-events-none mx-auto w-fit rounded-full border-2 border-ink bg-paper px-2 text-xs font-bold text-ink">{pet.name}</p>
    </div>
  );
}
