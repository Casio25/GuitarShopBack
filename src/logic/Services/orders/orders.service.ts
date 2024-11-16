import { CategoryDataService } from '../../DataServices/categoryData.service';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { OrderDataService } from '@src/logic/DataServices/orderDataService';
import { UpdateOrderDto } from '../../Dto/order/update-order.dto';
import { CreateOrderInterface } from '@src/utils/interface/orderInterface';
import {  GetOrderVenue, IGetOrdersResponse } from '@src/utils/interface/orderInterface';
import { IGetOrdersDataServiceResponse } from '@src/utils/interface/IGetOrder';
import { IUserRequest } from '@src/utils/interface/requestInterface';
import { IDataServiceUser } from '@src/utils/interface/IUser';
import { User } from '@prisma/client';
import { ProductDataService } from '@src/logic/DataServices/productData.service';

@Injectable()
export class OrdersService {
  constructor(private orderDataService: OrderDataService,
    private categoryDataService: CategoryDataService,
    private productDataService: ProductDataService, 
    private authDataService: AuthDataService) { }

  private checkAdminRole(user: User) {
    console.log("user", user.roleId)
    if (user.roleId !== 1) {
      throw new UnauthorizedException("Access denied")
    }
  }
  private checkForUser(user: User) {
    if (!user) {
      throw new NotFoundException("User not found")
    }
  }

  async create(createOrderDto: CreateOrderInterface, user) {
    try{
    const email = user.email
    const existingUser = await this.authDataService.findUser(email);
    

    if (!existingUser) {
      throw new Error('User not found');
    }

    //getting product quantities per product
      const productQuantities = createOrderDto.products.reduce((acc, product) => {
        acc[product.productId] = product.quantity;
        return acc;
      }, {});
      

    const productIds = createOrderDto.products.map(product => product.productId);
    console.log("productIds", productIds)
    console.log("user.uid")
      const allProducts = await this.productDataService.getProducts({
        id: { in: productIds },
        authorId: user.uid
      });
     if (allProducts.data.length === 0){
       throw new Error('Wrong product id or user id');
     }
     console.log("all products", allProducts)

      const allProductsPrice = allProducts.data.reduce((total, product) => {
        const quantity = productQuantities[product.id] || 0;
        console.log(`Product ID: ${product.id}, Price: ${product.price}, Quantity: ${quantity}`);
        return total + (product.price * quantity);
      }, 0);

      
      createOrderDto.products.map(product => {
        const matchedProduct = allProducts.data.find(p => p.id === product.productId);
        if (matchedProduct) {
          product.productPrice =  matchedProduct.price
          product.productName = matchedProduct.name
        }else{

        }
      })
      console.log("createOrderDto", createOrderDto)

    const newOrder = await this.orderDataService.create(createOrderDto, existingUser.id, allProductsPrice)
    return newOrder
  }catch (error){
    throw new Error(error);
    
  }
  }

  async update(updateOrderDto, user){
    try{
      const email = user.email
      const existingUser = await this.authDataService.findUser(email);
      console.log("user who create: ", existingUser);

      if (!existingUser) {
        throw new Error('User not found');
      }
      //getting product quantities per product
      const productQuantities = updateOrderDto.products.reduce((acc, product) => {
        acc[product.productId] = product.quantity;
        return acc;
      }, {});


      const productIds = updateOrderDto.products.map(product => product.productId);
      console.log("productIds", productIds)
      console.log("user.uid")
      const allProducts = await this.productDataService.getProducts({
        id: { in: productIds },
        authorId: user.uid
      });
      if (allProducts.data.length === 0) {
        throw new Error('Wrong product id or user id');
      }

      const allProductsPrice = allProducts.data.reduce((total, product) => {
        const quantity = productQuantities[product.id] || 0;
        console.log(`Product ID: ${product.id}, Price: ${product.price}, Quantity: ${quantity}`);
        return total + (product.price * quantity);
      }, 0);

      console.log("all productsPrice", allProductsPrice)
      const updatedOrder = await this.orderDataService.update(updateOrderDto, existingUser.id, allProductsPrice)
      return updatedOrder
    }catch(error){
      console.error("error updating order =>", error)
      throw error
    }
  }

  async getOrders(user): Promise<IGetOrdersDataServiceResponse>{
    try{
    const email = user.email
    const existingUser = await this.authDataService.findUser(email);
    console.log("user who create: ", existingUser);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const allOrders = await this.orderDataService.findAll(existingUser.id)
    console.log(allOrders)
    return allOrders
    } catch (error) {
      throw new Error(error);
    }
  }

  
}
