/* eslint-disable prettier/prettier */
export interface ICreateOrder {
  orderId: string;
  items: Order[];
  date: string;
  userEmail: string;
  userPassword: string;
  totalPrice: number;
}

interface Order {
  itemId: number;
  price: number;
  quantity: number;
}
