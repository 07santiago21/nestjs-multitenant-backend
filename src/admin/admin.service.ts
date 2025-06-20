import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { TenantService } from 'src/tenant/tenant.service';
import { ConfigService } from '@nestjs/config';
import { Collection, ObjectId } from 'mongodb';
import { User } from 'src/auth/interfaces/user.interface';

@Injectable()
export class AdminService {

  constructor(private tenantService: TenantService, private configService: ConfigService) { }

  private userCollection: Collection<User>;


  async onModuleInit() {//peligroso usar await aqui----> buscar como mejorar esto

    const databaseName = this.configService.get<string>('ADMIN_TENANT');
    this.userCollection = await this.tenantService.getCollection<User>('users', databaseName);

  }





  async create(createDeliveryDto: CreateDeliveryDto) {

    const existing = await this.userCollection.findOne({ email: createDeliveryDto.email });

    if (existing) {
      throw new BadRequestException('Ya existe un usuario con ese correo');
    }

    const newdelivery: User = { ...createDeliveryDto, role: "delivery" }

    return this.userCollection.insertOne(newdelivery);

  }


  async findAll(db: string) {
    const allUsers = await this.userCollection.find({ db, role: "delivery" }).toArray();
    return allUsers;
  }



  update(id: number, updateAdminDto: UpdateDeliveryDto) {
    return `This action updates a #${id} admin`;
  }

  async remove(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new BadRequestException('ID inválido: no es un ObjectId válido');
  }

  const objectId = new ObjectId(id);
  const result = await this.userCollection.deleteOne({ _id: objectId });

  if (result.deletedCount === 0) {
    throw new BadRequestException('No se encontró ningún usuario con ese ID');
  }

  return {
    message: 'Usuario eliminado exitosamente',
    deletedId: objectId.toHexString(),
  };
}
}
