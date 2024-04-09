import { IOrdersRequest } from 'src/utils/interface/requestInterface';
/* eslint-disable prettier/prettier */
import { CatalogService } from '../../Services/catalog/catalog.service';
import { Body, Controller, Get, Post, Patch, Query, UseGuards, Req, Res, Delete } from '@nestjs/common';
import { offers } from '../../../data/CatalogData.js';
import { CreateProductDto } from 'src/logic/Dto/catalog/create-product.dto';
import { AuthGuard, CustomAuthGuard, OneTimeAuthGuard } from 'src/auth/auth.guard';
import { IProductAuth, IChangeProduct } from 'src/utils/interface/ProductInterface';
import { GetProductsQueryParamDto } from 'src/logic/Dto/catalog/get-products-query-param.dto';
import { ChangeProductDto } from 'src/logic/Dto/catalog/change-product.dto';
import { CreateCategoryDto } from 'src/logic/Dto/catalog/create-category.dts';
import { DeleteProductDto } from 'src/logic/Dto/catalog/delete-product.dto';
import { ReorderProductDto } from 'src/logic/Dto/catalog/reorder-product.dto';


@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }



  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto, @Req() request: IOrdersRequest) {
    const email = request.user.email
    const response = this.catalogService.createProduct(createProductDto, email)
    console.log("creating product", response)
    return response
    
  }

  @UseGuards(AuthGuard)
  @Post("create_category")
  createCategory(@Body() createCategoryDto: CreateCategoryDto, @Req() request: IOrdersRequest) {
    const user = request.user
    return this.catalogService.createCategory(createCategoryDto, user)
  }

  @UseGuards(AuthGuard)
  @Get("get_categories")
  getCategories(@Req() request: IOrdersRequest) {
    const user = request.user
    return this.catalogService.getCategories(user)
  }




  //CustomAuthGuard will get a response even if there is no jwt token
  //OneTimeAuthGuard wil expire in 10 second so can 
  @UseGuards(AuthGuard)
  @Get()
  getProducts(
    @Query() query: GetProductsQueryParamDto,
    @Req() request: IOrdersRequest,
  ) {
    return this.catalogService.getProducts(query, request)
  }

  

  @UseGuards(AuthGuard)
  @Patch("change")
   async changeProduct(@Body() changeProductDto: ChangeProductDto, @Req() request: IOrdersRequest) {
    const user = request.user;
    try {
      const updatedProduct = await this.catalogService.changeProduct(changeProductDto, user);
      return updatedProduct;
    } catch (error) {
      // Handle error appropriately
      console.error("Error updating product: ", error);
      throw error; // Optionally, rethrow the error
    }
  }


  @UseGuards(AuthGuard)
  @Patch('switch_products')
  reorderProduct(@Body() reorderProductDto: ReorderProductDto, @Req() request: IOrdersRequest) {
    const user = request.user
    return this.catalogService.reorderProduct(reorderProductDto, user)
  }

  @UseGuards(AuthGuard)
  @Delete("delete")
  async deleteProduct(@Body() deleteProductDto: DeleteProductDto, @Req() request: IOrdersRequest): Promise<any> {
    const user = request.user;
    const biggerOrderProducts = await this.catalogService.getProducts(deleteProductDto, request);
    console.log("bigger order products: ", biggerOrderProducts);
    const changedOrderProducts = await this.catalogService.lowerOrderByOne(biggerOrderProducts, user);
    return this.catalogService.deleteProduct(deleteProductDto, user);
  }
}

