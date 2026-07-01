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

export const create = ({ name, description, price, tags, authorId }) => {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      tags,
      authorId,
    },
  });
};

export const findById = async (id, options = {}) => {
  const { userId, includeLike = false } = options;

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      favoriteCount: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!product) {
    return null;
  }

  // 좋아요 정보가 필요하지 않거나 비로그인 사용자라면 그냥 반환
  if (!includeLike || !userId) {
    return {
      ...product,
      liked: false,
    };
  }

  const liked = await prisma.productLike.findUnique({
    where: {
      userId_productId: {
        userId,
        productId: product.id,
      },
    },
  });

  return {
    ...product,
    isLiked: !!liked,
  };
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
