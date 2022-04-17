import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ClientBackOfficeService } from './back-office/client-back-office.service';
import { ClientBackOfficeController } from './back-office/client-back-office.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController, ClientBackOfficeController],
  providers: [ClientService, ClientBackOfficeService],
  exports: [ClientBackOfficeService],
})
export class ClientModule {}
