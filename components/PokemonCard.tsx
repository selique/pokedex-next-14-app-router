"use client"
import LazyPokemonImage from '@/components/LazyPokemonImage';
import { IPokemonCardProp } from '@/types/interfaces';
import { motion } from "framer-motion";
import Image from "next/image";
import { Suspense, useEffect, useState } from 'react';
interface PokemonCardProps {
  pokemonUrl: string;
  index: number;
}

function PokemonCard({ pokemonUrl, index }: PokemonCardProps) {
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
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemonUrl]);

  if (isLoading) {
    return <div className=''>
       <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
          />;
    </div>
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
        delay: index * 0.25,
        ease: "easeInOut",
        duration: 0.5
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded-xl relative w-full bg-white"
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
      </div>
    </motion.div>
  );
}

export default PokemonCard;
