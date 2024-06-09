/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsNotEmpty, IsArray, IsDate, IsEnum } from "@nestjs/class-validator";

export enum OrderStatus {
  new = "new",
  inProgress = "inProgress",
  finished = "finished"
}
export enum PaymentStatus {
  paid = 'paid',
  unpaid = 'unpaid'
}

export enum PaymentType {
  cash = "cash",
  digital = "digital"
}

export class CreateOrderDto {
  @IsInt()
  orderId: number;
  @IsArray()
  @IsNotEmpty({ each: true })
  products: Order[];
  @IsString()
  creatAt: string
  venueId: number;
  payment: Payment;
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus
}

export class Order {
  @IsInt()
  productId: number;
  quantity: number;
}

export class Payment {
  paymentStatus: PaymentStatus;
  paymentType: PaymentType;
}


