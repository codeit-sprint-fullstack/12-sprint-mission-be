import { AppError } from "../../types/error.js";
import type {
  CreateArticleInput,
  UpdateArticleInput,
} from "./article.types.js";
import { MAX_IMAGE_COUNT } from "../../constants/image.constants.js";

type ArticleFieldsInput = Partial<CreateArticleInput> | UpdateArticleInput;

export const validateArticleFields = (
  fields: ArticleFieldsInput,
  { isCreate = false }: { isCreate?: boolean } = {},
): void => {
  const { title, content, imageUrls } = fields as Partial<CreateArticleInput>;

  if (isCreate && (title === undefined || content === undefined)) {
    throw new AppError("제목과 내용은 필수 입력값입니다", 400);
  }

  if (title !== undefined) {
    const trimmed = title.trim();
    if (trimmed.length === 0 || trimmed.length > 100) {
      throw new AppError("제목은 1자 이상 100자 이내여야 합니다", 400);
    }
  }

  if (content !== undefined) {
    const trimmed = content.trim();
    if (trimmed.length === 0) {
      throw new AppError("내용은 비어 있을 수 없습니다", 400);
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
