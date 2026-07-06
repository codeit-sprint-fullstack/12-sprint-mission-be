const MAX_IMAGE_COUNT = 3;

export const validateProductFields = (fields, { isCreate = false } = {}) => {
  const { name, description, price, tags, imageUrls } = fields;

  if (
    isCreate &&
    (name === undefined ||
      description === undefined ||
      price === undefined ||
      tags === undefined)
  ) {
    const err = new Error(
      "상품명, 상품 소개, 판매가격, 태그는 필수 입력값입니다",
    );
    err.status = 400;
    throw err;
  }

  if (name !== undefined) {
    const trimmed = name.trim();
    if (trimmed.length === 0 || trimmed.length > 10) {
      const err = new Error("상품명은 1자 이상 10자 이내여야 합니다");
      err.status = 400;
      throw err;
    }
  }

  if (description !== undefined) {
    const trimmed = description.trim();
    if (trimmed.length < 10 || trimmed.length > 100) {
      const err = new Error("상품 소개는 10자 이상 100자 이내여야 합니다");
      err.status = 400;
      throw err;
    }
  }

  if (price !== undefined) {
    if (typeof price !== "number" || price < 1) {
      const err = new Error("판매가격은 1 이상의 숫자여야 합니다");
      err.status = 400;
      throw err;
    }
  }

  if (tags !== undefined) {
    if (!Array.isArray(tags) || tags.some((tag) => tag.length > 5)) {
      const err = new Error("태그는 5글자 이내여야 합니다");
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
