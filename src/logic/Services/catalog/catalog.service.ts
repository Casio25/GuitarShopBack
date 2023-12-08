import { CreateProductDto } from './../../Dto/catalog/create-product.dto';

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { offers } from 'src/data/CatalogData';
import { ICreateProduct, IProductAuth, IChangeProduct } from 'src/utils/interface/ProductInterface';
import { AuthDataService } from 'src/auth/authData.service';
import { CatalogDataService } from './catalogData.service';
const fs = require("fs");
const catalogData = fs.readFileSync('catalog.txt', 'utf-8');
interface IQueryParams {
  take: number;
  skip: number;
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


      const newProduct = await this.catalogDataService.createProduct(createProductDto, user.id);
      console.log(newProduct)

    } catch (error) {
      console.error(error);
    }
  }

  async getProducts(query: IQueryParams, request) {
    const where: any = {
      skip: query.skip,
      take: query.take,
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
      console.log(where)
      return products;
    } catch (error) {
      throw error;
    }
  }

  async changeProduct(changeProductDto: IChangeProduct, user){

    try{
      if (user.role === "ADMIN" && user.id === changeProductDto.authorId){
        const changedProduct = await this. catalogDataService.changeProduct(changeProductDto)
      }
    }catch (error) {
      throw error;
      
    }

  }

}