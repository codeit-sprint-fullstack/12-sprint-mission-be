import { Prisma } from "@prisma/client";
import type { WithLike } from "../../types/common.js";

// 공통으로 사용할 select 필드
export const PRODUCT_SELECT = {
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
} satisfies Prisma.ProductSelect;

// PRODUCT_SELECT로 쿼리 시 실제로 반환되는 객체의 타입
export type ProductSelectResult = Prisma.ProductGetPayload<{
  select: typeof PRODUCT_SELECT;
}>;

// author 객체 대신 authorNickname이 붙은 형태
export type FlattenedProduct = Omit<ProductSelectResult, "author"> & {
  authorNickname: string;
};

// FlattenedProduct에 좋아요 여부(isLiked)까지 추가된 상품 상세 응답 최종 타입
export type ProductWithLike = WithLike<FlattenedProduct>;

// 상품 목록(리스트) 조회 시 필요한 필드만 뽑은 타입
export type ProductListItem = Pick<
  ProductSelectResult,
  | "id"
  | "name"
  | "price"
  | "favoriteCount"
  | "createdAt"
  | "updatedAt"
  | "imageUrls"
>;

// 상품 생성 시 입력값 타입
export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  tags: string[];
  authorId: number;
  imageUrls: string[];
};

// 상품 수정 시 입력값 타입 (authorId은 수정 대상이 아니므로 제외하고, 나머지는 전부 선택 사항)
export type UpdateProductInput = Partial<Omit<CreateProductInput, "authorId">>;
