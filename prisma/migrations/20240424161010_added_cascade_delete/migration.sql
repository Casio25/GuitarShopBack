-- DropForeignKey
ALTER TABLE "OrderOfProduct" DROP CONSTRAINT "OrderOfProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "OrderOfProduct" ADD CONSTRAINT "OrderOfProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
