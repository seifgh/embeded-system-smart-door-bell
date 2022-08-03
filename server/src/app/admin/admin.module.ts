import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminBackOfficeController } from './back-office/admin-back-office.controller';
import { AdminBackOfficeService } from './back-office/admin-back-office.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), AuthModule],
  controllers: [AdminController, AdminBackOfficeController],
  providers: [AdminService, AdminBackOfficeService],
})
export class AdminModule {}
