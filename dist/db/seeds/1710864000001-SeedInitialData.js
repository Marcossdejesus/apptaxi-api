"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedInitialData1710864000001 = void 0;
class SeedInitialData1710864000001 {
    constructor() {
        this.name = 'SeedInitialData1710864000001';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            INSERT INTO "motorista" ("nome", "cnh", "placa", "modelo", "disponivel")
            VALUES 
                ('João Silva', '12345678900', 'ABC1234', 'Toyota Corolla', true),
                ('Maria Santos', '98765432100', 'XYZ5678', 'Honda Civic', true),
                ('Pedro Oliveira', '45678912300', 'DEF9012', 'Volkswagen Golf', true)
        `);
        await queryRunner.query(`
            INSERT INTO "passageiro" ("nome", "cpf", "telefone")
            VALUES 
                ('Ana Costa', '11122233344', '11999999999'),
                ('Carlos Souza', '55566677788', '11988888888'),
                ('Juliana Lima', '99988877766', '11977777777')
        `);
        await queryRunner.query(`
            INSERT INTO "corrida" ("origem", "destino", "valor", "status", "data", "motoristaId", "passageiroId")
            VALUES 
                ('Rua A, 123', 'Rua B, 456', 25.50, 'PENDENTE', NOW(), 1, 1),
                ('Rua C, 789', 'Rua D, 012', 30.00, 'EM_ANDAMENTO', NOW(), 2, 2),
                ('Rua E, 345', 'Rua F, 678', 15.75, 'CONCLUIDA', NOW(), 3, 3)
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "corrida"`);
        await queryRunner.query(`DELETE FROM "passageiro"`);
        await queryRunner.query(`DELETE FROM "motorista"`);
    }
}
exports.SeedInitialData1710864000001 = SeedInitialData1710864000001;
//# sourceMappingURL=1710864000001-SeedInitialData.js.map