export interface IPokemonData {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemon[];
}

export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonCardProp {
    name: string
    sprites: {
        front_default: string
    }
}