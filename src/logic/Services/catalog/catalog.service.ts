import { ChangeProductDto } from 'src/logic/Dto/catalog/change-product.dto';
import { CatalogDataService } from 'src/logic/DataServices/catalogData.service';
import { CreateProductDto } from './../../Dto/catalog/create-product.dto';

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res } from '@nestjs/common';
import { offers } from 'src/data/CatalogData';
import { ICreateProduct, IProductAuth, IChangeProduct, IReorderProduct, IGetProducts } from 'src/utils/interface/ProductInterface';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import { ICreateCategory, IDeleteCategory } from 'src/utils/interface/categoryInterface';
import { DeleteProductDto } from 'src/logic/Dto/catalog/delete-product.dto';

const fs = require("fs");
const catalogData = fs.readFileSync('catalog.txt', 'utf-8');
interface IQueryParams {
  type?: string,
  string?: string,
  price?: string,
  productIds?: string,
  categories: Category[]
  orders: Order[]
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
  private catalogOffers = catalogData;
  constructor(private catalogDataService: CatalogDataService,
    private authDataService: AuthDataService) { }

  getCatalog() {
    return this.catalogOffers;
  }

  async createProduct(createProductDto: ICreateProduct, email: string) {
    try {
      const user = await this.authDataService.findUser(email);
      console.log("user who create: ", user);

      if (!user) {
        throw new Error('User not found');
      }
      if(user.roleId !== 1){
        throw new Error("User is not ADMIN")
      }

      const existingProduct = await this.catalogDataService.findProduct(createProductDto.name);
      console.log("existing product", existingProduct);

      if (existingProduct && existingProduct.authorId === user.id) {
        return {
          status: 400,
          message: 'Product with this name already exists',
        };
      } else {
        const newProduct = await this.catalogDataService.createProduct(createProductDto, user.id);
        console.log("new product", newProduct);
        return {
          status: 201,
          message: 'Product created successfully',
        };
      }

    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Error creating user',
      };
    }
  }




  async getProducts(query: IQueryParams, request) {
    console.log("query", query); // Check if the query object is correctly received

    const where: any = {};

    if (request.user !== undefined && request.user.roleId === 1) {
      where.authorId = request.user.id;
    }

    if (query.type) {
      where.type = query.type.split(',');
    }
    if (query.productIds) {
      
      const productIds = Array.isArray(query.productIds)
        ? query.productIds.map(id => Number(id))
        : query.productIds.split(',').map(id => Number(id));

      where.id = { in: productIds }; 
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

    if (query.orders) {
      where.orders = {
        // Flatten the array of objects into an array of order values
        equals: query.orders.map(order => order.order)
      };
    }



    

    try {
      console.log("where:", where); // Check if the where object is correctly constructed
      const products = await this.catalogDataService.getProducts(where);
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

   async getBiggerOrderProducts(product: IQueryParams, user) {
     try {
       // Check if the where object is correctly constructed
       const products = await this.catalogDataService.getBiggerOrderProducts(product, user.id);
       console.log("biggerOrderProduct", products)
       return products;
     } catch (error) {
       throw new Error(error);
     }
   }

  async changeProduct(changeProductDto: IChangeProduct, email: string) {
    try {
      const user = await this.authDataService.findUser(email);
      if (user.roleId === 1 && user.id === changeProductDto.authorId) {
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


  // async reorderProduct(reorderProductDto: IReorderProduct, user) {
  //   try {
  //     if (user.role === "ADMIN" && user.id === reorderProductDto.authorId) {
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


  async deleteProduct(deleteProductDto: DeleteProductDto, email: string) {
    try {
      const user = await this.authDataService.findUser(email);
      if (user.roleId == 1 && user.id === deleteProductDto.authorId) {
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

  async deleteCategory(deleteCategoryDto: IDeleteCategory, email: string){
    try {
      const user = await this.authDataService.findUser(email);
      if (user.roleId === 1){
      const deletedCategory = await this.catalogDataService.deleteCategory(deleteCategoryDto, user.id)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async getMaxOrder(categoryId, authorId){
    const maxOrder = await this.catalogDataService.findMaxOrder(categoryId, authorId)
    return maxOrder
  }
}