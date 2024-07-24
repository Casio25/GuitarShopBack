import { Controller } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { describe, expect, test } from '@jest/globals';
import { AuthService } from '../../Services/auth/auth.service';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { AuthModule } from 'src/logic/Modules/auth/auth.module';
import { CreateAuthDto } from 'src/logic/Dto/auth/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let prismaService: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [AuthService]
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });


  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should create a new user', async () => {
    const createAuthDto: CreateAuthDto = {
      firstName: "testFirstName",
      secondName: "testSecondName",
      email: "testemail",
      password: "testPassword",
      phoneNumber: "123456789"
    };

    const result =  {
      id: 3,
      firstName: "testFirstName",
      secondName: "testSecondName",
      email: "testemail",
      password: "testPassword",
      phoneNumber: "123456789",
      isEmailConfirmed: false,
      roleId: 1, }; 
    jest.spyOn(authController, 'signUp').mockResolvedValue(result);

    expect(await authController.signUp(createAuthDto)).toBe(result);
    expect(authController.signUp).toHaveBeenCalledWith(createAuthDto);
  });


});
