import { Prisma } from "@prisma/client";

// 공통으로 사용할 select 필드
export const COMMENT_SELECT = {
  id: true,
  content: true,
  articleId: true,
  productId: true,
  authorId: true,
  author: {
    select: { nickname: true },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CommentSelect;

// COMMENT_SELECT로 쿼리 시 실제로 반환되는 객체의 타입
export type CommentSelectResult = Prisma.CommentGetPayload<{
  select: typeof COMMENT_SELECT;
}>;

// author 객체 대신 authorNickname이 붙은 형태
export type FlattenedComment = Omit<CommentSelectResult, "author"> & {
  authorNickname: string;
};

// 댓글 생성 시 입력값 타입
// articleId/productId 중 정확히 하나만 값이 있어야 함 (나머지는 null)
export type CreateCommentInput = {
  content: string;
  articleId: number | null;
  productId: number | null;
  authorId: number;
};

// 댓글 수정 시 입력값 타입
export type UpdateCommentInput = {
  content: string;
};

// 댓글 목록 조회 시 파라미터
export type GetCommentsParams = {
  articleId: number | null;
  productId: number | null;
  cursor?: number;
  take: number;
};
