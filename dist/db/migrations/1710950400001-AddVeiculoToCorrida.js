"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVeiculoToCorrida1710950400001 = void 0;
class AddVeiculoToCorrida1710950400001 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE corrida
      ADD COLUMN veiculoId int NULL,
      ADD CONSTRAINT fk_corrida_veiculo
      FOREIGN KEY (veiculoId)
      REFERENCES veiculo(id)
      ON DELETE SET NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE corrida
      DROP FOREIGN KEY fk_corrida_veiculo,
      DROP COLUMN veiculoId
    `);
    }
}
exports.AddVeiculoToCorrida1710950400001 = AddVeiculoToCorrida1710950400001;
//# sourceMappingURL=1710950400001-AddVeiculoToCorrida.js.map