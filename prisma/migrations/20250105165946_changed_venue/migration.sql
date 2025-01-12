/*
  Warnings:

  - You are about to drop the `_UserToVenue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserToVenue" DROP CONSTRAINT "_UserToVenue_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToVenue" DROP CONSTRAINT "_UserToVenue_B_fkey";

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_UserToVenue";

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
