import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('evaluators')
class Evaluator {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  occupation_area: string;

  @Column()
  institution: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  status: 'to_evaluate' | 'assessing' | 'rated';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Evaluator;
