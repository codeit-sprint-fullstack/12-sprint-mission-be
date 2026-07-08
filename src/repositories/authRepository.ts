import { User } from "@prisma/client";
import prisma from "../lib/prisma";

const findByEmail = async (email: User["email"]) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const findById = async (id: User["id"]) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const createUser = async (
  userData: Pick<User, "email" | "encryptedPassword" | "nickname">,
) => {
  return await prisma.user.create({
    data: userData,
    select: {
      id: true,
      email: true,
      nickname: true,
      image: true,
    },
  });
};

const updateUser = async (
  id: User["id"],
  data: Partial<User>,
): Promise<User> => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const authRepository = {
  findByEmail,
  findById,
  createUser,
  updateUser,
};

export default authRepository;
