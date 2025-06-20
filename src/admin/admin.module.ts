import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TenantService } from 'src/tenant/tenant.service';
import { TenantModule } from 'src/tenant/tenant.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [TenantModule,AuthModule],
})
export class AdminModule {}
