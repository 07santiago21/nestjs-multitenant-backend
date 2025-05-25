import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from './tenant/tenant.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
  
    ConfigModule.forRoot({
      isGlobal:true
    }),

    AuthModule,
    AdminModule,
    UsersModule,
    TenantModule,
    EmailModule
  
  ],
  
  
  
    controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
