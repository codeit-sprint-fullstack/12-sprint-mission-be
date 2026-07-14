import asyncHandler from "../../middleware/async-handler.middleware.js";
import * as favoriteService from "./favorite.service.js";

export const addFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const isArticle = req.baseUrl.includes("articles");
  const targetId = Number(id);

  const favorite = await favoriteService.addFavorite({
    articleId: isArticle ? targetId : null,
    productId: !isArticle ? targetId : null,
    userId: req.user!.id,
  });

  res.status(201).json({ data: favorite });
});

export const removeFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const isArticle = req.baseUrl.includes("articles");
  const targetId = Number(id);

  await favoriteService.removeFavorite({
    articleId: isArticle ? targetId : null,
    productId: !isArticle ? targetId : null,
    userId: req.user!.id,
  });

  res.status(204).send();
});
