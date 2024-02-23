// PokemonCard.tsx
import React from "react";

export interface IPokemonProp {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface Prop {
  pokemon: IPokemonProp;
}

function PokemonCard({ pokemon }: Prop) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{pokemon.name}</div>
      </div>
    </div>
  );
}

export default PokemonCard;