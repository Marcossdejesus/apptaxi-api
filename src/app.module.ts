import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoristaModule } from './motorista/motorista.module';
import { PassageiroModule } from './passageiro/passageiro.module';
import { CorridaModule } from './corrida/corrida.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'AppTaxi',
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true
    }),
    MotoristaModule,
    PassageiroModule,
    CorridaModule
  ],
})
export class AppModule {} 