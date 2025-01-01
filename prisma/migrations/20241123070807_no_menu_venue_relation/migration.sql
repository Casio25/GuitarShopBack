/*
  Warnings:

  - You are about to drop the column `venueId` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `menuId` on the `Venue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_venueId_fkey";

-- DropIndex
DROP INDEX "Menu_venueId_key";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "venueId";

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "menuId";
