/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './logic/Modules/catalog/catalog.module';
import { OrderModule } from './logic/Modules/order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './logic/Modules/auth/auth.module';
import { AuthGuard, CustomAuthGuard } from './auth/auth.guard';
import { UserModule } from './logic/Modules/user/user.module';

@Module({
  imports: [CatalogModule, OrderModule, PrismaModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, AuthGuard, CustomAuthGuard],
})
export class AppModule {}
