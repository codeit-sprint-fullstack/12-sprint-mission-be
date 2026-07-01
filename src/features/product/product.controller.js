import asyncHandler from "../../middleware/async-handler.middleware.js";
import * as productService from "./product.service.js";

export const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    pageSize = 10,
    orderBy = "recent",
    keyword = "",
  } = req.query;

  const result = await productService.getProducts({
    page,
    pageSize,
    orderBy,
    keyword,
  });

  res.json(result);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProduct(req.params.id);
  res.json({ data: product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct({
    ...req.body,
    authorId: req.user.id,
  });
  res.status(201).json({ data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const updated = await productService.updateProduct(req.params.id, req.body);
  res.json({ data: updated });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(204).send();
});
