import { IsString, IsInt, IsNotEmpty, IsArray } from "@nestjs/class-validator";
import { ICreateCategoryResponse, IGetCategoriesDataServiceResponse, IGetCategoriesResponse } from "@src/utils/interface/categoryInterface";
import { IsEnum, IsOptional } from "class-validator";
export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    name: string
    
}

export class CreateCategoryDataResponse {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsInt()
    id: number

    @IsString()
    @IsNotEmpty()
    type: string
}
export class BaseResponseDto<T> {
    constructor(obj: T) {
        Object.assign(this, obj);
    }
}


export class CreateCategoryResponseDto extends BaseResponseDto<ICreateCategoryResponse> implements ICreateCategoryResponse{
    @IsNotEmpty()
    @IsInt()
    status: number
    @IsOptional()
    data?: CreateCategoryDataResponse
    @IsOptional()
    @IsString()
    error?: string
}
export enum Type {
   private = 'private',
   common = "common" 
}

export class GetCategoriesResponseDto extends BaseResponseDto<IGetCategoriesResponse> implements IGetCategoriesResponse {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsInt()
    id: number

    @IsEnum(Type)
    @IsNotEmpty()
    type: Type
}

export class GetArrayOfCategoriesResponeDto extends BaseResponseDto<IGetCategoriesDataServiceResponse>{
    count: number
    data: GetCategoriesResponseDto[]
}