import asyncHandler from "../../middleware/async-handler.middleware.js";
import * as articleService from "./article.service.js";

export const getArticles = asyncHandler(async (req, res) => {
  const {
    page = "1",
    pageSize = "10",
    orderBy = "recent",
    keyword = "",
  } = req.query as Record<string, string>;

  const result = await articleService.getArticles({
    page: Number(page),
    pageSize: Number(pageSize),
    orderBy: orderBy as "recent" | "favorite",
    keyword,
  });

  res.json(result);
});

export const getArticle = asyncHandler(async (req, res) => {
  const article = await articleService.getArticle(
    Number(req.params.id),
    req.user?.id,
  );
  res.json({ data: article });
});

export const createArticle = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const imageUrls = files.map((file) => `/uploads/${file.filename}`);

  const article = await articleService.createArticle({
    title,
    content,
    authorId: req.user!.id,
    imageUrls,
  });

  res.status(201).json({ data: article });
});

export const updateArticle = asyncHandler(async (req, res) => {
  const { title, content, existingImageUrls } = req.body;

  const keepImageUrls: string[] = existingImageUrls
    ? JSON.parse(existingImageUrls)
    : [];
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const newImageUrls = files.map((file) => `/uploads/${file.filename}`);

  const fields = {
    ...(title !== undefined && { title }),
    ...(content !== undefined && { content }),
    imageUrls: [...keepImageUrls, ...newImageUrls],
  };

  const article = await articleService.updateArticle(
    Number(req.params.id),
    fields,
    req.user!.id,
  );

  res.json({ data: article });
});

export const deleteArticle = asyncHandler(async (req, res) => {
  await articleService.deleteArticle(Number(req.params.id), req.user!.id);
  res.status(204).send();
});
