"use server";

import PokemonCard from "@/components/PokemonCard";
import { IPokemon, IPokemonData } from "@/types/interfaces";

export const fetchPokemons = async (limit: number, offset: number = 0): Promise<JSX.Element[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    const data: IPokemonData = await response.json();

    return data.results.map((pokemon: IPokemon, index: number) => (
        <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} index={index} />
    ));
}
