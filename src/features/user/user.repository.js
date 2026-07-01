import prisma from "../../lib/prisma.js";

export const findById = (id) => {
  return prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      email: true,
      nickname: true,
    },
  });
};
