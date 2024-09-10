import { IDataServiceUser, IFindUser } from '../../utils/interface/IUser';
import { IsNotEmpty } from '@nestjs/class-validator';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Role } from '@prisma/client';
import { ICreateAuth } from '../../utils/interface/authInterface';
import { IUser } from '@src/utils/interface/IUser';
import { UserDataService } from './userData.service';


interface IUpdateData {
    id: number;
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    phoneNumber: string;
    isEmailConfirmed: boolean;
    roleId: number
}

@Injectable()
export class AuthDataService {
    constructor(private prisma: PrismaService) { }

    // Check if user with the same email already exists

    async findUser(userServiceData: IDataServiceUser): Promise<User | null> {
        try {
            const userData: IDataServiceUser = {...userServiceData}
            console.log("userData", userData)
            const user =  await this.prisma.user.findFirst({
                where: userData
            });
            return user || null
        }
        catch (error){
            console.error("Error finding user: ", error)
            throw new Error(error);
        }
    }

    async createUser(userData: ICreateAuth) {
        try {            

            
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

            
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User not created');
            
        }
    }

    async update(where?: IUpdateData  ) {
        
        try {
            const updatedUser = await this.prisma.user.update({
                where: where, 
                data: {
                    firstName: where.firstName,
                    secondName: where.secondName,
                    password: where.password,
                    phoneNumber: where.phoneNumber


                }
            });


            if (!updatedUser || updatedUser.email == null) {
                // Handle the case where user creation failed
                throw new Error('User not updated');
            }

           
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('User not updated');

        }
    }

    async verify(user: number){
        try{
            const verifiedUser = await this.prisma.user.update({
                where: {
                    id: user
                },
                data: {
                    isEmailConfirmed: true
                }
            });
            if (!verifiedUser || verifiedUser.email == null) {
                throw new Error('User not verified');
            }
        }catch(error){
            console.error("error updating user", error)
            throw new Error("User not found")
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

