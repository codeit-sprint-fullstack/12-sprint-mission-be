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
    favorite: { favoriteCount: "desc" },
  };

  const order = orderMap[orderBy] || { createdAt: "desc" };

  const [articles, totalCount] = await Promise.all([
    articleRepository.findMany({
      where,
      orderBy: order,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    articleRepository.count({ where }),
  ]);

  return {
    data: articles,
    meta: {
      totalCount,
      totalPages: Math.ceil(totalCount / Number(pageSize)),
    },
  };
};

export const getArticle = async (id, userId) => {
  const article = await articleRepository.findById(id, {
    userId,
    includeLike: true,
  });

  if (!article) {
    const err = new Error("게시글이 존재하지 않습니다.");
    err.status = 404;
    throw err;
  }

  return article;
};

export const createArticle = async ({
  title,
  content,
  authorId,
  imageUrls,
}) => {
  validateArticleFields({ title, content, imageUrls }, { isCreate: true });

  return articleRepository.create({
    title,
    content,
    authorId,
    imageUrls,
  });
};

export const updateArticle = async (id, fields, userId) => {
  validateArticleFields(fields);

  const article = await articleRepository.findById(id);
  validateAuthor(article, userId);

  return articleRepository.update(id, fields, userId);
};

export const deleteArticle = async (id, userId) => {
  const article = await articleRepository.findById(id);
  validateAuthor(article, userId);

  return articleRepository.remove(id);
};
