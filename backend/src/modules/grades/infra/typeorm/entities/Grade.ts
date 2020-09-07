import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Avaliation from '@modules/avaliations/infra/typeorm/entities/Avaliation';
import Question from '@modules/questions/infra/typeorm/entities/Question';

@Entity('grades')
class Grade {
  @PrimaryColumn()
  id: string;

  @Column()
  avaliation_id: string;

  @ManyToOne(() => Avaliation)
  @JoinColumn({ name: 'avaliation_id' })
  avaliation: Avaliation;

  @Column()
  question_id: string;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column()
  grade: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Grade;
