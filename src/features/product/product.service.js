import prisma from "../../lib/prisma.js";
import { validateProductFields } from "./product.validate.js";

export const getProducts = async ({ page, pageSize, orderBy, keyword }) => {
  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};

  const orderMap = {
    recent: { createdAt: "desc" },
  };

  const order = orderMap[orderBy] || { createdAt: "desc" };

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        price: true,
        favoriteCount: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: order,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.product.count({ where }),
  ]);

  return {
    data: products,
    meta: {
      totalCount,
      totalPages: Math.ceil(totalCount / Number(pageSize)),
    },
  };
};

export const createProduct = async ({ name, description, price, tags }) => {
  validateProductFields({ name, description, price, tags });

  return prisma.product.create({
    data: { name, description, price, tags },
  });
};

export const getProduct = async (id) => {
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

export const updateProduct = async (id, fields) => {
  validateProductFields(fields);

  return prisma.product.update({
    where: { id },
    data: fields,
  });
};

export const deleteProduct = async (id) => {
  return prisma.product.delete({
    where: { id },
  });
};
