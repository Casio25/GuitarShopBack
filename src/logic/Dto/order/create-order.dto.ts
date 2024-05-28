/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsNotEmpty, IsArray, IsDate } from "@nestjs/class-validator";
export class CreateOrderDto {
  @IsInt()
  orderId: number;
  @IsArray()
  @IsNotEmpty({ each: true })
  products: Order[];
  @IsString()
  creatAt: Date
  venueId: number;
}

export class Order {
  @IsInt()
  productId: number;
  quantity: number;
}
