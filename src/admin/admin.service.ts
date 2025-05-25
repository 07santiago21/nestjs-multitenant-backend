import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { TenantService } from 'src/tenant/tenant.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  
  
     
  constructor(private tenantService: TenantService,private configService: ConfigService){}

  
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async findAll() {
    const databaseName = this.configService.get<string>('ADMIN_TENANT');
    const db = await this.tenantService.getDb(databaseName);
    const admins = db.collection('a');

    const allAdmins = await admins.find().toArray();
    return allAdmins; 
}


  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
