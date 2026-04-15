import prisma from "../lib/prisma.js";
import { validateCommentFields } from "../utils/validateComment.js";

export const getArticleComments = async ({ articleId, cursor, take }) => {
  const comments = await prisma.comment.findMany({
    where: {
      articleId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
    orderBy: {
      id: "desc",
    },
    take: take + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
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

export const getProductComments = async ({ productId, cursor, take }) => {
  const comments = await prisma.comment.findMany({
    where: {
      productId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
    orderBy: {
      id: "desc",
    },
    take: take + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
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
