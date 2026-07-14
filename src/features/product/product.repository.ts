import { Prisma } from "@prisma/client";
import db from "../../lib/prisma.js";
import { flattenAuthor } from "../../utils/flatten-author.js";
import type { FindByIdOptions, FindManyParams } from "../../types/common.js";
import {
  PRODUCT_SELECT,
  type ProductListItem,
  type FlattenedProduct,
  type ProductWithLike,
  type CreateProductInput,
  type UpdateProductInput,
} from "./product.types.js";

const getIsLiked = async (
  productId: number,
  userId: number | undefined,
): Promise<boolean> => {
  if (!userId) {
    return false;
  }

  const liked = await db.productLike.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  return !!liked;
};

export const findMany = ({
  where,
  orderBy,
  skip,
  take,
}: FindManyParams<
  Prisma.ProductWhereInput,
  Prisma.ProductOrderByWithRelationInput
>): Promise<ProductListItem[]> => {
  return db.product.findMany({
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
  return db.product.count({ where });
};

export const create = async (
  input: CreateProductInput,
): Promise<ProductWithLike> => {
  const product = await db.product.create({
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

  const product = await db.product.findUniqueOrThrow({
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
  const product = await db.product.update({
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
  return db.product.delete({ where: { id } });
};
