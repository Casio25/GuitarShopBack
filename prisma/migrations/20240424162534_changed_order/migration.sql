/*
  Warnings:

  - You are about to drop the column `productId` on the `OrderOfProduct` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order,categoryId]` on the table `OrderOfProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "OrderOfProduct" DROP CONSTRAINT "OrderOfProduct_productId_fkey";

-- AlterTable
ALTER TABLE "OrderOfProduct" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "_OrderOfProductToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderOfProductToProduct_AB_unique" ON "_OrderOfProductToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderOfProductToProduct_B_index" ON "_OrderOfProductToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "OrderOfProduct_order_categoryId_key" ON "OrderOfProduct"("order", "categoryId");

-- AddForeignKey
ALTER TABLE "_OrderOfProductToProduct" ADD CONSTRAINT "_OrderOfProductToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "OrderOfProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderOfProductToProduct" ADD CONSTRAINT "_OrderOfProductToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
