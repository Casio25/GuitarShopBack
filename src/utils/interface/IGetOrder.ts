/* eslint-disable prettier/prettier */
export interface IGetOrder{
    email: string,
}

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
export interface Payment {
    paymentStatus: PaymentStatus;
    paymentType: PaymentType;
}
export interface Product {
    productId: number,
    productName?: string,
    quantity: number,
    productPrice?: number
}
export interface IGetOrderResponse{
    id: number,
    orderId: number,
    creatAt: Date,
    totalPrice: number,
    authorId: number,
    orderStatus: OrderStatus,
    venueId: number,
    payment: Payment,
    products: Product[];
}

export interface IGetOrdersDataServiceResponse {
    count: number,
    data: IGetOrderResponse[]
}