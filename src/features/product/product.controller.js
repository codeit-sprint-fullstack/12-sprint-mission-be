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
  const product = await productService.getProduct(req.params.id, req.user?.id);
  res.json({ data: product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, tags } = req.body;

  const imageUrls = (req.files ?? []).map(
    (file) => `/uploads/${file.filename}`,
  );

  const product = await productService.createProduct({
    name,
    description,
    price: Number(price),
    tags: tags ? JSON.parse(tags) : [],
    authorId: req.user.id,
    imageUrls,
  });

  res.status(201).json({ data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, tags, existingImageUrls } = req.body;

  const keepImageUrls = existingImageUrls ? JSON.parse(existingImageUrls) : [];
  const newImageUrls = (req.files ?? []).map(
    (file) => `/uploads/${file.filename}`,
  );

  const fields = {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(price !== undefined && { price: Number(price) }),
    ...(tags !== undefined && { tags: JSON.parse(tags) }),
    imageUrls: [...keepImageUrls, ...newImageUrls],
  };

  const updated = await productService.updateProduct(
    req.params.id,
    fields,
    req.user.id,
  );
  res.json({ data: updated });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id, req.user.id);
  res.status(204).send();
});
