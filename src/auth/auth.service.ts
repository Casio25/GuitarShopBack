import { AuthDataService } from './authData.service';
/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateAuth, ISignAuth } from './../utils/interface/authInterface';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/utils/interface/jwtpayloadInterface';
import { Order, User } from '@prisma/client';
import * as nodemailer from 'nodemailer';
import { IMailOption } from "../utils/interface/mailInterface";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private authors: (CreateAuthDto | SignInAuthDto)[] = [];
  constructor(private authDataService: AuthDataService,
              private jwtService: JwtService){}
  //creating new user
  async createAuth(createAuthDto: ICreateAuth){
    try{
    this.authDataService.Test();
    if ( await this.authDataService.findUser(createAuthDto.email)){
      throw new Error ("User already exists")
    }
      await this.authDataService.createUser(createAuthDto);
      await this.sendEmail(createAuthDto.email)
        .then(() => {
          console.log('User Registered and email sent successfully');
        })
        .catch((error) => {
          console.log('User registered, but email sending failed:', error);
        });
    } catch (error) {
      console.error('Error creating user:', error.message);
      return { error: error.message }; 
    }
  }
  //sending email
  private sendEmail(email: string): Promise<void> {
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
        text: `you succesfully registered witn your ${email} email address`,
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

  async signIn(signInAuthDto: ISignAuth): Promise<any> {
    const user = await this.authDataService.findUser(signInAuthDto.email);
    if (user?.email !== signInAuthDto.email) {
      throw new Error ("user with with email doesn't exists");
    }
    const { password, ...result } = user;
    const payload = { sub: user.name, username: user.password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}


