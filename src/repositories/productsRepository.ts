import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { Product } from "../types";

export const productRepository = {
  findMany: async (
    where: Prisma.ProductWhereInput,
    skip: number,
    take: number,
    orderBy: Prisma.SortOrder,
  ): Promise<Product[]> => {
    return await prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: orderBy },
    });
  },

  count: async (where: Prisma.ProductWhereInput): Promise<number> => {
    return await prisma.product.count({ where });
  },

  findById: async (id: number): Promise<Product | null> => {
    return await prisma.product.findUnique({
      where: { id },
    });
  },

  create: async (data: Prisma.ProductCreateInput): Promise<Product> => {
    return await prisma.product.create({
      data,
    });
  },

  update: async (
    id: number,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> => {
    return await prisma.product.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number): Promise<Product> => {
    return await prisma.product.delete({
      where: { id },
    });
  },
};
