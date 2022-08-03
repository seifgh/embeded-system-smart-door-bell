import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ClientEntity } from 'src/app/client/client.entity';

export const AuthClient = createParamDecorator(
  (data: string, ctx: ExecutionContext): ClientEntity => {
    const request = ctx.switchToHttp().getRequest();
    const authClient: ClientEntity = request.user;

    return authClient;
  },
);
