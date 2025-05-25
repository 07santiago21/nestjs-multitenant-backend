import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAdminDto } from './dto/login-admin-dto';
import { VerifyOtpDto } from './dto/verify-otp';
import { Auth } from './entities/auth.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }


  @Post('generate-otp')
  loginAdmin(@Body() loginAdminDto: LoginAdminDto) {


    return this.authService.generateOtp(loginAdminDto.email) //this.authService.generateOtp(loginAdminDto.email);
  }

  @Post('login')
  verifyOtp(@Body() verifyOtpDto:VerifyOtpDto){
    return this.authService.login(verifyOtpDto);

  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  findAll(@Req() req) {//organizar el tipo del req con una interface que extienda de request
    console.log(req.db_name)
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return //this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return //this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return //this.authService.remove(+id);
  }
}
