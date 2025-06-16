import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassageiroService } from './passageiro.service';
import { PassageiroController } from './passageiro.controller';
import { Passageiro } from './entities/passageiro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passageiro])],
  controllers: [PassageiroController],
  providers: [PassageiroService],
  exports: [PassageiroService],
})
export class PassageiroModule {} 