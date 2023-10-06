import { IsString, IsInt, IsNotEmpty, IsArray } from "@nestjs/class-validator";

export class CreateProductDto {
    
    @IsNotEmpty()
    @IsString()
    productName: string;
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