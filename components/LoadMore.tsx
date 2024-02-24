"use client"

import { fetchPokemons } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PokemonCard from "./PokemonCard";
import { IPokemon } from "@/types/interfaces";

let page = 2;
function LoadMore() {
    const { ref, inView } = useInView();
    const [data, setData] = useState<IPokemon[]>([]);
    useEffect(() => {
        if (inView) {
            fetchPokemons(page).then((response) => {
                setData((prevData) => [...prevData, ...response.results]); // Usando a função de atualização do estado
                page++;
            });
        }
    }, [inView]);

    return (
        <>
            <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {data.map((pokemon: IPokemon) => (
                    <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
                ))}
            </section>
            <section className="flex justify-center items-center w-full">
                <div ref={ref}>
                    <Image
                        src="./spinner.svg"
                        alt="spinner"
                        width={56}
                        height={56}
                        className="object-contain"
                    />
                </div>
            </section>
        </>
    );
}

export default LoadMore;