import prisma from "../lib/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validateProductFields } from "../utils/validate.js";

export const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    pageSize = 10,
    orderBy = "recent",
    keyword = "",
  } = req.query;

  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        price: true,
        favoriteCount: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.product.count({ where }),
  ]);

  res.json({
    data: products,
    meta: {
      totalCount,
      totalPages: Math.ceil(totalCount / Number(pageSize)),
    },
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, tags } = req.body;

  // 필수값 체크
  if (
    !name ||
    !description ||
    price === undefined ||
    !Array.isArray(tags) ||
    tags.length === 0
  ) {
    const err = new Error("상품명, 상품 소개, 판매가격, 태그는 필수입니다");
    err.status = 400;
    throw err;
  }

  validateProductFields(req.body);

  const product = await prisma.product.create({
    data: { name, description, price, tags },
  });
  res.status(201).json({ data: product });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      favoriteCount: true,
      createdAt: true,
    },
  });

  if (!product) {
    const err = new Error("상품을 찾을 수 없습니다");
    err.status = 404;
    throw err;
  }

  res.json({ data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  validateProductFields(req.body);

  const updated = await prisma.product.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ data: updated });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await prisma.product.delete({
    where: { id: req.params.id },
  });

  res.status(204).send();
});
