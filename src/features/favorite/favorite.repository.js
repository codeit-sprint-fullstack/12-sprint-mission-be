import prisma from "../../lib/prisma.js";

export const addFavorite = async ({ articleId, productId, userId }) => {
  return prisma.$transaction(async (tx) => {
    const isArticle = !!articleId;
    const targetId = articleId ?? productId;

    const likeModel = isArticle ? tx.articleLike : tx.productLike;
    const targetModel = isArticle ? tx.article : tx.product;

    const data = isArticle ? { articleId, userId } : { productId, userId };

    await likeModel.create({ data });

    await targetModel.update({
      where: { id: targetId },
      data: {
        favoriteCount: {
          increment: 1,
        },
      },
    });

    return { success: true };
  });
};

export const removeFavorite = async ({ articleId, productId, userId }) => {
  return prisma.$transaction(async (tx) => {
    const isArticle = !!articleId;
    const targetId = articleId ?? productId;

    const likeModel = isArticle ? tx.articleLike : tx.productLike;
    const targetModel = isArticle ? tx.article : tx.product;

    const where = isArticle
      ? {
          userId_articleId: {
            userId,
            articleId: targetId,
          },
        }
      : {
          userId_productId: {
            userId,
            productId: targetId,
          },
        };

    await likeModel.delete({ where });

    await targetModel.update({
      where: { id: targetId },
      data: {
        favoriteCount: {
          decrement: 1,
        },
      },
    });
  });
};
