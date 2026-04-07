import prisma from "../lib/prisma.js";
import { validateCommentFields } from "../utils/validateComment.js";

export const createCommentForArticle = async (articleId, { content }) => {
  // 필수값 체크
  if (!content) {
    const err = new Error("댓글 내용은 필수입니다");
    err.status = 400;
    throw err;
  }

  validateCommentFields({ content });

  return prisma.comment.create({
    data: { content, articleId: parseInt(articleId) },
  });
};

export const createCommentForProduct = async (productId, { content }) => {
  // 필수값 체크
  if (!content) {
    const err = new Error("댓글 내용은 필수입니다");
    err.status = 400;
    throw err;
  }

  validateCommentFields({ content });

  return prisma.comment.create({
    data: { content, productId: parseInt(productId) },
  });
};

export const updateComment = async (id, fields) => {
  validateCommentFields(fields);

  return prisma.comment.update({
    where: { id },
    data: fields,
  });
};

export const deleteComment = async (id) => {
  return prisma.comment.delete({
    where: { id },
  });
};
