import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientHomeEntity } from './client-home.entity';

@Entity('clientHomeHistory')
export class ClientHomeHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageURL: string;

  @ManyToOne(() => ClientHomeEntity, (clientHome) => clientHome.histories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  home: ClientHomeEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
