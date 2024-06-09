import { AuthGuard } from './../../../auth/auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from '../../Services/orders/orders.service';
import { UpdateOrderDto } from '../../Dto/order/update-order.dto';
import { IOrdersRequest } from 'src/utils/interface/requestInterface';
import { CreateOrderDto } from 'src/logic/Dto/order/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post('create_order')
  create(@Body() createOrderDto: CreateOrderDto, @Req() request: IOrdersRequest) {
    
    const user = request.user
    return this.ordersService.create(createOrderDto, user);
  }

  @UseGuards(AuthGuard)
  @Patch("update_order")
  update(@Body() updateOrderDto: UpdateOrderDto, @Req() request: IOrdersRequest){
    const user = request.user
    return this.ordersService.update(updateOrderDto, user)
  }

  @UseGuards(AuthGuard)
  @Get('get_orders')
  findAll(@Req() request: IOrdersRequest) {
    const user = request.user
    console.log(user)
    return this.ordersService.findAll(user);
  }
}