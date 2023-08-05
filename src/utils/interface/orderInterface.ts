/* eslint-disable prettier/prettier */
export interface ICreateOrder {
  orderId: string;
  items: Order[];
  date: string;
  userName: string;
  userPhoneNumber: string;
  userEmail: string;
  totalPrice: number;
}

interface Order {
  itemId: number;
  price: number;
  quantity: number;
}
