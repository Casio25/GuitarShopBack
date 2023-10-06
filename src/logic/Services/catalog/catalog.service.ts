
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { offers } from 'src/data/CatalogData';
import { ICreateProduct, IGetProducts, IProductAuth } from 'src/utils/interface/ProductInterface';
import { AuthDataService } from 'src/auth/authData.service';
import { CatalogDataService } from './catalogData.service';
const fs = require("fs");
const catalogData = fs.readFileSync('catalog.txt', 'utf-8');
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

  async getProducts(getProductsDto: IGetProducts, limit: number){
    try{
    const products = await this.catalogDataService.getProducts(getProductsDto, limit)

    console.log(products);
  }catch (error){
    console.error(error)
  }
}
}
