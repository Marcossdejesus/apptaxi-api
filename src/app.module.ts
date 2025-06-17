import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoristaModule } from './motorista/motorista.module';
import { PassageiroModule } from './passageiro/passageiro.module';
import { CorridaModule } from './corrida/corrida.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VeiculoModule } from './veiculo/veiculo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'AppTaxi',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true
    }),
    MotoristaModule,
    PassageiroModule,
    CorridaModule,
    DashboardModule,
    VeiculoModule,
  ],
})
export class AppModule {} 