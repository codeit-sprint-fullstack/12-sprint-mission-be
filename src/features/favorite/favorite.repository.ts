import db from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";
import type { FavoriteActionInput, FavoriteResult } from "./favorite.types.js";

// 특정 Prisma 에러 코드인지 확인
const isPrismaErrorCode = (e: unknown, code: string): boolean =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code === code;

export const addFavorite = async ({
  articleId,
  productId,
  userId,
}: FavoriteActionInput): Promise<FavoriteResult> => {
  try {
    // 좋아요 생성과 favoriteCount 증가를 하나의 트랜잭션으로 묶음
    return await db.$transaction(async (tx) => {
      if (articleId !== null) {
        await tx.articleLike.create({ data: { articleId, userId } });
        await tx.article.update({
          where: { id: articleId },
          data: { favoriteCount: { increment: 1 } },
        });
      } else if (productId !== null) {
        await tx.productLike.create({ data: { productId, userId } });
        await tx.product.update({
          where: { id: productId },
          data: { favoriteCount: { increment: 1 } },
        });
      }

      return { isLiked: true };
    });
  } catch (e) {
    // 이미 좋아요를 누른 상태에서 중복 요청할 경우 이미 원하는 상태이므로 성공 처리
    if (isPrismaErrorCode(e, "P2002")) {
      return { isLiked: true };
    }

    // 그 외 에러는 원인을 알 수 없으므로 그대로 상위로 전달
    throw e;
  }
};

export const removeFavorite = async ({
  articleId,
  productId,
  userId,
}: FavoriteActionInput): Promise<void> => {
  try {
    // 좋아요 삭제와 favoriteCount 감소를 하나의 트랜잭션으로 묶음
    await db.$transaction(async (tx) => {
      if (articleId !== null) {
        await tx.articleLike.delete({
          where: { userId_articleId: { userId, articleId } },
        });
        await tx.article.update({
          where: { id: articleId },
          data: { favoriteCount: { decrement: 1 } },
        });
      } else if (productId !== null) {
        await tx.productLike.delete({
          where: { userId_productId: { userId, productId } },
        });
        await tx.product.update({
          where: { id: productId },
          data: { favoriteCount: { decrement: 1 } },
        });
      }
    });
  } catch (e) {
    // 좋아요가 없는 상태에서 취소 요청할 경우 이미 원하는 상태이므로 성공 처리
    if (isPrismaErrorCode(e, "P2025")) {
      return;
    }

    // 그 외 에러는 원인을 알 수 없으므로 그대로 상위로 전달
    throw e;
  }
};
