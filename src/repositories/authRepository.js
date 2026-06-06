import prisma from "../lib/prisma.js";

const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const findById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const createUser = async (userData) => {
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

const updateUser = async (id, data) => {
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
