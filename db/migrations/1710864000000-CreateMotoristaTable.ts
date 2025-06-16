import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMotoristaTable1710864000000 implements MigrationInterface {
    name = 'CreateMotoristaTable1710864000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "motorista" (
                "id" SERIAL PRIMARY KEY,
                "nome" character varying NOT NULL,
                "cnh" character varying NOT NULL UNIQUE,
                "placa" character varying NOT NULL,
                "modelo" character varying NOT NULL,
                "disponivel" boolean NOT NULL DEFAULT true              
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "motorista"`);
    }
} 