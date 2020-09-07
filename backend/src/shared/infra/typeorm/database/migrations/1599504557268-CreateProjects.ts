import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProjects1599504557268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
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
            isUnique: true,
          },
          {
            name: 'occupation_area',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'classroom',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'members',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'observation',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable('projects');
  }
}
