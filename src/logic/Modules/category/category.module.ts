/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from 'src/logic/Services/auth/auth.service';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { CategoryDataService } from '@src/logic/DataServices/categoryData.service';
import { CategoryController } from '../../Controllers/category/category.controller';
import { CategoryService } from '../../Services/category/category.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { AzureBlobService } from '../../Services/azure-blob/azure-blob.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryDataService, PrismaService, AuthDataService, AuthService, AzureBlobService],
})
export class CategoryModule {}
