/*
  Warnings:

  - Added the required column `author_id` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "author_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "author_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "image_urls" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "refresh_token" TEXT;

-- CreateTable
CREATE TABLE "product_likes" (
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_likes_pkey" PRIMARY KEY ("user_id","product_id")
);

-- CreateTable
CREATE TABLE "article_likes" (
    "user_id" INTEGER NOT NULL,
    "article_id" INTEGER NOT NULL,

    CONSTRAINT "article_likes_pkey" PRIMARY KEY ("user_id","article_id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_likes" ADD CONSTRAINT "product_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_likes" ADD CONSTRAINT "product_likes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
