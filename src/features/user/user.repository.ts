import prisma from "../../lib/prisma.js";
import type { PublicUser } from "../../types/user.js";

export const findById = (id: number): Promise<PublicUser> => {
  return prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      email: true,
      nickname: true,
    },
  });
};
