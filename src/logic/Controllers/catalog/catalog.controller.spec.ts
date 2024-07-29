import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './../../Modules/auth/auth.module';

import { AuthGuard } from 'src/auth/auth.guard';
import { CatalogService } from './../../Services/catalog/catalog.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CatalogController } from './catalog.controller';
import { AuthService } from 'src/logic/Services/auth/auth.service';
import { CatalogModule } from 'src/logic/Modules/catalog/catalog.module';


describe('CatalogController', () => {
  let controller: CatalogController;
  let service: CatalogService
  let authService: AuthService;
  let jwtService: JwtService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, CatalogModule],
      providers: [AuthService, JwtService]
    }).compile();

    controller = moduleRef.get<CatalogController>(CatalogController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should create product", async ()=> {
    const user = {
      user: {
        id: 1,
        email: "emailTest",
        role: "roleTest"
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
      data: {
        id: 14,
        authorId: 1,
        name: 'meat resp',
        photo: '1',
        description: 'response prodcut',
        price: 1,
        visibility: true,
        inStock: true,
      },
      error: undefined,
      status: 201
      
    }
    jest.spyOn(controller, "createProduct").mockResolvedValue(response)
    await controller.createProduct(newProduct, user)
    expect(controller.createProduct(newProduct, user)).toEqual(response)
  })
});
