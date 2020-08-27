import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('admin_tokens')
class AdminToken {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column()
  admin_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AdminToken;
