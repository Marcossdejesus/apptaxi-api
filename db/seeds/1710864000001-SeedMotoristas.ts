import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMotoristas1710864000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Primeiro, limpar a tabela
        await queryRunner.query(`DELETE FROM "motorista"`);
        
        // Resetar a sequência
        await queryRunner.query(`ALTER SEQUENCE motorista_id_seq RESTART WITH 1`);
        
        // Inserir os dados
        await queryRunner.query(`
            INSERT INTO "motorista" ("nome", "cnh", "placa", "modelo", "disponivel")
            VALUES
                ('João Silva', '12345678900', 'ABC1234', 'Toyota Corolla', true),
                ('Maria Santos', '98765432100', 'XYZ5678', 'Honda Civic', true),
                ('Pedro Oliveira', '45678912300', 'DEF9012', 'Volkswagen Golf', true)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "motorista"`);
        await queryRunner.query(`ALTER SEQUENCE motorista_id_seq RESTART WITH 1`);
    }
} 