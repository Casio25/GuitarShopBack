import { Controller } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { describe, expect, jest, test } from '@jest/globals';
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
      providers: [
        {
          provide: AuthService,
          useValue: {
          },
        },
      ],
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

  it ("should sign in user", async() => {
    const existingUser ={
      email: "example@gmail.com",
      password: "example.com"
    }
    const result = {
      access_token: "abcdef"
    }
    jest.spyOn(authController, "signIn").mockResolvedValue(result);
    expect(await authController.signIn(existingUser)).toBe(result);
  });

  it('should resend email', async () => {
    const forgotPasswordDto = {
      email: "mishakolomiets355@gmail.com"
    };

    jest.spyOn(authController, 'resendEmail').mockResolvedValue(undefined);

    await authController.resendEmail(forgotPasswordDto);
    expect(authController.resendEmail).toHaveBeenCalledWith(forgotPasswordDto);
  });

  it ("should resend email if you forgot password", async() => {
    const forgotPasswordDto = {
      email: "mishakolomiets355@gmail.com"
    };

    jest.spyOn(authController, 'forgotPassword').mockResolvedValue(undefined);

    await authController.forgotPassword(forgotPasswordDto);
    expect(authController.forgotPassword).toHaveBeenCalledWith(forgotPasswordDto);
  })

  it("should verify email", async () => {
    const user = {
      email: "mishakolomiets355@gmail.com",
      id: 1
    };

    jest.spyOn(authController, "verifyEmail").mockResolvedValue(undefined);

    await authController.verifyEmail(user);

    expect(authController.verifyEmail).toHaveBeenCalledWith(user);
  })

  it ("should update user", async() => {
    const updateUserDto = {
      firstName: "testFirstName",
      secondName: "testSecondName",
      email: "testemail",
      password: "testPassword",
      phoneNumber: "123456789",
      roleId: 1
    }
    const user = {
      email: "mishakolomiets355@gmail.com",
      id: 1
    }
    const spyUpdate = jest.spyOn(authController, "update").mockResolvedValue(undefined)
    
    await authController.update(user, updateUserDto)
    expect(await spyUpdate).toHaveBeenCalledWith(user, updateUserDto)
  })

  it ("should create onetime token", async() => {
    const existingUser = {
      email: "example@gmail.com",
      password: "example.com"
    }
    const result = {
      access_token: "abcdef"
    }
    jest.spyOn(authController, "oneTimeToken").mockResolvedValue(result)
    await authController.oneTimeToken(existingUser)
    expect(await authController.oneTimeToken(existingUser)).toBe(result)
  })

  it ("should create permission", async() => {
    jest.spyOn(authController, "createPermission")
  })

  it ("should return profile", async() => {
    
  })

})
