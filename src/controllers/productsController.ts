import { Request, Response, NextFunction } from "express";

import { Prisma } from "@prisma/client";
import { productService } from "../services/productsService";
import { Product } from "../types";

export const productController = {
  getAllProducts: async (
    req: Request<
      {},
      {},
      {},
      {
        page: string;
        pageSize: string;
        sort: Prisma.SortOrder;
        keyword: string;
      }
    >,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const orderBy = req.query.sort || "desc";
      const keyword = req.query.keyword || "";

      const { products, totalCount, totalPages } =
        await productService.getAllProducts({
          page,
          pageSize,
          orderBy,
          keyword,
        });

      return res.status(200).json({
        success: true,
        page,
        pageSize,
        orderBy,
        totalPages,
        list: products,
        totalCount,
      });
    } catch (error) {
      next(error);
    }
  },

  getProduct: async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.id);
      const product = await productService.getProductById(id);

      return res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  createProduct: async (
    req: Request<
      {},
      {},
      Pick<Product, "name" | "description" | "price" | "images" | "tags">
    >,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const newProduct = await productService.createProduct(req.body);
      return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (
    req: Request<{ id: string }, {}, Partial<Product>>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.id);
      const updatedProduct = await productService.updateProduct(id, req.body);

      return res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.id);
      await productService.deleteProduct(id);

      return res.status(204).json({ success: true, data: null });
    } catch (error) {
      next(error);
    }
  },
};
