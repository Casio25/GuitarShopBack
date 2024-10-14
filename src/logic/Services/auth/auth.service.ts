import { UpdateAuthDto } from '../../Dto/auth/update-auth.dto';
import { ForgotPasswordDto } from '../../Dto/auth/ForgotPassword.dto';
import { AuthDataService } from '../../DataServices/authData.service';
/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateAuth, ISignAuth, IUpdateAuth } from '../../../utils/interface/authInterface';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../../Dto/auth/create-auth.dto';
import { ISignInResponse, SignInAuthDto } from '../../Dto/auth/signin-auth.dto';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@src/utils/interface/jwtpayloadInterface';
import { User } from '@prisma/client';
import * as nodemailer from 'nodemailer';
import { IMailOption } from "../../../utils/interface/mailInterface";
import { JwtService } from '@nestjs/jwt'
import { IForgotPassword } from '@src/utils/interface/IForgotPassword';
import { IRequest, IUserRequest } from '@src/utils/interface/requestInterface';
import { IUser } from '@src/utils/interface/IUser';

@Injectable()
export class AuthService {
  private authors: (CreateAuthDto | SignInAuthDto)[] = [];
  constructor(private authDataService: AuthDataService,
              private jwtService: JwtService){}
  private checkAdminRole(user: IUser) {
    if (user.roleId !== 1) {
      throw new UnauthorizedException("Access denied")
    }
  }
  private checkForUser(user: IUser) {
    if (!user) {
      throw new NotFoundException("User not found")
    }
  }
  //creating new user
  async createAuth(createAuthDto: ICreateAuth) {
    try {
      const user = await this.authDataService.findUser(createAuthDto.email)
      if (user) {
        throw new Error("User already exists")
      }
      const newUser = await this.authDataService.createUser(createAuthDto);
      const payload = {email: createAuthDto.email}
      const jwtToken = await this.jwtService.signAsync(payload);
      await this.sendEmail(createAuthDto.email, jwtToken)
        .then(() => {
          console.log('User Registered and email sent successfully');
        })
        .catch((error) => {
          console.log('User registered, but email sending failed:', error);
        });
       
    } catch (error) {
      throw new BadRequestException("Error creating user", error)
    }
  }

  async resendEmail(forgotPasswordDto: IForgotPassword): Promise<any> {
    console.log("resend email user email: ", forgotPasswordDto.email)
    const user = await this.authDataService.findUser(forgotPasswordDto.email);
    try {
      if (user?.email !== forgotPasswordDto.email) {
        throw new Error("User with this email doesn't exist")
      }
      const payload = { email: user.email }
      const jwtToken = await this.jwtService.signAsync(payload);
      await this.sendEmail(forgotPasswordDto.email, jwtToken)
        .then(() => {
          console.log('email resend succesfully');
        })
        .catch((error) => {
          console.log('Email resending failed:', error);
        });
  }catch (error){
    console.error("Error resending email: ", error.message);
    throw new BadRequestException ("Error resending email: ", error)
  }
}


  //sending email
  private sendEmail(email: string, jwtToken:string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      const mailOptions: IMailOption = {
        from: 'mishakolomietsus@gmail.com',
        to: email,
        subject: 'Order Confirmation',
        text: `You have successfully registered with your ${email} email address.\nTo finish your registration, click on the link below:\n\nhttp://localhost:3000/en/verify`,
        html: `<p>You have successfully registered with your ${email} email address.</p>
         <p>To finish your registration, click on the link below:</p>
         <a href="http://localhost:3000/en/verify?token=${jwtToken}" id="verification-link">Verify Email</a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async signIn(signInAuthDto: ISignAuth): Promise<ISignInResponse> {
    const user = await this.authDataService.findUser(signInAuthDto.email);
    
    if (!user) {
      throw new BadRequestException("User with this email doesn't exist");
    }

    const isPasswordValid = user.password === signInAuthDto.password;
    if (!isPasswordValid) {
      throw new BadRequestException("Wrong password");
      
    }

    const { password, ...result } = user;
    const payload = { uid: user.id};

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }




  async forgotPassword(forgotPasswordDto: IForgotPassword): Promise<any> {
    const user = await this.authDataService.findUser(forgotPasswordDto.email);
    try {
      this.checkForUser(user)
      
      const payload = { email: user.email }
      const jwtToken = await this.jwtService.signAsync(payload);
      await this.forgotPasswordEmail(forgotPasswordDto.email, jwtToken)
        .then(() => {
          console.log('email resend succesfully');
        })
        .catch((error) => {
          console.log('Email resending failed:', error);
        });
    } catch (error) {
      console.error("Error resending email: ", error.message);
      throw new Error("Error resending email")
    }
  }


  async update(req: IUserRequest, updateAuthDto: UpdateAuthDto) {
    console.log(updateAuthDto)
    const allowedFields = ['email', 'firstName', 'secondName', 'isEmailConfirmed', 'password', 'phoneNumber', 'role'];
    const where: any = {};
    

    allowedFields.forEach(field => {
      if (updateAuthDto[field] !== undefined) {
        where[field] = updateAuthDto[field];
      }
    });

    try {
      
      
      await this.authDataService.update(where);

      
    } catch (error) {
      throw new BadRequestException ("Error updating user", error);
    }
  }

  async verify(req: IUserRequest) {
    try {
      const user = req.uid
      

      const data: any = {
        isEmailConfirmed: true
      }

      await this.authDataService.verify(user);

      
    } catch (error) {
      throw new BadRequestException ("Error verifying user", error);
    }
  }





  private forgotPasswordEmail(email: string, jwtToken: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mishakolomiets355@gmail.com',
          pass: 'jtkrcyyvszokkbqz',
        },
      });

      const mailOptions: IMailOption = {
        from: 'mishakolomietsus@gmail.com',
        to: email,
        subject: 'Order Confirmation',
        text: `You requested to change password with this ${email} email address \n
        To change your password, click on the link below:\n http://localhost:3000/en/change_password `,
        html: `<p>You requested to change password with this ${email} email address.</p>
         <p>To change your password, click on the link below:</p>
         <a href="http://localhost:3000/en/change_password?token=${jwtToken}" id="verification-link">ChangePassword</a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
          reject(error);
        } else {
          console.log('Email sent:', info.response);
          resolve();
        }
      });
    });
  }

  async createPermission(){
    return this.authDataService.createRoleAndPermissions()
  }

  async getProfileData(user: IUserRequest){
    
    const response = await this.authDataService.findUser(user.email)
    console.log("response", response)
    return response
  }



}


