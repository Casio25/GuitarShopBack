/*
  Warnings:

  - A unique constraint covering the columns `[venueId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `venueId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Made the column `menuId` on table `Venue` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_menuId_fkey";

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "venueId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "menuId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Menu_venueId_key" ON "Menu"("venueId");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
