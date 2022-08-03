import * as argon2 from 'argon2';
import { ChildEntity, Column } from 'typeorm';
import { UserEntity } from '../auth/entities/user.entity';

export enum AdminRole {
  SUPERUSER = 'superuser',
  MANAGER = 'manager',
}

@ChildEntity('admin')
export class AdminEntity extends UserEntity {
  @Column()
  fullName: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.MANAGER,
  })
  role: AdminRole;
}
