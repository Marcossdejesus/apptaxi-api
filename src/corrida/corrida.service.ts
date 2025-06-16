import { Injectable, BadRequestException, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Corrida, CorridaStatus } from './entities/corrida.entity';
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';
import { MotoristaService } from '../motorista/motorista.service';
import { PassageiroService } from '../passageiro/passageiro.service';

@Injectable()
export class CorridaService {
  constructor(
    @InjectRepository(Corrida)
    private corridaRepository: Repository<Corrida>,
    private motoristaService: MotoristaService,
    private passageiroService: PassageiroService,
  ) {}

  async create(createCorridaDto: CreateCorridaDto): Promise<Corrida> {
    console.log('Dados recebidos:', createCorridaDto);
    
    // Validação do valor
    if (createCorridaDto.valor <= 0) {
      throw new BadRequestException('O valor da corrida deve ser maior que zero');
    }

    // Buscar motorista
    const motorista = await this.motoristaService.findOne(createCorridaDto.motoristaId);
    console.log('Motorista encontrado:', motorista);

    // Verificar disponibilidade do motorista
    if (!motorista.disponivel) {
      throw new ConflictException('Motorista não está disponível');
    }

    // Buscar passageiro
    const passageiro = await this.passageiroService.findOne(createCorridaDto.passageiroId);
    console.log('Passageiro encontrado:', passageiro);

    // Verificar corridas pendentes do passageiro
    const corridasPendentes = await this.corridaRepository.count({
      where: {
        passageiro: { id: passageiro.id },
        status: CorridaStatus.PENDENTE
      }
    });

    if (corridasPendentes >= 3) {
      throw new ConflictException('Passageiro já possui 3 corridas pendentes');
    }

    // Criar nova corrida com IDs explícitos
    const corrida = this.corridaRepository.create({
      origem: createCorridaDto.origem,
      destino: createCorridaDto.destino,
      valor: createCorridaDto.valor,
      data: createCorridaDto.data,
      motoristaId: motorista.id,
      passageiroId: passageiro.id,
      status: CorridaStatus.PENDENTE
    });

    console.log('Corrida a ser criada:', corrida);

    try {
      // Salvar corrida
      const corridaSalva = await this.corridaRepository.save(corrida);
      console.log('Corrida salva:', corridaSalva);

      // Atualizar status do motorista
      await this.motoristaService.update(motorista.id, { disponivel: false });
      console.log('Status do motorista atualizado para indisponível');

      // Buscar corrida completa com relacionamentos
      const corridaCompleta = await this.corridaRepository
        .createQueryBuilder('corrida')
        .leftJoinAndSelect('corrida.motorista', 'motorista')
        .leftJoinAndSelect('corrida.passageiro', 'passageiro')
        .where('corrida.id = :id', { id: corridaSalva.id })
        .getOne();

      console.log('Corrida completa recuperada:', corridaCompleta);
      return corridaCompleta;
    } catch (error) {
      console.error('Erro ao salvar corrida:', error);
      throw new InternalServerErrorException('Erro ao criar corrida');
    }
  }

  async findAll(): Promise<Corrida[]> {
    try {
      console.log('Buscando todas as corridas');
      
      const corridas = await this.corridaRepository.find({
        relations: ['motorista', 'passageiro']
      });

      console.log('Corridas encontradas:', corridas);
      return corridas;
    } catch (error) {
      console.error('Erro ao buscar corridas:', error);
      throw new BadRequestException(`Erro ao buscar corridas: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Corrida> {
    try {
      if (!id || isNaN(id)) {
        throw new BadRequestException('ID inválido');
      }

      console.log(`Buscando corrida ID: ${id}`);
      const corrida = await this.corridaRepository
        .createQueryBuilder('corrida')
        .leftJoinAndSelect('corrida.motorista', 'motorista')
        .leftJoinAndSelect('corrida.passageiro', 'passageiro')
        .where('corrida.id = :id', { id: Number(id) })
        .getOne();

      console.log('Corrida encontrada:', {
        id: corrida?.id,
        status: corrida?.status,
        motoristaId: corrida?.motorista?.id,
        passageiroId: corrida?.passageiro?.id,
        motorista: corrida?.motorista,
        passageiro: corrida?.passageiro
      });
      
      if (!corrida) {
        throw new BadRequestException(`Corrida com ID ${id} não encontrada`);
      }
      
      return corrida;
    } catch (error) {
      console.error('Erro ao buscar corrida:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Erro ao buscar corrida: ${error.message}`);
    }
  }

  async update(id: number, updateCorridaDto: UpdateCorridaDto): Promise<Corrida> {
    try {
      if (!id || isNaN(id)) {
        throw new BadRequestException('ID inválido');
      }

      console.log(`Atualizando corrida ID: ${id}`);
      
      const corrida = await this.corridaRepository
        .createQueryBuilder('corrida')
        .leftJoinAndSelect('corrida.motorista', 'motorista')
        .leftJoinAndSelect('corrida.passageiro', 'passageiro')
        .where('corrida.id = :id', { id: Number(id) })
        .getOne();

      if (!corrida) {
        throw new BadRequestException(`Corrida com ID ${id} não encontrada`);
      }

      console.log('Corrida encontrada:', {
        id: corrida.id,
        status: corrida.status,
        motoristaId: corrida.motorista?.id,
        passageiroId: corrida.passageiro?.id
      });

      // Verifica se está tentando cancelar uma corrida em andamento
      if (updateCorridaDto.status === CorridaStatus.CANCELADA && corrida.status === CorridaStatus.EM_ANDAMENTO) {
        throw new ConflictException('Não é possível cancelar uma corrida em andamento');
      }

      // Se estiver atualizando o valor, verifica se é válido
      if (updateCorridaDto.valor !== undefined && updateCorridaDto.valor <= 0) {
        throw new BadRequestException('O valor da corrida deve ser maior que zero');
      }

      // Se a corrida estiver sendo finalizada, libera o motorista
      if (updateCorridaDto.status === CorridaStatus.CONCLUIDA && corrida.status !== CorridaStatus.CONCLUIDA && corrida.motorista) {
        const motoristaId = corrida.motorista.id;
        if (motoristaId) {
          console.log(`Liberando motorista ID: ${motoristaId}`);
          try {
            await this.motoristaService.update(motoristaId, { disponivel: true });
            console.log('Motorista liberado com sucesso');
          } catch (error) {
            console.error('Erro ao liberar motorista:', error);
          }
        }
      }

      Object.assign(corrida, updateCorridaDto);
      const updatedCorrida = await this.corridaRepository.save(corrida);
      console.log('Corrida atualizada com sucesso:', updatedCorrida);
      return updatedCorrida;
    } catch (error) {
      console.error('Erro ao atualizar corrida:', error);
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Erro ao atualizar corrida: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      console.log('Tentando remover corrida ID:', id);
      
      // Primeiro, busca a corrida
      const corrida = await this.corridaRepository
        .createQueryBuilder('corrida')
        .leftJoinAndSelect('corrida.motorista', 'motorista')
        .where('corrida.id = :id', { id })
        .getOne();

      console.log('Corrida encontrada:', {
        id: corrida?.id,
        status: corrida?.status,
        motoristaId: corrida?.motoristaId
      });
      
      if (!corrida) {
        throw new NotFoundException(`Corrida com ID ${id} não encontrada`);
      }

      // Validação rigorosa do status ANTES de qualquer operação
      console.log('Validando status da corrida:', {
        statusAtual: corrida.status,
        statusEsperado: CorridaStatus.EM_ANDAMENTO
      });

      // Verifica se a corrida está em andamento
      if (corrida.status === CorridaStatus.EM_ANDAMENTO) {
        console.log('Tentativa de remover corrida em andamento bloqueada');
        throw new ConflictException('Não é possível remover uma corrida em andamento');
      }

      // Verifica se a corrida está finalizada
      if (corrida.status !== CorridaStatus.CONCLUIDA && corrida.status !== CorridaStatus.CANCELADA) {
        console.log('Tentativa de remover corrida não finalizada bloqueada');
        throw new ConflictException('Apenas corridas concluídas ou canceladas podem ser removidas');
      }

      // Se passou pelas validações, prossegue com a remoção
      console.log('Validações passadas, prosseguindo com a remoção...');

      if (corrida.motoristaId) {
        try {
          console.log('Liberando motorista ID:', corrida.motoristaId);
          await this.motoristaService.update(corrida.motoristaId, { disponivel: true });
          console.log('Motorista liberado com sucesso');
        } catch (error) {
          console.error('Erro ao liberar motorista:', error);
          throw new BadRequestException('Erro ao liberar motorista');
        }
      }

      console.log('Removendo corrida...');
      const result = await this.corridaRepository.remove(corrida);
      console.log('Resultado da remoção:', result);

      if (corrida.motoristaId) {
        try {
          const motorista = await this.motoristaService.findOne(corrida.motoristaId);
          if (!motorista.disponivel) {
            console.log('Motorista ainda não está disponível, tentando liberar novamente...');
            await this.motoristaService.update(corrida.motoristaId, { disponivel: true });
            console.log('Motorista liberado na segunda tentativa');
          }
        } catch (error) {
          console.error('Erro na verificação final do motorista:', error);
        }
      }

      return { message: 'Corrida removida com sucesso' };
    } catch (error) {
      console.error('Erro ao remover corrida:', error);
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Erro ao remover corrida: ${error.message}`);
    }
  }
} 