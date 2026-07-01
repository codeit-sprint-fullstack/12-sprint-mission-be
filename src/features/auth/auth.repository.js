import prisma from "../../lib/prisma.js";

export const createUser = (user) => {
  return prisma.user.create({
    data: user,
  });
};

export const findByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};
