import * as commentRepository from "./comment.repository.js";
import {
  validateCommentFields,
  validateCommentTarget,
} from "./comment.validate.js";

export const getComments = async ({ articleId, productId, cursor, take }) => {
  const comments = await commentRepository.findMany({
    articleId,
    productId,
    cursor,
    take: take + 1,
  });

  const hasNextPage = comments.length > take;
  const data = hasNextPage ? comments.slice(0, take) : comments;

  const nextCursor = hasNextPage ? data[data.length - 1].id : null;

  return {
    data,
    meta: {
      nextCursor,
      hasNextPage,
    },
  };
};

export const createComment = async ({ content, articleId, productId }) => {
  validateCommentFields({ content });
  validateCommentTarget({ articleId, productId });

  return commentRepository.create({
    content,
    articleId,
    productId,
  });
};

export const updateComment = async (id, fields) => {
  validateCommentFields(fields);

  return commentRepository.update(id, fields);
};

export const deleteComment = async (id) => {
  return commentRepository.remove(id);
};
