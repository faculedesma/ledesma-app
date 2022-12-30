import React from 'react';
import HomeCard from '../../src/components/home/HomeCard';
import { useSinglePokemon } from '../../src/components/hooks/useSinglePokemon';
import * as hooks from '../../src/components/hooks/useSinglePokemon';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const mockedData = {
  id: 1,
  name: 'Bulbasaur',
  imageSrc:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  height: 7,
  weight: 69,
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    experience: 64
  }
};

const homeCardProps = {
  pokemonId: '1'
};

describe('<HomeTable />', () => {
  it('fetches pokemon 1', async () => {
    jest.spyOn(hooks, 'useSinglePokemon').mockImplementation(() => ({
      data: mockedData,
      isError: false,
      isLoading: false
    }));
    await render(<HomeCard {...homeCardProps} />);
    expect(useSinglePokemon).toHaveBeenCalledTimes(1);
    expect(useSinglePokemon).toHaveBeenCalledWith(homeCardProps.pokemonId);
  });

  it('shows loading card', async () => {
    jest.spyOn(hooks, 'useSinglePokemon').mockImplementation(() => ({
      data: undefined,
      isError: false,
      isLoading: true
    }));
    const { container } = await render(<HomeCard {...homeCardProps} />);
    expect(container.firstChild).toHaveClass('card-loading');
  });

  it('shows error', async () => {
    jest.spyOn(hooks, 'useSinglePokemon').mockImplementation(() => ({
      data: undefined,
      isError: true,
      isLoading: false
    }));
    const { getByText } = await render(<HomeCard {...homeCardProps} />);
    expect(getByText('Error!')).toBeInTheDocument();
  });
});
