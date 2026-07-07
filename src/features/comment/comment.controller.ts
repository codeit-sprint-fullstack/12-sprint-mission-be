import asyncHandler from "../../middleware/async-handler.middleware.js";
import * as commentService from "./comment.service.js";

export const getComments = asyncHandler(async (req, res) => {
  const { cursor, take = "10" } = req.query as Record<string, string>;
  const { id } = req.params;

  const isArticle = req.baseUrl.includes("articles");

  const result = await commentService.getComments({
    articleId: isArticle ? Number(id) : null,
    productId: !isArticle ? Number(id) : null,
    cursor: cursor ? Number(cursor) : undefined,
    take: Number(take),
  });

  res.json(result);
});

export const createComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const isArticle = req.baseUrl.includes("articles");

  const comment = await commentService.createComment({
    content,
    articleId: isArticle ? Number(id) : null,
    productId: !isArticle ? Number(id) : null,
    authorId: req.user!.id,
  });

  res.status(201).json({ data: comment });
});

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await commentService.updateComment(
    Number(req.params.id),
    req.body,
    req.user!.id,
  );
  res.json({ data: comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteComment(Number(req.params.id), req.user!.id);
  res.status(204).send();
});
