import { ICreateAuth } from './../utils/interface/authInterface';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async signUp(createAuthDto: CreateAuthDto) {
    // const newUser = await this.usersService.create(createAuthDto);
    // return newUser; // Return the newly created user object
  }

  signIn(createAuthDto: ICreateAuth) {
    return `user signed in`;
  }
}
