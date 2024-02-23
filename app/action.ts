"use server";

export const fetchPokemons = async (offset: number) => {

const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=8&offset=${offset}`)

    const data = await response.json()

    console.log(data)

    return data;
}
