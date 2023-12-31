import { IsString, IsInt, IsNotEmpty, IsArray } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";

export class CreateProductDto {
    
    @IsNotEmpty()
    @IsString()
    productName: string;
    @IsOptional()
    authorId: number;
    @IsNotEmpty()
    @IsString()
    type: string;
    @IsNotEmpty()
    @IsString()
    string: string;
    @IsInt()
    @IsNotEmpty()
    price: number;
    @IsInt()
    @IsNotEmpty()
    rating: number
    @IsString()
    photo: string;

}