/*
  Warnings:

  - You are about to drop the column `venueId` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `menuId` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Venue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_venueId_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_productId_fkey";

-- DropIndex
DROP INDEX "Menu_venueId_key";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "venueId";

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "menuId",
DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "_ProductToVenue" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToVenue_AB_unique" ON "_ProductToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToVenue_B_index" ON "_ProductToVenue"("B");

-- AddForeignKey
ALTER TABLE "_ProductToVenue" ADD CONSTRAINT "_ProductToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToVenue" ADD CONSTRAINT "_ProductToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
