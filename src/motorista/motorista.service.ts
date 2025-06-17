import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motorista } from './entities/motorista.entity';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { CorridaStatus } from '../corrida/entities/corrida.entity';
import { VeiculoService } from '../veiculo/veiculo.service';

@Injectable()
export class MotoristaService {
  constructor(
    @InjectRepository(Motorista)
    private motoristaRepository: Repository<Motorista>,
    private veiculoService: VeiculoService,
  ) {}

  async create(createMotoristaDto: CreateMotoristaDto): Promise<Motorista> {
    const motorista = this.motoristaRepository.create(createMotoristaDto);
    
    if (createMotoristaDto.veiculo) {
      const veiculo = await this.veiculoService.create(createMotoristaDto.veiculo);
      motorista.veiculo = veiculo;
    }
    
    return await this.motoristaRepository.save(motorista);
  }

  async findAll(): Promise<Motorista[]> {
    return await this.motoristaRepository.find({
      relations: ['veiculo'],
    });
  }

  async findOne(id: number): Promise<Motorista> {
    const motorista = await this.motoristaRepository.findOne({
      where: { id },
      relations: ['veiculo'],
    });

    if (!motorista) {
      throw new NotFoundException(`Motorista com ID ${id} não encontrado`);
    }

    return motorista;
  }

  async update(id: number, updateMotoristaDto: UpdateMotoristaDto): Promise<Motorista> {
    const motorista = await this.findOne(id);
    Object.assign(motorista, updateMotoristaDto);
    return await this.motoristaRepository.save(motorista);
  }

  async remove(id: number): Promise<void> {
    const motorista = await this.findOne(id);
    await this.motoristaRepository.remove(motorista);
  }

  async findByDisponibilidade(disponivel: boolean): Promise<Motorista[]> {
    return await this.motoristaRepository.find({
      where: { disponivel: disponivel },
      relations: ['veiculo'],
    });
  }
} 