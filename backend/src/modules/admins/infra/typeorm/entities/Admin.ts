import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('admins')
class Admin {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  ra: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Admin;
