
import { ICreateProduct, IProductAuth, IChangeProduct, IDeleteProduct, IReorderProduct, Category } from 'src/utils/interface/ProductInterface';
import { CreateProductDto } from 'src/logic/Dto/catalog/create-product.dto';
import { ConsoleLogger, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ICreateCategory } from 'src/utils/interface/categoryInterface';


interface IQueryParams {

    take?: number;
    skip?: number;
    authorId: number;
    name?: string;
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
                        connect: product.categories.map(category => ({ id: category.id,
                            order: orderId + 1 })), // Connect the product to the specified categories
                        
                    },
                    

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
            if (where.name !== undefined){
                whereCondition.name = {
                    name: where.name
                }
            }
            
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
                        set: product.categories.map(category => ({ id: category.id,
                            order: product.order })) // Set the categories for the product
                    },
                    
                }
            });

            return changedProduct;
        } catch (error) {
            throw error;
        }
    }



    async reorderProduct(reorderProductDto: IReorderProduct): Promise<void> {
        try {
            const { categoryId, productId, newOrder } = reorderProductDto;

            // Fetch the product and its current category
            const product = await this.prisma.product.findUnique({
                where: { id: productId },
                include: { categories: true }
            });

            if (!product) {
                throw new Error("Product not found");
            }

            // Find the category index within the product's categories
            const categoryIndex = product.categories.findIndex(
                category => category.id === categoryId
            );

            if (categoryIndex === -1) {
                throw new Error("Category not found in product");
            }

            // Update the order of the product within the category
            const updatedProductCategories = [...product.categories];
            updatedProductCategories[categoryIndex] = {
                ...updatedProductCategories[categoryIndex],
                order: newOrder
            };

            // Update the product with the updated categories
            await this.prisma.product.update({
                where: { id: productId },
                data: {
                    categories: {
                        set: updatedProductCategories
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }




    async lowerOrderByOne(products: IChangeProduct[]): Promise<void> {
        try {
            await Promise.all(products.map(async (product) => {
                await Promise.all(product.categories.map(async (category) => {
                    await this.prisma.category.update({
                        where: {
                            id: category.id
                        },
                        data: {
                            order: {
                                decrement: 1
                            }
                        }
                    });
                }));
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

    async findProduct(product: string) {
        try {
            const productName = await this.prisma.product.findFirst({
                where: {
                    name: product
                },
                select: {
                    id: true,
                    name: true,
                    authorId: true,
                }
            });
            return productName || null;
        } catch (error) {
            console.error("Error finding product: ", error);
            throw new Error(error);
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
                        authorId: authorId,
                        categories: {
                            some: {
                                id: category.id,
                            },
                        },
                    },
                    _max: { order: true },
                });

                const maxOrderInCategory = result?._max?.order;
                if (maxOrderInCategory !== undefined && (maxOrder === null || maxOrderInCategory > maxOrder)) {
                    maxOrder = maxOrderInCategory;
                }
            }

            return maxOrder;
        } catch (error) {
            console.error('Error finding max order:', error);
            throw error;
        }
    }


        





}
