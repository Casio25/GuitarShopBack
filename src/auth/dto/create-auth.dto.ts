/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";
import { IsString } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    phoneNumber: string;


    
    
}
