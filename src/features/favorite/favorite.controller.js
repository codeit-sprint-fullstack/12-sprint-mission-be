import asyncHandler from "../../middleware/async-handler.middleware.js";
import * as favoriteService from "./favorite.service.js";

export const addFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const isArticle = req.baseUrl.includes("articles");

  const favorite = await favoriteService.addFavorite({
    articleId: isArticle ? Number(id) : null,
    productId: !isArticle ? Number(id) : null,
    userId: req.user.id,
  });

  res.status(201).json({ data: favorite });
});

export const removeFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const isArticle = req.baseUrl.includes("articles");

  await favoriteService.removeFavorite({
    articleId: isArticle ? Number(id) : null,
    productId: !isArticle ? Number(id) : null,
    userId: req.user.id,
  });

  res.status(204).send();
});
