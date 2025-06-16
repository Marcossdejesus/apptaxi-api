"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanupTables1710864000003 = void 0;
class CleanupTables1710864000003 {
    constructor() {
        this.name = 'CleanupTables1710864000003';
    }
    async up(queryRunner) {
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "corrida" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "passageiro" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "motorista" CASCADE`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."corrida_status_enum" CASCADE`);
    }
}
exports.CleanupTables1710864000003 = CleanupTables1710864000003;
//# sourceMappingURL=1710864000003-CleanupTables.js.map