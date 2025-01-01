import { SignInAuthDto, SignInRespDTO } from '../../Dto/auth/signin-auth.dto';

import { Controller, Get, Post, Body, HttpCode, HttpStatus, Request, UseGuards, Patch, Req } from '@nestjs/common';
import { AuthGuard, OneTimeAuthGuard } from '../../../auth/auth.guard';
import { AuthService } from '../../Services/auth/auth.service';
import { CreateAuthDto } from '../../Dto/auth/create-auth.dto';
import { UpdateAuthDto } from '../../Dto/auth/update-auth.dto';
import { ForgotPasswordDto } from '../../Dto/auth/ForgotPassword.dto';
import { CreateACLDto } from '@src/logic/Dto/auth/create-ACL.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    await this.authService.createAuth(createAuthDto);
  }
  @HttpCode(HttpStatus.OK)
   @Post("sign_in")
   async signIn(@Body() signInAuthDto: SignInAuthDto) {
   const resp = await this.authService.signIn(signInAuthDto);
   return new SignInRespDTO(resp)
   }

   @Post("resend_email")
   resendEmail(@Body()forgotPasswordDto: ForgotPasswordDto){
    return this.authService.resendEmail(forgotPasswordDto)
   }

   @Post("forgot_password")
   forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto){
   return this.authService.forgotPassword(forgotPasswordDto)
   }

  @UseGuards(AuthGuard)
  @Get("verify")
  verifyEmail(@Req() req){
    return this.authService.verify(req.user)
  }

  @UseGuards(AuthGuard)
  @Patch("update")
  update(@Req() req , @Body() updateAuthDto: UpdateAuthDto){
    return this.authService.update(req.user, updateAuthDto)
  }
  
  @UseGuards(AuthGuard)
  @Post("create_acl")
  createACL(@Req() req, @Body() createACLDto: CreateACLDto){
    return this.authService.createACL(req.user, createACLDto)
  }
  @UseGuards(AuthGuard)
  @Get("get_profile")
  @HttpCode(200)
  async getProfile(@Req() request){
    const response = await this.authService.getProfileData(request.user)
    return response
  }

  
  // @Post("verify")
  // verifyEmail(@Body() verifyAuthDto: VerifyAuthDto){
  //   return this.authService.verify(verifyAuthDto)
  // }
}
