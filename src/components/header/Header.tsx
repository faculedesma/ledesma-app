import React from "react";
import PokemonLogo from "@assets/images/pokemon-logo.png";
// import PokemonPikachu from "@assets/images/pikachu.png";
import PokemonPikachu from "@assets/images/pokemon-svg.png";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <img src={PokemonLogo} />
      <img src={PokemonPikachu} />
    </div>
  );
};

export default Header;
