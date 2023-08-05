/* eslint-disable prettier/prettier */
// prettier-ignore
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';
import { ICreateOrder } from '../../../utils/interface/orderInterface'; 

@Injectable()
export class OrderDataService {
  constructor(private prisma: PrismaService) { }

  async createOne(order: ICreateOrder): Promise<Order> {
    console.log("created one logic");
    try {
      const createdOrder = await this.prisma.order.create({
        data: {
          userEmail: order.userEmail,
          userName: order.userName,
          userPhoneNumber: order.userPhoneNumber,
          items: {
            create: order.items.map((item) => ({
              itemId: item.itemId,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });

      return createdOrder;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }
  Test(): void {
    console.log("test")
  }
}
