import prisma from "../../lib/prisma.js";

export const addFavorite = async ({ articleId, productId, userId }) => {
  try {
    return prisma.$transaction(async (tx) => {
      const isArticle = !!articleId;
      const targetId = articleId ?? productId;

      const likeModel = isArticle ? tx.articleLike : tx.productLike;
      const targetModel = isArticle ? tx.article : tx.product;

      const data = isArticle ? { articleId, userId } : { productId, userId };

      await likeModel.create({ data });

      await targetModel.update({
        where: { id: targetId },
        data: { favoriteCount: { increment: 1 } },
      });

      return { isLiked: true };
    });
  } catch (e) {
    // 이미 좋아요 상태라면 성공 처리
    if (e.code === "P2002") {
      return { isLiked: true };
    }

    // 그 외 에러는 그대로 throw
    throw e;
  }
};

export const removeFavorite = async ({ articleId, productId, userId }) => {
  try {
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
        data: { favoriteCount: { decrement: 1 } },
      });
    });
  } catch (e) {
    // 이미 좋아요가 없는 상태라면 성공 처리 (좋아요 감소 안 함)
    if (e.code === "P2025") {
      return;
    }

    // 그 외 에러는 그대로 throw
    throw e;
  }
};
