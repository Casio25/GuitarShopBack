/*
  Warnings:

  - A unique constraint covering the columns `[id,categoryId]` on the table `OrderOfProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OrderOfProduct_order_categoryId_key";

-- CreateIndex
CREATE UNIQUE INDEX "OrderOfProduct_id_categoryId_key" ON "OrderOfProduct"("id", "categoryId");
