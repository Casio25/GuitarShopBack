/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderService } from '../../Services/order/order.service';
import { OrderController } from '../../Controllers/order/order.controller';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
