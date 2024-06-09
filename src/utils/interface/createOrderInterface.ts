import { OrdersModule } from './../../logic/Modules/orders/orders.module';
export interface CreateOrderInterface {
    orderId: number;
    creatAt: string;
    orderStatus: OrderStatus;
    products: Product[];
    payment: Payment;
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


