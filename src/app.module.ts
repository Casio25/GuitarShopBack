/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './logic/Modules/catalog/catalog.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './logic/Modules/auth/auth.module';
import { AuthGuard, CustomAuthGuard } from './auth/auth.guard';
import { UserModule } from './logic/Modules/user/user.module';
import { FirebaseModule } from './logic/Modules/firebase/firebase.module';
import { PhotoController } from './logic/Controllers/photo/photo.controller';
import { PhotoService } from './logic/Services/photo/photo.service';
import { OrdersModule } from './logic/Modules/orders/orders.module';

@Module({
  imports: [CatalogModule, PrismaModule, AuthModule, UserModule, ConfigModule.forRoot({ cache: true }), OrdersModule],
  controllers: [AppController],
  providers: [AppService, AuthGuard, CustomAuthGuard],
})
export class AppModule {}
