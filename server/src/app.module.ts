import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './app/admin/admin.module';
import { ClientHomeModule } from './app/client-home/client-home.module';
import { ClientModule } from './app/client/client.module';
import TypeOrmModule from './typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule,
    AdminModule,
    ClientModule,
    ClientHomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
