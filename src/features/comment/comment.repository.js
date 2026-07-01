import prisma from "../../lib/prisma.js";

export const findMany = ({ articleId, productId, cursor, take }) => {
  return prisma.comment.findMany({
    where: {
      articleId: articleId ?? undefined,
      productId: productId ?? undefined,
    },
    orderBy: {
      id: "desc",
    },
    take,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });
};

export const create = ({ content, articleId, productId }) => {
  return prisma.comment.create({
    data: {
      content,
      articleId,
      productId,
    },
  });
};

export const update = (id, data) => {
  return prisma.comment.update({
    where: { id },
    data,
  });
};

export const remove = (id) => {
  return prisma.comment.delete({
    where: { id },
  });
};
