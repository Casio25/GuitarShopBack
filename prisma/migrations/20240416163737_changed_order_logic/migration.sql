/*
  Warnings:

  - You are about to drop the column `order` on the `Product` table. All the data in the column will be lost.
  - Added the required column `order` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "order";
