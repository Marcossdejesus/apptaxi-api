"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVeiculoTable1710950400000 = void 0;
const typeorm_1 = require("typeorm");
class CreateVeiculoTable1710950400000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'veiculo',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'placa',
                    type: 'varchar',
                    length: '7',
                    isUnique: true,
                },
                {
                    name: 'modelo',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'marca',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'ano',
                    type: 'int',
                },
                {
                    name: 'cor',
                    type: 'varchar',
                    length: '30',
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['DISPONIVEL', 'EM_MANUTENCAO', 'INDISPONIVEL'],
                    default: "'DISPONIVEL'",
                },
                {
                    name: 'dataUltimaManutencao',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'dataVencimentoIPVA',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'dataVencimentoSeguro',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'motoristaId',
                    type: 'int',
                    isNullable: true,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('veiculo', new typeorm_1.TableForeignKey({
            columnNames: ['motoristaId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'motorista',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('veiculo');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('motoristaId') !== -1);
        await queryRunner.dropForeignKey('veiculo', foreignKey);
        await queryRunner.dropTable('veiculo');
    }
}
exports.CreateVeiculoTable1710950400000 = CreateVeiculoTable1710950400000;
//# sourceMappingURL=1710950400000-CreateVeiculoTable.js.map