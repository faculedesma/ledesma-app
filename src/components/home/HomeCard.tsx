import React from 'react';
import Card from '@components/card/Card';
import { useSinglePokemon } from '@components/hooks/useSinglePokemon';

interface IPokemonCardProps {
  pokemonId: string;
}

const EmptyCard: React.FC = (): JSX.Element => (
  <div className="card-empty">No pokemon selected</div>
);

const LoadingCard: React.FC = (): JSX.Element => (
  <div className="card-loading">
    <div className="card-header">
      <div className="image-container"></div>
    </div>
    <div className="card-content"></div>
    <div className="card-footer"></div>
  </div>
);

const HomeCard: React.FC<IPokemonCardProps> = ({ pokemonId }): JSX.Element => {
  const { data, isLoading, isError } = useSinglePokemon(pokemonId);

  if (pokemonId === '') {
    return <EmptyCard />;
  }

  if (isLoading) {
    return <LoadingCard />;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <div className="home-card">
      <Card pokemon={data} />
    </div>
  );
};

export default HomeCard;
