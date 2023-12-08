import { IsString, IsInt, IsNotEmpty, IsArray } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";
export  class ChangeProductDto {
    @IsInt()
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    @IsString()
    productName: string;
    @IsInt()
    @IsNotEmpty()
    authorId: number;
    @IsNotEmpty()
    @IsString()
    type: string;
    @IsNotEmpty()
    @IsString()
    string: string;
    @IsOptional()
    @IsInt()
    rating: number;
    @IsInt()
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    @IsString()
    photo: string;
}