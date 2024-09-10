/*
  Warnings:

  - You are about to drop the `_OrderToVenue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `venueId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToVenue" DROP CONSTRAINT "_OrderToVenue_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToVenue" DROP CONSTRAINT "_OrderToVenue_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "venueId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrderToVenue";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
