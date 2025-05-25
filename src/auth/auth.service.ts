import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { TenantService } from 'src/tenant/tenant.service';
import { ConfigService } from '@nestjs/config';
import { Db, ObjectId } from 'mongodb';
import * as bcryptjs from 'bcryptjs';
import { VerifyOtpDto } from './dto/verify-otp';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {

  private databaseName: string;
  private db: Db;


  constructor(private tenantService: TenantService,
    private configService: ConfigService,
    private emallService: EmailService,
    private jwtService: JwtService) { }

  async onModuleInit() {


    //TODO: refactorizar responsabilidades,el servicio de tenant es el encargado de todo lo de la db de traer las colecciones)


    this.databaseName = this.configService.get<string>('ADMIN_TENANT');
    this.db = await this.tenantService.getDb(this.databaseName);

    const otpCollection = this.db.collection('otp_password');
    //await otpCollection.dropIndex("createdAt_1")   
    await otpCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 900 }
    );

  }





  //refactorizar el access token con refresh token
  async generateOtp(email: string) {

    const idUser = await this.getUserIdByEmail(email);
    const existsOtpById = await this.existsOtpById(idUser);

    if (existsOtpById) {
      throw new UnauthorizedException("OTP already exists for this user (expires 15 minutes after creation)");
    }

    const otp = this.calculateOtp();
    const isOtpCreated = await this.createOtp(idUser, otp);

    if (isOtpCreated) {
      this.emallService.sendEmailLogin(email, otp);


      return {
        message: 'OTP enviado',
      };

      
    }
    throw new Error('No se pudo crear el OTP');

  }



  //TODO: si ya se uso el otp no se puede volver a usar
  async login(verifyOtpDto: VerifyOtpDto) {

    const { email, otp } = verifyOtpDto;
    const user = await this.getUserByEmail(email);

    const db_opt = await this.getOtpById(user._id);

    const isPasswordValid = await bcryptjs.compare(otp, db_opt)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid OTP");

    }

    const payload = { role: user.role, db_name: user.db };

    const token = await this.jwtService.signAsync(payload)

    return { token: token };
  }





  private async getUserIdByEmail(email: string) {

    return (await this.getUserByEmail(email))._id;
  }

  //TODO: refactorizar con interfaces para la db
  private async getUserRolByEmail(email: string) {

    return (await this.getUserByEmail(email)).role;
  }




  private async getUserByEmail(email: string) {
    const users = this.db.collection('users');
    const user = await users.findOne({ email });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return user
  }



  private async existsOtpById(id: ObjectId) {

    const otp = this.db.collection('otp_password');
    const otp_password = (await otp.findOne({ idUser: id }));

    if (!otp_password) {

      return false;
    }
    return true;
  }


  private async getOtpById(id: ObjectId) {

    const otp = this.db.collection('otp_password');
    const element = await otp.findOne({ idUser: id });
    if (!element) {
      throw new UnauthorizedException("User not found");
    }
    return element.otp;

  }


  private async createOtp(id: ObjectId, otp: string) {

    const otpCollection = this.db.collection('otp_password');
    const hashedOtp = await this.hashedOtp(otp);


    const otpData = {
      idUser: id,
      otp: hashedOtp,
      createdAt: new Date(),
    };

    await otpCollection.insertOne(otpData);
    return true;

  }


  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }


  private calculateOtp(n = 6) {
    const otp = Math.floor(Math.random() * 10 ** n).toString();
    return otp.padStart(n, '0');

  }

  private async hashedOtp(password: string) {

    return await bcryptjs.hash(password, 12)

  }

  async findAll() {

    const admins = this.db.collection('users');

    const allAdmins = await admins.find().toArray();
    return allAdmins;
  }

}
