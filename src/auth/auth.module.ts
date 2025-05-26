import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TenantModule } from 'src/tenant/tenant.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    })
    ,
    EmailModule,
    TenantModule


  ],
})
export class AuthModule { }
