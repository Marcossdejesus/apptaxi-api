"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedCorridas1710864000003 = void 0;
class SeedCorridas1710864000003 {
    async up(queryRunner) {
        await queryRunner.query(`DELETE FROM "corrida"`);
        await queryRunner.query(`ALTER SEQUENCE corrida_id_seq RESTART WITH 1`);
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
        await queryRunner.query(`ALTER SEQUENCE corrida_id_seq RESTART WITH 1`);
    }
}
exports.SeedCorridas1710864000003 = SeedCorridas1710864000003;
//# sourceMappingURL=1710864000003-SeedCorridas.js.map