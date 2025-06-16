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
exports.MotoristaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const motorista_entity_1 = require("./entities/motorista.entity");
const corrida_entity_1 = require("../corrida/entities/corrida.entity");
let MotoristaService = class MotoristaService {
    constructor(motoristaRepository) {
        this.motoristaRepository = motoristaRepository;
    }
    async create(createMotoristaDto) {
        const motoristaComCnh = await this.motoristaRepository.findOne({
            where: { cnh: createMotoristaDto.cnh },
        });
        if (motoristaComCnh) {
            throw new common_1.ConflictException('Não pode haver dois motoristas com a mesma CNH');
        }
        const motoristaComPlaca = await this.motoristaRepository.findOne({
            where: { placa: createMotoristaDto.placa },
        });
        if (motoristaComPlaca) {
            throw new common_1.ConflictException('Não pode haver dois motoristas com a mesma placa');
        }
        const motorista = this.motoristaRepository.create(createMotoristaDto);
        return this.motoristaRepository.save(motorista);
    }
    findAll() {
        return this.motoristaRepository.find();
    }
    async findOne(id) {
        const motorista = await this.motoristaRepository.findOne({
            where: { id },
            relations: ['corridas'],
        });
        if (!motorista) {
            throw new common_1.BadRequestException(`Motorista com ID ${id} não encontrado`);
        }
        return motorista;
    }
    async update(id, updateMotoristaDto) {
        const motorista = await this.findOne(id);
        if (updateMotoristaDto.cnh && updateMotoristaDto.cnh !== motorista.cnh) {
            const motoristaComCnh = await this.motoristaRepository.findOne({
                where: { cnh: updateMotoristaDto.cnh },
            });
            if (motoristaComCnh) {
                throw new common_1.ConflictException('Não pode haver dois motoristas com a mesma CNH');
            }
        }
        if (updateMotoristaDto.placa && updateMotoristaDto.placa !== motorista.placa) {
            const motoristaComPlaca = await this.motoristaRepository.findOne({
                where: { placa: updateMotoristaDto.placa },
            });
            if (motoristaComPlaca) {
                throw new common_1.ConflictException('Não pode haver dois motoristas com a mesma placa');
            }
        }
        Object.assign(motorista, updateMotoristaDto);
        return this.motoristaRepository.save(motorista);
    }
    async remove(id) {
        const motorista = await this.findOne(id);
        const temCorridasEmAndamento = motorista.corridas.some(corrida => corrida.status === corrida_entity_1.CorridaStatus.EM_ANDAMENTO);
        if (temCorridasEmAndamento) {
            throw new common_1.ConflictException('Motorista não pode ser removido pois possui corridas em andamento');
        }
        await this.motoristaRepository.remove(motorista);
    }
};
exports.MotoristaService = MotoristaService;
exports.MotoristaService = MotoristaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(motorista_entity_1.Motorista)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MotoristaService);
//# sourceMappingURL=motorista.service.js.map