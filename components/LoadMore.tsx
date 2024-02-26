"use client"

import { fetchPokemons } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

let page = 1; // Start from the first page
const limit = 4; // Define the limit for each page

export type PokemonCard = JSX.Element;

function LoadMore() {
    const { ref, inView } = useInView();
    const [data, setData] = useState<PokemonCard[]>([]);
    useEffect(() => {
        if (inView) {
            fetchPokemons(limit, page * limit).then((response) => {
                setData((prevData) => [...prevData, ...response]); 
                page++;
            });
        }
    }, [inView, data]);

    return (
        <>
            <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {data}
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