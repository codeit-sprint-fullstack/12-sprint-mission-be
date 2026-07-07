import prisma from "../../lib/prisma.js";
import type { User } from "@prisma/client";

type CreateUserInput = {
  email: string;
  nickname: string;
  encryptedPassword: string;
};

type PublicUser = Pick<User, "id" | "email" | "nickname">;

export const createUser = (user: CreateUserInput): Promise<PublicUser> => {
  return prisma.user.create({
    data: user,
    select: {
      id: true,
      email: true,
      nickname: true,
    },
  });
};

export const findByEmail = (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findById = (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const saveRefreshToken = (
  userId: number,
  refreshToken: string,
): Promise<User> => {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });
};

export const clearRefreshToken = (userId: number): Promise<User> => {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};
