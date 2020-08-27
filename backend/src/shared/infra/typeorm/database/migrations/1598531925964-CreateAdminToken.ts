import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAdminToken1598531925964
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'admin_tokens',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'token',
            type: 'varchar(36)',
            isUnique: true,
          },
          {
            name: 'admin_id',
            type: 'varchar(36)',
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
        foreignKeys: [
          {
            name: 'TokenAdmin',
            referencedTableName: 'admins',
            referencedColumnNames: ['id'],
            columnNames: ['admin_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('admin_tokens');
  }
}
