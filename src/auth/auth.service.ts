import { AuthDataService } from './authData.service';
/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateAuth } from './../utils/interface/authInterface';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/utils/interface/jwtpayloadInterface';
import { Order, User } from '@prisma/client';

@Injectable()
// export class AuthService extends PassportStrategy(Strategy) {
//   constructor(private prisma: PrismaService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: '1234',
//     });
//   }

//   }
export class AuthService {
  private authors: CreateAuthDto[] = [];
  constructor(private authDataService: AuthDataService){}
  createAuth(createAuthDto: ICreateAuth){
    this.authDataService.Test();
    this.authDataService.createUser(createAuthDto);
  }
}




