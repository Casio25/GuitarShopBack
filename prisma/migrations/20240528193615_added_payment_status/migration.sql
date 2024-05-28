-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Paid', 'Unpaid');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'Unpaid';
