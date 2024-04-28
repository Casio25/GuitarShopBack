import { IsString, IsInt, IsNotEmpty, IsBoolean, IsArray } from "@nestjs/class-validator";
import { IsIn, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    authorId: number;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsString()
    photo: string;

    @IsArray() // Change to validate as an array
    @IsNotEmpty()
    categories: Category[]; 

    @IsArray() // Change to validate as an array
    @IsNotEmpty()
    orders: Order[]; 

    @IsString()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    visibility: boolean;

    @IsBoolean()
    @IsNotEmpty()
    inStock: boolean;

   
}

class Order {
    @IsInt()
    @IsNotEmpty()
    id; 

    @IsInt()
    @IsNotEmpty()
    order;

    @IsInt()
    @IsNotEmpty()
    categoryId;

    @IsInt()
    @IsNotEmpty()
    authorId
}

class Category{
    @IsNotEmpty()
    @IsInt()
    id: number

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    type: string

}