"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedVeiculos1710950400000 = void 0;
class SeedVeiculos1710950400000 {
    async up(queryRunner) {
        await queryRunner.query(`DELETE FROM "veiculo"`);
        await queryRunner.query(`ALTER SEQUENCE veiculo_id_seq RESTART WITH 1`);
        await queryRunner.query(`
            INSERT INTO "veiculo" ("placa", "modelo", "marca", "ano", "cor", "status", "dataUltimaManutencao", "dataVencimentoIPVA", "dataVencimentoSeguro")
            VALUES
                ('ABC1234', 'Corolla', 'Toyota', 2020, 'Prata', 'DISPONIVEL', '2024-01-15', '2024-12-31', '2024-12-31'),
                ('DEF5678', 'Civic', 'Honda', 2021, 'Preto', 'DISPONIVEL', '2024-02-01', '2024-12-31', '2024-12-31'),
                ('GHI9012', 'Golf', 'Volkswagen', 2019, 'Branco', 'EM_MANUTENCAO', '2024-03-01', '2024-12-31', '2024-12-31')
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "veiculo"`);
        await queryRunner.query(`ALTER SEQUENCE veiculo_id_seq RESTART WITH 1`);
    }
}
exports.SeedVeiculos1710950400000 = SeedVeiculos1710950400000;
//# sourceMappingURL=1710864000004-SeedVeiculos.js.map