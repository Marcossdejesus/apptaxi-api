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
exports.PassageiroService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const passageiro_entity_1 = require("./entities/passageiro.entity");
const corrida_entity_1 = require("../corrida/entities/corrida.entity");
let PassageiroService = class PassageiroService {
    constructor(passageiroRepository) {
        this.passageiroRepository = passageiroRepository;
    }
    async create(createPassageiroDto) {
        const passageiroComCpf = await this.passageiroRepository.findOne({
            where: { cpf: createPassageiroDto.cpf },
        });
        if (passageiroComCpf) {
            throw new common_1.ConflictException('Não pode haver dois passageiros com o mesmo CPF');
        }
        const passageiro = this.passageiroRepository.create(createPassageiroDto);
        return this.passageiroRepository.save(passageiro);
    }
    findAll() {
        return this.passageiroRepository.find();
    }
    async findOne(id) {
        const passageiro = await this.passageiroRepository.findOne({
            where: { id },
            relations: ['corridas'],
        });
        if (!passageiro) {
            throw new common_1.BadRequestException(`Passageiro com ID ${id} não encontrado`);
        }
        return passageiro;
    }
    async update(id, updatePassageiroDto) {
        const passageiro = await this.findOne(id);
        if (updatePassageiroDto.cpf && updatePassageiroDto.cpf !== passageiro.cpf) {
            const passageiroComCpf = await this.passageiroRepository.findOne({
                where: { cpf: updatePassageiroDto.cpf },
            });
            if (passageiroComCpf) {
                throw new common_1.ConflictException('Não pode haver dois passageiros com o mesmo CPF');
            }
        }
        Object.assign(passageiro, updatePassageiroDto);
        return this.passageiroRepository.save(passageiro);
    }
    async remove(id) {
        const passageiro = await this.findOne(id);
        const temCorridasEmAndamento = passageiro.corridas.some(corrida => corrida.status === corrida_entity_1.CorridaStatus.EM_ANDAMENTO);
        if (temCorridasEmAndamento) {
            throw new common_1.ConflictException('Passageiro não pode ser removido pois possui corridas em andamento');
        }
        await this.passageiroRepository.remove(passageiro);
    }
    async verificarCorridasPendentes(id) {
        const passageiro = await this.findOne(id);
        const corridasPendentes = passageiro.corridas.filter(corrida => corrida.status === 'PENDENTE');
        return corridasPendentes.length >= 3;
    }
};
exports.PassageiroService = PassageiroService;
exports.PassageiroService = PassageiroService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(passageiro_entity_1.Passageiro)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PassageiroService);
//# sourceMappingURL=passageiro.service.js.map