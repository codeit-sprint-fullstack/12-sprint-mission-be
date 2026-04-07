export const validateArticleFields = (fields) => {
  const { title, content } = fields;

  if (title !== undefined) {
    const trimmed = title.trim();
    if (trimmed.length === 0 || trimmed.length > 100) {
      const err = new Error("제목은 1자 이상 100자 이내여야 합니다");
      err.status = 400;
      throw err;
    }
  }

  if (content !== undefined) {
    const trimmed = content.trim();
    if (trimmed.length === 0) {
      const err = new Error("내용은 비어 있을 수 없습니다");
      err.status = 400;
      throw err;
    }
  }
};
