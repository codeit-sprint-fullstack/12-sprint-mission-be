import prisma from "../lib/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";

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

  // 형식 체크
  if (name.length < 1 || name.length > 10) {
    const err = new Error("상품명은 1자 이상 10자 이내여야 합니다");
    err.status = 400;
    throw err;
  }

  if (description.length < 10 || description.length > 100) {
    const err = new Error("상품 소개는 10자 이상 100자 이내여야 합니다");
    err.status = 400;
    throw err;
  }

  if (typeof price !== "number" || price < 1) {
    const err = new Error("판매가격은 1 이상의 숫자여야 합니다");
    err.status = 400;
    throw err;
  }

  if (tags.some((tag) => tag.length > 5)) {
    const err = new Error("태그는 5글자 이내여야 합니다");
    err.status = 400;
    throw err;
  }

  const product = await prisma.product.create({
    data: { name, description, price, tags },
  });
  res.status(201).json({ success: true, data: product });
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // id 검증
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    const err = new Error("잘못된 ID 형식입니다");
    err.status = 400;
    throw err;
  }

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      createdAt: true,
    },
  });

  if (!product) {
    const err = new Error("상품을 찾을 수 없습니다");
    err.status = 404;
    throw err;
  }

  res.json({ success: true, data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, tags } = req.body;

  // id 검증
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    const err = new Error("잘못된 ID 형식입니다");
    err.status = 400;
    throw err;
  }

  // 조건부 형식 체크
  if ("name" in req.body) {
    if (name.length < 1 || name.length > 10) {
      const err = new Error("상품명은 1자 이상 10자 이내여야 합니다");
      err.status = 400;
      throw err;
    }
  }

  if ("description" in req.body) {
    if (description.length < 10 || description.length > 100) {
      const err = new Error("상품 소개는 10자 이상 100자 이내여야 합니다");
      err.status = 400;
      throw err;
    }
  }

  if ("price" in req.body) {
    if (typeof price !== "number" || price < 1) {
      const err = new Error("판매가격은 1 이상의 숫자여야 합니다");
      err.status = 400;
      throw err;
    }
  }

  if ("tags" in req.body) {
    if (tags.some((tag) => tag.length > 5)) {
      const err = new Error("태그는 5글자 이내여야 합니다");
      err.status = 400;
      throw err;
    }
  }

  const updated = await prisma.product.update({
    where: { id },
    data: req.body,
  });
  res.json({ success: true, data: updated });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // id 검증
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    const err = new Error("잘못된 ID 형식입니다");
    err.status = 400;
    throw err;
  }

  await prisma.product.delete({
    where: { id },
  });

  res.status(204).send();
});
