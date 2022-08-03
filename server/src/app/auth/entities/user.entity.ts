import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column()
  password: string;
  async hashPassword(password: string) {
    this.password = await argon2.hash(password);
  }

  async verifyPassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
