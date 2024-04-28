import { IsString, IsInt, IsNotEmpty, IsBoolean, IsArray } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";
export class ChangeProductDto {

    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    @IsNotEmpty()
    authorId: number;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsString()
    photo: string;

    @IsArray() // Change to validate as an array
    @IsNotEmpty()
    categories: Category[]; 

    @IsArray() 
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
class Category {
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

class Order {
    @IsInt()
    @IsNotEmpty()
    id;

    @IsInt()
    @IsNotEmpty()
    order;

    @IsNotEmpty()
    @IsInt()
    authorId;

    @IsInt()
    @IsNotEmpty()
    categoryId;

    @IsInt()
    @IsNotEmpty()
    productId
}