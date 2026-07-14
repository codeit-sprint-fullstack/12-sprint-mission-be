// article 또는 product 중 하나에 대한 좋아요이므로, 정확히 하나만 값이 있어야 함
export type FavoriteTarget = {
  articleId: number | null;
  productId: number | null;
};

// 좋아요 추가/삭제 시 입력값 타입
export type FavoriteActionInput = FavoriteTarget & {
  userId: number;
};

// 좋아요 추가/삭제 결과 타입
export type FavoriteResult = {
  isLiked: boolean;
};
