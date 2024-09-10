import { IOrdersRequest } from '@src/utils/interface/requestInterface';
/* eslint-disable prettier/prettier */
import { CatalogService } from '../../Services/catalog/catalog.service';
import { Body, Controller, Get, Post, Patch, Query, UseGuards, Req, Res, Delete, HttpCode } from '@nestjs/common';
import { offers } from '../../../data/CatalogData.js';
import { CreateProductDto, CreateProductResData, CreateProductResDTO, GetArrayOfProductsResponseDto, GetProductsResponseDTO } from 'src/logic/Dto/catalog/create-product.dto';
import { AuthGuard, CustomAuthGuard, OneTimeAuthGuard } from 'src/auth/auth.guard';
import { IProductAuth, IChangeProduct } from '@src/utils/interface/ProductInterface';
import { GetProductsQueryParamDto } from 'src/logic/Dto/catalog/get-products-query-param.dto';
import { ChangeProductDto } from 'src/logic/Dto/catalog/change-product.dto';
import { CreateCategoryDto, CreateCategoryResponseDto, GetCategoriesResponseDto, GetArrayOfCategoriesResponeDto } from 'src/logic/Dto/catalog/create-category.dto';
import { DeleteProductDto } from 'src/logic/Dto/catalog/delete-product.dto';
import { ReorderProductDto } from 'src/logic/Dto/catalog/reorder-product.dto';
import { GetMaxOrderDto } from 'src/logic/Dto/catalog/get-max-order.dto';
import { DeleteCategoryDto } from 'src/logic/Dto/catalog/delete-category.dto';


@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }



  @UseGuards(AuthGuard)
  @Post("add_product")
  @HttpCode(201)
  async createProduct(@Body() createProductDto: CreateProductDto, @Req() request: IOrdersRequest) {
    const userId = request.user.uid
    await this.catalogService.createProduct(createProductDto, request.user) 
  }

 
  @UseGuards(AuthGuard)
  @Post("create_category")
  @HttpCode(201)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto, @Req() request: IOrdersRequest) {
    const user = request.user
    await this.catalogService.createCategory(createCategoryDto, user)

  }

  @UseGuards(AuthGuard)
  @Get("get_categories")
  @HttpCode(200)
  async getCategories(@Req() request: IOrdersRequest) {
    const userId = request.user.uid
    const response = await this.catalogService.getCategories(request.user)
    return new GetArrayOfCategoriesResponeDto(response)
  }

  @UseGuards(AuthGuard)
  @Post("get_max_order")
  @HttpCode(201)
  getMaxOrder(@Body() getMaxOrder: GetMaxOrderDto, @Req() request: IOrdersRequest) {
    const userId = request.user.uid
    const categoryId = getMaxOrder.categoryId
    return this.catalogService.getMaxOrder(categoryId, userId)
  }




  //CustomAuthGuard will get a response even if there is no jwt token
  //OneTimeAuthGuard wil expire in 10 second so can 
  @UseGuards(AuthGuard)
  @Get("get_products")
  @HttpCode(200)
  async getProducts(
    @Query() query: GetProductsQueryParamDto,
    @Req() request: IOrdersRequest,
  ) {
    const userID = request.user.uid
    const response = await this.catalogService.getProducts(query, request.user)
    console.log("products response", response)
    return new GetArrayOfProductsResponseDto(response)
  }

  

  @UseGuards(AuthGuard)
  @Patch("change")
  @HttpCode(200)
   async changeProduct(@Body() changeProductDto: ChangeProductDto, @Req() request: IOrdersRequest) {
    const userID = request.user.uid
    await this.catalogService.changeProduct(changeProductDto, request.user);
  }


  // @UseGuards(AuthGuard)
  // @Patch('switch_products')
  // reorderProduct(@Body() reorderProductDto: ReorderProductDto, @Req() request: IOrdersRequest) {
  //   const user = request.user
  //   return this.catalogService.reorderProduct(reorderProductDto, user)
  // }

  @UseGuards(AuthGuard)
  @Delete("delete")
  @HttpCode(200)
  async deleteProduct(@Body() deleteProductDto: DeleteProductDto, @Req() request: IOrdersRequest) {
    const userID = request.user.uid
    // const biggerOrderProducts = await this.catalogService.getBiggerOrderProducts(deleteProductDto, request);
    // console.log("bigger order products: ", biggerOrderProducts);
    // const changedOrderProducts = await this.catalogService.lowerOrderByOne(biggerOrderProducts, user);
    await this.catalogService.deleteProduct(deleteProductDto, request.user);
  }

  @UseGuards(AuthGuard)
  @Delete("delete_category")
  @HttpCode(200)
  async deleteCategory(@Body() deleteCategoryDto: DeleteCategoryDto, @Req() request: IOrdersRequest): Promise<any> {
    
    const userID = request.user.uid
    await this.catalogService.deleteCategory(deleteCategoryDto, request.user);
  }

 }

