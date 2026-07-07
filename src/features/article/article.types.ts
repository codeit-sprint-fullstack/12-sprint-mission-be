import { Prisma } from "@prisma/client";

// 공통으로 사용할 select 필드
export const ARTICLE_SELECT = {
  id: true,
  title: true,
  content: true,
  favoriteCount: true,
  authorId: true,
  author: {
    select: {
      nickname: true,
    },
  },
  imageUrls: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ArticleSelect;

// ARTICLE_SELECT로 쿼리 시 실제로 반환되는 객체의 타입
export type ArticleSelectResult = Prisma.ArticleGetPayload<{
  select: typeof ARTICLE_SELECT;
}>;

// author 객체 대신 authorNickname이 붙은 형태
export type FlattenedArticle = Omit<ArticleSelectResult, "author"> & {
  authorNickname: string;
};

// FlattenedArticle에 좋아요 여부(isLiked)까지 포함된 게시글 상세/생성 응답 최종 타입
export type ArticleWithLike = FlattenedArticle & {
  isLiked: boolean;
};

// 게시글 생성 시 입력값 타입
export type CreateArticleInput = {
  title: string;
  content: string;
  authorId: number;
  imageUrls: string[];
};

// 게시글 수정 시 입력값 타입 (authorId는 수정 대상 아니므로 제외, 나머지는 전부 선택 사항)
export type UpdateArticleInput = Partial<Omit<CreateArticleInput, "authorId">>;

// findById 호출 시 넘기는 옵션
// userId: isLiked 판단에 필요한 로그인 사용자 id
// includeLike: isLiked 조회 여부
export type FindByIdOptions = {
  userId?: number;
  includeLike?: boolean;
};

// 게시글 목록 조회 시 필요한 파라미터
export type GetArticlesParams = {
  page: number;
  pageSize: number;
  orderBy: "recent" | "favorite";
  keyword: string;
};
