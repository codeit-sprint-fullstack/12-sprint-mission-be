import { Prisma } from "@prisma/client";
import { validateAuthor } from "../../validations/authorization.validation.js";
import type { ListQueryParams } from "../../types/common.js";
import * as articleRepository from "./article.repository.js";
import { validateArticleFields } from "./article.validation.js";
import type {
  CreateArticleInput,
  UpdateArticleInput,
} from "./article.types.js";

export const getArticles = async ({
  page,
  pageSize,
  orderBy,
  keyword,
}: ListQueryParams) => {
  const where: Prisma.ArticleWhereInput = keyword
    ? {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};

  const orderMap: Record<string, Prisma.ArticleOrderByWithRelationInput> = {
    recent: { createdAt: "desc" },
    favorite: { favoriteCount: "desc" },
  };

  const order = orderMap[orderBy] || { createdAt: "desc" };

  const [articles, totalCount] = await Promise.all([
    articleRepository.findMany({
      where,
      orderBy: order,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    articleRepository.count({ where }),
  ]);

  return {
    data: articles,
    meta: {
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
};

export const getArticle = async (id: number, userId: number | undefined) => {
  return articleRepository.findById(id, { userId, includeLike: true });
};

export const createArticle = async (input: CreateArticleInput) => {
  validateArticleFields(input, { isCreate: true });
  return articleRepository.create(input);
};

export const updateArticle = async (
  id: number,
  fields: UpdateArticleInput,
  userId: number,
) => {
  validateArticleFields(fields);

  const article = await articleRepository.findById(id);
  validateAuthor(article, userId);

  return articleRepository.update(id, fields, userId);
};

export const deleteArticle = async (id: number, userId: number) => {
  const article = await articleRepository.findById(id);
  validateAuthor(article, userId);

  return articleRepository.remove(id);
};
