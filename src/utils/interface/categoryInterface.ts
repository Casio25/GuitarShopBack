import { $Enums } from "@prisma/client";

export interface ICreateCategory {
    name: string,
    
}

export interface ICustomCategory {
    name: string,
    id: number,
    userId: number
}

export interface IDeleteCategory {
    id: number,
    name: string,
    type: string
}

export interface ICreateCategoryDataResponse {
    id: number,
    name: string,
    type: string
}

export interface ICreateCategoryResponse {
    status: number,
    data?: ICreateCategoryDataResponse,
    error?: string
}

export interface IGetCategoriesResponse {
    id: number,
    name: string,
    type: $Enums.Type;
}

export interface IGetCategoriesDataServiceResponse {
    count: number,
    data: IGetCategoriesResponse[]
}