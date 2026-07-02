import prisma from "../../lib/prisma.js";

const flattenAuthor = ({ author, ...rest }) => ({
  ...rest,
  authorNickname: author.nickname,
});

export const findMany = async ({ where, orderBy, skip, take }) => {
  const articles = await prisma.article.findMany({
    where,
    select: {
      id: true,
      title: true,
      content: true,
      favoriteCount: true,
      authorId: true,
      author: {
        select: {
          nickname: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    orderBy,
    skip,
    take,
  });

  return articles.map(flattenAuthor);
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
      author: {
        select: {
          nickname: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!article) {
    return null;
  }

  const flat = flattenAuthor(article);

  // 좋아요 정보가 필요하지 않거나 비로그인 사용자라면 그냥 반환
  if (!includeLike || !userId) {
    return {
      ...flat,
      isLiked: false,
    };
  }

  const isLiked = await prisma.ArticleLike.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId: article.id,
      },
    },
  });

  return {
    ...flat,
    isLiked: !!isLiked,
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
