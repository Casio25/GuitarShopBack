
import { ConsoleLogger, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderInterface, OrderProducts, Product } from 'src/utils/interface/createOrderInterface';
import { UpdateOrderInterface } from 'src/utils/interface/updateOrderInterface';


@Injectable()
export class OrderDataService {
    constructor(private prisma: PrismaService) { }
    async findAll(authorId){
        try{
            const orders = await this.prisma.order.findMany({
                where:{
                authorId: authorId
                },
                include: {
                    payment: true,
                    venue: true,
                    products: true
                }
            })
            return orders
        } catch (error) {
            console.error('Error getting orders:', error);
            throw error;
        }
    }

    async create(createOrderDto: CreateOrderInterface, authorId: number, totalPrice: number,) {
        try {
            const newOrder = await this.prisma.order.create({
                data: {
                    authorId: authorId,
                    orderId: createOrderDto.orderId,
                    creatAt: createOrderDto.creatAt,
                    orderStatus: createOrderDto.orderStatus,
                    totalPrice: totalPrice,
                    payment: {
                        create: {
                            paymentStatus: createOrderDto.payment.paymentStatus,
                            paymentType: createOrderDto.payment.paymentType
                        }
                    },
                    products: {
                        create: 
                        createOrderDto.products.map(product => ({
                            productId: product.productId,
                            productName: product.productName,
                            productQuantity: product.quantity,
                            productPrice: product.productPrice,
                            
                        })),
                        
                    }
                },
                include: {
                    payment: true,
                    products: true // Include the products relation in the returned order object
                }
            });

            return newOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }


    async update(updateOrderDto: UpdateOrderInterface, authorId: number, totalPrice: number) {
        try {
            // First, find the order and its related payment to ensure you have the correct payment ID
            const existingOrder = await this.prisma.order.findUnique({
                where: {
                    id: updateOrderDto.id
                },
                include: {
                    payment: true
                }
            });

            if (!existingOrder || !existingOrder.payment.length) {
                throw new Error('Order or payment not found');
            }

            const paymentId = existingOrder.payment[0].id;

            // Now, perform the update
            const updatedOrder = await this.prisma.order.update({
                where: {
                    id: updateOrderDto.id
                },
                data: {
                    authorId: authorId,
                    creatAt: updateOrderDto.creatAt,
                    orderStatus: updateOrderDto.orderStatus,
                    totalPrice: totalPrice,
                    payment: {
                        update: {
                            where: {
                                id: paymentId // Use the payment ID to specify which payment to update
                            },
                            data: {
                                paymentStatus: updateOrderDto.payment.paymentStatus,
                                paymentType: updateOrderDto.payment.paymentType
                            }
                        }
                    }
                },
                include: {
                    payment: true
                }
            });

            return updatedOrder;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    }


}