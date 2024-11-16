import { CategoryDataService } from '../../DataServices/categoryData.service';
import { Module } from '@nestjs/common';
import { OrdersService } from '../../Services/orders/orders.service';
import { OrdersController } from '../../Controllers/orders/orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { AuthService } from 'src/logic/Services/auth/auth.service';
import { OrderDataService } from '@src/logic/DataServices/orderDataService';
import { ProductService } from '@src/logic/Services/product/product.service';
import { ProductDataService } from '@src/logic/DataServices/productData.service';
import { AzureBlobService } from '@src/logic/Services/azure-blob/azure-blob.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ProductService, PrismaService, AuthDataService, AuthService, OrderDataService, CategoryDataService, ProductDataService, AzureBlobService]
})
export class OrdersModule {}
