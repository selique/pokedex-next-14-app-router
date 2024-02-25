// LazyPokemonImage.tsx
import React from 'react';
import Image from 'next/image';

function LazyPokemonImage({ src, alt }: { src: string, alt: string }) {
  return (
    <Image    
      className="rounded-xl"
      src={src}
      alt={alt}
      fill
    />
  );
}

export default LazyPokemonImage;
