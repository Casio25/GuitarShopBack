
import { ICreateProduct, IProductAuth, IChangeProduct } from 'src/utils/interface/ProductInterface';
import { CreateProductDto } from 'src/logic/Dto/catalog/create-product.dto';
import { ConsoleLogger, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';


interface IQueryParams {
    take: number;
    skip: number;
    authorId?: number;
    minPrice?: number;
    maxPrice?: number;
    type: string[];
    string: string[];
}

@Injectable()
export class CatalogDataService {
    constructor(private prisma: PrismaService) { } 

    async createProduct(
        product: ICreateProduct,
        authorId: number, 
    ): Promise<any> {
        try {
            const newProduct = await this.prisma.product.create({
                data: {
                    authorId: authorId, 
                    productName: product.productName,
                    type: product.type,
                    photo: product.photo,
                    price: product.price,
                    rating: product.rating,
                    string: product.string,
                },
            });

            return newProduct;
        } catch (error) {
            throw error; 
        }
    }

    async getProducts(where: IQueryParams) {
        try {
            const products = await this.prisma.product.findMany({
                skip: +where.skip,
                take: +where.take,
                where: {
                    price: {
                        gte: where.minPrice, 
                        lte: where.maxPrice, 
                    },
                    
                    type: {
                        in: where.type, 
                    },
                    string: {
                        in: where.string,
                    },
                    authorId: where.authorId,
                },
            });

            return products;
        } catch (error) {
            throw error;
        }
    }

    async changeProduct(product: IChangeProduct){
        try{
            const changedProduct = await this.prisma.product.update({
                where: {
                    id: product.id
                },
                data: {
                    productName: product.productName,
                    type: product.type,
                    photo: product.photo,
                    price: product.price,
                    string: product.string,
                }
            })
        } catch (error) {
            throw error;
        }
    }

}

