import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAvaliations1599512518530
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'avaliations',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'evaluator_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'project_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'comments',
            type: 'varchar(255)',
          },
          {
            name: 'status',
            type: "enum('to_evaluate', 'rated')",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'avaliations',
      new TableForeignKey({
        name: 'AvaliationEvaluator',
        columnNames: ['evaluator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'evaluators',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'avaliations',
      new TableForeignKey({
        name: 'AvaliationProject',
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('avaliations', 'AvaliationProject');

    await queryRunner.dropForeignKey('avaliations', 'AvaliationEvaluator');

    await queryRunner.dropTable('avaliations');
  }
}
