import { Request, Response, NextFunction } from "express";

import { Prisma } from "@prisma/client";
import { articleService } from "../services/articlesService";
import { Article } from "../types";

export const articleController = {
  createArticle: async (
    req: Request<{}, {}, Pick<Article, "title" | "content">>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, content } = req.body;
      const newArticle = await articleService.createArticle(title, content);

      return res.status(201).json({
        success: true,
        data: newArticle,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllArticles: async (
    req: Request<
      {},
      {},
      {},
      {
        page: string;
        pageSize: string;
        sort: Prisma.SortOrder;
        keyword: string;
      }
    >,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const orderBy = req.query.sort || "desc";
      const keyword = req.query.keyword || "";

      const { articles, totalCount, totalPages } =
        await articleService.getAllArticles({
          page,
          pageSize,
          orderBy,
          keyword,
        });

      return res.status(200).json({
        success: true,
        page,
        pageSize,
        orderBy,
        data: articles,
        totalPages,
        totalCount,
      });
    } catch (error) {
      next(error);
    }
  },

  getArticle: async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res
          .status(400)
          .json({ success: false, message: "유효하지 않은 게시글 ID입니다." });
      }

      const article = await articleService.getArticleById(id);

      return res.status(200).json({
        success: true,
        data: article,
      });
    } catch (error) {
      next(error);
    }
  },

  updateArticle: async (
    req: Request<{ id: string }, {}, Pick<Article, "title" | "content">>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res
          .status(400)
          .json({ success: false, message: "유효하지 않은 게시글 ID입니다." });
      }

      const updatedArticle = await articleService.updateArticle(id, req.body);

      return res.status(200).json({
        success: true,
        data: updatedArticle,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteArticle: async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res
          .status(400)
          .json({ success: false, message: "유효하지 않은 게시글 ID입니다." });
      }

      const deletedArticle = await articleService.deleteArticle(id);

      return res.status(204).json({
        success: true,
        data: deletedArticle,
      });
    } catch (error) {
      next(error);
    }
  },
};
