import { AuthGuard } from './../../../auth/auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
import { OrdersService } from '../../Services/orders/orders.service';
import { UpdateOrderDto } from '../../Dto/order/update-order.dto';
import { IRequest } from '@src/utils/interface/requestInterface';
import { CreateOrderDto} from 'src/logic/Dto/order/create-order.dto';
import { GetOrdersResponseDto } from '@src/logic/Dto/order/getOrderDto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post('create_order')
  @HttpCode(201)
  async create(@Body() createOrderDto: CreateOrderDto, @Req() request: IRequest) {
    const user = request.user
    await this.ordersService.create(createOrderDto, user);
  }

  @UseGuards(AuthGuard)
  @Patch("update_order")
  @HttpCode(200)
  async update(@Body() updateOrderDto: UpdateOrderDto, @Req() request: IRequest){
    const user = request.user
    await this.ordersService.update(updateOrderDto, user)
  }

  @UseGuards(AuthGuard)
  @Get('get_orders')
  @HttpCode(200)
  async getOrders(@Req() request: IRequest) {
    const user = request.user
    const orders = await this.ordersService.getOrders(user);
    return orders
  }

}