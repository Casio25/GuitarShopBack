
import { CategoryDataService } from '@src/logic/DataServices/categoryData.service';
import { CreateProductDto, GetArrayOfProductsResponseDto, GetProductsResponseDTO } from '../../Dto/product/create-product.dto';

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res, BadRequestException, NotFoundException, ForbiddenException, BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { offers } from 'src/data/CatalogData';
import { ICreateProduct, IProductAuth, IChangeProduct, IReorderProduct, IGetProducts, ICreateProductResponse, ICreateProductResponseData, IGetProductsResponse, IGetProductsDataServiceResponse } from '@src/utils/interface/ProductInterface';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import { ICreateCategory, ICreateCategoryDataResponse, ICreateCategoryResponse, IDeleteCategory, IGetCategoriesDataServiceResponse, IGetCategoriesResponse } from '@src/utils/interface/categoryInterface';

import {  IUserRequest } from '@src/utils/interface/requestInterface';
import { User } from '@prisma/client';


import { AzureBlobService } from '../azure-blob/azure-blob.service';

const fs = require("fs");
const catalogData = fs.readFileSync('catalog.txt', 'utf-8');



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
const sharp = require("sharp");

// const resizeImage = async (photo: File, productName): Promise<string> => {
//   try {
    
//     const base64Data = photo.replace(/^data:image\/\w+;base64,/, "");

//     const imageBuffer = Buffer.from(base64Data, 'base64');
    
//     const resizedBuffer = await sharp(imageBuffer)
//     .resize({
//       width: 20,
//       height: 20
//     })
//     .toFormat("jpeg", {mozjpeg: true})
//     .toBuffer()
    
//     return resizedBuffer;

//   }catch (error) {
//     console.log("error compressing photo", error)
//     throw new Error ('Errorcompressing photo')
//   }
// }


@Injectable()
export class CategoryService {
  createProduct(newProduct: { name: string; authorId: number; price: number; photo: string; categories: { id: number; name: string; type: string; }[]; orders: { id: number; order: number; categoryId: number; authorId: number; }[]; description: string; visibility: boolean; inStock: boolean; }, email: string) {
    throw new Error('Method not implemented.');
  }
  getProducts(query: { type: string; productId: string; string: string; categories: { id: number; name: string; type: string; }[]; orders: { id: number; order: number; categoryId: number; authorId: number; }[]; }, request: { user: { id: number; email: string; roleId: number; }; }) {
    throw new Error('Method not implemented.');
  }
  changeProduct(changedProduct: { id: number; name: string; authorId: number; price: number; photo: string; categories: { id: number; name: string; type: string; }[]; orders: { productId: number; id: number; order: number; categoryId: number; authorId: number; }[]; description: string; visibility: boolean; inStock: boolean; }, email: string) {
    throw new Error('Method not implemented.');
  }
  deleteProduct(deletedProduct: { id: number; authorId: number; categories: { id: number; name: string; type: string; }[]; orders: { productId: number; id: number; order: number; categoryId: number; authorId: number; }[]; }, email: string) {
    throw new Error('Method not implemented.');
  }
  getMaxOrder(getMaxOrder: { categoryId: number; }, email: string) {
    throw new Error('Method not implemented.');
  }
  private containerName = "photos"
  private catalogOffers = catalogData;
  constructor(private categoryDataService: CategoryDataService,
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


 

  async getCategories(user: IUserRequest): Promise<IGetCategoriesDataServiceResponse> {
    const userData = {
      id: user.uid
    }
    const foundedUser = await this.authDataService.findUser(user.email)
    this.checkForUser(foundedUser)
    this.checkAdminRole(foundedUser)
    console.log("founded user", foundedUser)
    const categories = await this.categoryDataService.getCategories(foundedUser.id)
    console.log("categories", categories)
      return categories
    
  }

  async createCategory(createCategoryDto: ICreateCategory, user: IUserRequest): Promise<any> {
    console.log (" user during creating category", user)
      const existingCategory= await this.categoryDataService.findCategory(createCategoryDto.name);
      console.log ('existingCategory info', existingCategory)
      if (existingCategory && existingCategory.Users.find(u => u.userId === user.uid)) {
        console.log("category already exists")
        throw new BadRequestException("Category with this name already exists")
      }else{
        await this.categoryDataService.createCategory(createCategoryDto, user.uid);
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
     await this.categoryDataService.deleteCategory(deleteCategoryDto, foundedUser.id)
    }catch (error){
      throw new Error ("Error deleting category")
    }  
  }

  
}