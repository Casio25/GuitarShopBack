import { IsString, IsInt, IsNotEmpty, IsArray } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";
export class DeleteCategoryDto {

    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    type: string
}
