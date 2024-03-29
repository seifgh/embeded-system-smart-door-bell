import { ClientHomeService } from './client-home.service';
import { ClientHomeController } from './client-home.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientHomeEntity } from './client-home.entity';
import { ClientHomeBackOfficeController } from './back-office/client-home-back-office.controller';
import { ClientHomeBackOfficeService } from './back-office/client-home-back-office.service';
import { ClientModule } from '../client/client.module';
import { ClientHomeHistoryEntity } from './client-home-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientHomeEntity, ClientHomeHistoryEntity]),
    ClientModule,
  ],
  controllers: [ClientHomeController, ClientHomeBackOfficeController],
  providers: [ClientHomeService, ClientHomeBackOfficeService],
  exports: [ClientHomeService],
})
export class ClientHomeModule {}
