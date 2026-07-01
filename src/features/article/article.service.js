import { validateAuthor } from "../../validations/authorization.validation.js";
import * as articleRepository from "./article.repository.js";
import { validateArticleFields } from "./article.validation.js";

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
    articleRepository.findMany({
      where,
      orderBy: order,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    articleRepository.count(where),
  ]);

  return {
    data: articles,
    meta: {
      totalCount,
      totalPages: Math.ceil(totalCount / Number(pageSize)),
    },
  };
};

export const createArticle = async ({ title, content, authorId }) => {
  validateArticleFields({ title, content });

  return articleRepository.create({
    title,
    content,
    authorId,
  });
};

export const getArticle = async (id) => {
  return articleRepository.findById(id);
};

export const updateArticle = async (id, fields, userId) => {
  validateArticleFields(fields);

  const article = await articleRepository.findById(id);
  validateAuthor(article, userId);

  return articleRepository.update(id, fields);
};

export const deleteArticle = async (id, userId) => {
  const article = await articleRepository.findById(id);
  validateAuthor(article, userId);

  return articleRepository.remove(id);
};
