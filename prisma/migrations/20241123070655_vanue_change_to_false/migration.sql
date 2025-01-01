/*
  Warnings:

  - Made the column `menuId` on table `Venue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "menuId" SET NOT NULL;
