

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

export interface CreateOrderInterface {
  orderId: number;
  creatAt: string;
  orderStatus: OrderStatus;
  products: Product[];
  payment: Payment;
  venueId: number
}

export interface Payment {
  paymentStatus: PaymentStatus;
  paymentType: PaymentType;
}

export enum PaymentStatus {
  paid = 'paid',
  unpaid = 'unpaid'
}

export enum PaymentType {
  cash = "cash",
  digital = "digital"
}

export enum OrderStatus {
  new = "new",
  inProgress = "inProgress",
  finished = "finished"
}
export interface Product {
  productId: number,
  productName?: string,
  quantity: number,
  productPrice?: number
}

export interface OrderProducts {
  products: OrderProductDetails[]
}

export interface OrderProductDetails {
  productId: number,
  quantity: number,
  price: number
}

