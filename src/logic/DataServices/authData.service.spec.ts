import { SignInAuthDto } from './../Dto/auth/signin-auth.dto';
import { PrismaService } from './../../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../Controllers/auth/auth.controller';
import { AuthDataService } from 'src/logic/DataServices/authData.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {

    let authDataService: AuthDataService;
    let prismaService: PrismaService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [ AuthDataService, JwtService, PrismaService],
        }).compile();

        authDataService = moduleRef.get<AuthDataService>(AuthDataService);
        prismaService = moduleRef.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(authDataService).toBeDefined();
    });

    it ("should find user", async() => {
        const email = "test"
        const response = {
            id: 1,
            firstName: "test",
            secondName: "test",
            email: "test",
            password: "tesst",
            phoneNumber: "test",
            isEmailConfirmed: true,
            roleId: 1
        }
        const findUserSpy = jest.spyOn(authDataService, "findUser").mockResolvedValue(response)
        const result = await authDataService.findUser(email)
        expect (result).toEqual(response)
        expect (findUserSpy).toHaveBeenCalledWith(email)
    })

    it("should create user", async() => {
        const newUser = {
            firstName: "testFirstName",
            secondName: "testSecondName",
            email: "testemail",
            password: "testPassword",
            phoneNumber: "123456789"
        }
        const createUserSpy = jest.spyOn(authDataService,"createUser").mockResolvedValue(undefined)
        await authDataService.createUser(newUser)
        expect (createUserSpy).toHaveBeenCalledWith(newUser)
    }) 
    it ("should update user", async() => {
        const userData = {
            id: 1,
            firstName: "test",
            secondName: "test",
            email: "test",
            password: "tesst",
            phoneNumber: "test",
            isEmailConfirmed: true,
            roleId: 1
        }
        const updateUserSpy = jest.spyOn(authDataService, "update").mockResolvedValue(undefined)
        await authDataService.update(userData, userData)
        expect (updateUserSpy).toHaveBeenCalledWith(userData, userData)
    })
    it("should create Role and Permission", async() => {
        const createRoleAndPermissionSpy = jest.spyOn(authDataService, "createRoleAndPermissions").mockResolvedValue(undefined)
        await authDataService.createRoleAndPermissions()
        expect (createRoleAndPermissionSpy).toHaveBeenCalled()
    })
})