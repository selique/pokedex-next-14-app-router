// Home.tsx
import { Suspense } from 'react';
import { fetchPokemons } from './action';
import PokemonCard from '@/components/PokemonCard';
import LoadMore from '@/components/LoadMore';
import { IPokemon } from '@/types/interfaces';

async function Home() {
  const { results } = await fetchPokemons(20);

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Pokemons</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {results.map((pokemon: IPokemon) => (
            <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
          ))}
        </section>
      </Suspense>
      <LoadMore />
    </main>
  );
}

export default Home;
