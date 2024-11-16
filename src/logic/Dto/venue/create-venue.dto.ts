import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateVenueDto {

    @IsNotEmpty()
    @IsString()
    name: string;

}
