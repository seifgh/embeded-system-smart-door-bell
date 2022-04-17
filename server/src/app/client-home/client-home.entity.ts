import { ClientEntity } from 'src/app/client/client.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity('clientHome')
export class ClientHomeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  raspberryPiCartKey: string;

  @Column()
  name: string;

  @ManyToOne(() => ClientEntity, (owner) => owner.homes)
  @JoinColumn({ name: 'ownerId' })
  owner: ClientEntity;

  @ManyToMany(() => ClientEntity, (client) => client.memberOf)
  @JoinTable()
  members: ClientEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
