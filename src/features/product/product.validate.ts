import { AppError } from "../../types/error.js";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "./product.types.js";
import { MAX_IMAGE_COUNT } from "../../constants/image.constants.js";

type ProductFieldsInput = Partial<CreateProductInput> | UpdateProductInput;

export const validateProductFields = (
  fields: ProductFieldsInput,
  { isCreate = false }: { isCreate?: boolean } = {},
) => {
  const { name, description, price, tags, imageUrls } =
    fields as Partial<CreateProductInput>;

  if (
    isCreate &&
    (name === undefined ||
      description === undefined ||
      price === undefined ||
      tags === undefined)
  ) {
    throw new AppError(
      "상품명, 상품 소개, 판매가격, 태그는 필수 입력값입니다",
      400,
    );
  }

  if (name !== undefined) {
    const trimmed = name.trim();
    if (trimmed.length === 0 || trimmed.length > 10) {
      throw new AppError("상품명은 1자 이상 10자 이내여야 합니다", 400);
    }
  }

  if (description !== undefined) {
    const trimmed = description.trim();
    if (trimmed.length < 10 || trimmed.length > 100) {
      throw new AppError("상품 소개는 10자 이상 100자 이내여야 합니다", 400);
    }
  }

  if (price !== undefined) {
    if (typeof price !== "number" || price < 1) {
      throw new AppError("판매가격은 1 이상의 숫자여야 합니다", 400);
    }
  }

  if (tags !== undefined) {
    if (!Array.isArray(tags) || tags.some((tag) => tag.length > 5)) {
      throw new AppError("태그는 5글자 이내여야 합니다", 400);
    }
  }

  if (imageUrls !== undefined) {
    if (!Array.isArray(imageUrls) || imageUrls.length > MAX_IMAGE_COUNT) {
      throw new AppError(
        `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 등록할 수 있습니다`,
        400,
      );
    }
  }
};
