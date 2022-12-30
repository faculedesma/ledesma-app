export const capitalizeFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const getPokemonIdFromURL = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};
