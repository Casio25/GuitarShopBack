import { CatalogDataService } from './../../DataServices/catalogData.service';
import { Injectable } from '@nestjs/common';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { OrderDataService } from 'src/logic/DataServices/orderDataServce';
import { UpdateOrderDto } from '../../Dto/order/update-order.dto';
import { CreateOrderInterface } from 'src/utils/interface/createOrderInterface';

@Injectable()
export class OrdersService {
  constructor(private orderDataService: OrderDataService,
    private catalogDataService: CatalogDataService,
    private authDataService: AuthDataService) { }

  async create(createOrderDto: CreateOrderInterface, user) {
    try{
    const email = user.email
    const existingUser = await this.authDataService.findUser(email);
    console.log("user who create: ", existingUser);

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
    console.log("user.id")
      const allProducts = await this.catalogDataService.getProducts({
        id: { in: productIds },
        authorId: user.id
      });
     if (allProducts.length === 0){
       throw new Error('Wrong product id or user id');
     }
     console.log("all products", allProducts)

      const allProductsPrice = allProducts.reduce((total, product) => {
        const quantity = productQuantities[product.id] || 0;
        console.log(`Product ID: ${product.id}, Price: ${product.price}, Quantity: ${quantity}`);
        return total + (product.price * quantity);
      }, 0);

      console.log("all productsPrice", allProductsPrice)
      createOrderDto.products.map(product => {
        const matchedProduct = allProducts.find(p => p.id === product.productId);
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
      console.log("user.id")
      const allProducts = await this.catalogDataService.getProducts({
        id: { in: productIds },
        authorId: user.id
      });
      if (allProducts.length === 0) {
        throw new Error('Wrong product id or user id');
      }

      const allProductsPrice = allProducts.reduce((total, product) => {
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

  async findAll(user) {
    try{
    const email = user.email
    const existingUser = await this.authDataService.findUser(email);
    console.log("user who create: ", existingUser);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const allOrders = await this.orderDataService.findAll(existingUser.id)
    return allOrders
    } catch (error) {
      throw new Error(error);
    }
  }
}
