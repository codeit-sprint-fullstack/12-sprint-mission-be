import { validateAuthor } from "../../validations/authorization.validation.js";
import * as productRepository from "./product.repository.js";
import { validateProductFields } from "./product.validate.js";
import type {
  CreateProductInput,
  UpdateProductInput,
  GetProductsParams,
} from "./product.types.js";
import { Prisma } from "@prisma/client";

export const getProducts = async ({
  page,
  pageSize,
  orderBy,
  keyword,
}: GetProductsParams) => {
  const where: Prisma.ProductWhereInput = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};

  const orderMap: Record<string, Prisma.ProductOrderByWithRelationInput> = {
    recent: { createdAt: "desc" },
    favorite: { favoriteCount: "desc" },
  };

  const order = orderMap[orderBy] || { createdAt: "desc" };

  const [products, totalCount] = await Promise.all([
    productRepository.findMany({
      where,
      orderBy: order,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    productRepository.count({ where }),
  ]);

  return {
    data: products,
    meta: {
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
};

export const createProduct = async (input: CreateProductInput) => {
  validateProductFields(input, { isCreate: true });
  return productRepository.create(input);
};

export const getProduct = async (id: number, userId: number | undefined) => {
  return productRepository.findById(id, {
    userId,
    includeLike: true,
  });
};

export const updateProduct = async (
  id: number,
  fields: UpdateProductInput,
  userId: number,
) => {
  validateProductFields(fields);

  const product = await productRepository.findById(id);

  validateAuthor(product, userId);

  return productRepository.update(id, fields, userId);
};

export const deleteProduct = async (id: number, userId: number) => {
  const product = await productRepository.findById(id);

  validateAuthor(product, userId);

  return productRepository.remove(id);
};
