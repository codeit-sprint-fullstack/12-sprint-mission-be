import prisma from "../../lib/prisma.js";

export const createUser = (user) => {
  return prisma.user.create({
    data: user,
    select: {
      id: true,
      email: true,
      nickname: true,
    },
  });
};

export const findByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findById = (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const saveRefreshToken = (userId, refreshToken) => {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });
};

export const clearRefreshToken = (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};
