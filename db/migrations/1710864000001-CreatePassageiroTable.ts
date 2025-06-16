import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePassageiroTable1710864000001 implements MigrationInterface {
    name = 'CreatePassageiroTable1710864000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "passageiro" (
                "id" SERIAL PRIMARY KEY,
                "nome" character varying NOT NULL,
                "cpf" character varying NOT NULL UNIQUE,
                "telefone" character varying NOT NULL                
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "passageiro"`);
    }
} 