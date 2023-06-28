import { OrderService } from './../../Services/order/order.service';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateOrderDto } from 'src/logic/Dto/order/create-order.dto';
import * as fs from 'fs';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get(':id')
  getId(@Param('id') id: string) {
    return [{ id }];
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    const orderWithId = {
      ...createOrderDto,
      orderId: RandomOrder(),
    };

    fs.appendFileSync('order.txt', JSON.stringify(orderWithId) + '\n');
    return {
      order: orderWithId,
    };
  }
}

import * as func from '../../../data/util.js';

const randomOrderSymbols = func.RandomSymbols();

function RandomOrder() {
  const generatedOrders = new Set();
  let order = '';

  do {
    order = `${randomOrderSymbols} / ${Date.now()}`
  } while (generatedOrders.has(order));
  generatedOrders.add(order);

  return order;
}
