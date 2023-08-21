/*
  Warnings:

  - You are about to drop the column `authorId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userPhoneNumber` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_authorId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "authorId",
ADD COLUMN     "orderId" INTEGER,
ALTER COLUMN "itemId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userEmail",
DROP COLUMN "userName",
DROP COLUMN "userPhoneNumber",
ADD COLUMN     "date" TEXT,
ADD COLUMN     "totalPrice" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
