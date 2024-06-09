import { IsNotEmpty } from '@nestjs/class-validator';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Role } from '@prisma/client';
import { ICreateAuth } from '../../utils/interface/authInterface';
import { IUser } from 'src/utils/interface/IUser';


interface IUpdateData {
    id: number;
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    phoneNumber: string;
    isEmailConfirmed: boolean;
}

@Injectable()
export class AuthDataService {
    constructor(private prisma: PrismaService) { }

    // Check if user with the same email already exists

    async findUser(email: string): Promise<User | null> {
        try {
            const user =  await this.prisma.user.findFirst({
                where: {
                    email: email
                },
            });
            return user || null
        }
        catch (error){
            console.error("Error finding user: ", error)
            throw new Error(error);
        }
    }

    async createUser(userData: ICreateAuth): Promise<User> {
        try {            

            // If no existing user found, create a new user
            const newUser = await this.prisma.user.create({
                data: {
                    firstName: userData.firstName,
                    secondName: userData.secondName,
                    email: userData.email,
                    password: userData.password,
                    role:{
                        connect: {id: 1}
                    }
                },
            });


            if (!newUser || newUser.id == null) {
                // Handle the case where user creation failed
                throw new Error('User not created');
            }

            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User not created');
            
        }
    }

    async update(user :IUpdateData, where?: IUpdateData): Promise<User | null> {
        
        try {
            const updatedUser = await this.prisma.user.update({
                where:{
                    id: user.id
                },
                data: {
                    isEmailConfirmed: true,
                    firstName: where.firstName,
                    secondName: where.secondName,
                    password: where.password,
                    phoneNumber: where.phoneNumber


                }
            });


            if (!updatedUser || updatedUser.email == null) {
                // Handle the case where user creation failed
                throw new Error('User not verified');
            }

            return updatedUser;
        } catch (error) {
            console.error('Error verifing user:', error);
            throw new Error('User not veriofied');

        }
    }

    async createRoleAndPermissions() {
        try {
            // Create a role first
            const role = await this.prisma.role.create({
                data: {
                    name: 'Admin',
                    description: 'Administrator with full permissions',
                },
            });

            console.log('Role created:', role);

            // Permissions associated with the created role
            const permissions = [
                {
                    action: 'read',
                    resource: 'Product',
                    description: 'Read permission for products',
                    roleId: role.id,
                },
                {
                    action: 'write',
                    resource: 'Product',
                    description: 'Write permission for products',
                    roleId: role.id,
                },
                {
                    action: 'delete',
                    resource: 'Product',
                    description: 'Delete permission for products',
                    roleId: role.id,
                },
                // Add more permissions as needed
            ];

            const createdPermissions = await this.prisma.permission.createMany({
                data: permissions,
            });

            console.log('Permissions created:', createdPermissions);
        } catch (error) {
            console.error('Error creating role or permissions:', error);
            throw new Error('Role or Permission not created');
    }
}

    

   
}

