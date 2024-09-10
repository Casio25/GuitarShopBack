import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './../../Modules/auth/auth.module';

import { AuthGuard } from 'src/auth/auth.guard';
import { CatalogService } from './../../Services/catalog/catalog.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CatalogController } from './catalog.controller';
import { AuthService } from 'src/logic/Services/auth/auth.service';
import { CatalogModule } from 'src/logic/Modules/catalog/catalog.module';
import { Type } from 'src/logic/Dto/catalog/create-category.dto';


describe('CatalogController', () => {
  let controller: CatalogController;
  let service: CatalogService
  let authService: AuthService;
  let jwtService: JwtService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, CatalogModule],
      controllers: [CatalogController],
      providers: [AuthService, JwtService,
      {
        provide: CatalogService,
        useValue: {
          createProduct: jest.fn(),
          createCategory: jest.fn()
        }
      },
    {
      provide: AuthService,
      useValue: {
        findUser: jest.fn()
      }
    }]
    }).compile();

    controller = moduleRef.get<CatalogController>(CatalogController);
    authService = moduleRef.get<AuthService>(AuthService);
    service = moduleRef.get<CatalogService>(CatalogService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should create product", async ()=> {
    const request = {
      user: {
        uid: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const newProduct = {
    name: "NewProduct",
    authorId: 1,
    price: 100,
    photo:"photo",
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
    const response = {
      status: 201
    }
    const createProductSpy = jest.spyOn(controller, "createProduct").mockResolvedValue(undefined)
    const createProductServiceSpy = jest.spyOn(service, "createProduct").mockResolvedValue(undefined)
    await controller.createProduct(newProduct, request)
    expect (createProductSpy).toHaveBeenCalledWith(newProduct, request)
  })

  it ("should create category", async() => {
    const request = {
      user: {
        uid: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const newCategory = {
      name: "testCat"
    }
    const response = 201
    const createCategorySpy = jest.spyOn(controller, "createCategory").mockResolvedValue(undefined)
    await controller.createCategory(newCategory, request)
    expect(createCategorySpy).toHaveBeenCalledWith(newCategory, request)
  })

  it ('should return products', async() => {
    const query = {
      type:'test',
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
        uid: 1,
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
    const getProductsSpy = jest.spyOn(controller, "getProducts").mockResolvedValue(response)
    const result = await controller.getProducts(query, request);
    expect(result).toEqual(response);
    expect(getProductsSpy).toHaveBeenCalledWith(query, request);
  })
  it ("should return categories", async() => {
    const request = {
      user: {
        uid: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const response = {
      id: 1,
      name: "test",
      type: Type.private
    }

    const getCategoriesSpy = jest.spyOn(controller, "getCategories").mockResolvedValue(response)
    const result = await controller.getCategories(request)
    expect(result).toEqual(response)
    expect(getCategoriesSpy).toHaveBeenCalledWith(request)
    })

  it ("should return max order", async() => {
    const request = {
      user: {
        uid: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const getMaxOrder = {
      categoryId: 1
    }
    const response = 2

    const getMaxOrderSpy = jest.spyOn(controller, "getMaxOrder").mockResolvedValue(response)
    const result = await controller.getMaxOrder(getMaxOrder, request)
    expect (result).toEqual(response)
    expect(getMaxOrderSpy).toHaveBeenCalledWith(getMaxOrder, request)
  })

  it ("should change product", async() => {
    const request = {
      user: {
        uid: 1,
        email: "emailTest",
        roleId: 1
      }
    }
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
    const changeProductSpy = jest.spyOn(controller, "changeProduct").mockResolvedValue(undefined)
    await controller.changeProduct(changedProduct, request)
    expect(changeProductSpy).toHaveBeenCalledWith( changedProduct, request)
  })

  it ("should delete product", async() => {
    const request = {
      user: {
        uid: 1,
        email: "emailTest",
        roleId: 1
      }
    }
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
    const deleteProductSpy = jest.spyOn(controller, "deleteProduct").mockResolvedValue(undefined)
    await controller.deleteProduct(deletedProduct, request)
    expect(deleteProductSpy).toHaveBeenCalledWith(deletedProduct, request)
  })

  it ("should delete category", async() => {
    const deletedCatalog = { 
      name: "test",
      id: 1,
      type: 'private'
    }
    const request = {
      user: {
        uid: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const deleteCategorySpy = jest.spyOn(controller, "deleteCategory").mockResolvedValue(undefined)
    await controller.deleteCategory(deletedCatalog, request)
    expect(deleteCategorySpy).toHaveBeenCalledWith(deletedCatalog, request)
  })
});
