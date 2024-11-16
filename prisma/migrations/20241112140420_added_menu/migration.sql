/*
  Warnings:

  - Added the required column `menuId` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "menuId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MenuToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MenuToProduct_AB_unique" ON "_MenuToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuToProduct_B_index" ON "_MenuToProduct"("B");

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToProduct" ADD CONSTRAINT "_MenuToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToProduct" ADD CONSTRAINT "_MenuToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
