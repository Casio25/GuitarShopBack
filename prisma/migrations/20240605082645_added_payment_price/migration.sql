/*
  Warnings:

  - Added the required column `productPrice` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductOnOrder" DROP CONSTRAINT "ProductOnOrder_orderId_fkey";

-- AlterTable
ALTER TABLE "ProductOnOrder" ADD COLUMN     "productPrice" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductOnOrder" ADD CONSTRAINT "ProductOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
