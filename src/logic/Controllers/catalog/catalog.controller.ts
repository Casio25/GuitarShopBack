import { IOrdersRequest } from 'src/utils/interface/requestInterface';
/* eslint-disable prettier/prettier */
import { CatalogService } from '../../Services/catalog/catalog.service';
import { Body, Controller, Get, Post, Param, Query, UseGuards, Req } from '@nestjs/common';
import { offers } from '../../../data/CatalogData.js';
import { CreateProductDto } from 'src/logic/Dto/catalog/create-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { IProductAuth } from 'src/utils/interface/ProductInterface';
import { GetProductsQueryParamDto} from 'src/logic/Dto/catalog/get-products-query-param.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }
  @Get(':id')
  getId(@Param('id') id: string) {
    return [{ id }];
  }

  // @Get()
  // getType(@Query(`test`) test: string) {
  //   return this.catalogService.getCatalog();
  // }
  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto, @Req() request: IOrdersRequest ){
    const email = request.user.email
    return this.catalogService.createProduct(createProductDto, email)
  }

  @Get()
  getProducts(
    @Query() query: GetProductsQueryParamDto
  ) {

    console.log(query)

    return this.catalogService.getProducts(query);
  }


  
}
