import { ExecutionContext, Injectable } from '@nestjs/common';
import { AdminEntity, AdminRole } from 'src/app/admin/admin.entity';
import { AtJwtAuthGuard } from './at-jwt-auth.guard';

@Injectable()
export class IsAdminGuard extends AtJwtAuthGuard {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const { user } = context.switchToHttp().getRequest();
    return user && user instanceof AdminEntity;
  }
}

@Injectable()
export class IsAdminSuperuserGuard extends AtJwtAuthGuard {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const { user } = context.switchToHttp().getRequest();
    return (
      user && user instanceof AdminEntity && user.role === AdminRole.SUPERUSER
    );
  }
}
