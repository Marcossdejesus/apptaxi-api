import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddVeiculoToCorrida1710950400001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE corrida
      ADD COLUMN veiculoId int NULL,
      ADD CONSTRAINT fk_corrida_veiculo
      FOREIGN KEY (veiculoId)
      REFERENCES veiculo(id)
      ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE corrida
      DROP FOREIGN KEY fk_corrida_veiculo,
      DROP COLUMN veiculoId
    `);
  }
} 