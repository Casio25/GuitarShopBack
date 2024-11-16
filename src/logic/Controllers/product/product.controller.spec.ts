import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../../Services/product/product.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return products', async () => {
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
    const getProductsSpy = jest.spyOn(controller, "getAllProducts").mockResolvedValue(response)
    const result = await controller.getProducts(query, request);
    expect(result).toEqual(response);
    expect(getProductsSpy).toHaveBeenCalledWith(query, request);
  })

});
