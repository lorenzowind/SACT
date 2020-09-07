import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateGrades1599515849339 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'grades',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'avaliation_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'question_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'grade',
            type: 'decimal(3,1)',
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
      'grades',
      new TableForeignKey({
        name: 'GradeAvaliation',
        columnNames: ['avaliation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'avaliations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'grades',
      new TableForeignKey({
        name: 'GradeQuestion',
        columnNames: ['question_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'questions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('grades', 'GradeQuestion');

    await queryRunner.dropForeignKey('grades', 'GradeAvaliation');

    await queryRunner.dropTable('grades');
  }
}
