/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { SeedMotoristas1710864000001 } from './seeds/1710864000001-SeedMotoristas';
import { SeedPassageiros1710864000002 } from './seeds/1710864000002-SeedPassageiros';
import { SeedCorridas1710864000003 } from './seeds/1710864000003-SeedCorridas';
import { SeedVeiculos1710950400000 } from './seeds/1710864000004-SeedVeiculos';

export const SeedDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'AppTaxi',
  entities: ['dist/**/*.entity.js'],
  migrations: [
    SeedMotoristas1710864000001,
    SeedPassageiros1710864000002,
    SeedCorridas1710864000003,
    SeedVeiculos1710950400000
  ],
  synchronize: false,
  logging: true,
});

// Executar os seeds quando o arquivo for chamado diretamente
if (require.main === module) {
  SeedDataSource.initialize()
    .then(async () => {
      console.log('Data Source has been initialized!');
      await SeedDataSource.runMigrations();
      console.log('Seeds have been executed successfully!');
      await SeedDataSource.destroy();
      console.log('Data Source has been destroyed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error during seed execution:', error);
      process.exit(1);
    });
}
