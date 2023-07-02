/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsNotEmpty, IsArray } from "@nestjs/class-validator";
export class CreateOrderDto {
  orderId: string;
  @IsArray()
  @IsNotEmpty({ each: true })
  items: Order[];
  @IsString()
  date: string;
  @IsString()
  userName: string;
  @IsInt()
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
