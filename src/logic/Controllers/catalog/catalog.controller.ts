/* eslint-disable prettier/prettier */
import { CatalogService } from '../../Services/catalog/catalog.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { offers } from '../../../data/CatalogData.js';

@Controller('catalog')
export class CatalogController {
  @Get(':id')
  getId(@Param('id') id: string) {
    return [{ id }];
  }

  @Get()
  getType(@Query(`test`) test: string) {
    const service = new CatalogService();
    return service.getCatalog();
  }
}
