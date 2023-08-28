/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createAuth(createAuthDto);
  }
  // @Post("signin")
  // signIn(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.signIn(createAuthDto);
  // }
}