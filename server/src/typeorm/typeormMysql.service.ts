import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AdminEntity } from 'src/app/admin/admin.entity';
import { UserEntity } from 'src/app/auth/entities/user.entity';
import { ClientHomeHistoryEntity } from 'src/app/client-home/client-home-history.entity';
import { ClientHomeEntity } from 'src/app/client-home/client-home.entity';
import { ClientEntity } from 'src/app/client/client.entity';

@Injectable()
export class TypeormMySqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [
        UserEntity,
        AdminEntity,
        ClientEntity,
        ClientHomeEntity,
        ClientHomeHistoryEntity,
      ],
      synchronize: true,
    };
  }
}
