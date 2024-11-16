import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, HttpCode, Req, UploadedFile, Query } from '@nestjs/common';
import { AuthGuard, CustomAuthGuard, OneTimeAuthGuard } from 'src/auth/auth.guard';
import { ProductService } from '../../Services/product/product.service';
import { CreateProductDto, GetArrayOfProductsResponseDto } from '../../Dto/product/create-product.dto';
import { UpdateProductDto } from '../../Dto/product/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IRequest } from '@src/utils/interface/requestInterface';
import { GetProductsQueryParamDto } from 'src/logic/Dto/product/get-products-query-param.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('photo'))
  async createProduct(@Body() createProductDto: CreateProductDto, @Req() req: IRequest, @UploadedFile() photo: Express.Multer.File) {

    const userId = req.user.uid
    await this.productService.createProduct(createProductDto, req.user)
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(200)
  async getAllProducts(
    @Query() query: GetProductsQueryParamDto,
    @Req() request: IRequest,
  ) {
    const userID = request.user.uid
    const response = await this.productService.getProducts(query, request.user)

    return new GetArrayOfProductsResponseDto(response)
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  @HttpCode(200)
  async changeProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto, @Req() request: IRequest) {
    console.log ('productId', id)
    const userID = request.user.uid
    await this.productService.updateProduct(Number(id), updateProductDto, request.user);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @HttpCode(200)
  async deleteProduct(@Param('id') id: number, @Req() request: IRequest,) {
    console.log('product to delete', id)
    const userID = request.user.uid
   
    await this.productService.deleteProduct(id, request.user);
  }

 
}
