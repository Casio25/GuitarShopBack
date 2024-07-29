import { AuthModule } from './../../Modules/auth/auth.module';
import { CatalogDataService } from './../../DataServices/catalogData.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from './catalog.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../../prisma/prisma.service';
import { CatalogModule } from 'src/logic/Modules/catalog/catalog.module';

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
});
