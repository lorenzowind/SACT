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
  criterion: string;

  @Column()
  min_grade: number;

  @Column()
  max_grade: number;

  @Column()
  weight: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Question;
