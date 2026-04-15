import asyncHandler from "../middleware/asyncHandler.js";
import * as articleService from "../services/articleService.js";

export const getArticles = asyncHandler(async (req, res) => {
  const {
    page = 1,
    pageSize = 10,
    orderBy = "recent",
    keyword = "",
  } = req.query;

  const result = await articleService.getArticles({
    page,
    pageSize,
    orderBy,
    keyword,
  });

  res.json(result);
});

export const createArticle = asyncHandler(async (req, res) => {
  const article = await articleService.createArticle(req.body);
  res.status(201).json({ data: article });
});

export const getArticle = asyncHandler(async (req, res) => {
  const article = await articleService.getArticle(req.params.id);
  res.json({ data: article });
});

export const updateArticle = asyncHandler(async (req, res) => {
  const article = await articleService.updateArticle(req.params.id, req.body);
  res.json({ data: article });
});

export const deleteArticle = asyncHandler(async (req, res) => {
  await articleService.deleteArticle(req.params.id);
  res.status(204).send();
});
