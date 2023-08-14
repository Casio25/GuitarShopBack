/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "@nestjs/class-validator";
import { IsString } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;


    
    
}
