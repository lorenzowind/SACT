import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddWeightFieldInQuestions1606449648639
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'questions',
      new TableColumn({
        name: 'weight',
        type: 'decimal(4,2)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('questions', 'weight');
  }
}
