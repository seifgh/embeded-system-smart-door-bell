import { ExecutionContext, Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/app/client/client.entity';
import { AtJwtAuthGuard } from './at-jwt-auth.guard';

@Injectable()
export class IsClientGuard extends AtJwtAuthGuard {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const { user } = context.switchToHttp().getRequest();
    return user && user instanceof ClientEntity;
  }
}
