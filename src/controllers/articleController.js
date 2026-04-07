import asyncHandler from "../middleware/asyncHandler.js";
import * as articleService from "../services/articleService.js";

export const createArticle = asyncHandler(async (req, res) => {
  const article = await articleService.createArticle(req.body);
  res.status(201).json({ data: article });
});

export const getArticle = asyncHandler(async (req, res) => {
  const article = await articleService.getArticle(req.params.id);
  res.json({ data: article });
});
