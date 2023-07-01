/* eslint-disable prettier/prettier */
export class CreateOrderDto {
  orderId: string
  orders: Order[];
  userName: string;
  userPhoneNumber: number;
  userEmail: string;
  totalPrice: number;
}

export class Order {
  id: number;
  price: number;
  quantity: number;
}
