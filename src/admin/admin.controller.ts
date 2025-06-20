import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Roles('admin')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {

    return this.adminService.create(createDeliveryDto);
  }

  
  @Roles('admin')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get(':db')
  findAll(@Param('db') db: string) {
    return this.adminService.findAll(db);
  }





  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.adminService.update(+id, updateDeliveryDto);
  }




  @Roles('admin')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
