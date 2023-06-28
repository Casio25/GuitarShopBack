import { Module } from '@nestjs/common';
import { CatalogController } from '../../Controllers/catalog/catalog.controller';
import { CatalogService } from '../../Services/catalog/catalog.service';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
