import { ChangeProductDto } from 'src/logic/Dto/catalog/change-product.dto';
import { CatalogDataService } from 'src/logic/DataServices/catalogData.service';
import { CreateProductDto } from './../../Dto/catalog/create-product.dto';

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res } from '@nestjs/common';
import { offers } from 'src/data/CatalogData';
import { ICreateProduct, IProductAuth, IChangeProduct, IReorderProduct } from 'src/utils/interface/ProductInterface';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import { ICreateCategory } from 'src/utils/interface/categoryInterface';
import { DeleteProductDto } from 'src/logic/Dto/catalog/delete-product.dto';

const fs = require("fs");
const catalogData = fs.readFileSync('catalog.txt', 'utf-8');
interface IQueryParams {

  type?: string,
  string?: string,
  price?: string,
  order?: number,
  categoryId?: number

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


@Injectable()
export class CatalogService {
  private catalogOffers = catalogData;
  constructor(private catalogDataService: CatalogDataService,
    private authDataService: AuthDataService) { }

  getCatalog() {
    return this.catalogOffers;
  }

  async createProduct(createProductDto: ICreateProduct, email: string) {
    try {
      const user = await this.authDataService.findUser(email);
      console.log ("user who create: ", user)

      if (!user) {
        throw new Error('User not found');
      }
      
      

      const orderId = await this.catalogDataService.findMaxOrder(createProductDto.categories, user.id)
      const newProduct = await this.catalogDataService.createProduct(createProductDto, user.id, orderId);
      console.log("new produdct", newProduct)

    } catch (error) {
      console.error(error);
    }
  }



  async getProducts(query: IQueryParams, request) {
    const where: any = {

    };
    if (request.user !== undefined && request.user.role === "ADMIN") {
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

    if (query.order) {
      where.order = query.order
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId
    }

    try {
      const products = await this.catalogDataService.getProducts(where);

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
      throw new Error(error)
    }
  }

  async changeProduct(changeProductDto: IChangeProduct, user) {
    try {
      if (user.role === "ADMIN" && user.id === changeProductDto.authorId) {
        console.log("Product successfully updated");
        const changedProduct = await this.catalogDataService.changeProduct(changeProductDto);
        return changedProduct; // Return the updated product if needed
      }
      else{
        throw new Error
      }
    } catch (error) {
      console.error("Error updating product: ", error);
      throw error;
    }
  }


  async reorderProduct(reorderProductDto: IReorderProduct, user) {
    try {
      if (user.role === "ADMIN" && user.id === reorderProductDto.authorId) {
        const changedProduct = await this.catalogDataService.reorderProduct(reorderProductDto)
      }
    } catch (error) {
      throw new Error(error)

    }
  }

  async lowerOrderByOne(changeProductDto: IChangeProduct | IChangeProduct[], user): Promise<void> {
    try {
      if (user.role === "ADMIN") {
        const productsToUpdate = Array.isArray(changeProductDto) ? changeProductDto : [changeProductDto];
        await this.catalogDataService.lowerOrderByOne(productsToUpdate);
      }
    } catch (error) {
      throw new Error(error);
    }
  }


  async deleteProduct(deleteProductDto: DeleteProductDto, user) {
    try {
      if (user.role === "ADMIN" && user.id === deleteProductDto.authorId) {
        const deletedProduct = await this.catalogDataService.deleteProduct(deleteProductDto)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async getCategories(user) {
    try {
      const categories = await this.catalogDataService.getCategories(user.id)
      return categories
    } catch (error) {
      throw new Error(error)
    }
  }

  async createCategory(createCategoryDto: ICreateCategory, user) {
    try {
      const existingCategory= await this.catalogDataService.findCategory(createCategoryDto.name);

      if (existingCategory && existingCategory.Users.find(u => u.userId === user.id)) {
        return {
          status: 400,
          message: 'Category with this name already exists',
        };
      }

      const newCategory = await this.catalogDataService.createCategory(createCategoryDto, user.id);
      

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