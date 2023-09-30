/* eslint-disable prettier/prettier */
import { OrderDataService } from '../../Services/order/orderData.service';
import { PrismaService } from './../../../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { OrderService } from '../../Services/order/order.service';
import { OrderController } from '../../Controllers/order/order.controller';
import { AuthDataService } from 'src/auth/authData.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  exports: [OrderDataService],
  providers: [OrderService, PrismaService, OrderDataService, AuthDataService, AuthService],
  controllers: [OrderController],
})
export class OrderModule {}
