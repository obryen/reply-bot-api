import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class RepliesTableCreation1635174815145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'replies',
              columns: [
                new TableColumn({
                  name: 'id',
                  isNullable: false,
                  isPrimary: true,
                  type: 'varchar',
                }),
                new TableColumn({
                  name: 'name',
                  isNullable: true,
                  type: 'varchar',
                }),
                new TableColumn({
                  name: 'description',
                  isNullable: true,
                  type: 'varchar',
                }),
                new TableColumn({
                  name: 'reply',
                  isNullable: true,
                  type: 'varchar',
                }),
              ],
            }),
          );
        }
      
        public async down(queryRunner: QueryRunner): Promise<any> {
          await queryRunner.dropTable('replies');
        }
      }
      