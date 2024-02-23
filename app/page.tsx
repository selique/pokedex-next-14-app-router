import { fetchPokemons } from "./action";
import PokemonCard, { IPokemonProp } from "@/components/PokemonCard";
import LoadMore from "@/components/LoadMore";

async function Home() {

  const data = await fetchPokemons(20);

  const pokemonList: IPokemonProp[] = [];

  for (const pokemon of data.results) {
    const response = await fetch(pokemon.url);
    const pokemonInfo = await response.json();
    pokemonList.push({
      id: pokemonInfo.id,
      name: pokemonInfo.name,
      sprites: pokemonInfo.sprites,
    });
  }

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Pokemons</h2>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
      <LoadMore />
    </main>
  );
}

export default Home;