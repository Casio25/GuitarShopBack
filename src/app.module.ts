import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './logic/Modules/catalog/catalog.module';
import { OrderModule } from './logic/Modules/order/order.module';

@Module({
  imports: [CatalogModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
