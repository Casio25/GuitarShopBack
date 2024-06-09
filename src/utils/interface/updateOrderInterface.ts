export interface UpdateOrderInterface {
    id: number,
    orderId: number;
    creatAt: string;
    orderStatus: OrderStatus;
    products: Product[];
    payment: Payment;
}

export interface Payment {
    paymentId: number;
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
    quantity: number
}
