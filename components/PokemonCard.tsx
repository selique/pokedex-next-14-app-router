'use client'
import React, { useEffect, useState } from 'react';
import { IPokemonCardProp } from '@/types/interfaces';

function PokemonCard({ pokemonUrl }: { pokemonUrl: string }) {
  const [pokemonData, setPokemonData] = useState<IPokemonCardProp | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(pokemonUrl);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [pokemonUrl]);

  console.warn(pokemonUrl)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pokemonData) {
    return <div>Error fetching data</div>;
  }

  // Ensure that sprites and name are available before rendering
  if (!pokemonData.sprites || !pokemonData.name) {
    return <div>Error: Incomplete data</div>;
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full"
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{pokemonData.name}</div>
      </div>
    </div>
  );
}

export default PokemonCard;
