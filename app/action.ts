"use server";

import { IPokemonData } from "@/types/interfaces";

export const fetchPokemons = async (offset: number): Promise<IPokemonData> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=8&offset=${offset}`);
    const data: IPokemonData = await response.json();
    return data;
}