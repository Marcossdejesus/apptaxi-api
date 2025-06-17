import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo, VeiculoStatus, VeiculoStatusLabels } from './entities/veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { Corrida } from '../corrida/entities/corrida.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>,
    @InjectRepository(Corrida)
    private corridaRepository: Repository<Corrida>,
  ) {}

  async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
    // Verifica se já existe um veículo com a mesma placa
    const veiculoExistente = await this.veiculoRepository.findOne({
      where: { placa: createVeiculoDto.placa }
    });

    if (veiculoExistente) {
      throw new ConflictException(`Já existe um veículo cadastrado com a placa ${createVeiculoDto.placa}`);
    }

    const veiculo = this.veiculoRepository.create(createVeiculoDto);
    return await this.veiculoRepository.save(veiculo);
  }

  async findAll(): Promise<Veiculo[]> {
    return await this.veiculoRepository.find({
      relations: ['motorista'],
    });
  }

  async findOne(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOne({
      where: { id },
      relations: ['motorista'],
    });

    if (!veiculo) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado`);
    }

    return veiculo;
  }

  async findByPlaca(placa: string): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOne({
      where: { placa },
      relations: ['motorista'],
    });

    if (!veiculo) {
      throw new NotFoundException(`Veículo com placa ${placa} não encontrado`);
    }

    return veiculo;
  }

  async update(id: number, updateVeiculoDto: UpdateVeiculoDto): Promise<Veiculo> {
    const veiculo = await this.findOne(id);

    // Se estiver tentando atualizar a placa, verifica se já existe outra com a mesma placa
    if (updateVeiculoDto.placa && updateVeiculoDto.placa !== veiculo.placa) {
      const veiculoExistente = await this.veiculoRepository.findOne({
        where: { placa: updateVeiculoDto.placa }
      });

      if (veiculoExistente) {
        throw new ConflictException(`Já existe um veículo cadastrado com a placa ${updateVeiculoDto.placa}`);
      }
    }

    Object.assign(veiculo, updateVeiculoDto);
    return await this.veiculoRepository.save(veiculo);
  }

  async remove(id: number): Promise<void> {
    const veiculo = await this.findOne(id);
    
    // Verifica se existem corridas associadas ao veículo
    const corridas = await this.corridaRepository.find({
      where: { veiculo: { id: veiculo.id } }
    });

    if (corridas.length > 0) {
      throw new BadRequestException(
        'Não é possível excluir o veículo pois existem corridas associadas a ele. ' +
        'Considere marcar o veículo como Indisponível em vez de excluí-lo.'
      );
    }

    await this.veiculoRepository.remove(veiculo);
  }

  async findByStatus(status: string): Promise<Veiculo[]> {
    // Verifica se o status é válido
    if (!Object.values(VeiculoStatus).includes(status as VeiculoStatus)) {
      throw new BadRequestException(
        `Status inválido. Os status válidos são: ${Object.values(VeiculoStatusLabels).join(', ')}`
      );
    }

    const veiculoStatus = status as VeiculoStatus;
    return await this.veiculoRepository.find({
      where: { status: veiculoStatus },
      relations: ['motorista'],
    });
  }

  async findVeiculosParaManutencao(): Promise<Veiculo[]> {
    const hoje = new Date();
    const trintaDiasAtras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000);

    return await this.veiculoRepository
      .createQueryBuilder('veiculo')
      .where('veiculo.dataUltimaManutencao < :dataLimite', { dataLimite: trintaDiasAtras })
      .orWhere('veiculo.dataVencimentoIPVA < :hoje', { hoje })
      .orWhere('veiculo.dataVencimentoSeguro < :hoje', { hoje })
      .getMany();
  }
} 