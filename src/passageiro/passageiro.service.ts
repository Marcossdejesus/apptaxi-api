import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passageiro } from './entities/passageiro.entity';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';
import { UpdatePassageiroDto } from './dto/update-passageiro.dto';
import { CorridaStatus } from '../corrida/entities/corrida.entity';

@Injectable()
export class PassageiroService {
  constructor(
    @InjectRepository(Passageiro)
    private passageiroRepository: Repository<Passageiro>,
  ) {}

  async create(createPassageiroDto: CreatePassageiroDto): Promise<Passageiro> {
    // Verifica se já existe passageiro com o mesmo CPF
    const passageiroComCpf = await this.passageiroRepository.findOne({
      where: { cpf: createPassageiroDto.cpf },
    });
    if (passageiroComCpf) {
      throw new ConflictException('Não pode haver dois passageiros com o mesmo CPF');
    }

    const passageiro = this.passageiroRepository.create(createPassageiroDto);
    return this.passageiroRepository.save(passageiro);
  }

  findAll(): Promise<Passageiro[]> {
    return this.passageiroRepository.find();
  }

  async findOne(id: number): Promise<Passageiro> {
    const passageiro = await this.passageiroRepository.findOne({
      where: { id },
      relations: ['corridas'],
    });
    if (!passageiro) {
      throw new BadRequestException(`Passageiro com ID ${id} não encontrado`);
    }
    return passageiro;
  }

  async update(id: number, updatePassageiroDto: UpdatePassageiroDto): Promise<Passageiro> {
    const passageiro = await this.findOne(id);

    // Se estiver atualizando o CPF, verifica se já existe outro
    if (updatePassageiroDto.cpf && updatePassageiroDto.cpf !== passageiro.cpf) {
      const passageiroComCpf = await this.passageiroRepository.findOne({
        where: { cpf: updatePassageiroDto.cpf },
      });
      if (passageiroComCpf) {
        throw new ConflictException('Não pode haver dois passageiros com o mesmo CPF');
      }
    }

    Object.assign(passageiro, updatePassageiroDto);
    return this.passageiroRepository.save(passageiro);
  }

  async remove(id: number): Promise<void> {
    const passageiro = await this.findOne(id);

    // Verifica se o passageiro tem corridas em andamento usando o enum
    const temCorridasEmAndamento = passageiro.corridas.some(
      corrida => corrida.status === CorridaStatus.EM_ANDAMENTO
    );
    
    if (temCorridasEmAndamento) {
      throw new ConflictException('Passageiro não pode ser removido pois possui corridas em andamento');
    }

    await this.passageiroRepository.remove(passageiro);
  }

  async verificarCorridasPendentes(id: number): Promise<boolean> {
    const passageiro = await this.findOne(id);
    const corridasPendentes = passageiro.corridas.filter(
      corrida => corrida.status === 'PENDENTE',
    );
    return corridasPendentes.length >= 3;
  }
} 