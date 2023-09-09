/* eslint-disable prettier/prettier */
import { OrderService } from './../../Services/order/order.service';
import { Body, Controller, Post, Get, Param, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from 'src/logic/Dto/order/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  getId(@Param('id') id: string) {
    return [{ id }];
  }

  @UseGuards(AuthGuard)
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto)
  }
}
