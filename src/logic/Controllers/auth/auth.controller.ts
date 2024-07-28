import { SignInAuthDto, SignInRespDTO } from '../../Dto/auth/signin-auth.dto';

import { Controller, Get, Post, Body, HttpCode, HttpStatus, Request, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard, OneTimeAuthGuard } from '../../../auth/auth.guard';
import { AuthService } from '../../Services/auth/auth.service';
import { CreateAuthDto } from '../../Dto/auth/create-auth.dto';
import { UpdateAuthDto } from '../../Dto/auth/update-auth.dto';
import { ForgotPasswordDto } from '../../Dto/auth/ForgotPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createAuth(createAuthDto);
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
  verifyEmail(@Request() req){
    return this.authService.verify(req.user)
  }

  @UseGuards(AuthGuard)
  @Patch("update")
  update(@Request() req, @Body() updateAuthDto: UpdateAuthDto){
    return this.authService.update(req.user, updateAuthDto)
  }
  @UseGuards(AuthGuard)
  @Get("one_time_token")
  async oneTimeToken(@Request() req){
  const resp = await this.authService.oneTimeToken(req.user)
    return new SignInRespDTO(resp)
  }

  @Post("create_permission")
  createPermission(){
    return this.authService.createPermission()
  }
  
  // @Post("verify")
  // verifyEmail(@Body() verifyAuthDto: VerifyAuthDto){
  //   return this.authService.verify(verifyAuthDto)
  // }
}
