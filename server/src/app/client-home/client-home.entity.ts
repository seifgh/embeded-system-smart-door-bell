import { ClientEntity } from 'src/app/client/client.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientHomeHistoryEntity } from './client-home-history.entity';

@Entity('clientHome')
export class ClientHomeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  raspberryPiCartKey: string;

  @Column()
  name: string;

  @ManyToOne(() => ClientEntity, (owner) => owner.homes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: ClientEntity;

  @ManyToMany(() => ClientEntity, (client) => client.memberOf)
  @JoinTable()
  members: ClientEntity[];

  @OneToMany(
    () => ClientHomeHistoryEntity,
    (clientHomeHistory) => clientHomeHistory.home,
  )
  histories: ClientHomeHistoryEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
