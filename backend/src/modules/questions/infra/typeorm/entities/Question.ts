import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('questions')
class Question {
  @PrimaryColumn()
  id: string;

  @Column()
  section: string;

  @Column()
  criterion?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Question;
