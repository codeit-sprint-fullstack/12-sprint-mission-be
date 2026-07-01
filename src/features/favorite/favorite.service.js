import { validateAuthor } from "../../validations/authorization.validation.js";
import * as favoriteRepository from "./favorite.repository.js";

export const addFavorite = async ({ articleId, productId, userId }) => {
  return favoriteRepository.addFavorite({
    articleId,
    productId,
    userId,
  });
};

export const removeFavorite = async ({ articleId, productId, userId }) => {
  return favoriteRepository.removeFavorite({
    articleId,
    productId,
    userId,
  });
};
