import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEvaluators1598531951244
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'evaluators',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'occupation_area',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'institution',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar(16)',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'cpf',
            type: 'varchar(16)',
            isUnique: true,
          },
          {
            name: 'status',
            type: "enum('to_evaluate', 'assessing', 'rated')",
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('evaluators');
  }
}
