
import { ICreateProduct, IProductAuth, IChangeProduct } from 'src/utils/interface/ProductInterface';
import { CreateProductDto } from 'src/logic/Dto/catalog/create-product.dto';
import { ConsoleLogger, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuitarProduct } from '@prisma/client';
import { ICreateCategory } from 'src/utils/interface/categoryInterface';


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
        categoryId: number
    ): Promise<any> {
        try {
            const newProduct = await this.prisma.product.create({
                data: {
                    authorId: authorId, 
                    name: product.name,
                    photo: product.photo,
                    price: product.price,
                    description: product.description,
                    visibility: product.visibility,
                    inStock: product.inStock,
                    categoryId: categoryId

                },
            });

            return newProduct;
        } catch (error) {
            throw error; 
        }
    }

    async getProducts(where: IQueryParams) {
        try {
            const products = await this.prisma.guitarProduct.findMany({
                // skip: +where.skip,
                // take: +where.take,
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

    async changeProduct(product: IChangeProduct, categoryId){
        try{
            const changedProduct = await this.prisma.product.update({
                where: {
                    id: product.id
                },
                data: {
                    name: product.name,
                    photo: product.photo,
                    price: product.price,
                    description: product.description,
                    visibility: product.visibility,
                    inStock: product.inStock,
                    categoryId: categoryId

                }
            })
        } catch (error) {
            throw error;
        }
    }


    async createCategory(category: ICreateCategory){
        try {
            const createCategory = await this.prisma.category.create({
                data: {
                    name: category.name
                }
            })
        }catch (error){
            throw error;
        }
    }

    async findCategory(category: string){
        try {
            const categoryName = this.prisma.category.findFirst({
                where: {
                    name: category
                }
            })
            return categoryName || null
        } catch (error) {
            console.error("Error finding category: ", error)
            throw new Error(error);
        }
    }

}

