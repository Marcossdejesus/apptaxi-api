"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePassageiroTable1710864000001 = void 0;
class CreatePassageiroTable1710864000001 {
    constructor() {
        this.name = 'CreatePassageiroTable1710864000001';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "passageiro" (
                "id" SERIAL PRIMARY KEY,
                "nome" character varying NOT NULL,
                "cpf" character varying NOT NULL UNIQUE,
                "telefone" character varying NOT NULL                
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "passageiro"`);
    }
}
exports.CreatePassageiroTable1710864000001 = CreatePassageiroTable1710864000001;
//# sourceMappingURL=1710864000001-CreatePassageiroTable.js.map