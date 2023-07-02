/* eslint-disable prettier/prettier */
import { OrderService } from './../../Services/order/order.service';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateOrderDto } from 'src/logic/Dto/order/create-order.dto';
import * as fs from 'fs';
import { threadId } from 'worker_threads';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  getId(@Param('id') id: string) {
    return [{ id }];
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto)
  }
}