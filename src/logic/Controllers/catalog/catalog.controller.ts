import { IOrdersRequest } from 'src/utils/interface/requestInterface';
/* eslint-disable prettier/prettier */
import { CatalogService } from '../../Services/catalog/catalog.service';
import { Body, Controller, Get, Post, Param, Query, UseGuards, Req } from '@nestjs/common';
import { offers } from '../../../data/CatalogData.js';
import { CreateProductDto } from 'src/logic/Dto/catalog/create-product.dto';
import { AuthGuard, CustomAuthGuard } from 'src/auth/auth.guard';
import { IProductAuth } from 'src/utils/interface/ProductInterface';
import { GetProductsQueryParamDto } from 'src/logic/Dto/catalog/get-products-query-param.dto';
import { ChangeProductDto } from 'src/logic/Dto/catalog/change-product.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }
  


  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto, @Req() request: IOrdersRequest) {
    const email = request.user.email
    return this.catalogService.createProduct(createProductDto, email)
  }
  @UseGuards(CustomAuthGuard)
  @Get()
  async getProducts(
    @Query() query: GetProductsQueryParamDto,
    @Req() request: IOrdersRequest
  ) {
    const id = request.user;
    console.log(id)
    if (id == undefined){
      console.log("id: ", id)
      return this.catalogService.getProducts(query, request)
    }
    else{
      console.log("id: ", id)
      return this.catalogService.getProducts(query, request)
    }
  }
  @UseGuards(AuthGuard)
  @Post("change")
  changeProduct(@Body() changeProductDto: ChangeProductDto, @Req() request: IOrdersRequest){
    const user = request.user
    return this.catalogService.changeProduct(changeProductDto, user)
  }
}
