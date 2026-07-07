import db from "../../lib/prisma.js";
import { flattenAuthor } from "../../utils/flatten-author.js";
import {
  COMMENT_SELECT,
  type FlattenedComment,
  type CreateCommentInput,
  type UpdateCommentInput,
  type GetCommentsParams,
} from "./comment.types.js";

export const findMany = async ({
  articleId,
  productId,
  cursor,
  take,
}: GetCommentsParams): Promise<FlattenedComment[]> => {
  const comments = await db.comment.findMany({
    where: {
      articleId: articleId ?? undefined,
      productId: productId ?? undefined,
    },
    select: COMMENT_SELECT,
    orderBy: {
      id: "desc",
    },
    take,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });

  return comments.map(flattenAuthor);
};

export const create = async (
  input: CreateCommentInput,
): Promise<FlattenedComment> => {
  const comment = await db.comment.create({
    data: input,
    select: COMMENT_SELECT,
  });

  return flattenAuthor(comment);
};

export const findById = async (id: number): Promise<FlattenedComment> => {
  const comment = await db.comment.findUniqueOrThrow({
    where: { id },
    select: COMMENT_SELECT,
  });

  return flattenAuthor(comment);
};

export const update = async (
  id: number,
  data: UpdateCommentInput,
): Promise<FlattenedComment> => {
  const comment = await db.comment.update({
    where: { id },
    data,
    select: COMMENT_SELECT,
  });

  return flattenAuthor(comment);
};

export const remove = (id: number) => {
  return db.comment.delete({
    where: { id },
  });
};
