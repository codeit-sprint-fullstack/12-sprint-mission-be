import { Prisma, Product } from "@prisma/client";
import { productRepository } from "../repositories/productsRepository";

interface GetProductsParams {
  page: number;
  pageSize: number;
  orderBy: Prisma.SortOrder;
  keyword: string;
}

export const productService = {
  getAllProducts: async ({
    page,
    pageSize,
    orderBy,
    keyword,
  }: GetProductsParams) => {
    const skip = (page - 1) * pageSize;

    const where: Prisma.ProductWhereInput = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const [products, totalCount] = await Promise.all([
      productRepository.findMany(where, skip, pageSize, orderBy),
      productRepository.count(where),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return { products, totalCount, totalPages };
  },

  getProductById: async (id: number): Promise<Product> => {
    const product = await productRepository.findById(id);
    if (!product) {
      const error = new Error("Cannot find given id.");
      (error as any).status = 404;
      throw error;
    }
    return product;
  },

  createProduct: async (data: Prisma.ProductCreateInput): Promise<Product> => {
    return await productRepository.create(data);
  },

  updateProduct: async (
    id: number,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> => {
    await productService.getProductById(id);
    return await productRepository.update(id, data);
  },

  deleteProduct: async (id: number): Promise<Product> => {
    await productService.getProductById(id);
    return await productRepository.delete(id);
  },
};
