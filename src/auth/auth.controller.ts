import { SignInAuthDto } from './dto/signin-auth.dto';
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
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
  @HttpCode(HttpStatus.OK)
   @Post("signin")
   signIn(@Body() signInAuthDto: SignInAuthDto) {
   return this.authService.signIn(signInAuthDto);
   }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post("verify")
  verifyEmail(@Body() verifyAuthDto: VerifyAuthDto){
    return this.authService.verify(verifyAuthDto)
  }
}
