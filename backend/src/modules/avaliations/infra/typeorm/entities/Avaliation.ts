import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Evaluator from '@modules/evaluators/infra/typeorm/entities/Evaluator';
import Project from '@modules/projects/infra/typeorm/entities/Project';

@Entity('avaliations')
class Avaliation {
  @PrimaryColumn()
  id: string;

  @Column()
  evaluator_id: string;

  @ManyToOne(() => Evaluator)
  @JoinColumn({ name: 'evaluator_id' })
  evaluator: Evaluator;

  @Column()
  project_id: string;

  @ManyToOne(() => Project, { eager: true })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  comments: string;

  @Column()
  status: 'to_evaluate' | 'rated';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Avaliation;
