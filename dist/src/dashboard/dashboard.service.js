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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const corrida_entity_1 = require("../corrida/entities/corrida.entity");
const motorista_entity_1 = require("../motorista/entities/motorista.entity");
const passageiro_entity_1 = require("../passageiro/entities/passageiro.entity");
const corrida_entity_2 = require("../corrida/entities/corrida.entity");
let DashboardService = class DashboardService {
    constructor(corridaRepository, motoristaRepository, passageiroRepository) {
        this.corridaRepository = corridaRepository;
        this.motoristaRepository = motoristaRepository;
        this.passageiroRepository = passageiroRepository;
    }
    async getEstatisticasGerais() {
        const [totalCorridas, totalMotoristas, totalPassageiros] = await Promise.all([
            this.corridaRepository.count(),
            this.motoristaRepository.count(),
            this.passageiroRepository.count(),
        ]);
        return {
            totalCorridas,
            totalMotoristas,
            totalPassageiros,
        };
    }
    async getCorridasPorStatus() {
        const corridas = await this.corridaRepository
            .createQueryBuilder('corrida')
            .select('corrida.status', 'status')
            .addSelect('COUNT(*)', 'total')
            .groupBy('corrida.status')
            .getRawMany();
        return corridas;
    }
    async getFaturamentoPorPeriodo(dataInicio, dataFim) {
        const dataInicioUTC = new Date(Date.UTC(dataInicio.getUTCFullYear(), dataInicio.getUTCMonth(), dataInicio.getUTCDate(), 0, 0, 0, 0));
        const dataFimUTC = new Date(Date.UTC(dataFim.getUTCFullYear(), dataFim.getUTCMonth(), dataFim.getUTCDate(), 23, 59, 59, 999));
        console.log('Período solicitado (UTC):');
        console.log('Início:', dataInicioUTC.toISOString());
        console.log('Fim:', dataFimUTC.toISOString());
        const corridas = await this.corridaRepository.find({
            where: {
                status: corrida_entity_2.CorridaStatus.CONCLUIDA,
                data: (0, typeorm_2.Between)(dataInicioUTC, dataFimUTC)
            },
            relations: ['motorista', 'passageiro']
        });
        console.log('Corridas encontradas:', corridas);
        const faturamento = corridas.reduce((total, corrida) => {
            console.log(`Somando corrida ${corrida.id}:`, corrida.valor);
            return total + Number(corrida.valor);
        }, 0);
        console.log('Faturamento total:', faturamento);
        return {
            periodo: {
                inicio: dataInicio,
                fim: dataFim,
            },
            faturamento,
            totalCorridas: corridas.length,
            corridas: corridas.map(c => ({
                id: c.id,
                origem: c.origem,
                destino: c.destino,
                valor: c.valor,
                data: c.data,
                status: c.status,
                motorista: c.motorista?.nome,
                passageiro: c.passageiro?.nome
            }))
        };
    }
    async getMotoristasMaisAtivos(limit = 5) {
        const motoristas = await this.motoristaRepository
            .createQueryBuilder('motorista')
            .leftJoin('motorista.corridas', 'corrida')
            .select('motorista.id', 'id')
            .addSelect('motorista.nome', 'nome')
            .addSelect('COUNT(corrida.id)', 'total_corridas')
            .groupBy('motorista.id')
            .addGroupBy('motorista.nome')
            .orderBy('total_corridas', 'DESC')
            .limit(limit)
            .getRawMany();
        return motoristas.map(m => ({
            id: m.id,
            nome: m.nome,
            totalCorridas: parseInt(m.total_corridas)
        }));
    }
    async getPassageirosMaisFrequentes(limit = 5) {
        const passageiros = await this.passageiroRepository
            .createQueryBuilder('passageiro')
            .leftJoin('passageiro.corridas', 'corrida')
            .select('passageiro.id', 'id')
            .addSelect('passageiro.nome', 'nome')
            .addSelect('COUNT(corrida.id)', 'total_corridas')
            .groupBy('passageiro.id')
            .addGroupBy('passageiro.nome')
            .orderBy('total_corridas', 'DESC')
            .limit(limit)
            .getRawMany();
        return passageiros.map(p => ({
            id: p.id,
            nome: p.nome,
            totalCorridas: parseInt(p.total_corridas)
        }));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(corrida_entity_1.Corrida)),
    __param(1, (0, typeorm_1.InjectRepository)(motorista_entity_1.Motorista)),
    __param(2, (0, typeorm_1.InjectRepository)(passageiro_entity_1.Passageiro)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map