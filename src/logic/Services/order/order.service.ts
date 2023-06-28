import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/logic/Dto/order/create-order.dto';

@Injectable()
export class OrderService {
  private orders: CreateOrderDto[] = [];

  createOrder(createOrderDto: CreateOrderDto): CreateOrderDto {
    this.orders.push(createOrderDto);
    return createOrderDto;
  }

  getAllOrders(): CreateOrderDto[] {
    return this.orders;
  }

  getOrderById(orderId: string): CreateOrderDto {
    return this.orders.find((order) => order.orderId === orderId);
  }

  updateOrder(
    orderId: string,
    updateOrderDto: Partial<CreateOrderDto>,
  ): CreateOrderDto {
    const order = this.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    Object.assign(order, updateOrderDto);
    return order;
  }
}
