import { Prisma } from "@prisma/client";
import { Article } from "../types";
import { articleRepository } from "../repositories/articlesRepository";

interface GetArticlesParams {
  page: number;
  pageSize: number;
  orderBy: Prisma.SortOrder;
  keyword: string;
}

export const articleService = {
  createArticle: async (title: string, content: string): Promise<Article> => {
    if (!title || title.trim() === "") {
      const error = new Error("게시글 제목을 입력해주세요");
      (error as any).status = 400;
      throw error;
    }
    if (!content || content.trim() === "") {
      const error = new Error("게시글 내용을 입력해주세요");
      (error as any).status = 400;
      throw error;
    }

    return await articleRepository.create({ title, content });
  },

  getAllArticles: async ({
    page,
    pageSize,
    orderBy,
    keyword,
  }: GetArticlesParams) => {
    const skip = (page - 1) * pageSize;
    const where: Prisma.ArticleWhereInput = keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { content: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const [articles, totalCount] = await Promise.all([
      articleRepository.findMany(where, skip, pageSize, orderBy),
      articleRepository.count(where),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return { articles, totalCount, totalPages };
  },

  getArticleById: async (id: number): Promise<Article> => {
    const article = await articleRepository.findById(id);
    if (!article) {
      const error = new Error("Cannot find given id.");
      (error as any).status = 404;
      throw error;
    }
    return article;
  },

  updateArticle: async (
    id: number,
    data: Prisma.ArticleUpdateInput,
  ): Promise<Article> => {
    await articleService.getArticleById(id);
    return await articleRepository.update(id, data);
  },

  deleteArticle: async (id: number): Promise<Article> => {
    await articleService.getArticleById(id);
    return await articleRepository.delete(id);
  },
};
