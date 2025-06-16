import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoristaService } from './motorista.service';
import { MotoristaController } from './motorista.controller';
import { Motorista } from './entities/motorista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motorista])],
  controllers: [MotoristaController],
  providers: [MotoristaService],
  exports: [MotoristaService],
})
export class MotoristaModule {} 