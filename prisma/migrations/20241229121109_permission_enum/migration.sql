/*
  Warnings:

  - Added the required column `permission` to the `Acl` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('READ', 'WRITE');

-- AlterTable
ALTER TABLE "Acl" ADD COLUMN     "permission" "Permission" NOT NULL;
