import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPassageiros1710864000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Primeiro, limpar a tabela
        await queryRunner.query(`DELETE FROM "passageiro"`);
        
        // Resetar a sequência
        await queryRunner.query(`ALTER SEQUENCE passageiro_id_seq RESTART WITH 1`);
        
        // Inserir os dados
        await queryRunner.query(`
            INSERT INTO "passageiro" ("nome", "cpf", "telefone")
            VALUES
                ('Ana Costa', '11122233344', '11999999999'),
                ('Carlos Souza', '55566677788', '11988888888'),
                ('Juliana Lima', '99988877766', '11977777777')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "passageiro"`);
        await queryRunner.query(`ALTER SEQUENCE passageiro_id_seq RESTART WITH 1`);
    }
} 