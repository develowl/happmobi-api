import { MigrationInterface, QueryRunner } from 'typeorm'

export class createDatabase1651533467615 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('\\set AUTOCOMMIT on \n CREATE DATABASE happmobi OWNER postgres;')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('happmobi', true)
  }
}
