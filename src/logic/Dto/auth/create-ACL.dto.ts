import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export enum Permission {
    READ = "READ",
    WRITE = "WRITE"
}

export class CreateACLDto {
    @IsEnum(Permission)
    permission: Permission;
    @IsString()
    @IsNotEmpty()
    resource: string;

}
