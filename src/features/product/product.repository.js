import prisma from "../../lib/prisma.js";
import { flattenAuthor } from "../../utils/flattenAuthor.js";

const PRODUCT_SELECT = {
  id: true,
  name: true,
  description: true,
  price: true,
  tags: true,
  imageUrls: true,
  favoriteCount: true,
  authorId: true,
  author: {
    select: {
      nickname: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};

const getIsLiked = async (productId, userId) => {
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

export const findMany = ({ where, orderBy, skip, take }) => {
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

export const count = ({ where }) => {
  return prisma.product.count({ where });
};

export const create = async ({
  name,
  description,
  price,
  tags,
  authorId,
  imageUrls,
}) => {
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      tags,
      authorId,
      imageUrls,
    },
    select: PRODUCT_SELECT,
  });

  return {
    ...flattenAuthor(product),
    isLiked: false,
  };
};

export const findById = async (id, options = {}) => {
  const { userId, includeLike = false } = options;

  const product = await prisma.product.findUnique({
    where: { id },
    select: PRODUCT_SELECT,
  });

  if (!product) {
    return null;
  }

  const flat = flattenAuthor(product);

  if (!includeLike) {
    return {
      ...flat,
      isLiked: false,
    };
  }

  const isLiked = await getIsLiked(product.id, userId);

  return { ...flat, isLiked };
};

export const update = async (id, data, userId) => {
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

export const remove = (id) => {
  return prisma.product.delete({
    where: { id },
  });
};
