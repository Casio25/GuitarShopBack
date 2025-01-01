/*
  Warnings:

  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleId";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "Acl" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "resource" TEXT NOT NULL,

    CONSTRAINT "Acl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Acl" ADD CONSTRAINT "Acl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
