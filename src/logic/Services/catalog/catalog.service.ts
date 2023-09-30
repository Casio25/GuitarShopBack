/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { offers } from 'src/data/CatalogData';
const fs = require("fs");
const catalogData = fs.readFileSync('catalog.txt', 'utf-8');
@Injectable()
export class CatalogService {
  private catalogOffers = catalogData;

  getCatalog() {
    return this.catalogOffers;
  }
}
