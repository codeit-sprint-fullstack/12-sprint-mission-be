import prisma from "../../lib/prisma.js";

export const createUser = ({ email, nickname, password }) => {
  return prisma.user.create({
    data: {
      email,
      nickname,
      password,
    },
  });
};

export const findByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};
