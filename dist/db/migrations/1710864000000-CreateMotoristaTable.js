"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMotoristaTable1710864000000 = void 0;
class CreateMotoristaTable1710864000000 {
    constructor() {
        this.name = 'CreateMotoristaTable1710864000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "motorista" (
                "id" SERIAL PRIMARY KEY,
                "nome" character varying NOT NULL,
                "cnh" character varying NOT NULL UNIQUE,
                "placa" character varying NOT NULL,
                "modelo" character varying NOT NULL,
                "disponivel" boolean NOT NULL DEFAULT true              
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "motorista"`);
    }
}
exports.CreateMotoristaTable1710864000000 = CreateMotoristaTable1710864000000;
//# sourceMappingURL=1710864000000-CreateMotoristaTable.js.map