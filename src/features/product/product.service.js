import { validateAuthor } from "../../validations/authorization.validation.js";
import * as productRepository from "./product.repository.js";
import { validateProductFields } from "./product.validate.js";

export const getProducts = async ({ page, pageSize, orderBy, keyword }) => {
  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};

  const orderMap = {
    recent: { createdAt: "desc" },
  };

  const order = orderMap[orderBy] || { createdAt: "desc" };

  const [products, totalCount] = await Promise.all([
    productRepository.findMany({
      where,
      orderBy: order,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    productRepository.count({ where }),
  ]);

  return {
    data: products,
    meta: {
      totalCount,
      totalPages: Math.ceil(totalCount / Number(pageSize)),
    },
  };
};

export const createProduct = async ({
  name,
  description,
  price,
  tags,
  authorId,
}) => {
  validateProductFields({ name, description, price, tags });

  return productRepository.create({
    name,
    description,
    price,
    tags,
    authorId,
  });
};

export const getProduct = async (id) => {
  return productRepository.findById(id);
};

export const updateProduct = async (id, fields, userId) => {
  validateProductFields(fields);

  const product = await productRepository.findById(id);
  validateAuthor(product, userId);

  return productRepository.update(id, fields);
};

export const deleteProduct = async (id, userId) => {
  const product = await productRepository.findById(id);
  validateAuthor(product, userId);

  return productRepository.remove(id);
};
