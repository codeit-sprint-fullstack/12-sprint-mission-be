import prisma from "../../lib/prisma.js";

export const findMany = ({ page, pageSize, orderBy, keyword }) => {
  return prisma.product.findMany({
    where,
    select: {
      id: true,
      name: true,
      price: true,
      favoriteCount: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
};

export const count = (where) => {
  return prisma.product.count({ where });
};

export const create = ({ data }) => {
  return prisma.product.create({
    data,
  });
};

export const findById = (id) => {
  return prisma.product.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      favoriteCount: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const update = (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const remove = (id) => {
  return prisma.product.delete({
    where: { id },
  });
};
