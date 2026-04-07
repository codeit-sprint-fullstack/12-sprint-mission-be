import prisma from "../lib/prisma.js";

export const createArticle = async ({ title, content }) => {
  // 필수값 체크
  if (!title || !content) {
    const err = new Error("제목과 내용은 필수입니다");
    err.status = 400;
    throw err;
  }

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
