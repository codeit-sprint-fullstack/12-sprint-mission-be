import prisma from "../../lib/prisma.js";
import { flattenAuthor } from "../../utils/flattenAuthor.js";

const COMMENT_SELECT = {
  id: true,
  content: true,
  articleId: true,
  productId: true,
  authorId: true,
  author: {
    select: {
      nickname: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};

export const findMany = async ({ articleId, productId, cursor, take }) => {
  const comments = await prisma.comment.findMany({
    where: {
      articleId: articleId ?? undefined,
      productId: productId ?? undefined,
    },
    select: COMMENT_SELECT,
    orderBy: {
      id: "desc",
    },
    take,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });

  return comments.map(flattenAuthor);
};

export const create = async ({ content, articleId, productId, authorId }) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      articleId,
      productId,
      authorId,
    },
    select: COMMENT_SELECT,
  });

  return flattenAuthor(comment);
};

export const findById = async (id) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: { id },
    select: COMMENT_SELECT,
  });

  return flattenAuthor(comment);
};

export const update = async (id, data) => {
  const comment = await prisma.comment.update({
    where: { id },
    data,
    select: COMMENT_SELECT,
  });

  return flattenAuthor(comment);
};

export const remove = (id) => {
  return prisma.comment.delete({
    where: { id },
  });
};
