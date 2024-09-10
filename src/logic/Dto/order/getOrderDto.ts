/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";
import { IGetOrderResponse } from "@src/utils/interface/IGetOrder";
import { IsNumber } from "class-validator";

export class GetOrderDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class BaseResponseDto<T> {
    constructor(obj: T) {
        Object.assign(this, obj);
    }
}

export class GetOrdersResponseDto extends BaseResponseDto<IGetOrderResponse> {
    count: number;
    data: IGetOrderResponse[]
}
