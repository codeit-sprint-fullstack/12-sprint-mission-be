/*
  Warnings:

  - Made the column `content` on table `articles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "favorite_count" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "productId" INTEGER,
ALTER COLUMN "articleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
