import { CatalogDataService } from './../../DataServices/catalogData.service';
import { Module } from '@nestjs/common';
import { OrdersService } from '../../Services/orders/orders.service';
import { OrdersController } from '../../Controllers/orders/orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { AuthService } from 'src/logic/Services/auth/auth.service';
import { OrderDataService } from 'src/logic/DataServices/orderDataServce';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, AuthDataService, AuthService, OrderDataService, CatalogDataService]
})
export class OrdersModule {}
