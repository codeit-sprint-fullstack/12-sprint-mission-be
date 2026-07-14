import * as favoriteRepository from "./favorite.repository.js";
import type { FavoriteActionInput } from "./favorite.types.js";

export const addFavorite = async (input: FavoriteActionInput) => {
  return favoriteRepository.addFavorite(input);
};

export const removeFavorite = async (input: FavoriteActionInput) => {
  return favoriteRepository.removeFavorite(input);
};
