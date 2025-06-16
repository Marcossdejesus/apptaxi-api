import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCorridas1710864000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Primeiro, limpar a tabela
        await queryRunner.query(`DELETE FROM "corrida"`);
        
        // Resetar a sequência
        await queryRunner.query(`ALTER SEQUENCE corrida_id_seq RESTART WITH 1`);
        
        // Inserir os dados
        await queryRunner.query(`
            INSERT INTO "corrida" ("origem", "destino", "valor", "status", "data", "motoristaId", "passageiroId")
            VALUES
                ('Rua A, 123', 'Rua B, 456', 25.50, 'PENDENTE', NOW(), 1, 1),
                ('Rua C, 789', 'Rua D, 012', 30.00, 'EM_ANDAMENTO', NOW(), 2, 2),
                ('Rua E, 345', 'Rua F, 678', 15.75, 'CONCLUIDA', NOW(), 3, 3)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "corrida"`);
        await queryRunner.query(`ALTER SEQUENCE corrida_id_seq RESTART WITH 1`);
    }
} 