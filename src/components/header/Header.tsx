import React from 'react';
import PokemonLogo from '@assets/images/pokemon-logo.png';
import PokemonPikachu from '@assets/images/pokemon-svg.png';
import './header.scss';

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <img src={PokemonLogo} alt="poke-logo" />
      <img src={PokemonPikachu} alt="poke-pika" />
    </div>
  );
};

export default Header;
