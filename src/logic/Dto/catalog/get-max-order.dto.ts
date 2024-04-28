import { IsString, IsInt, IsNotEmpty, IsBoolean, IsArray } from "@nestjs/class-validator";
export class GetMaxOrderDto {
    @IsInt()
    @IsNotEmpty()
    categoryId;

}