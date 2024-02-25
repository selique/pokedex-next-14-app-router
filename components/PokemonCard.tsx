'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { IPokemonCardProp } from '@/types/interfaces';
import { motion } from "framer-motion"
import LazyPokemonImage from '@/components/LazyPokemonImage';

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

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1},
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: 1,
        ease: "easeInOut",
        duration: 0.5
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded relative w-full"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <div className="relative w-full h-[37vh]">
          <LazyPokemonImage
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
        </div>
      </Suspense>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
            {pokemonData.name}
          </h2>
          <div className="py-1 px-2 bg-[#161921] rounded-sm">
            <p className="text-white text-sm font-bold capitalize">
              {pokemonData.types.map((type, index) => (
                <span key={index}>{type.type.name}</span>
              ))}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-base text-white font-bold">
              Base Experience: {pokemonData.base_experience}
            </p>
            <p className="text-base text-white font-bold">
              Height: {pokemonData.height}
            </p>
            <p className="text-base text-white font-bold">
              Weight: {pokemonData.weight}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-base text-white font-bold">
              Ability: {pokemonData.abilities[0].ability.name}
            </p>
            <p className="text-base text-white font-bold">
              Held Item: {pokemonData.held_items[0].item.name}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-base text-white font-bold">
              Move: {pokemonData.moves[0].move.name}
            </p>
            <p className="text-base text-white font-bold">
              Location Area Encounters: {pokemonData.location_area_encounters}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PokemonCard;
