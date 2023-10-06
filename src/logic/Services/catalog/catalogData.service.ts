import { IGetProducts } from './../../../utils/interface/ProductInterface';
import { ICreateProduct, IProductAuth } from 'src/utils/interface/ProductInterface';
import { CreateProductDto } from 'src/logic/Dto/catalog/create-product.dto';
import { ConsoleLogger, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';


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

    async getProducts(getProductsDto: IGetProducts, limit: number): Promise<any> {
        try {
            const products = await this.prisma.product.findMany({
                skip: getProductsDto.startIndex - 1 ,
                take: limit,
            });
            console.log("Products in data service:", products);
            return products;
        } catch (error) {
            throw error;
        }
    }

}

