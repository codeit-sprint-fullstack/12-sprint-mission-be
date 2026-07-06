import prisma from "../../lib/prisma.js";
import { flattenAuthor } from "../../utils/flattenAuthor.js";

const ARTICLE_SELECT = {
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
  imageUrls: true,
  createdAt: true,
  updatedAt: true,
};

const getIsLiked = async (articleId, userId) => {
  if (!userId) {
    return false;
  }

  const liked = await prisma.articleLike.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });

  return !!liked;
};

export const findMany = async ({ where, orderBy, skip, take }) => {
  const articles = await prisma.article.findMany({
    where,
    select: ARTICLE_SELECT,
    orderBy,
    skip,
    take,
  });

  return articles.map(flattenAuthor);
};

export const count = ({ where }) => {
  return prisma.article.count({ where });
};

export const create = async ({ title, content, authorId, imageUrls }) => {
  const article = await prisma.article.create({
    data: { title, content, authorId, imageUrls },
    select: ARTICLE_SELECT,
  });

  // 방금 생성된 글이라 좋아요는 항상 false
  return {
    ...flattenAuthor(article),
    isLiked: false,
  };
};

export const findById = async (id, options = {}) => {
  const { userId, includeLike = false } = options;

  const article = await prisma.article.findUnique({
    where: { id },
    select: ARTICLE_SELECT,
  });

  if (!article) {
    return null;
  }

  const flat = flattenAuthor(article);

  // 좋아요 정보가 필요하지 않으면 바로 반환
  if (!includeLike) {
    return {
      ...flat,
      isLiked: false,
    };
  }

  const isLiked = await getIsLiked(article.id, userId);

  return { ...flat, isLiked };
};

export const update = async (id, data, userId) => {
  const article = await prisma.article.update({
    where: { id },
    data,
    select: ARTICLE_SELECT,
  });

  const isLiked = await getIsLiked(article.id, userId);

  return {
    ...flattenAuthor(article),
    isLiked,
  };
};

export const remove = (id) => {
  return prisma.article.delete({
    where: { id },
  });
};
