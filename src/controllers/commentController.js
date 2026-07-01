import asyncHandler from "../middleware/asyncHandler.js";
import * as commentService from "../services/commentService.js";

export const getArticleComments = asyncHandler(async (req, res) => {
  const { cursor, take = 10 } = req.query;
  const { id } = req.params;

  const result = await commentService.getArticleComments({
    articleId: Number(id),
    cursor: cursor ? Number(cursor) : undefined,
    take: Number(take),
  });

  res.json(result);
});

export const getProductComments = asyncHandler(async (req, res) => {
  const { cursor, take = 10 } = req.query;
  const { id } = req.params;

  const result = await commentService.getProductComments({
    productId: Number(id),
    cursor: cursor ? Number(cursor) : undefined,
    take: Number(take),
  });

  res.json(result);
});

export const createArticleComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createCommentForArticle(
    req.params.id,
    req.body,
  );
  res.status(201).json({ data: comment });
});

export const createProductComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createCommentForProduct(
    req.params.id,
    req.body,
  );
  res.status(201).json({ data: comment });
});

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await commentService.updateComment(req.params.id, req.body);
  res.json({ data: comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteComment(req.params.id);
  res.status(204).send();
});
