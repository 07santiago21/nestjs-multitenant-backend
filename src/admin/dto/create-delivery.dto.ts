import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateDeliveryDto {

    @IsEmail()
    email: string;

    @IsString()
    name: string;
    
    @IsNumber()
    phone: number;
    
    @IsString()
    db: string;
    
    
}
