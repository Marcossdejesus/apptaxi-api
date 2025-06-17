import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { Veiculo } from './entities/veiculo.entity';
import { Corrida } from '../corrida/entities/corrida.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Veiculo, Corrida])
  ],
  controllers: [VeiculoController],
  providers: [VeiculoService],
  exports: [VeiculoService],
})
export class VeiculoModule {} 