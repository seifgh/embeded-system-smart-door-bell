import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminBackOfficeController } from './back-office/admin-back-office.controller';
import { AdminBackOfficeService } from './back-office/admin-back-office.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AdminController, AdminBackOfficeController],
  providers: [AdminService, AdminBackOfficeService],
})
export class AdminModule {}
