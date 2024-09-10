import { IsString, IsInt, IsNotEmpty, IsBoolean, IsArray } from "@nestjs/class-validator";
import {  ICreateProductResponse, IGetProductsDataServiceResponse, IGetProductsResponse} from "@src/utils/interface/ProductInterface";
import { IsIn, IsOptional } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";

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
export class BaseResponseDto<T> {
    constructor(obj: T) {
        Object.assign(this, obj);
    }
}


export class CreateProductResData{
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

    @IsString()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    visibility: boolean;

    @IsBoolean()
    @IsNotEmpty()
    inStock: boolean;
}

export class CreateProductResDTO extends BaseResponseDto<ICreateProductResponse> implements ICreateProductResponse {
    @IsOptional()
    data?: CreateProductResData;

    @IsInt()
    status: number;

    @IsString()
    @IsOptional()
    error?: string;
}

export class GetProductsResponseDTO extends BaseResponseDto<IGetProductsResponse> implements IGetProductsResponse {
    categories: Category[];
    orders: Order[];
    
    @IsInt()
    @IsNotEmpty()
    @Expose()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Exclude()
    name: string;


    @IsInt()
    @IsNotEmpty()
    @Expose()
    authorId: number;

    @IsInt()
    @IsNotEmpty()
    @Expose()
    price: number;

    @IsString()
    @Expose()
    photo: string;

    @IsString()
    @Expose()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    @Expose()
    visibility: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @Expose()
    inStock: boolean;
}

export class GetArrayOfProductsResponseDto extends BaseResponseDto<IGetProductsDataServiceResponse>{
    count: number
    data: GetProductsResponseDTO[]
}