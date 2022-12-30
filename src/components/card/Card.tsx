import { Indeterminate } from '@faculedesma/ledesma-lib';
import React, { useState } from 'react';
import { ISinglePokemonParsed } from 'src/types';
import './card.scss';

interface ICardProps {
  pokemon: ISinglePokemonParsed;
}

export const Card: React.FC<ICardProps> = ({ pokemon }): JSX.Element => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const handleImageLoaded = (): void => setIsImageLoaded(true);

  return pokemon !== undefined ? (
    <div className="card">
      <div className="card-header">
        <div className="image-container">
          <img
            src={pokemon?.imageSrc}
            alt="poke-default"
            onLoad={handleImageLoaded}
          />
          {!isImageLoaded && <Indeterminate />}
        </div>
      </div>
      <div className="card-content">
        <div className="top">
          <b>{pokemon?.name}</b>
          <span className="hp">{pokemon?.stats.hp}Hp</span>
        </div>
        <div className="bottom">
          <span className="exp">{pokemon?.stats.experience}Exp</span>
        </div>
      </div>
      <div className="card-footer">
        <div className="stat">
          <b>{pokemon?.stats.attack}K</b>
          <p>Attack</p>
        </div>
        <div className="stat">
          <b>{pokemon?.stats.specialAttack}K</b>
          <p>Special</p>
        </div>
        <div className="stat">
          <b>{pokemon?.stats.defense}K</b>
          <p>Defense</p>
        </div>
      </div>
    </div>
  ) : (
    <>No pokemon selected</>
  );
};

export default Card;
