import React from 'react';
import HomeTable from '../../src/components/home/HomeTable';
import { usePokemons } from '../../src/components/hooks/usePokemons';
import * as hooks from '../../src/components/hooks/usePokemons';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const mockedData = {
  count: 1154,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
    { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' }
  ]
};

const homeTableProps = {
  setPokemonId: jest.fn()
};

describe('<HomeTable />', () => {
  it('fetches all pokemons', async () => {
    jest.spyOn(hooks, 'usePokemons').mockImplementation(() => ({
      data: mockedData,
      isError: false,
      isLoading: false
    }));
    await render(<HomeTable {...homeTableProps} />);
    expect(usePokemons).toHaveBeenCalledTimes(1);
    expect(usePokemons).toHaveBeenCalledWith(0);
  });

  it('shows table skeleton on loading', async () => {
    jest.spyOn(hooks, 'usePokemons').mockImplementation((offset) => ({
      data: undefined,
      isError: false,
      isLoading: true
    }));
    const { container } = await render(<HomeTable {...homeTableProps} />);
    expect(container.firstChild?.firstChild).toHaveClass('table-skeleton');
  });

  it('shows error', async () => {
    jest.spyOn(hooks, 'usePokemons').mockImplementation((offset) => ({
      data: undefined,
      isError: true,
      isLoading: false
    }));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = await render(<HomeTable {...homeTableProps} />);
    expect(container.firstChild?.firstChild).toHaveClass('table-skeleton');
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
