import React, { useState } from 'react';
import HomeTable from './HomeTable';
import HomeCard from './HomeCard';
import './home.scss';

const Home: React.FC = (): JSX.Element => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<string>('');

  const handleSelectPokemonId = (id: string): void => setSelectedPokemonId(id);

  return (
    <div className="home">
      <HomeTable setPokemonId={handleSelectPokemonId} />
      <HomeCard pokemonId={selectedPokemonId} />
    </div>
  );
};

export default Home;
