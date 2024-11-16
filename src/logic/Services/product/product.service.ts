
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res, BadRequestException, NotFoundException, ForbiddenException, BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { offers } from 'src/data/CatalogData';
import { ICreateProduct, IProductAuth, IChangeProduct, IReorderProduct, IGetProducts, ICreateProductResponse, ICreateProductResponseData, IGetProductsResponse, IGetProductsDataServiceResponse, IGetProductsQuery } from '@src/utils/interface/ProductInterface';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { query, Response } from 'express';
import * as ExcelJS from 'exceljs';
import { ICreateCategory, ICreateCategoryDataResponse, ICreateCategoryResponse, IDeleteCategory, IGetCategoriesDataServiceResponse, IGetCategoriesResponse } from '@src/utils/interface/categoryInterface';

import { IUserRequest } from '@src/utils/interface/requestInterface';
import { User } from '@prisma/client';
import { AzureBlobService } from '../azure-blob/azure-blob.service';

import { ProductDataService } from '@src/logic/DataServices/productData.service';
import { CategoryDataService } from '@src/logic/DataServices/categoryData.service';


@Injectable()
export class ProductService {
  private containerName = "photos"
  constructor(private productDataService: ProductDataService,
    private categoryDataService: CategoryDataService,
    private authDataService: AuthDataService,
    private azureBlobServie: AzureBlobService) { }

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
  async createProduct(createProductDto: ICreateProduct, user: IUserRequest): Promise<any> {
    const userData = {
      id: user.uid
    }
    const foundedUser = await this.authDataService.findUser(user.email)

    this.checkForUser(foundedUser)
    this.checkAdminRole(foundedUser)

    const existingProduct = await this.productDataService.findProduct(createProductDto.name);
    if (existingProduct && existingProduct.authorId === foundedUser.id) {
      throw new BadRequestException("Product with this name already exists")
    } else {
      // const resizedPhoto = await resizeImage(createProductDto.photo, createProductDto.name)
      // console.log("resizedPhoto", resizedPhoto)
      await this.updateProductOrders(createProductDto, user.uid)
      const photoLink = await this.azureBlobServie.uploadStringPhoto(createProductDto.photo, createProductDto.name, this.containerName)
      const newProduct = await this.productDataService.createProduct(createProductDto, foundedUser.id, photoLink);
      console.log("new product", newProduct);
    }
  }





  async getProducts(query: IGetProductsQuery, user: IUserRequest): Promise<IGetProductsDataServiceResponse> {
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

    if (query.skip) {
      skip = query.skip
    }
    if (query.take) {
      take = query.take
    }




    try {
      const products = await this.productDataService.getProducts(where, skip, take);
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(changeProductDto: IChangeProduct, userData: IUserRequest) {
    const user = await this.authDataService.findUser(userData.email);
    if (user.roleId === 1 && user.id === changeProductDto.authorId) {
      await this.productDataService.changeProduct(changeProductDto);
    } else {
      throw new BadRequestException("Error changing products")
    }

  }


  async deleteProduct(productId, user: IUserRequest) {
    const foundedUser = await this.authDataService.findUser(user.email)
    this.checkForUser(foundedUser)
    this.checkAdminRole(foundedUser)
    const productFound = await this.getProducts({productIds: `${productId}`}, user)
    if (foundedUser.roleId == 1 ) {
      await this.productDataService.deleteProduct(Number(productId))
      await this.azureBlobServie.deleteFileByURL(productFound.data[0].photo, this.containerName)
    } else {
      throw new BadRequestException()
    }
  }

  async getMaxOrder(categoryId: number, authorId: number): Promise<number> {
    const maxOrder = await this.categoryDataService.findMaxOrder(categoryId, authorId)
    console.log(maxOrder)
    return maxOrder

  }
  async updateProductOrders(createProductDto: ICreateProduct, userId: number) {
  const maxOrders = await Promise.all(
    createProductDto.categories.map(category =>
      this.getMaxOrder(category.id, userId)
    )
  );

  createProductDto.orders = maxOrders.map((order, index) => ({
    authorId: userId,
    order,
    categoryId: createProductDto.categories[index].id
  }));
}


}
