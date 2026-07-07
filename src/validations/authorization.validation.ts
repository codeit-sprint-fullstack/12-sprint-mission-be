import type { AppError } from "../types/error.js";

type AuthorResource = {
  authorId: number;
};

export const validateAuthor = (
  resource: AuthorResource,
  userId: number,
): void => {
  if (resource.authorId !== userId) {
    const err: AppError = new Error("권한이 없습니다.");
    err.status = 403;
    throw err;
  }
};
