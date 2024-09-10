import { OrderStatus, PaymentStatus, PaymentType, Product } from "./createOrderInterface";

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

export interface GetOrderPayment{
  id: number,
  orderId: number,
  paymentStatus: PaymentStatus,
  paymentType: PaymentType
}
export interface GetOrderProduct{
  productId: number,
  productName: string,
  productQuantity: number,
  productPrice: number,
}

export interface GetOrderVenue{
  id: number,
  name: string,
  creatAt: Date
}

export interface CreateOrderVenue {
  name: string
}

export interface IGetOrdersResponse {
  id: number,
  authorId: number,
  creatAt: Date,
  orderId: number,
  orderStatus: OrderStatus,
  payment: GetOrderPayment
  products: GetOrderProduct[]
  totalPrice: number,
  venue: GetOrderVenue
}


