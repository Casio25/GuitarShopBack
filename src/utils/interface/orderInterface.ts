/* eslint-disable prettier/prettier */
export interface ICreateOrder {
  orderId: string;
  items: Order[];
  date: string;
  userName: string;
  userPhoneNumber: number;
  userEmail: string;
  totalPrice: number;
}

interface Order {
  id: number;
  price: number;
  quantity: number;
}
