import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './app/socket/customadapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public',
  });
  app.setGlobalPrefix('api');

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
