/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Order } from '@prisma/client';
import { ICreateAuth } from './../utils/interface/authInterface';

@Injectable()
export class AuthDataService {
    constructor(private prisma: PrismaService) { }

    async createUser(userData: ICreateAuth): Promise<User> {
        try {
            // Check if user with the same email already exists
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    email: userData.email,
                },
            });

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

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

