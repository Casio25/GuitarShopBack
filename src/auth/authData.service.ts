/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Order } from '@prisma/client';
import { ICreateAuth } from './../utils/interface/authInterface';

@Injectable()
export class AuthDataService {
    constructor(private prisma: PrismaService) { }

    
    // Check if user with the same email already exists

    async findUser(email: string): Promise<User> {
        try {
            console.log(email)
            return await this.prisma.user.findFirst({
                where: {
                    email: email
                },
            });
        }
        catch {
            throw new Error( "user not found");
        }
    }

    async createUser(userData: ICreateAuth): Promise<User> {
        try {
            

            // If no existing user found, create a new user
            const newUser = await this.prisma.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    phoneNumber: userData.phoneNumber,
                },
            });

            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User not created');
            
        }
    }


    async Test() {
        console.log('testing authDataService');
    }
}

