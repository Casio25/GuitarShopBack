/*
  Warnings:

  - Added the required column `requestId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "requestId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
