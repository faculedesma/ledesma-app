import { useQuery, QueryFunctionContext } from 'react-query';
import { capitalizeFirstLetter } from '@utils/utils';
import {
  ISinglePokemonParsed,
  IUseSinglePokemonResponse,
  ISinglePokemonAPI
} from '../../types';

const parsePokemonData = (data: ISinglePokemonAPI): ISinglePokemonParsed => {
  return {
    id: data.id,
    name: capitalizeFirstLetter(data.name),
    imageSrc: data.sprites.other['official-artwork'].front_default,
    height: data.height,
    weight: data.weight,
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      experience: data.base_experience
    }
  };
};

const getPokemon = async ({
  queryKey
}: QueryFunctionContext): Promise<ISinglePokemonParsed> => {
  const id = queryKey[1];
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonData = await response.json();
  const parsedData = parsePokemonData(pokemonData);
  return parsedData;
};

export const useSinglePokemon = (
  pokemonId: string
): IUseSinglePokemonResponse => {
  const { data, isError, isLoading } = useQuery(
    ['pokemon', pokemonId],
    getPokemon,
    {
      enabled: pokemonId !== ''
    }
  );
  return { data, isError, isLoading };
};
