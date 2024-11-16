import { IGetProducts, IGetProductsDataServiceResponse } from '../../utils/interface/ProductInterface';
import { ICreateProduct, IChangeProduct} from '@src/utils/interface/ProductInterface';
import { CreateProductDto } from '@src/logic/Dto/product/create-product.dto';
import { ConsoleLogger, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateCategory, IGetCategoriesDataServiceResponse } from '@src/utils/interface/categoryInterface';
import { Console } from 'console';

interface IQueryParams {
    take?: number;
    skip?: number;
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number
    order?: number;
    newOrder?: number;
    categories: Category[]
    orders: Order[]
}
export interface Order {
    id: number,
    order: number
    categoryId: number;
    authorId: number;
}
export interface Category {
    id: number,
    name: string,
    type: string,
}

export interface Product {
    id?: number
}




@Injectable()
export class CategoryDataService {
    constructor(private prisma: PrismaService) {}
 

    async deleteCategory(category, authorId){
        try {
             await this.prisma.category.delete({
                where: {
                    id: category.id
                }
            })
        } catch (error) {
            console.error("Error deleting category: ", error);
            throw new Error(error);
        }
    }




    async createCategory(category: ICreateCategory, authorId: number) {
        
        try {
            await this.prisma.category.create({
                data: {
                    name: category.name,
                    Users: {
                        create: {userId: authorId}
                    }
                }
            })
            
        } catch (error) {
            throw error;
        }
    }

    async findCategory(category: string) {
        try {
            const categoryName = await this.prisma.category.findFirst({
                where: {
                    name: category
                },
                select: {
                    id: true,
                    name: true,
                    Users: {
                        select: {
                            userId: true
                        }
                    }
                }
            });
            return categoryName || null;
        } catch (error) {
            console.error("Error finding category: ", error);
            throw new Error(error);
        }
    }


    async getCategories(authorId: number): Promise<IGetCategoriesDataServiceResponse>{
        try {
            const count = await this.prisma.category.count({
                where: {
                    OR: [
                        {
                            Users: {
                                some: {
                                    userId: authorId
                                }
                            }
                        },
                        {
                            Users: {
                                none: {}
                            }
                        }
                    ]
                }
            })
            const categories = await this.prisma.category.findMany({
                where: {
                    OR: [
                        {
                            Users: {
                                some: {
                                    userId: authorId
                                }
                            }
                        },
                        {
                            Users: {
                                none: {}
                            }
                        }
                    ]
                }
            });
            return {count, data: categories};
        } catch (error) {
            throw new Error(error);
        }
    }


    async findMaxOrder(categoryId: number, authorId: number): Promise<number | null> {
        try {
            const maxOrderProduct = await this.prisma.orderOfProduct.findFirst({
                where: { categoryId: categoryId,
                authorId: authorId },
                orderBy: { order: 'desc' },
            });


            console.log("maxOrderProduct", maxOrderProduct ? maxOrderProduct.order : null)
            return maxOrderProduct ? maxOrderProduct.order : 0;
        } catch (error) {
            console.error('Error finding max order:', error.message, error.stack);
            throw new Error;
        }
    }



        





}
