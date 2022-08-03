import { ClientHomeEntity } from 'src/app/client-home/client-home.entity';
import { ChildEntity, Column, ManyToMany, OneToMany } from 'typeorm';
import { UserEntity } from '../auth/entities/user.entity';

@ChildEntity('client')
export class ClientEntity extends UserEntity {
  @Column()
  fullName: string;

  @Column()
  imageURL: string;

  @OneToMany(() => ClientHomeEntity, (home) => home.owner)
  homes: ClientHomeEntity[];

  @ManyToMany(() => ClientHomeEntity, (clientHome) => clientHome.members)
  memberOf: ClientHomeEntity[];
}
