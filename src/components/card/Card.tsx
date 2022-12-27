import React from 'react';
import { useSinglePokemon } from '@components/hooks/useSinglePokemon';
import './card.scss';

interface IPokemonCardProps {
  pokemonId: string;
}

export const PokemonCard = ({ pokemonId }: IPokemonCardProps): JSX.Element => {
  const { data, isLoading, isError } = useSinglePokemon(pokemonId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  const pokemon = data;

  return (
    <div className={`card`}>
      <div className={`card-header`}>
        <div className="image-container">
          <img src={pokemon?.imageSrc} alt="header-card" />
        </div>
      </div>
      <div className={`card-content`}>
        <div>
          <b>{pokemon?.name}</b>
          <span style={{ marginLeft: 10, opacity: 0.5 }}>
            {pokemon?.stats.hp}Hp
          </span>
        </div>
        <div>
          <span style={{ transform: 'translateY(40%)', opacity: 0.5 }}>
            {pokemon?.stats.experience}Exp
          </span>
        </div>
      </div>
      <div className={`card-footer`}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <b style={{ fontSize: 16 }}>{pokemon?.stats.attack}K</b>
          <p style={{ fontSize: 12, opacity: 0.5 }}>Attack</p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <b style={{ fontSize: 16 }}>{pokemon?.stats.specialAttack}K</b>
          <p style={{ fontSize: 12, opacity: 0.5 }}>Special</p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <b style={{ fontSize: 16 }}>{pokemon?.stats.defense}K</b>
          <p style={{ fontSize: 12, opacity: 0.5 }}>Defense</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
