import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TenantModule } from 'src/tenant/tenant.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    
    JwtModule.register({
      secret: "sss",
      signOptions: { expiresIn:"2m"}//process.env.JWT_SECRET_EXPIRES_IN },
    }),

    EmailModule,
    TenantModule


  ],
})
export class AuthModule {}
