import prisma from "../lib/prisma.js";
import { validateCommentFields } from "../utils/validateComment.js";

export const updateComment = async (id, fields) => {
  validateCommentFields(fields);

  return prisma.comment.update({
    where: { id },
    data: fields,
  });
};

export const deleteComment = async (id) => {
  return prisma.comment.delete({
    where: { id },
  });
};
