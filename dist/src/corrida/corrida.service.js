"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorridaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const corrida_entity_1 = require("./entities/corrida.entity");
const motorista_service_1 = require("../motorista/motorista.service");
const passageiro_service_1 = require("../passageiro/passageiro.service");
let CorridaService = class CorridaService {
    constructor(corridaRepository, motoristaService, passageiroService) {
        this.corridaRepository = corridaRepository;
        this.motoristaService = motoristaService;
        this.passageiroService = passageiroService;
    }
    async create(createCorridaDto) {
        console.log('Dados recebidos:', createCorridaDto);
        if (createCorridaDto.valor <= 0) {
            throw new common_1.BadRequestException('O valor da corrida deve ser maior que zero');
        }
        const motorista = await this.motoristaService.findOne(createCorridaDto.motoristaId);
        console.log('Motorista encontrado:', motorista);
        if (!motorista.disponivel) {
            throw new common_1.ConflictException('Motorista não está disponível');
        }
        const passageiro = await this.passageiroService.findOne(createCorridaDto.passageiroId);
        console.log('Passageiro encontrado:', passageiro);
        const corridasPendentes = await this.corridaRepository.count({
            where: {
                passageiro: { id: passageiro.id },
                status: corrida_entity_1.CorridaStatus.PENDENTE
            }
        });
        if (corridasPendentes >= 3) {
            throw new common_1.ConflictException('Passageiro já possui 3 corridas pendentes');
        }
        const corrida = this.corridaRepository.create({
            origem: createCorridaDto.origem,
            destino: createCorridaDto.destino,
            valor: createCorridaDto.valor,
            data: createCorridaDto.data,
            motoristaId: motorista.id,
            passageiroId: passageiro.id,
            status: corrida_entity_1.CorridaStatus.PENDENTE
        });
        console.log('Corrida a ser criada:', corrida);
        try {
            const corridaSalva = await this.corridaRepository.save(corrida);
            console.log('Corrida salva:', corridaSalva);
            await this.motoristaService.update(motorista.id, { disponivel: false });
            console.log('Status do motorista atualizado para indisponível');
            const corridaCompleta = await this.corridaRepository
                .createQueryBuilder('corrida')
                .leftJoinAndSelect('corrida.motorista', 'motorista')
                .leftJoinAndSelect('corrida.passageiro', 'passageiro')
                .where('corrida.id = :id', { id: corridaSalva.id })
                .getOne();
            console.log('Corrida completa recuperada:', corridaCompleta);
            return corridaCompleta;
        }
        catch (error) {
            console.error('Erro ao salvar corrida:', error);
            throw new common_1.InternalServerErrorException('Erro ao criar corrida');
        }
    }
    async findAll() {
        try {
            console.log('Buscando todas as corridas');
            const corridas = await this.corridaRepository.find({
                relations: ['motorista', 'passageiro']
            });
            console.log('Corridas encontradas:', corridas);
            return corridas;
        }
        catch (error) {
            console.error('Erro ao buscar corridas:', error);
            throw new common_1.BadRequestException(`Erro ao buscar corridas: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            if (!id || isNaN(id)) {
                throw new common_1.BadRequestException('ID inválido');
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
                throw new common_1.BadRequestException(`Corrida com ID ${id} não encontrada`);
            }
            return corrida;
        }
        catch (error) {
            console.error('Erro ao buscar corrida:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erro ao buscar corrida: ${error.message}`);
        }
    }
    async update(id, updateCorridaDto) {
        try {
            if (!id || isNaN(id)) {
                throw new common_1.BadRequestException('ID inválido');
            }
            console.log(`Atualizando corrida ID: ${id}`);
            const corrida = await this.corridaRepository
                .createQueryBuilder('corrida')
                .leftJoinAndSelect('corrida.motorista', 'motorista')
                .leftJoinAndSelect('corrida.passageiro', 'passageiro')
                .where('corrida.id = :id', { id: Number(id) })
                .getOne();
            if (!corrida) {
                throw new common_1.BadRequestException(`Corrida com ID ${id} não encontrada`);
            }
            console.log('Corrida encontrada:', {
                id: corrida.id,
                status: corrida.status,
                motoristaId: corrida.motorista?.id,
                passageiroId: corrida.passageiro?.id
            });
            if (updateCorridaDto.status === corrida_entity_1.CorridaStatus.CANCELADA && corrida.status === corrida_entity_1.CorridaStatus.EM_ANDAMENTO) {
                throw new common_1.ConflictException('Não é possível cancelar uma corrida em andamento');
            }
            if (updateCorridaDto.valor !== undefined && updateCorridaDto.valor <= 0) {
                throw new common_1.BadRequestException('O valor da corrida deve ser maior que zero');
            }
            if (updateCorridaDto.status === corrida_entity_1.CorridaStatus.CONCLUIDA && corrida.status !== corrida_entity_1.CorridaStatus.CONCLUIDA && corrida.motorista) {
                const motoristaId = corrida.motorista.id;
                if (motoristaId) {
                    console.log(`Liberando motorista ID: ${motoristaId}`);
                    try {
                        await this.motoristaService.update(motoristaId, { disponivel: true });
                        console.log('Motorista liberado com sucesso');
                    }
                    catch (error) {
                        console.error('Erro ao liberar motorista:', error);
                    }
                }
            }
            Object.assign(corrida, updateCorridaDto);
            const updatedCorrida = await this.corridaRepository.save(corrida);
            console.log('Corrida atualizada com sucesso:', updatedCorrida);
            return updatedCorrida;
        }
        catch (error) {
            console.error('Erro ao atualizar corrida:', error);
            if (error instanceof common_1.ConflictException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erro ao atualizar corrida: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            console.log('Tentando remover corrida ID:', id);
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
                throw new common_1.NotFoundException(`Corrida com ID ${id} não encontrada`);
            }
            console.log('Validando status da corrida:', {
                statusAtual: corrida.status,
                statusEsperado: corrida_entity_1.CorridaStatus.EM_ANDAMENTO
            });
            if (corrida.status === corrida_entity_1.CorridaStatus.EM_ANDAMENTO) {
                console.log('Tentativa de remover corrida em andamento bloqueada');
                throw new common_1.ConflictException('Não é possível remover uma corrida em andamento');
            }
            if (corrida.status !== corrida_entity_1.CorridaStatus.CONCLUIDA && corrida.status !== corrida_entity_1.CorridaStatus.CANCELADA) {
                console.log('Tentativa de remover corrida não finalizada bloqueada');
                throw new common_1.ConflictException('Apenas corridas concluídas ou canceladas podem ser removidas');
            }
            console.log('Validações passadas, prosseguindo com a remoção...');
            if (corrida.motoristaId) {
                try {
                    console.log('Liberando motorista ID:', corrida.motoristaId);
                    await this.motoristaService.update(corrida.motoristaId, { disponivel: true });
                    console.log('Motorista liberado com sucesso');
                }
                catch (error) {
                    console.error('Erro ao liberar motorista:', error);
                    throw new common_1.BadRequestException('Erro ao liberar motorista');
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
                }
                catch (error) {
                    console.error('Erro na verificação final do motorista:', error);
                }
            }
            return { message: 'Corrida removida com sucesso' };
        }
        catch (error) {
            console.error('Erro ao remover corrida:', error);
            if (error instanceof common_1.ConflictException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erro ao remover corrida: ${error.message}`);
        }
    }
};
exports.CorridaService = CorridaService;
exports.CorridaService = CorridaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(corrida_entity_1.Corrida)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        motorista_service_1.MotoristaService,
        passageiro_service_1.PassageiroService])
], CorridaService);
//# sourceMappingURL=corrida.service.js.map