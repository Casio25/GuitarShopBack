/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ICreateOrder } from "../../../utils/interface/orderInterface"

const prisma = new PrismaClient()

@Injectable()
export class OrderDataService {
  private create(order: ICreateOrder): void {
    const user = await prisma.user.create({
      data: {userEmail: order.userEmail},
    })
  }
}