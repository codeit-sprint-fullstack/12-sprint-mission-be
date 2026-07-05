import prisma from "../lib/prisma";
import { Prisma, Comment } from "@prisma/client";

export const commentRepository = {
  create: async (
    data: Prisma.CommentUncheckedCreateInput,
  ): Promise<Comment> => {
    return await prisma.comment.create({ data });
  },

  findMany: async (args: Prisma.CommentFindManyArgs) => {
    return await prisma.comment.findMany(args);
  },

  count: async (where: Prisma.CommentWhereInput): Promise<number> => {
    return await prisma.comment.count({ where });
  },

  findById: async (id: number): Promise<Comment | null> => {
    return await prisma.comment.findUnique({
      where: { id },
    });
  },

  update: async (
    id: number,
    data: Prisma.CommentUpdateInput,
  ): Promise<Comment> => {
    return await prisma.comment.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number): Promise<Comment> => {
    return await prisma.comment.delete({
      where: { id },
    });
  },
};
