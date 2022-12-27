import { useQuery, QueryFunctionContext } from 'react-query';
import { IPokemonsAPI, IUsePokemonsResponse } from '../../types';

const getPokemons = async ({
  queryKey
}: QueryFunctionContext): Promise<IPokemonsAPI> => {
  const offset = queryKey[1];
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
  );
  return await response.json();
};

export const usePokemons = (offset: number): IUsePokemonsResponse => {
  const { data, isError, isLoading } = useQuery(
    ['pokemons', offset],
    getPokemons
  );

  return { data, isError, isLoading };
};
