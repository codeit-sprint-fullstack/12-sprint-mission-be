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
