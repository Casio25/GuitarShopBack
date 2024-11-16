import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { IChangeProduct, ICreateProduct, IGetProductsDataServiceResponse } from "@src/utils/interface/ProductInterface";

@Injectable()
export class ProductDataService {
    constructor(private prisma: PrismaService) { }
    async createProduct(product: ICreateProduct, authorId: number, photoLink: string) {
        try {

            const newProduct = await this.prisma.product.create({
                data: {
                    authorId: authorId,
                    name: product.name,
                    photo: photoLink,
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
                include: {
                    orders: true
                }
            });
            return productOrders;
        } catch (error) {
            throw error;
        }
    }

    async getProducts(where: any, skip?: number, take?: number): Promise<IGetProductsDataServiceResponse> {
        try {
            const productWhereClause: any = { ...where };

            if (productWhereClause.ids) {
                productWhereClause.id = { in: productWhereClause.ids };
                delete productWhereClause.ids;
            }
            if (!skip) {
                skip = 0
            }
            if (!take) {
                take = 100
            }
            const count = await this.prisma.product.count({
                where: productWhereClause,
            })
            const products = await this.prisma.product.findMany({
                skip: skip,
                take: take,
                where: productWhereClause,
                include: {
                    categories: true,
                    orders: true
                }
            });

            return { count, data: products }
        } catch (error) {
            throw error;
        }
    }

    async changeProduct(productId: number, product: IChangeProduct) {
        try {
            const existingProduct = await this.prisma.product.findUnique({
                where: {
                    id: productId
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

            const updatedProduct = await this.prisma.product.update({
                where: {
                    id: productId
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

            await this.prisma.product.deleteMany({
                where: {
                    categories: {
                        none: {}
                    }
                }
            })

            return updatedProduct
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId: number) {
        try {
            const productToDelete = await this.prisma.product.findUnique({
                where: {
                    id: productId
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
            await Promise.all(productToDelete.orders.map(order =>
                this.prisma.orderOfProduct.delete({
                    where: {
                        id: order.id
                    }
                })
            ));

            console.log("Product, categories, and orders deleted successfully.");
            console.log(productToDelete)

        } catch (error) {
            console.error("Error deleting product")
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
}