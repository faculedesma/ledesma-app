export interface ISinglePokemonParsed {
  id: number;
  name: string;
  imageSrc: string;
  height: number;
  weight: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    experience: number;
  };
}

interface PokemonResult {
  name: string;
  url: string;
}

export interface IPokemonsAPI {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

export interface ISinglePokemonAPI {
  abilities: [];
  base_experience: number;
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_types: [];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  weight: number;
}

export interface IUsePokemonsResponse {
  data: IPokemonsAPI | undefined;
  isError: boolean;
  isLoading: boolean;
}

export interface IUseSinglePokemonResponse {
  data: ISinglePokemonParsed | undefined;
  isError: boolean;
  isLoading: boolean;
}
