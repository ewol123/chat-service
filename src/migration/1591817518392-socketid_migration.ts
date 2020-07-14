/* tslint:disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class socketidMigration1591817518392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE public.user ADD COLUMN "socketId" VARCHAR(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE public.user DROP COLUMN "socketId"`);
  }
}
