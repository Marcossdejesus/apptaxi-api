import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motorista } from './entities/motorista.entity';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { CorridaStatus } from '../corrida/entities/corrida.entity';

@Injectable()
export class MotoristaService {
  constructor(
    @InjectRepository(Motorista)
    private motoristaRepository: Repository<Motorista>,
  ) {}

  async create(createMotoristaDto: CreateMotoristaDto): Promise<Motorista> {
    // Verifica se já existe motorista com a mesma CNH
    const motoristaComCnh = await this.motoristaRepository.findOne({
      where: { cnh: createMotoristaDto.cnh },
    });
    if (motoristaComCnh) {
      throw new ConflictException('Não pode haver dois motoristas com a mesma CNH');
    }

    // Verifica se já existe motorista com a mesma placa
    const motoristaComPlaca = await this.motoristaRepository.findOne({
      where: { placa: createMotoristaDto.placa },
    });
    if (motoristaComPlaca) {
      throw new ConflictException('Não pode haver dois motoristas com a mesma placa');
    }

    const motorista = this.motoristaRepository.create(createMotoristaDto);
    return this.motoristaRepository.save(motorista);
  }

  findAll(): Promise<Motorista[]> {
    return this.motoristaRepository.find();
  }

  async findOne(id: number): Promise<Motorista> {
    const motorista = await this.motoristaRepository.findOne({
      where: { id },
      relations: ['corridas'],
    });
    if (!motorista) {
      throw new BadRequestException(`Motorista com ID ${id} não encontrado`);
    }
    return motorista;
  }

  async update(id: number, updateMotoristaDto: UpdateMotoristaDto): Promise<Motorista> {
    const motorista = await this.findOne(id);

    // Se estiver atualizando a CNH, verifica se já existe outra
    if (updateMotoristaDto.cnh && updateMotoristaDto.cnh !== motorista.cnh) {
      const motoristaComCnh = await this.motoristaRepository.findOne({
        where: { cnh: updateMotoristaDto.cnh },
      });
      if (motoristaComCnh) {
        throw new ConflictException('Não pode haver dois motoristas com a mesma CNH');
      }
    }

    // Se estiver atualizando a placa, verifica se já existe outra
    if (updateMotoristaDto.placa && updateMotoristaDto.placa !== motorista.placa) {
      const motoristaComPlaca = await this.motoristaRepository.findOne({
        where: { placa: updateMotoristaDto.placa },
      });
      if (motoristaComPlaca) {
        throw new ConflictException('Não pode haver dois motoristas com a mesma placa');
      }
    }

    Object.assign(motorista, updateMotoristaDto);
    return this.motoristaRepository.save(motorista);
  }

  async remove(id: number): Promise<void> {
    const motorista = await this.findOne(id);

    // Verifica se o motorista tem corridas em andamento usando o enum
    const temCorridasEmAndamento = motorista.corridas.some(
      corrida => corrida.status === CorridaStatus.EM_ANDAMENTO
    );
    
    if (temCorridasEmAndamento) {
      throw new ConflictException('Motorista não pode ser removido pois possui corridas em andamento');
    }

    await this.motoristaRepository.remove(motorista);
  }
} 