/* eslint-disable prettier/prettier */
import { IsString, IsInt } from "@nestjs/class-validator";
export class CreateOrderDto {
  @IsString()
  orderId: string
  orders: Order[];
  @IsString()
  date: string;
  @IsString()
  userName: string;
  userPhoneNumber: number;
  userEmail: string;
  totalPrice: number;
}

export class Order {
  @IsInt()
  id: number;
  price: number;
  @IsInt()
  quantity: number;
}
