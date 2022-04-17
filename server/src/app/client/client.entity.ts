import { ClientHomeEntity } from 'src/app/client-home/client-home.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  BeforeInsert,
} from 'typeorm';
import * as argon2 from 'argon2';

@Entity('client')
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Column()
  imageURL: string;

  @OneToMany(() => ClientHomeEntity, (home) => home.owner)
  homes: ClientHomeEntity[];

  @ManyToMany(() => ClientHomeEntity, (clientHome) => clientHome.members)
  memberOf: ClientHomeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
