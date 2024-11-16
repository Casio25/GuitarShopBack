import { Module } from '@nestjs/common';
import { ProductService } from '../../Services/product/product.service';
import { ProductController } from '../../Controllers/product/product.controller';
import { PrismaService } from '@src/prisma/prisma.service';
import { AuthDataService } from '@src/logic/DataServices/authData.service';
import { AuthService } from '@src/logic/Services/auth/auth.service';
import { AzureBlobService } from '@src/logic/Services/azure-blob/azure-blob.service';
import { CategoryDataService } from '@src/logic/DataServices/categoryData.service';
import { ProductDataService } from '@src/logic/DataServices/productData.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, AuthDataService, AuthService, AzureBlobService, CategoryDataService, ProductDataService],
})
export class ProductModule {}
