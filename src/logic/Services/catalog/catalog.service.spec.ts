import { AuthModule } from './../../Modules/auth/auth.module';
import { CatalogDataService } from './../../DataServices/catalogData.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from './catalog.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../../prisma/prisma.service';
import { CatalogModule } from 'src/logic/Modules/catalog/catalog.module';
import { Type } from 'src/logic/Dto/catalog/create-category.dto';
import { response } from 'express';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, CatalogModule],
      providers: [CatalogService, CatalogDataService, JwtService, PrismaService],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it ("should create product", async() => {
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
    const email = "test"
    const createProductSpy = jest.spyOn(service, "createProduct").mockResolvedValue(undefined)
    await service.createProduct(newProduct, email)
    expect (createProductSpy).toHaveBeenCalledWith(newProduct, email)
  }) 

  it ("should create category", async() => {
    const request = {
      user: {
        id: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const newCategory = {
      name: "testCat"
    }
    const createCategorySpy = jest.spyOn(service, 'createCategory').mockResolvedValue(undefined)
    await service.createCategory(newCategory, request)
    expect (createCategorySpy).toHaveBeenCalledWith(newCategory, request)

  })

  it ("should return product", async() => {
    const query = {
      type: 'test',
      productId: "tesr",
      string: "string",
      categories: [{
        id: 1,
        name: "TestCate",
        type: "private"
      }],
      orders: [{
        id: 1,
        order: 1,
        categoryId: 1,
        authorId: 1
      }]
    }
    const request = {
      user: {
        id: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const response = {
      authorId: 1,
      categories: [{
        id: 1,
        name: "TestCate",
        type: "private"
      }],
      description: "test",
      id: 1,
      inStock: true,
      name: "test",
      orders: [{
        id: 1,
        order: 1,
        categoryId: 1,
        authorId: 1
      }],
      photo: "test",
      price: 1,
      visibility: true
      
    }
    const getProductsSpy = jest.spyOn(service, "getProducts").mockResolvedValue(response)
    const result = await service.getProducts(query, request)
    expect (result).toEqual(response)
    expect (getProductsSpy).toHaveBeenCalledWith(query, request)
  })

  it ('should return categories', async() => {
    const request = {
      user: {
        id: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const response = [{
      id: 1,
      name: "test",
      type: Type.private
    }]

    const getCategoriesSpy = jest.spyOn(service, "getCategories").mockResolvedValue(response)
    const result = await service.getCategories(request.user)
    expect (result).toEqual(response)
    expect (getCategoriesSpy).toHaveBeenCalledWith(request.user)
  })

  it ("should return bigger order products", async() => {
    const query = {
      type: 'test',
      productId: "tesr",
      string: "string",
      categories: [{
        id: 1,
        name: "TestCate",
        type: "private"
      }],
      orders: [{
        id: 1,
        order: 1,
        categoryId: 1,
        authorId: 1
      }]
    }
    const request = {
      user: {
        id: 1,
        email: "emailTest",
      }
    }
    const response = {
      authorId: 1,
      categories: [{
        id: 1,
        name: "TestCate",
        type: "private"
      }],
      description: "test",
      id: 1,
      inStock: true,
      name: "test",
      orders: [{
        id: 1,
        order: 1,
        categoryId: 1,
        authorId: 1
      }],
      photo: "test",
      price: 1,
      visibility: true
    }

    const getBiggerOrderProductsSpy = jest.spyOn(service, "getBiggerOrderProducts").mockResolvedValue(response)
    const result = await service.getBiggerOrderProducts(query, request)
    expect (result).toEqual(response)
    expect( getBiggerOrderProductsSpy).toHaveBeenCalledWith(query, request)
  })

  it ("should change product", async() => {
    const email = "test"
    const changedProduct = {
      id: 1,
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
        productId: 1,
        id: 1,
        order: 1,
        categoryId: 1,
        authorId: 1
      }],
      description: "decription",
      visibility: true,
      inStock: true
    }
    const changeProductSpy = jest.spyOn(service, "changeProduct").mockResolvedValue(undefined)
    await service.changeProduct(changedProduct, email)
    expect (changeProductSpy).toHaveBeenCalledWith(changedProduct, email)
  })

  it ("should delete product", async() => {
    const email = "test"
    const deletedProduct = {
      id: 1,
      authorId: 1,
      categories: [{
        id: 1,
        name: "categoryName",
        type: "categoryType"
      }],
      orders: [{
        productId: 1,
        id: 1,
        order: 1,
        categoryId: 1,
        authorId: 1
      }]
    }
    const deleteProductSpy = jest.spyOn(service, "deleteProduct").mockResolvedValue(undefined)
    await service.deleteProduct(deletedProduct, email)
    expect (deleteProductSpy).toHaveBeenCalledWith(deletedProduct, email)
  })

  it ("should delete category", async() => {
    const email = 'test'
    const deletedCatalog = {
      name: "test",
      id: 1,
      type: 'private'
    }
    const deleteCategorySpy = jest.spyOn(service, "deleteCategory").mockResolvedValue(undefined)
    await service.deleteCategory(deletedCatalog, email)
    expect (deleteCategorySpy).toHaveBeenCalledWith(deletedCatalog, email)
  })

  it ("should return max order", async()=>{
    const email = "test"
    const getMaxOrder = {
      categoryId: 1
    }
    const response = 2
    const getMaxOrderSpy = jest.spyOn(service, "getMaxOrder").mockResolvedValue(response)
    await service.getMaxOrder(getMaxOrder, email)
    expect (getMaxOrderSpy).toHaveBeenCalledWith(getMaxOrder, email)
  })
});
