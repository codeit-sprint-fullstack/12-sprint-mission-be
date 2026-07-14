import { Prisma } from "@prisma/client";
import db from "../../lib/prisma.js";
import { flattenAuthor } from "../../utils/flatten-author.js";
import type { FindByIdOptions, FindManyParams } from "../../types/common.js";
import {
  ARTICLE_SELECT,
  type FlattenedArticle,
  type ArticleWithLike,
  type CreateArticleInput,
  type UpdateArticleInput,
} from "./article.types.js";

const getIsLiked = async (
  articleId: number,
  userId: number | undefined,
): Promise<boolean> => {
  if (!userId) {
    return false;
  }

  const liked = await db.articleLike.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });

  return !!liked;
};

export const findMany = async ({
  where,
  orderBy,
  skip,
  take,
}: FindManyParams<
  Prisma.ArticleWhereInput,
  Prisma.ArticleOrderByWithRelationInput
>): Promise<FlattenedArticle[]> => {
  const articles = await db.article.findMany({
    where,
    select: ARTICLE_SELECT,
    orderBy,
    skip,
    take,
  });

  return articles.map(flattenAuthor);
};

export const count = ({
  where,
}: {
  where: Prisma.ArticleWhereInput;
}): Promise<number> => {
  return db.article.count({ where });
};

export const create = async (
  input: CreateArticleInput,
): Promise<ArticleWithLike> => {
  const article = await db.article.create({
    data: input,
    select: ARTICLE_SELECT,
  });

  // 방금 생성된 글이므로 좋아요는 항상 false
  return {
    ...flattenAuthor(article),
    isLiked: false,
  };
};

export const findById = async (
  id: number,
  options: FindByIdOptions = {},
): Promise<ArticleWithLike> => {
  const { userId, includeLike = false } = options;

  const article = await db.article.findUniqueOrThrow({
    where: { id },
    select: ARTICLE_SELECT,
  });

  const flat: FlattenedArticle = flattenAuthor(article);

  // 좋아요 정보가 필요하지 않으면 바로 반환
  if (!includeLike) {
    return { ...flat, isLiked: false };
  }

  const isLiked = await getIsLiked(article.id, userId);

  return { ...flat, isLiked };
};

export const update = async (
  id: number,
  data: UpdateArticleInput,
  userId: number,
): Promise<ArticleWithLike> => {
  const article = await db.article.update({
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

export const remove = (id: number) => {
  return db.article.delete({ where: { id } });
};
