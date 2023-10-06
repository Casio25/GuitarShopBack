/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthDataService } from 'src/auth/authData.service';
import { CatalogDataService } from 'src/logic/Services/catalog/catalogData.service';
import { CatalogController } from '../../Controllers/catalog/catalog.controller';
import { CatalogService } from '../../Services/catalog/catalog.service';
import { PrismaService } from './../../../prisma/prisma.service';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService, CatalogDataService, PrismaService, AuthDataService, AuthService],
})
export class CatalogModule {}
