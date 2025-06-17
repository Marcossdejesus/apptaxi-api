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
exports.VeiculoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const veiculo_entity_1 = require("./entities/veiculo.entity");
const corrida_entity_1 = require("../corrida/entities/corrida.entity");
let VeiculoService = class VeiculoService {
    constructor(veiculoRepository, corridaRepository) {
        this.veiculoRepository = veiculoRepository;
        this.corridaRepository = corridaRepository;
    }
    async create(createVeiculoDto) {
        const veiculoExistente = await this.veiculoRepository.findOne({
            where: { placa: createVeiculoDto.placa }
        });
        if (veiculoExistente) {
            throw new common_1.ConflictException(`Já existe um veículo cadastrado com a placa ${createVeiculoDto.placa}`);
        }
        const veiculo = this.veiculoRepository.create(createVeiculoDto);
        return await this.veiculoRepository.save(veiculo);
    }
    async findAll() {
        return await this.veiculoRepository.find({
            relations: ['motorista'],
        });
    }
    async findOne(id) {
        const veiculo = await this.veiculoRepository.findOne({
            where: { id },
            relations: ['motorista'],
        });
        if (!veiculo) {
            throw new common_1.NotFoundException(`Veículo com ID ${id} não encontrado`);
        }
        return veiculo;
    }
    async findByPlaca(placa) {
        const veiculo = await this.veiculoRepository.findOne({
            where: { placa },
            relations: ['motorista'],
        });
        if (!veiculo) {
            throw new common_1.NotFoundException(`Veículo com placa ${placa} não encontrado`);
        }
        return veiculo;
    }
    async update(id, updateVeiculoDto) {
        const veiculo = await this.findOne(id);
        if (updateVeiculoDto.placa && updateVeiculoDto.placa !== veiculo.placa) {
            const veiculoExistente = await this.veiculoRepository.findOne({
                where: { placa: updateVeiculoDto.placa }
            });
            if (veiculoExistente) {
                throw new common_1.ConflictException(`Já existe um veículo cadastrado com a placa ${updateVeiculoDto.placa}`);
            }
        }
        Object.assign(veiculo, updateVeiculoDto);
        return await this.veiculoRepository.save(veiculo);
    }
    async remove(id) {
        const veiculo = await this.findOne(id);
        const corridas = await this.corridaRepository.find({
            where: { veiculo: { id: veiculo.id } }
        });
        if (corridas.length > 0) {
            throw new common_1.BadRequestException('Não é possível excluir o veículo pois existem corridas associadas a ele. ' +
                'Considere marcar o veículo como Indisponível em vez de excluí-lo.');
        }
        await this.veiculoRepository.remove(veiculo);
    }
    async findByStatus(status) {
        if (!Object.values(veiculo_entity_1.VeiculoStatus).includes(status)) {
            throw new common_1.BadRequestException(`Status inválido. Os status válidos são: ${Object.values(veiculo_entity_1.VeiculoStatusLabels).join(', ')}`);
        }
        const veiculoStatus = status;
        return await this.veiculoRepository.find({
            where: { status: veiculoStatus },
            relations: ['motorista'],
        });
    }
    async findVeiculosParaManutencao() {
        const hoje = new Date();
        const trintaDiasAtras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000);
        return await this.veiculoRepository
            .createQueryBuilder('veiculo')
            .where('veiculo.dataUltimaManutencao < :dataLimite', { dataLimite: trintaDiasAtras })
            .orWhere('veiculo.dataVencimentoIPVA < :hoje', { hoje })
            .orWhere('veiculo.dataVencimentoSeguro < :hoje', { hoje })
            .getMany();
    }
};
exports.VeiculoService = VeiculoService;
exports.VeiculoService = VeiculoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(veiculo_entity_1.Veiculo)),
    __param(1, (0, typeorm_1.InjectRepository)(corrida_entity_1.Corrida)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VeiculoService);
//# sourceMappingURL=veiculo.service.js.map