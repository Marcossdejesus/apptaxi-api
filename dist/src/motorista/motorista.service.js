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
const veiculo_service_1 = require("../veiculo/veiculo.service");
let MotoristaService = class MotoristaService {
    constructor(motoristaRepository, veiculoService) {
        this.motoristaRepository = motoristaRepository;
        this.veiculoService = veiculoService;
    }
    async create(createMotoristaDto) {
        const motorista = this.motoristaRepository.create(createMotoristaDto);
        if (createMotoristaDto.veiculo) {
            const veiculo = await this.veiculoService.create(createMotoristaDto.veiculo);
            motorista.veiculo = veiculo;
        }
        return await this.motoristaRepository.save(motorista);
    }
    async findAll() {
        return await this.motoristaRepository.find({
            relations: ['veiculo'],
        });
    }
    async findOne(id) {
        const motorista = await this.motoristaRepository.findOne({
            where: { id },
            relations: ['veiculo'],
        });
        if (!motorista) {
            throw new common_1.NotFoundException(`Motorista com ID ${id} não encontrado`);
        }
        return motorista;
    }
    async update(id, updateMotoristaDto) {
        const motorista = await this.findOne(id);
        Object.assign(motorista, updateMotoristaDto);
        return await this.motoristaRepository.save(motorista);
    }
    async remove(id) {
        const motorista = await this.findOne(id);
        await this.motoristaRepository.remove(motorista);
    }
    async findByDisponibilidade(disponivel) {
        return await this.motoristaRepository.find({
            where: { disponivel: disponivel },
            relations: ['veiculo'],
        });
    }
};
exports.MotoristaService = MotoristaService;
exports.MotoristaService = MotoristaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(motorista_entity_1.Motorista)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        veiculo_service_1.VeiculoService])
], MotoristaService);
//# sourceMappingURL=motorista.service.js.map