/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './logic/Modules/catalog/catalog.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './logic/Modules/auth/auth.module';
import { AuthGuard, CustomAuthGuard } from './auth/auth.guard';
import { OrdersModule } from './logic/Modules/orders/orders.module';
import { UtilsModule } from './logic/Modules/utils/utils.module';
import { AzureBlobService } from './logic/Services/azure-blob/azure-blob.service';



@Module({
  imports: [CatalogModule, PrismaModule, AuthModule, ConfigModule.forRoot({ cache: true }), OrdersModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService, AuthGuard, CustomAuthGuard, AzureBlobService],
})
export class AppModule {}
