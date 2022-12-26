import React, { useState } from "react";
import { useQuery } from "react-query";
import { capitalizeFirstLetter } from "src/utils/utils";
import "./card.scss";

interface IPokemonCard {
  pokemonId: string | undefined;
}

const parsePokemonData = (data) => {
  return {
    id: data.id,
    name: capitalizeFirstLetter(data.name),
    image: data.sprites.other["official-artwork"]["front_default"],
    height: data.height,
    weight: data.weight,
    stats: {
      hp: data.stats[0]["base_stat"],
      attack: data.stats[1]["base_stat"],
      defense: data.stats[2]["base_stat"],
      specialAttack: data.stats[3]["base_stat"],
      specialDefense: data.stats[4]["base_stat"],
      speed: data.stats[5]["base_stat"],
      experience: data["base_experience"],
    },
  };
};

export const PokemonCard = ({ pokemonId }: IPokemonCard): JSX.Element => {
  const [pokemon, setPokemon] = useState(undefined);

  const getPokemon = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    const pokemonData = await response.json();
    const parsedData = parsePokemonData(pokemonData);
    setPokemon(parsedData);
  };

  const { data, isError, isLoading } = useQuery(
    ["pokemon", pokemonId],
    getPokemon,
    {
      enabled: !!pokemonId,
    }
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error!</>;
  }

  return pokemon ? (
    <div className={`card`}>
      <div className={`card-header`}>
        <div className="image-container">
          <img src={pokemon.image} alt="header-card" />
        </div>
      </div>
      <div className={`card-content`}>
        <div>
          <b>{pokemon.name}</b>
          <span style={{ marginLeft: 10, opacity: 0.5 }}>
            {pokemon.stats.hp}Hp
          </span>
        </div>
        <div>
          <span style={{ transform: "translateY(40%)", opacity: 0.5 }}>
            {pokemon.stats.experience}Exp
          </span>
        </div>
      </div>
      <div className={`card-footer`}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <b style={{ fontSize: 16 }}>{pokemon.stats.attack}K</b>
          <p style={{ fontSize: 12, opacity: 0.5 }}>Attack</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <b style={{ fontSize: 16 }}>{pokemon.stats.specialAttack}K</b>
          <p style={{ fontSize: 12, opacity: 0.5 }}>Special</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <b style={{ fontSize: 16 }}>{pokemon.stats.defense}K</b>
          <p style={{ fontSize: 12, opacity: 0.5 }}>Defense</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default PokemonCard;
