import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from '../dashboard/dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Corrida } from '../corrida/entities/corrida.entity';
import { Motorista } from '../motorista/entities/motorista.entity';
import { Passageiro } from '../passageiro/entities/passageiro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Corrida, Motorista, Passageiro])
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {} 