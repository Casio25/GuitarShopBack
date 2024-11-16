/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './logic/Modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './logic/Modules/auth/auth.module';
import { AuthGuard, CustomAuthGuard } from './auth/auth.guard';
import { OrdersModule } from './logic/Modules/orders/orders.module';
import { UtilsModule } from './logic/Modules/utils/utils.module';
import { AzureBlobService } from './logic/Services/azure-blob/azure-blob.service';
import { ProductModule } from './logic/Modules/product/product.module';
import { VenueModule } from './logic/Modules/venue/venue.module';



@Module({
  imports: [CategoryModule, PrismaModule, AuthModule, ConfigModule.forRoot({ cache: true }), OrdersModule, UtilsModule, ProductModule, VenueModule],
  controllers: [AppController],
  providers: [AppService, AuthGuard, CustomAuthGuard, AzureBlobService],
})
export class AppModule {}
