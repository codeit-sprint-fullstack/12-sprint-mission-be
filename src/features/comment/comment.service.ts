import { validateAuthor } from "../../validations/authorization.validation.js";
import * as commentRepository from "./comment.repository.js";
import {
  validateCommentContent,
  validateCommentTarget,
} from "./comment.validate.js";
import type {
  CreateCommentInput,
  UpdateCommentInput,
  GetCommentsParams,
} from "./comment.types.js";

export const getComments = async ({
  articleId,
  productId,
  cursor,
  take,
}: GetCommentsParams) => {
  const comments = await commentRepository.findMany({
    articleId,
    productId,
    cursor,
    take: take + 1,
  });

  const hasNextPage = comments.length > take;
  const data = hasNextPage ? comments.slice(0, take) : comments;

  const nextCursor = hasNextPage ? data[data.length - 1].id : null;

  return {
    data,
    meta: {
      nextCursor,
      hasNextPage,
    },
  };
};

export const createComment = async (input: CreateCommentInput) => {
  const { content, articleId, productId } = input;

  validateCommentContent({ content });
  validateCommentTarget({ articleId, productId });

  return commentRepository.create(input);
};

export const updateComment = async (
  id: number,
  content: UpdateCommentInput,
  userId: number,
) => {
  validateCommentContent(content);

  const comment = await commentRepository.findById(id);
  validateAuthor(comment, userId);

  return commentRepository.update(id, content);
};

export const deleteComment = async (id: number, userId: number) => {
  const comment = await commentRepository.findById(id);
  validateAuthor(comment, userId);

  return commentRepository.remove(id);
};
