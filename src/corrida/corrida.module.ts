import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorridaController } from './corrida.controller';
import { CorridaService } from './corrida.service';
import { Corrida } from './entities/corrida.entity';
import { MotoristaModule } from '../motorista/motorista.module';
import { PassageiroModule } from '../passageiro/passageiro.module';
import { VeiculoModule } from '../veiculo/veiculo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Corrida]),
    MotoristaModule,
    PassageiroModule,
    VeiculoModule,
  ],
  controllers: [CorridaController],
  providers: [CorridaService],
  exports: [CorridaService],
})
export class CorridaModule {} 