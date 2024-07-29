import { OrderDataService } from './../../DataServices/orderDataServce';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../../prisma/prisma.service';
import { OrdersController } from 'src/logic/Controllers/orders/orders.controller';
import { OrdersModule } from 'src/logic/Modules/orders/orders.module';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrdersController, OrdersModule],
      providers: [OrdersService, OrderDataService, JwtService, PrismaService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
