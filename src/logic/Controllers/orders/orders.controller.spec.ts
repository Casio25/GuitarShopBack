import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../../Services/orders/orders.service';
import { AuthService } from 'src/logic/Services/auth/auth.service';
import { OrdersModule } from 'src/logic/Modules/orders/orders.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/logic/Modules/auth/auth.module';

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
});
