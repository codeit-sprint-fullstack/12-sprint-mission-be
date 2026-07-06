const MAX_IMAGE_COUNT = 3;

export const validateArticleFields = (fields, { isCreate = false } = {}) => {
  const { title, content, imageUrls } = fields;

  if (isCreate && (title === undefined || content === undefined)) {
    const err = new Error("제목과 내용은 필수 입력값입니다");
    err.status = 400;
    throw err;
  }

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

  if (imageUrls !== undefined) {
    if (!Array.isArray(imageUrls) || imageUrls.length > MAX_IMAGE_COUNT) {
      const err = new Error(
        `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 등록할 수 있습니다`,
      );
      err.status = 400;
      throw err;
    }
  }
};
