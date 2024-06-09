import { IGetProducts } from './../../utils/interface/ProductInterface';

import { ICreateProduct, IProductAuth, IChangeProduct, IDeleteProduct, IReorderProduct } from 'src/utils/interface/ProductInterface';
import { CreateProductDto } from 'src/logic/Dto/catalog/create-product.dto';
import { ConsoleLogger, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ICreateCategory } from 'src/utils/interface/categoryInterface';
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
export class CatalogDataService {
    constructor(private prisma: PrismaService) {}
    async createProduct(product: ICreateProduct, authorId: number): Promise<any> {
        try {
            // Create the product
            console.log("product from front", product);
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
                        connect: product.categories.map(category => ({ id: category.id })),
                    },
                },
            });

            // Create orders for the product
            const orders = await Promise.all(product.orders.map(order => {
                return this.prisma.orderOfProduct.create({
                    data: {
                        order: order.order + 1,
                        categoryId: order.categoryId,
                        authorId: newProduct.authorId
                    }
                });
            }));

            console.log("Orders created:", orders);

            // Update the product to include the newly created orders
            await this.prisma.product.update({
                where: { id: newProduct.id },
                data: {
                    orders: {
                        connect: orders.map(order => ({ id: order.id }))
                    }
                }
            });

            console.log("Product updated with orders.");

            return newProduct;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }








    async getOrderByProduct(productId: number) {
        try {
            // Retrieve orders for the specified product
            const productOrders = await this.prisma.product.findMany({
                where: {
                    id: productId
                },
               include:{
                    orders: true
               }
            });
            return productOrders;
        } catch (error) {
            throw error;
        }
    }


    async getProducts(where: any): Promise<any> {
        try {
            const productWhereClause: any = { ...where };

            if (productWhereClause.ids) {
                productWhereClause.id = { in: productWhereClause.ids };
                delete productWhereClause.ids; // Remove 'ids' since it's now part of 'id' filter
            }

            const products = await this.prisma.product.findMany({
                where: productWhereClause,
                include: {
                    categories: true,
                    orders: true // Ensure that the 'orders' property is included in the query
                }
            });

            return products;
        } catch (error) {
            throw error;
        }
    }


    async getBiggerOrderProducts(product: IQueryParams, authorId: number): Promise<any> {
        try {
            const products = await this.prisma.product.findMany({
                where: {
                    authorId: authorId,
                    ...product,
                    // Filter products where the 'orders' field contains orders with order greater than the provided product's order
                    orders: {
                        some: {
                            order: {
                                gt: product.orders[0].order // Assuming there's only one order in the 'orders' array
                            }
                        }
                    },
                    // Filtering products based on the category ID
                    categories: {
                        // Assuming you have the category ID available in your product object
                        // Change it accordingly if you're filtering by some other condition
                        some: {
                            id: product.categories[0].id // Assuming there's only one category in the 'categories' array
                        }
                    }
                },
                include: {
                    categories: true,
                    orders: true // Ensure that the 'orders' property is included in the query
                }
            });
            return products;
        } catch (error) {
            throw error;
        }
    }




    

    async changeProduct(product: IChangeProduct) {
        try {
            const existingProduct = await this.prisma.product.findUnique({
                where: {
                    id: product.id
                },
                include: {
                    orders: true // Include the orders associated with the product
                }
            });

            if (!existingProduct) {
                throw new Error("Product not found");
            }

            // Delete all orders associated with the existing product
            await Promise.all(existingProduct.orders.map(order =>
                this.prisma.orderOfProduct.delete({
                    where: {
                        id: order.id
                    }
                })
            ));
            // Update the product details
            const updatedProduct = await this.prisma.product.update({
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
                        set: product.categories.map(category => ({ id: category.id }))
                    },
                },

            });
            const orders = await Promise.all(product.orders.map(order => {
                return this.prisma.orderOfProduct.create({
                    data: {
                        order: order.order,
                        categoryId: order.categoryId,
                        authorId: updatedProduct.authorId
                    }
                });
            }));

            await this.prisma.product.update({
                where: { id: updatedProduct.id },
                data: {
                    orders: {
                        connect: orders.map(order => ({ id: order.id }))
                    }
                }
            });

            return  updatedProduct
        } catch (error) {
            throw error;
        }
    }




    // async reorderProduct(reorderProductDto: IReorderProduct): Promise<void> {
    //     try {
    //         const { categoryId, id, newOrder } = reorderProductDto;

    //         // Fetch the product and its current category
    //         const product = await this.prisma.product.findUnique({
    //             where: { id: id },
    //             include: { categories: true }
    //         });

    //         if (!product) {
    //             throw new Error("Product not found");
    //         }

    //         // Find the category index within the product's categories
    //         const categoryIndex = product.categories.findIndex(
    //             category => category.id === categoryId
    //         );

    //         if (categoryIndex === -1) {
    //             throw new Error("Category not found in product");
    //         }

    //         // Update the order of the product within the category
    //         const updatedProductCategories = [...product.categories];
    //         updatedProductCategories[categoryIndex] = {
    //             ...updatedProductCategories[categoryIndex],
    //             orders: newOrder
    //         };

    //         // Update the product with the updated categories
    //         await this.prisma.product.update({
    //             where: { id: id },
    //             data: {
    //                 categories: {
    //                     set: updatedProductCategories
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         throw error;
    //     }
    // }




    // async lowerOrderByOne(products: IChangeProduct[]): Promise<void> {
    //     try {
    //         await Promise.all(products.map(async (product) => {
    //             await Promise.all(product.categories.map(async (category) => {
    //                 await this.prisma.orderOfProduct.update({
    //                     where: {
    //                         categoryId: category.id,
    //                         authorId: product.authorId
    //                     },
    //                     data: {
    //                         orders: {
    //                             order:{ decrement: 1}
                                
    //                         }
    //                     }
    //                 });
    //             }));
    //         }));
    //     } catch (error) {
    //         throw error;
    //     }
    // }


    async deleteProduct(product: IDeleteProduct) {
        console.log("deleted product:", product);
        try {
            const productToDelete = await this.prisma.product.findUnique({
                where: {
                    id: product.id
                },
                include: {
                    categories: true,
                    orders: true
                }
            });

            // Delete the product along with its related categories and orders
            await this.prisma.product.delete({
                where: {
                    id: productToDelete.id
                },
                include: {
                    categories: true,
                    orders: true
                }
            });

            console.log("Product, categories, and orders deleted successfully.");
        } catch (error) {
            throw error;
        }
    }

    async deleteCategory(category, authorId){
        try {
            console.log(category)
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


    async findMaxOrder(categoryId: number, authorId: number): Promise<number | null> {
        try {
            const maxOrderProduct = await this.prisma.orderOfProduct.findFirst({
                where: { categoryId: categoryId,
                authorId: authorId },
                orderBy: { order: 'desc' },
            });

            return maxOrderProduct ? maxOrderProduct.order : 0;
        } catch (error) {
            console.error('Error finding max order:', error);
            throw error;
        }
    }



        





}
