/*
  Warnings:

  - A unique constraint covering the columns `[order,categoryId]` on the table `OrderOfProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnUsers" DROP CONSTRAINT "CategoriesOnUsers_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "OrderOfProduct" DROP CONSTRAINT "OrderOfProduct_categoryId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "OrderOfProduct_order_categoryId_key" ON "OrderOfProduct"("order", "categoryId");

-- AddForeignKey
ALTER TABLE "CategoriesOnUsers" ADD CONSTRAINT "CategoriesOnUsers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderOfProduct" ADD CONSTRAINT "OrderOfProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
