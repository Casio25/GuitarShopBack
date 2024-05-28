import { IsString, IsInt, IsNotEmpty, IsBoolean, IsArray } from "@nestjs/class-validator";
export class DeleteProductDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsInt()
    @IsNotEmpty()
    authorId: number;

    @IsArray()
    @IsNotEmpty()
    orders: Order[]; 

    @IsArray()
    @IsNotEmpty()
    categories: Category[]; 
    
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