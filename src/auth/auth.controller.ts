import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin-dto';
import { VerifyOtpDto } from './dto/verify-otp';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService ) {}


  @Post('generate-otp')
  loginAdmin(@Body() loginAdminDto: LoginAdminDto) {

    const email = loginAdminDto.email
    return this.authService.generateOtp(email)
  }

  @Post('login')
  verifyOtp(@Body() verifyOtpDto:VerifyOtpDto){
    return this.authService.login(verifyOtpDto);

  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  findAll(@Req() req) {//organizar el tipo del req con una interface que extienda de request
    console.log(req.user)
    return this.authService.findAll();
  }


  @Post('a')
  a(@Body() loginAdminDto: LoginAdminDto) {

    const email = loginAdminDto.email
    return this.authService.a(email)
  }

 
}
