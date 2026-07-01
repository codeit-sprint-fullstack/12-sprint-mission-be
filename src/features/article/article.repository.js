import prisma from "../../lib/prisma.js";

export const findMany = ({ where, orderBy, skip, take }) => {
  return prisma.article.findMany({
    where,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy,
    skip,
    take,
  });
};

export const count = ({ where }) => {
  return prisma.article.count({ where });
};

export const create = ({ title, content, authorId }) => {
  return prisma.article.create({
    data: {
      title,
      content,
      authorId,
    },
  });
};

export const findById = async (id, options = {}) => {
  const { userId, includeLike = false } = options;

  const article = await prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      favoriteCount: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!article) {
    return null;
  }

  // 좋아요 정보가 필요하지 않거나 비로그인 사용자라면 그냥 반환
  if (!includeLike || !userId) {
    return {
      ...article,
      liked: false,
    };
  }

  const liked = await prisma.ArticleLike.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId: article.id,
      },
    },
  });

  return {
    ...article,
    isLiked: !!liked,
  };
};

export const update = (id, data) => {
  return prisma.article.update({
    where: { id },
    data,
  });
};

export const remove = (id) => {
  return prisma.article.delete({
    where: { id },
  });
};
