import { Role } from 'src/enums/role.enum'
import { MigrationInterface, QueryBuilder, QueryRunner, Table } from 'typeorm'

export class createUser1651533606259 implements MigrationInterface {
  private table = new Table({
    name: 'Users',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid'
      },
      {
        name: 'email',
        type: 'text',
        isNullable: false,
        isUnique: true
      },
      {
        name: 'password',
        type: 'text',
        isNullable: false
      },
      {
        name: 'name',
        type: 'text',
        isNullable: false
      },
      {
        name: 'lastname',
        type: 'text',
        isNullable: false
      },
      {
        name: 'role',
        type: 'text',
        enum: [Role.Admin, Role.User],
        isNullable: false,
        default: Role.User
      },

      {
        name: 'created_at',
        type: 'time with time zone',
        isNullable: false,
        default: 'CURRENT_TIMESTAMP'
      },
      {
        name: 'updated_at',
        type: 'time with time zone',
        isNullable: false,
        default: 'CURRENT_TIMESTAMP'
      }
    ]
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
