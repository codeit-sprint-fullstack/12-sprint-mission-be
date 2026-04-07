// 상품 필드 검증
export const validateProductFields = (fields) => {
  const { name, description, price, tags } = fields;

  if (name !== undefined) {
    if (name.length < 1 || name.length > 10) {
      const err = new Error("상품명은 1자 이상 10자 이내여야 합니다");
      err.status = 400;
      throw err;
    }
  }

  if (description !== undefined) {
    if (description.length < 10 || description.length > 100) {
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
};
