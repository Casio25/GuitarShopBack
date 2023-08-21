import { AuthDataService } from './authData.service';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  exports: [AuthService, AuthDataService],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthDataService],
})
export class AuthModule {}
