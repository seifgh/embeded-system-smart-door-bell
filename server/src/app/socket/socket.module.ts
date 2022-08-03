import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ClientHomeModule } from '../client-home/client-home.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [ClientHomeModule, AuthModule],
  controllers: [],
  providers: [SocketGateway],
})
export class SocketModule {}
