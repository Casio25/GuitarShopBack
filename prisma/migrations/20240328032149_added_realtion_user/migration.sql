-- AlterTable
ALTER TABLE "ProductsOnCategories" ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "ProductsOnCategories" ADD CONSTRAINT "ProductsOnCategories_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
