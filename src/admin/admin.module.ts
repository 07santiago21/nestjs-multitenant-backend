import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TenantService } from 'src/tenant/tenant.service';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [TenantModule],
})
export class AdminModule {}
