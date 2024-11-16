
/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post, Patch, Query, UseGuards, Req, Res, Delete, HttpCode, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { AuthGuard, CustomAuthGuard, OneTimeAuthGuard } from 'src/auth/auth.guard';
import { CreateCategoryDto, CreateCategoryResponseDto, GetCategoriesResponseDto, GetArrayOfCategoriesResponeDto } from '../../Dto/category/create-category.dto';
import { DeleteCategoryDto } from 'src/logic/Dto/category/delete-category.dto';
import { IRequest } from 'src/utils/interface/requestInterface';
import { CategoryService } from '../../Services/category/category.service';



@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @UseGuards(AuthGuard)
  @Post("create_category")
  @HttpCode(201)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto, @Req() request: IRequest) {
    const user = request.user
    await this.categoryService.createCategory(createCategoryDto, user)

  }

  @UseGuards(AuthGuard)
  @Get("get_categories")
  @HttpCode(200)
  async getCategories(@Req() request: IRequest) {
    const userId = request.user.uid
    const response = await this.categoryService.getCategories(request.user)
    return new GetArrayOfCategoriesResponeDto(response)
  }

  @UseGuards(AuthGuard)
  @Delete("delete_category")
  @HttpCode(200)
  async deleteCategory(@Body() deleteCategoryDto: DeleteCategoryDto, @Req() request: IRequest): Promise<any> {
    
    const userID = request.user.uid
    await this.categoryService.deleteCategory(deleteCategoryDto, request.user);
  }

 }

