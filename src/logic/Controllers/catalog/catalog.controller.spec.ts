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
});
