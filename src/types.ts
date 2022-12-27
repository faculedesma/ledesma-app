export interface ISinglePokemonParsed {
  id: string;
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

export interface IUsePokemonsResponse {
  data: IPokemonsAPI | undefined;
  isError: boolean;
  isLoading: boolean;
}

export interface IUseSinglePokemonResponse {
  data: any;
  isError: boolean;
  isLoading: boolean;
}
