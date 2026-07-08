import { Prisma } from "@prisma/client";
import { commentRepository } from "../repositories/commentsRepository";

export const commentService = {
  // --- [공통] 커서 기반 페이지네이션 조회 로직 ---
  _getComments: async (
    where: Prisma.CommentWhereInput,
    cursorId?: number,
    limit: number = 10,
  ) => {
    const args: Prisma.CommentFindManyArgs = {
      take: limit,
      skip: cursorId ? 1 : 0,
      ...(cursorId && { cursor: { id: cursorId } }),
      where,
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    };

    const [comments, totalCount] = await Promise.all([
      commentRepository.findMany(args),
      commentRepository.count(where),
    ]);

    const nextCursor =
      comments.length === limit ? comments[comments.length - 1].id : null;

    return { comments, totalCount, nextCursor };
  },

  // --- 게시글(Article) 댓글 ---
  createArticleComment: async (articleId: number, content: string) => {
    if (!content || content.trim() === "") {
      const error = new Error("댓글 내용을 입력해주세요");
      (error as any).status = 400;
      throw error;
    }
    return await commentRepository.create({ articleId, content });
  },

  getArticleComments: async (
    articleId: number,
    cursorId?: number,
    limit?: number,
  ) => {
    return await commentService._getComments({ articleId }, cursorId, limit);
  },

  // --- 상품(Product) 댓글 ---
  createProductComment: async (productId: number, content: string) => {
    if (!content || content.trim() === "") {
      const error = new Error("댓글 내용을 입력해주세요");
      (error as any).status = 400;
      throw error;
    }
    return await commentRepository.create({ productId, content });
  },

  getProductComments: async (
    productId: number,
    cursorId?: number,
    limit?: number,
  ) => {
    return await commentService._getComments({ productId }, cursorId, limit);
  },

  // --- 공통(Common) 댓글 ---
  updateComment: async (id: number, content: string) => {
    if (!content || content.trim() === "") {
      const error = new Error("댓글 내용을 입력해주세요");
      (error as any).status = 400;
      throw error;
    }

    // 존재 여부 확인
    const existingComment = await commentRepository.findById(id);
    if (!existingComment) {
      const error = new Error("댓글을 찾을 수 없습니다.");
      (error as any).status = 404;
      throw error;
    }

    return await commentRepository.update(id, { content });
  },

  deleteComment: async (id: number) => {
    const existingComment = await commentRepository.findById(id);
    if (!existingComment) {
      const error = new Error("댓글을 찾을 수 없습니다.");
      (error as any).status = 404;
      throw error;
    }

    return await commentRepository.delete(id);
  },
};
