export const validateCommentContent = ({ content }) => {
  if (!content || content.trim().length === 0 || content.length > 200) {
    const err = new Error("댓글 내용은 1~200자여야 합니다");
    err.status = 400;
    throw err;
  }
};

export const validateCommentTarget = ({ articleId, productId }) => {
  const hasArticle = articleId != null;
  const hasProduct = productId != null;

  if (!articleId && !productId) {
    throw new Error("댓글은 게시글 또는 상품 중 하나에만 작성할 수 있습니다.");
  }
};
