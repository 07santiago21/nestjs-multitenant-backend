import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TenantService } from 'src/tenant/tenant.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

  constructor(private tenantService: TenantService,private configService: ConfigService){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const databaseName = this.configService.get<string>('test');
    const db = await this.tenantService.getDb(databaseName);
    const admins = db.collection('empresas');

    const allAdmins = await admins.find().toArray();
    return allAdmins; 
}

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
