"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedMotoristas1710864000001 = void 0;
class SeedMotoristas1710864000001 {
    async up(queryRunner) {
        await queryRunner.query(`DELETE FROM "motorista"`);
        await queryRunner.query(`ALTER SEQUENCE motorista_id_seq RESTART WITH 1`);
        await queryRunner.query(`
            INSERT INTO "motorista" ("nome", "cnh", "placa", "modelo", "disponivel")
            VALUES
                ('João Silva', '12345678900', 'ABC1234', 'Toyota Corolla', true),
                ('Maria Santos', '98765432100', 'XYZ5678', 'Honda Civic', true),
                ('Pedro Oliveira', '45678912300', 'DEF9012', 'Volkswagen Golf', true)
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "motorista"`);
        await queryRunner.query(`ALTER SEQUENCE motorista_id_seq RESTART WITH 1`);
    }
}
exports.SeedMotoristas1710864000001 = SeedMotoristas1710864000001;
//# sourceMappingURL=1710864000001-SeedMotoristas.js.map