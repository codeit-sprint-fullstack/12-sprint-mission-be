import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { Article } from "../types";

export const articleRepository = {
  findMany: async (
    where: Prisma.ArticleWhereInput,
    skip: number,
    take: number,
    orderBy: Prisma.SortOrder,
  ): Promise<Article[]> => {
    return await prisma.article.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: orderBy },
    });
  },

  count: async (where: Prisma.ArticleWhereInput): Promise<number> => {
    return await prisma.article.count({ where });
  },

  findById: async (id: number): Promise<Article | null> => {
    return await prisma.article.findUnique({
      where: { id },
    });
  },

  create: async (data: Prisma.ArticleCreateInput): Promise<Article> => {
    return await prisma.article.create({
      data,
    });
  },

  update: async (
    id: number,
    data: Prisma.ArticleUpdateInput,
  ): Promise<Article> => {
    return await prisma.article.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number): Promise<Article> => {
    return await prisma.article.delete({
      where: { id },
    });
  },
};
