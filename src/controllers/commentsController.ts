import { Request, Response, NextFunction } from "express";
import { commentService } from "../services/commentsService";
import { Comment } from "../types";

export const commentController = {
  // --- 게시글(Article) 댓글 ---
  createArticleComment: async (
    req: Request<{ id: string }, {}, Pick<Comment, "content">>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { content } = req.body;
      const articleId = parseInt(req.params.id);

      const newComment = await commentService.createArticleComment(
        articleId,
        content,
      );

      return res.status(201).json({ success: true, data: newComment });
    } catch (error) {
      next(error);
    }
  },

  getAllArticleComments: async (
    req: Request<{ id: string }, {}, {}, { cursorId?: string; limit?: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const articleId = parseInt(req.params.id);
      const cursorId = req.query.cursorId
        ? parseInt(req.query.cursorId as string)
        : undefined;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await commentService.getArticleComments(
        articleId,
        cursorId,
        limit,
      );

      return res.status(200).json({
        success: true,
        data: result.comments,
        totalCount: result.totalCount,
        nextCursor: result.nextCursor,
      });
    } catch (error) {
      next(error);
    }
  },

  // --- 상품(Product) 댓글 ---
  createProductComment: async (
    req: Request<{ id: string }, {}, Pick<Comment, "content">>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { content } = req.body;
      const productId = parseInt(req.params.id);

      const newComment = await commentService.createProductComment(
        productId,
        content,
      );

      return res.status(201).json({ success: true, data: newComment });
    } catch (error) {
      next(error);
    }
  },

  getAllProductComments: async (
    req: Request<{ id: string }, {}, {}, { cursorId?: string; limit?: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const productId = parseInt(req.params.id);
      const cursorId = req.query.cursorId
        ? parseInt(req.query.cursorId as string)
        : undefined;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await commentService.getProductComments(
        productId,
        cursorId,
        limit,
      );

      return res.status(200).json({
        success: true,
        data: result.comments,
        totalCount: result.totalCount,
        nextCursor: result.nextCursor,
      });
    } catch (error) {
      next(error);
    }
  },

  // --- 공통(Common) 댓글 ---
  updateComment: async (
    req: Request<{ id: string }, {}, Pick<Comment, "content">>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { content } = req.body;
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res
          .status(400)
          .json({ success: false, message: "유효하지 않은 댓글 ID입니다." });
      }

      const updatedComment = await commentService.updateComment(id, content);

      return res.status(200).json({ success: true, data: updatedComment });
    } catch (error) {
      next(error);
    }
  },

  deleteComment: async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res
          .status(400)
          .json({ success: false, message: "유효하지 않은 댓글 ID입니다." });
      }

      const deletedComment = await commentService.deleteComment(id);

      return res.status(200).json({ success: true, data: deletedComment });
    } catch (error) {
      next(error);
    }
  },
};
