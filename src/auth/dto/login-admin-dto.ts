import { IsEmail, IsNumber } from "class-validator";

export class LoginAdminDto {
  
  @IsEmail()
  email: string;
  
}