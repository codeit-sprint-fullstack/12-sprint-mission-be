import asyncHandler from "../../middleware/async-handler.middleware.js";
import * as articleService from "./article.service.js";

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

export const getArticle = asyncHandler(async (req, res) => {
  const article = await articleService.getArticle(req.params.id, req.user?.id);
  res.json({ data: article });
});

export const createArticle = asyncHandler(async (req, res) => {
  const imageUrls = (req.files ?? []).map(
    (file) => `/uploads/${file.filename}`,
  );

  const article = await articleService.createArticle({
    ...req.body,
    authorId: req.user.id,
    imageUrls,
  });

  res.status(201).json({ data: article });
});

export const updateArticle = asyncHandler(async (req, res) => {
  const { title, content, existingImageUrls } = req.body;

  const keepImageUrls = existingImageUrls ? JSON.parse(existingImageUrls) : [];
  const newImageUrls = (req.files ?? []).map(
    (file) => `/uploads/${file.filename}`,
  );

  const fields = {
    ...(title !== undefined && { title }),
    ...(content !== undefined && { content }),
    imageUrls: [...keepImageUrls, ...newImageUrls],
  };

  const article = await articleService.updateArticle(
    req.params.id,
    fields,
    req.user.id,
  );

  res.json({ data: article });
});

export const deleteArticle = asyncHandler(async (req, res) => {
  await articleService.deleteArticle(req.params.id, req.user.id);
  res.status(204).send();
});
