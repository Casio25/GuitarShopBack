
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User} from '@prisma/client';
import { ICreateAuth } from '../../utils/interface/authInterface';
import { IUser } from '@src/utils/interface/IUser';
import { IUserRequest } from '@src/utils/interface/requestInterface';
import { ICreateACL } from '@src/utils/interface/ACLInterface';



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

    async findUser(userData: IUserRequest): Promise<User | null> {
        const whereUserData: any = {};
        if (userData.email) {
            whereUserData.email = userData.email;
        }
        if (userData.uid){
            whereUserData.id = userData.uid;
        }
        try {
            const user =  await this.prisma.user.findFirst({
                where: whereUserData,
                include: {
                    Venue: true
                }
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

    async verify(uid: number){
        try{
            const verifiedUser = await this.prisma.user.update({
                where: {
                    id: uid
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

   async createACL(uid: number, ACLData: ICreateACL){
    try{
        const newACl = await this.prisma.acl.create({
            data:{
                userId: uid,
                ...ACLData
            }
        })
    }catch(error){
        console.log("Error creating ACL", error)
        throw new Error("Error creating ACL")
    }
   }

    

   
}

