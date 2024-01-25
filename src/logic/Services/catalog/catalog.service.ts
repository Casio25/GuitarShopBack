import { CatalogDataService } from 'src/logic/DataServices/catalogData.service';
import { CreateProductDto } from './../../Dto/catalog/create-product.dto';

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res } from '@nestjs/common';
import { offers } from 'src/data/CatalogData';
import { ICreateProduct, IProductAuth, IChangeProduct } from 'src/utils/interface/ProductInterface';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import { ICreateCategory } from 'src/utils/interface/categoryInterface';
const fs = require("fs");
const catalogData = fs.readFileSync('catalog.txt', 'utf-8');
interface IQueryParams {
  
  type: string,
  string: string,
  price?: string
  
}


@Injectable()
export class CatalogService {
  private catalogOffers = catalogData;
  constructor(private catalogDataService: CatalogDataService,
    private authDataService: AuthDataService) {}

  getCatalog() {
    return this.catalogOffers;
  }

  async createProduct(createProductDto: ICreateProduct, email: string) {
    try {
      const user = await this.authDataService.findUser(email);

      if (!user) {
        throw new Error('User not found');
      }
      console.log(user);
      console.log(typeof(user.id))

      const categoryId = await this.catalogDataService.findCategory(createProductDto.category)
      const newProduct = await this.catalogDataService.createProduct(createProductDto, user.id, categoryId.id);
      console.log(newProduct)

    } catch (error) {
      console.error(error);
    }
  }

  

  async getProducts(query: IQueryParams, request) {
    const where: any = {

    };
    if (request.user !== undefined && request.user.role === "ADMIN"){
      where.authorId = request.user.id
    }
    if (query.type) {
      where.type = query.type.split(',');
    }

    if (query.string) {
      where.string = query.string.split(',');
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

    try {
      const products = await this.catalogDataService.getProducts(where);
      console.log("where:", where)
      console.log("products", products)
      // Create a new workbook and add a worksheet
      // const workbook = new ExcelJS.Workbook();
      // const sheet = workbook.addWorksheet('Products');

      // // Add headers to the worksheet
      // const headers = ['Product Name', "AuthorId", 'Price', 'Type', 'String', 'Rating' /* Add more fields as needed */];
      // sheet.addRow(headers);

      // // Add data to the worksheet
      // products.forEach(product => {
      //   sheet.addRow([product.productName, product.authorId, product.price, product.type, product.string, product.rating /* Add more fields as needed */]);
      // });

      // // Return the Excel file as a Buffer
      // return workbook.xlsx.writeBuffer()
      return products
    } catch (error) {
      throw error;
    }
  }

  async changeProduct(changeProductDto: IChangeProduct, user){

    try{
      if (user.role === "ADMIN" && user.id === changeProductDto.authorId){
        const categoryId = await this.catalogDataService.findCategory(changeProductDto.category)
        const changedProduct = await this.catalogDataService.changeProduct(changeProductDto, categoryId)
      }
    }catch (error) {
      throw error;
      
    }

  }

  async createCategory(createCategoryDto: ICreateCategory){
    try {
      const existingCategory = await this.catalogDataService.findCategory(createCategoryDto.name);

      if (existingCategory) {
        return {
          status: 400,
          message: 'Category with this name already exists',
        };
      }

      const newCategory = await this.catalogDataService.createCategory(createCategoryDto);
      console.log(newCategory);

      return {
        status: 201,
        data: newCategory,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }
}