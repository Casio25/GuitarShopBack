import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { describe, expect, test } from '@jest/globals';
import { AuthService } from '../../Services/auth/auth.service';
import { AuthDataService } from '@src/logic/DataServices/authData.service';
import { AuthModule } from '@src/logic/Modules/auth/auth.module';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

});
