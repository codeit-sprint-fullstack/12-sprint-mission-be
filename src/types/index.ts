import {
  Product as PrismaProduct,
  Comment as PrismaComment,
  Article as PrismaArticle,
} from "@prisma/client";

export type Product = PrismaProduct;

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export type Comment = PrismaComment;

export type Article = PrismaArticle;
