import { AuthDataService } from './authData.service';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s' },
  })],
  exports: [AuthService, AuthDataService],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthDataService],
})
export class AuthModule {}
