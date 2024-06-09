/*
  Warnings:

  - You are about to drop the `_OrderToPayment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToPayment" DROP CONSTRAINT "_OrderToPayment_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToPayment" DROP CONSTRAINT "_OrderToPayment_B_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrderToPayment";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
