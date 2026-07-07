import { AppError } from "../../types/error.js";

export const validateCommentContent = ({
  content,
}: {
  content?: string;
}): void => {
  if (!content || content.trim().length === 0 || content.length > 200) {
    throw new AppError("댓글 내용은 1~200자여야 합니다", 400);
  }
};

export const validateCommentTarget = ({
  articleId,
  productId,
}: {
  articleId: number | null;
  productId: number | null;
}): void => {
  if (!articleId && !productId) {
    throw new AppError(
      "댓글은 게시글 또는 상품 중 하나에만 작성할 수 있습니다.",
      400,
    );
  }
};
