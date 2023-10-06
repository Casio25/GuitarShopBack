import { IsString, IsInt, IsNotEmpty, IsArray } from "@nestjs/class-validator";

export class GetProductsDto {
    @IsInt()
    @IsNotEmpty()
    startIndex: number
    @IsInt()
    @IsNotEmpty()
    endIndex: number
}
