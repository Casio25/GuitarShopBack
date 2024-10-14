import { ChangeProductDto } from 'src/logic/Dto/catalog/change-product.dto';
import { CatalogDataService } from 'src/logic/DataServices/catalogData.service';
import { CreateProductDto, GetArrayOfProductsResponseDto, GetProductsResponseDTO } from './../../Dto/catalog/create-product.dto';

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res, BadRequestException, NotFoundException, ForbiddenException, BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { offers } from 'src/data/CatalogData';
import { ICreateProduct, IProductAuth, IChangeProduct, IReorderProduct, IGetProducts, ICreateProductResponse, ICreateProductResponseData, IGetProductsResponse, IGetProductsDataServiceResponse } from '@src/utils/interface/ProductInterface';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import { ICreateCategory, ICreateCategoryDataResponse, ICreateCategoryResponse, IDeleteCategory, IGetCategoriesDataServiceResponse, IGetCategoriesResponse } from '@src/utils/interface/categoryInterface';
import { DeleteProductDto } from 'src/logic/Dto/catalog/delete-product.dto';
import { IOrdersRequest, IUserRequest } from '@src/utils/interface/requestInterface';
import { User } from '@prisma/client';

import { AzureBlobService } from '../azure-blob/azure-blob.service';

const fs = require("fs");
const catalogData = fs.readFileSync('catalog.txt', 'utf-8');
interface IQueryParams {
  type?: string,
  string?: string,
  price?: string,
  productIds?: string,
  categories: Category[]
  orders: Order[]
  skip: number,
  take: number
}
interface IWhereParams {
  authorId: number;
  type?: string[];
  string?: string[];
  minPrice?: number;
  maxPrice?: number;
  order?: number;
  categoryId?: number;
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


@Injectable()
export class CatalogService {
  private containerName = "photos"
  private catalogOffers = catalogData;
  constructor(private catalogDataService: CatalogDataService,
    private authDataService: AuthDataService,
    private azureBlobServie: AzureBlobService) { }

  private checkAdminRole(user: User){
    console.log("user", user.roleId)
    if (user.roleId !== 1){
      throw new UnauthorizedException("Access denied")
    }
  }
  private checkForUser(user: User){
    if (!user){
      throw new NotFoundException("User not found")
    }
  }


  

  async createProduct(createProductDto: ICreateProduct, user: IUserRequest): Promise<any> {
    const userData = {
      id: user.uid
    }
    const foundedUser = await this.authDataService.findUser(user.email)

      this.checkForUser(foundedUser)
      this.checkAdminRole(foundedUser)

      const existingProduct = await this.catalogDataService.findProduct(createProductDto.name);
      if (existingProduct && existingProduct.authorId === foundedUser.id) {
        throw new BadRequestException("Product with this name already exists")
      } else {
        // const photoLink = await this. azureBlobServie.upload(createProductDto.photo, this.containerName)
        const newProduct = await this.catalogDataService.createProduct(createProductDto, foundedUser.id);
        console.log("new product", newProduct);
      }
  }





  async getProducts(query: IQueryParams, user: IUserRequest): Promise<IGetProductsDataServiceResponse> {
    console.log("query", query); 
    const userData = {
      id: user.uid
    }
    const foundedUser = await this.authDataService.findUser(user.email)
    const where: any = {};
    let skip = 0;
    let take = 100

    if (foundedUser !== undefined && foundedUser.roleId === 1) {
      where.authorId = userData.id;
    }
    if (query.productIds) {
      
      const productIds = Array.isArray(query.productIds)
        ? query.productIds.map(id => Number(id))
        : query.productIds.split(',').map(id => Number(id));

      where.id = { in: productIds }; 
    }
    
    if (query.price) {
      const price = JSON.parse(query.price);
      if (price.minPrice !== undefined) {
        where.minPrice = price.minPrice;
      }
      if (price.maxPrice !== undefined) {
        where.maxPrice = price.maxPrice;
      }
    }

    if (query.orders) {
      where.orders = {
        // Flatten the array of objects into an array of order values
        equals: query.orders.map(order => order.order)
      };
    }

    if (query.skip){
      skip = query.skip
    }
    if (query.take){
      take = query.take
    }


    

    try {
      const products = await this.catalogDataService.getProducts(where, skip, take);
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

   async getBiggerOrderProducts(product: IQueryParams, user) {
     try {
       // Check if the where object is correctly constructed
       const products = await this.catalogDataService.getBiggerOrderProducts(product, user.uid);
       return products;
     } catch (error) {
       throw new BadRequestException("Error getting bigger order products: ", error);
     }
   }

  async changeProduct(changeProductDto: IChangeProduct, userData: IUserRequest) {
      const user = await this.authDataService.findUser(userData.email);
      if (user.roleId === 1 && user.id === changeProductDto.authorId) {
        await this.catalogDataService.changeProduct(changeProductDto);
      }else{
        throw new BadRequestException("Error changing products")
      }
    
  }


  // async reorderProduct(reorderProductDto: IReorderProduct, user) {
  //   try {
  //     if (user.role === "ADMIN" && user.uid === reorderProductDto.authorId) {
  //       const changedProduct = await this.catalogDataService.reorderProduct(reorderProductDto)
  //     }
  //   } catch (error) {
  //     throw new Error(error)

  //   }
  // }

  // async lowerOrderByOne(changeProductDto: IChangeProduct | IChangeProduct[], user): Promise<void> {
  //   try {
  //     if (user.role === "ADMIN") {
  //       const productsToUpdate = Array.isArray(changeProductDto) ? changeProductDto : [changeProductDto];
  //       await this.catalogDataService.lowerOrderByOne(productsToUpdate);
  //     }
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }


  async deleteProduct(deleteProductDto: DeleteProductDto, user: IUserRequest) {
    
    const userData = {
      id: user.uid
    }
    const foundedUser = await this.authDataService.findUser(user.email)
      console.log("user found", foundedUser)
      this.checkForUser(foundedUser)
      this.checkAdminRole(foundedUser)
      if (foundedUser.roleId == 1 && foundedUser.id === deleteProductDto.authorId) {
        await this.catalogDataService.deleteProduct(deleteProductDto)
      }else {
        throw new BadRequestException()
      }
  }

  async getCategories(user: IUserRequest): Promise<IGetCategoriesDataServiceResponse> {
    const userData = {
      id: user.uid
    }
    const foundedUser = await this.authDataService.findUser(user.email)
    this.checkForUser(foundedUser)
    this.checkAdminRole(foundedUser)
    console.log("founded user", foundedUser)
    const categories = await this.catalogDataService.getCategories(foundedUser.id)
    console.log("categories", categories)
      return categories
    
  }

  async createCategory(createCategoryDto: ICreateCategory, user: IUserRequest): Promise<any> {
    console.log (" user during creating category", user)
      const existingCategory= await this.catalogDataService.findCategory(createCategoryDto.name);
      console.log ('existingCategory info', existingCategory)
      if (existingCategory && existingCategory.Users.find(u => u.userId === user.uid)) {
        console.log("category already exists")
        throw new BadRequestException("Category with this name already exists")
      }else{
        await this.catalogDataService.createCategory(createCategoryDto, user.uid);
      }

  }

  async deleteCategory(deleteCategoryDto: IDeleteCategory, user: IUserRequest){
    const userData = {
      id: user.uid
    }
    const foundedUser = await this.authDataService.findUser(user.email)
    this.checkForUser(foundedUser)
    this.checkAdminRole(foundedUser)

    try { (foundedUser.roleId === 1)
     await this.catalogDataService.deleteCategory(deleteCategoryDto, foundedUser.id)
    }catch (error){
      throw new Error ("Error deleting category")
    }  
  }

  async getMaxOrder(categoryId: number, authorId: number): Promise<number>{
    const maxOrder = await this.catalogDataService.findMaxOrder(categoryId, authorId)
    console.log(maxOrder)
    return maxOrder
    
  }
}