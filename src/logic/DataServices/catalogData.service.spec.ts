import { AuthModule } from './../Modules/auth/auth.module';
import { CatalogDataService } from './../DataServices/catalogData.service';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../prisma/prisma.service';
import { CatalogModule } from 'src/logic/Modules/catalog/catalog.module';
import { Type } from 'src/logic/Dto/catalog/create-category.dto';
import { response } from 'express';

describe('CatalogDataService', () => {
    let dataservice: CatalogDataService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, CatalogModule],
            providers: [ CatalogDataService, JwtService, PrismaService],
        }).compile();

        dataservice = module.get<CatalogDataService>(CatalogDataService);
    });

    it('should be defined', () => {
        expect(dataservice).toBeDefined();
    });

    it ("should create product", async() =>{
        const newProduct = {
            name: "NewProduct",
            authorId: 1,
            price: 100,
            photo: "photo",
            categories: [{
                id: 1,
                name: "categoryName",
                type: "categoryType"
            }],
            orders: [{
                id: 1,
                order: 1,
                categoryId: 1,
                authorId: 1
            }],
            description: "decription",
            visibility: true,
            inStock: true
        }
        const authorId = 1
        const createProductSpy = jest.spyOn(dataservice, "createProduct").mockResolvedValue(undefined)
        await dataservice.createProduct(newProduct, authorId)
        expect (createProductSpy).toHaveBeenCalledWith(newProduct, authorId)
    })
    it ("should create category", async() => {
        const newCategory = {
            name: "test"
        }
        const authorId = 1
        const newCategorySpy = jest.spyOn(dataservice, "createCategory").mockResolvedValue(undefined)
        await dataservice.createCategory(newCategory, authorId)
        expect (newCategorySpy).toHaveBeenCalledWith(newCategory, authorId)
    })
})