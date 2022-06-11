import {MigrationInterface, QueryRunner} from "typeorm";

export class product1654977201696 implements MigrationInterface {
    name = 'product1654977201696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_variant_stock_entry" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "productVariantId" uuid, CONSTRAINT "PK_f8b9fd006be709967b15cb1eccb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "size" character varying(50) NOT NULL, "productVariantCode" character varying(20) NOT NULL, "productVariantUrl" character varying(100) NOT NULL, "maxRetailPrice" integer NOT NULL, "discountedPrice" integer NOT NULL, "currentStock" integer NOT NULL DEFAULT '0', "productColorId" uuid, CONSTRAINT "UQ_9279682b361beb32e78cd06a0e4" UNIQUE ("productVariantCode"), CONSTRAINT "UQ_48e6fcc5df3d0f529618f87ada9" UNIQUE ("productVariantUrl"), CONSTRAINT "UQ_d6c0cc3cd681d4a13050682a832" UNIQUE ("productColorId", "size"), CONSTRAINT "CHK_ab73ad1a6b9aac0f2f2dc20867" CHECK ("discountedPrice" > 0 AND "discountedPrice" <= "maxRetailPrice"), CONSTRAINT "CHK_d87e0a090022eed3a6b2242930" CHECK ("maxRetailPrice" > 0), CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_color" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(50) NOT NULL, "thumbnailUrl" character varying(200), "productId" uuid, CONSTRAINT "UQ_0e52c833ecd53c6c09933d93b08" UNIQUE ("productId", "title"), CONSTRAINT "PK_e586d22a197c9b985af3ac82ce3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(100) NOT NULL, "description" character varying(1000) NOT NULL, "specificationInJson" json, "isPublished" boolean NOT NULL DEFAULT false, "countVariants" integer NOT NULL DEFAULT '0', "categoryId" uuid, "brandId" uuid, CONSTRAINT "UQ_f7bf944ad9f1034110e8c2133ab" UNIQUE ("title"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_brand" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(100) NOT NULL, "description" character varying(1000) NOT NULL, "logoUrl" character varying(200), "countProductVariants" integer NOT NULL DEFAULT '0', "countPublishedProductVariants" integer NOT NULL DEFAULT '0', "isPublished" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_d368d5d0be97570ddd8ba6a50ed" UNIQUE ("title"), CONSTRAINT "PK_2eb5ce4324613b4b457c364f4a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_variant_stock_entry" ADD CONSTRAINT "FK_8f3b658426c1a015f59fca1b92d" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD CONSTRAINT "FK_7a3967f9e45ea6e23e5b0d3e57a" FOREIGN KEY ("productColorId") REFERENCES "product_color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_color" ADD CONSTRAINT "FK_7a1cefb85fba910888cf9a1a634" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product_color" DROP CONSTRAINT "FK_7a1cefb85fba910888cf9a1a634"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "FK_7a3967f9e45ea6e23e5b0d3e57a"`);
        await queryRunner.query(`ALTER TABLE "product_variant_stock_entry" DROP CONSTRAINT "FK_8f3b658426c1a015f59fca1b92d"`);
        await queryRunner.query(`DROP TABLE "product_brand"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_color"`);
        await queryRunner.query(`DROP TABLE "product_variant"`);
        await queryRunner.query(`DROP TABLE "product_variant_stock_entry"`);
    }

}
