import {MigrationInterface, QueryRunner} from "typeorm";

export class parentCategory1654330699718 implements MigrationInterface {
    name = 'parentCategory1654330699718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "categoryUrl" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_2840b4ffd81fb2a1cb0f5e6fbc2" UNIQUE ("categoryUrl")`);
        await queryRunner.query(`ALTER TABLE "category" ADD "description" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "coverPhotoUrl" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "category" ADD "countSubCategories" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "category" ADD "countPublishedSubCategories" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "category" ADD "countProductVariants" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "category" ADD "countPublishedProductVariants" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "category" ADD "isPublished" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "category" ADD "parentCategoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "title" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY ("parentCategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "title" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "parentCategoryId"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "isPublished"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "countPublishedProductVariants"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "countProductVariants"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "countPublishedSubCategories"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "countSubCategories"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "coverPhotoUrl"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_2840b4ffd81fb2a1cb0f5e6fbc2"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "categoryUrl"`);
    }

}
