import prisma from "../../lib/prisma.js";
import { flattenAuthor } from "../../utils/flatten-author.js";
import { Prisma } from "@prisma/client";
import {
  PRODUCT_SELECT,
  ProductListItem,
  FlattenedProduct,
  ProductWithLike,
  CreateProductInput,
  UpdateProductInput,
  FindByIdOptions,
} from "./product.types.js";

const getIsLiked = async (
  productId: number,
  userId: number | undefined,
): Promise<boolean> => {
  if (!userId) {
    return false;
  }

  const liked = await prisma.productLike.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  return !!liked;
};

type FindManyParams = {
  where: Prisma.ProductWhereInput;
  orderBy: Prisma.ProductOrderByWithRelationInput;
  skip: number;
  take: number;
};

export const findMany = ({
  where,
  orderBy,
  skip,
  take,
}: FindManyParams): Promise<ProductListItem[]> => {
  return prisma.product.findMany({
    where,
    select: {
      id: true,
      name: true,
      price: true,
      favoriteCount: true,
      createdAt: true,
      updatedAt: true,
      imageUrls: true,
    },
    orderBy,
    skip,
    take,
  });
};

export const count = ({
  where,
}: {
  where: Prisma.ProductWhereInput;
}): Promise<number> => {
  return prisma.product.count({ where });
};

export const create = async (
  input: CreateProductInput,
): Promise<ProductWithLike> => {
  const product = await prisma.product.create({
    data: input,
    select: PRODUCT_SELECT,
  });

  return {
    ...flattenAuthor(product),
    isLiked: false,
  };
};

export const findById = async (
  id: number,
  options: FindByIdOptions = {},
): Promise<ProductWithLike> => {
  const { userId, includeLike = false } = options;

  const product = await prisma.product.findUniqueOrThrow({
    where: { id },
    select: PRODUCT_SELECT,
  });

  const flat: FlattenedProduct = flattenAuthor(product);

  if (!includeLike) {
    return { ...flat, isLiked: false };
  }

  const isLiked = await getIsLiked(product.id, userId);

  return { ...flat, isLiked };
};

export const update = async (
  id: number,
  data: UpdateProductInput,
  userId: number,
): Promise<ProductWithLike> => {
  const product = await prisma.product.update({
    where: { id },
    data,
    select: PRODUCT_SELECT,
  });

  const isLiked = await getIsLiked(product.id, userId);

  return {
    ...flattenAuthor(product),
    isLiked,
  };
};

export const remove = (id: number) => {
  return prisma.product.delete({ where: { id } });
};
