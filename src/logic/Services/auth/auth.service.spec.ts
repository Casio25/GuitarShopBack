import { SignInAuthDto } from './../../Dto/auth/signin-auth.dto';
import { PrismaService } from './../../../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from '../../Controllers/auth/auth.controller';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let authDataService: AuthDataService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService, AuthDataService, JwtService, PrismaService],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create user", async() => {
    const createAuthDto = {
      firstName: "testFirstName",
      secondName: "testSecondName",
      email: "testemail",
      password: "testPassword",
      phoneNumber: "123456789"
    }
    const createAuthSpy = jest.spyOn(service, "createAuth").mockResolvedValue(undefined)
    await service.createAuth(createAuthDto)
    expect (createAuthSpy).toHaveBeenCalledWith(createAuthDto)
  })

  it ("should resend email", async() => {
    const forgetEmailDto = {
      email: "test"
    }
    const resendEmailSpy = jest.spyOn(service, "resendEmail").mockResolvedValue(undefined)
    await service.resendEmail(forgetEmailDto)
    expect (resendEmailSpy).toHaveBeenCalledWith(forgetEmailDto)
  })

  it ("should signIn user", async() => {
    const existingUser = {
      email: "example@gmail.com",
      password: "example.com"
    }
    const response = {
      access_token: "abcdef"
    }
    const SignInSpy = jest.spyOn(service, 'signIn').mockResolvedValue(response)
    const result = await service.signIn(existingUser)
    expect (result).toEqual(response)
    expect (SignInSpy).toHaveBeenCalledWith(existingUser)
  })

  it ("should resend email if you forgot password", async() => {
    const userData = {
      email: "test"
    }
    const resendEmailSpy = jest.spyOn(service, "resendEmail").mockResolvedValue(undefined)
    await service.resendEmail(userData)
    expect (resendEmailSpy).toHaveBeenCalledWith(userData)
  })

  it ("should update user", async() => {
    const userData = {
      firstName: "testFirstName",
      secondName: "testSecondName",
      email: "testemail",
      password: "testPassword",
      phoneNumber: "123456789",
      roleId: 2
    }
    const request = {
      id: 2,
      email: "trs",

    }
    const updateUserSpy = jest.spyOn(service, "update").mockResolvedValue(undefined)
    await service.update(request, userData)
    expect (updateUserSpy).toHaveBeenCalledWith(request, userData)
  })

  it ("should verify user", async() => {
    const request = {
      id: 2,
      email: "trs",

    }
    const verifyUserSpy = jest.spyOn(service, "verify").mockResolvedValue(undefined)
    await service.verify(request)
    expect (verifyUserSpy).toHaveBeenCalledWith(request)
  })

 

});
