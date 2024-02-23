import { fetchPokemons } from "./action";

interface IPokemon {
  name: string
  url: string
}

async function Home() {
  const data = await fetchPokemons(20)
  return (
    <div>
      {data.results.map((item: IPokemon) => (
        <a href={item.url} key={item.name}>
          {item.name}
        </a>
      ))}
    </div>
  );
}

export default Home;