/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";
import { IsJWT, IsString } from "class-validator";

export class SignInAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}
export class BaseResponseDto<T> {
    constructor(obj: T) {
        Object.assign(this, obj);
    }
}
export interface ISignInResponse {
    access_token: string
}
export class SignInRespDTO extends BaseResponseDto<ISignInResponse>{
    @IsNotEmpty()
    @IsJWT()
    access_token: string
}