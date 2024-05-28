import { ConsoleLogger, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


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
                    venue: true
                }
            })
            return orders
        } catch (error) {
            console.error('Error getting orders:', error);
            throw error;
        }
    }

    async create(createOrderDto, authorId, totalPrice){
        try{
            const newOrder = await this.prisma.order.create({
                data: {
                    authorId: authorId,
                    orderId: createOrderDto.orderId,
                    creatAt: createOrderDto.creatAt,
                    status: createOrderDto.status,
                    totalPrice: totalPrice
                }
            })
            return newOrder
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
}