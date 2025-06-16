/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { SeedMotoristas1710864000001 } from './seeds/1710864000001-SeedMotoristas';
import { SeedPassageiros1710864000002 } from './seeds/1710864000002-SeedPassageiros';
import { SeedCorridas1710864000003 } from './seeds/1710864000003-SeedCorridas';

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
    SeedCorridas1710864000003
  ],
  synchronize: false,
  logging: true,
});
