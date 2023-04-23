import { MigrationInterface, QueryRunner } from "typeorm";

export class LinksShortname1682060161733 implements MigrationInterface {
    name = 'LinksShortname1682060161733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "links" ADD "shortName" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "links" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "links" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "links" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "links" ADD "name" character varying(1024) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "links" DROP COLUMN "shortName"`);
    }

}
