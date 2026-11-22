import type { SpeciesId } from "@/data/pets";

export function PetSprite({
  species,
  stage,
  className = "",
}: {
  species: SpeciesId;
  stage: 1 | 2;
  className?: string;
}) {
  const src = stage === 2 ? `/art/pets/${species}-evo.png` : `/art/pets/${species}.png`;
  return (
    <span className={`relative inline-block ${className}`}>
      <img src={src} alt="" className="pet-sprite relative z-10 size-full object-contain object-bottom" />
    </span>
  );
}
