import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../../Services/orders/orders.service';
import { AuthService } from 'src/logic/Services/auth/auth.service';
import { OrdersModule } from 'src/logic/Modules/orders/orders.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/logic/Modules/auth/auth.module';
import { OrderStatus, PaymentStatus, PaymentType } from 'src/logic/Dto/order/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let authService: AuthService;
  let jwtService: JwtService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, OrdersModule],
      providers: [AuthService, JwtService],
    }).compile();

    controller = moduleRef.get<OrdersController>(OrdersController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should create order", async() => {
    const newOrder = {
      orderId: 1,
      products: [{
        productId: 1,
        quantity: 1
      }],
      creatAt: "2022",
      venueId: 2,
      payment: {
        paymentStatus: PaymentStatus.paid,
        paymentType: PaymentType.cash
      },
      orderStatus: OrderStatus.new
    }
    const request = {
      user: {
        id: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const createOrderSpy = jest.spyOn(controller, "create").mockResolvedValue(undefined)
    await controller.create(newOrder, request)
    expect (createOrderSpy).toHaveBeenCalledWith(newOrder, request)
  })
  it ("should update order", async() => {
    const updatedOrder = {
      id: 1,
      orderId: 1,
      products: [{
        productId: 1,
        quantity: 1
      }],
      creatAt: "2022",
      venueId: 2,
      payment: {
        paymentStatus: PaymentStatus.paid,
        paymentType: PaymentType.cash
      },
      orderStatus: OrderStatus.new
    }
    const request = {
      user: {
        id: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const updateOrderSpy = jest.spyOn(controller, "update").mockResolvedValue(undefined)
    await controller.update(updatedOrder, request)
    expect (updateOrderSpy).toHaveBeenCalledWith(updatedOrder, request)
  })

  it ("should return orders", async()=> {
    const request = {
      user: {
        id: 1,
        email: "emailTest",
        roleId: 1
      }
    }
    const response = {
      id: 1,
      authorId: 2,
      creatAt: "20202",
      orderId: 3,
      orderStatus: OrderStatus.new,
      payment: {
        id: 1,
        orderId: 2,
        paymentStatus: PaymentStatus.paid,
        paymentType: PaymentType.cash
      },
      products: [{
        productId: 1,
        productName: "test",
        productQuantity: 2,
        productPrice: 2
      }],
      totalPrice: 4,
      venue: {
        id: 1,
        name: "test",
        creatAt: new Date("2023-01-01T10:00:00Z"),
      }
    }
    const getOrdersSpy = jest.spyOn(controller, "findAll").mockResolvedValue(response)
    const result = await controller.findAll(request)
    expect (result).toEqual(response)
    expect (getOrdersSpy).toHaveBeenCalledWith(request)
  })
});
