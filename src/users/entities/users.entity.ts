import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Remedy } from '../../remedies/entities/remedy.entity';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany((type) => Remedy, (remedy) => remedy.users, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  remedies: Remedy[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
