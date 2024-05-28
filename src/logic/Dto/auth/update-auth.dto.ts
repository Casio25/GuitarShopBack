import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsEnum, IsInt } from "@nestjs/class-validator";
import { Role } from '@prisma/client';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    @IsOptional()
    @IsInt()
    roleId: number;
}
