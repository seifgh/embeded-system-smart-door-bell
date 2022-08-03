import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './app/admin/admin.module';
import { AuthModule } from './app/auth/auth.module';
import { ClientHomeModule } from './app/client-home/client-home.module';
import { ClientModule } from './app/client/client.module';
import { SocketModule } from './app/socket/socket.module';
import TypeOrmModule from './typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule,
    AdminModule,
    ClientModule,
    ClientHomeModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
