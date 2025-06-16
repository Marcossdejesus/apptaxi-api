"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedPassageiros1710864000002 = void 0;
class SeedPassageiros1710864000002 {
    async up(queryRunner) {
        await queryRunner.query(`DELETE FROM "passageiro"`);
        await queryRunner.query(`ALTER SEQUENCE passageiro_id_seq RESTART WITH 1`);
        await queryRunner.query(`
            INSERT INTO "passageiro" ("nome", "cpf", "telefone")
            VALUES
                ('Ana Costa', '11122233344', '11999999999'),
                ('Carlos Souza', '55566677788', '11988888888'),
                ('Juliana Lima', '99988877766', '11977777777')
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "passageiro"`);
        await queryRunner.query(`ALTER SEQUENCE passageiro_id_seq RESTART WITH 1`);
    }
}
exports.SeedPassageiros1710864000002 = SeedPassageiros1710864000002;
//# sourceMappingURL=1710864000002-SeedPassageiros.js.map