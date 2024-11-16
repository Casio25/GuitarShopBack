-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_menuId_fkey";

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "menuId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
