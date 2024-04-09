
import { ICreateProduct, IProductAuth, IChangeProduct, IDeleteProduct, IReorderProduct, Category } from 'src/utils/interface/ProductInterface';
import { CreateProductDto } from 'src/logic/Dto/catalog/create-product.dto';
import { ConsoleLogger, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ICreateCategory } from 'src/utils/interface/categoryInterface';


interface IQueryParams {

    take?: number;
    skip?: number;
    authorId: number;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number
    order?: number;
    newOrder?: number;
    type?: string[];
    string?: string[];
}


@Injectable()
export class CatalogDataService {
    constructor(private prisma: PrismaService) { }

    async createProduct(
        product: ICreateProduct,
        authorId: number,
        orderId: number
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
                    categories: {
                        connect: product.categories.map(category => ({ id: category.id })) // Connect the product to the specified categories
                    },
                    order: orderId + 1

                },
            });

            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async getProducts(where: IQueryParams) {
        try {
            const whereCondition: any = {
                authorId: where.authorId,
                
            };
            
            // Check if categoryId is defined before adding it to the where condition
            if (where.categoryId !== undefined) {
                whereCondition.categories = {
                    some: {
                        categoryId: {
                            in: [where.categoryId] // Use where.categoryId if defined
                        }
                    }
                };
            }

            // Check if order is defined before adding it to the where condition
            if (where.order !== undefined) {
                whereCondition.order = {
                    gte: where.order // Use where.order if defined
                };
            }

            const products = await this.prisma.product.findMany({
                where: whereCondition,
                include: {
                    categories: true // Include the associated categories
                }
            });

            return products;
        } catch (error) {
            throw error;
        }
    }


    async changeProduct(product: IChangeProduct) {
        try {
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
                    categories: {
                        set: product.categories.map(category => ({ id: category.id })) // Set the categories for the product
                    },
                    order: product.order
                }
            });

            return changedProduct;
        } catch (error) {
            throw error;
        }
    }



    async reorderProduct(reorderProductDto: IReorderProduct): Promise<void> {
        try {
            const [productWithOrderA, productWithOrderB] = await Promise.all([
                this.prisma.product.findFirst({
                    where: {
                        authorId: reorderProductDto.authorId,
                        order: reorderProductDto.order
                    }
                }),
                this.prisma.product.findFirst({
                    where: {
                        authorId: reorderProductDto.authorId,
                        order: reorderProductDto.newOrder
                    }
                })
            ]);

            // Update the orders
            await Promise.all([
                this.prisma.product.update({
                    where: { id: productWithOrderA.id },
                    data: { order: reorderProductDto.newOrder }
                }),
                this.prisma.product.update({
                    where: { id: productWithOrderB.id },
                    data: { order: reorderProductDto.order }
                })
            ]);
        } catch (error) {
            throw error;
        }
    }



    async lowerOrderByOne(products: IChangeProduct[]): Promise<void> {
        try {
            await Promise.all(products.map(async (product) => {
                await this.prisma.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        order: {
                            decrement: 1 
                        }
                    }
                });
            }));
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(product: IDeleteProduct) {
        try {
            const deleteProduct = await this.prisma.product.delete({
                where: {
                    id: product.id
                }
            })
        } catch (error) {
            throw error
        }
    }


    async createCategory(category: ICreateCategory, authorId) {
        
        try {
            const createCategory = await this.prisma.category.create({
                data: {
                    name: category.name,
                    Users: {
                        create: {userId: authorId}
                    }
                }
            })
            return createCategory
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


    async getCategories(authorId: number) {
        try {
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
            return categories;
        } catch (error) {
            throw new Error(error);
        }
    }


    async findMaxOrder(categories: Category[], authorId: number): Promise<number | null> {
        try {
            let maxOrder: number | null = null;

            for (const category of categories) {
                const result = await this.prisma.product.aggregate({
                    where: {
                        categories: {
                            some: {
                                id: category.id 
                            }
                        },
                        authorId: authorId
                    },
                    _max: {
                        order: true
                    }
                });

                
                if (result._max.order && (maxOrder === null || result._max.order > maxOrder)) {
                    maxOrder = result._max.order;
                }
            }

            // Return the maximum order
            return maxOrder || 0;
        } catch (error) {
            console.error('Error finding max order:', error);
            throw error;
        }
    }





}
