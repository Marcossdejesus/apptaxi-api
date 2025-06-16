"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCorridaTable1710864000002 = void 0;
class CreateCorridaTable1710864000002 {
    constructor() {
        this.name = 'CreateCorridaTable1710864000002';
    }
    async up(queryRunner) {
        const enumExists = await queryRunner.query(`
            SELECT EXISTS (
                SELECT 1 FROM pg_type 
                WHERE typname = 'corrida_status_enum'
            );
        `);
        if (!enumExists[0].exists) {
            await queryRunner.query(`
                CREATE TYPE "public"."corrida_status_enum" AS ENUM('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA')
            `);
        }
        await queryRunner.query(`
            CREATE TABLE "corrida" (
                "id" SERIAL PRIMARY KEY,
                "origem" character varying NOT NULL,
                "destino" character varying NOT NULL,
                "valor" numeric(10,2) NOT NULL,
                "status" "public"."corrida_status_enum" NOT NULL DEFAULT 'PENDENTE',
                "data" TIMESTAMP NOT NULL,
                "motoristaId" integer,
                "passageiroId" integer,                
                CONSTRAINT "FK_corrida_motorista" FOREIGN KEY ("motoristaId") REFERENCES "motorista"("id") ON DELETE SET NULL,
                CONSTRAINT "FK_corrida_passageiro" FOREIGN KEY ("passageiroId") REFERENCES "passageiro"("id") ON DELETE SET NULL
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "corrida"`);
        const enumExists = await queryRunner.query(`
            SELECT EXISTS (
                SELECT 1 FROM pg_type 
                WHERE typname = 'corrida_status_enum'
            );
        `);
        if (enumExists[0].exists) {
            await queryRunner.query(`DROP TYPE "public"."corrida_status_enum"`);
        }
    }
}
exports.CreateCorridaTable1710864000002 = CreateCorridaTable1710864000002;
//# sourceMappingURL=1710864000002-CreateCorridaTable.js.map