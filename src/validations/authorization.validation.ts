import { AppError } from "../types/error.js";

type AuthorResource = {
  authorId: number;
};

export const validateAuthor = (
  resource: AuthorResource,
  userId: number,
): void => {
  if (resource.authorId !== userId) {
    throw new AppError("권한이 없습니다.", 403);
  }
};
