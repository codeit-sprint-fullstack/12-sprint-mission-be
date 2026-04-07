import prisma from "../lib/prisma.js";
import { validateArticleFields } from "../utils/validateArticle.js";

export const createArticle = async ({ title, content }) => {
  // 필수값 체크
  if (!title || !content) {
    const err = new Error("제목과 내용은 필수입니다");
    err.status = 400;
    throw err;
  }

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
  validateProductFields(fields);

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
