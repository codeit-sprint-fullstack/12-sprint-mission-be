import prisma from "../lib/prisma.js";
import { validateArticleFields } from "../utils/validateArticle.js";

export const getArticles = async ({ page, pageSize, orderBy, keyword }) => {
  const where = keyword
    ? {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};

  const orderMap = {
    recent: { createdAt: "desc" },
  };

  const order = orderMap[orderBy] || { createdAt: "desc" };

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
      orderBy: order,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.article.count({ where }),
  ]);

  return {
    data: articles,
    meta: {
      totalCount,
      totalPages: Math.ceil(totalCount / Number(pageSize)),
    },
  };
};

export const createArticle = async ({ title, content }) => {
  validateArticleFields({ title, content });

  return prisma.article.create({
    data: { title, content },
  });
};

export const getArticle = async (id) => {
  return prisma.article.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });
};

export const updateArticle = async (id, fields) => {
  validateArticleFields(fields);

  return prisma.article.update({
    where: { id },
    data: fields,
  });
};

export const deleteArticle = async (id) => {
  return prisma.article.delete({
    where: { id },
  });
};
