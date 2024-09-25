import { Test, TestingModule } from '@nestjs/testing';
import { AzureBlobServiceService } from './azure-blob.service';

describe('AzureBlobServiceService', () => {
  let service: AzureBlobServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureBlobServiceService],
    }).compile();

    service = module.get<AzureBlobServiceService>(AzureBlobServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
