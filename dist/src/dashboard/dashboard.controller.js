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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getEstatisticasGerais() {
        return this.dashboardService.getEstatisticasGerais();
    }
    async getCorridasPorStatus() {
        return this.dashboardService.getCorridasPorStatus();
    }
    async getFaturamentoPorPeriodo(dataInicio, dataFim) {
        return this.dashboardService.getFaturamentoPorPeriodo(new Date(dataInicio), new Date(dataFim));
    }
    async getMotoristasMaisAtivos(limit) {
        const limitNumber = limit ? parseInt(limit, 10) : 5;
        if (isNaN(limitNumber)) {
            throw new common_1.BadRequestException('O parâmetro limit deve ser um número');
        }
        return this.dashboardService.getMotoristasMaisAtivos(limitNumber);
    }
    async getPassageirosMaisFrequentes(limit) {
        const limitNumber = limit ? parseInt(limit, 10) : 5;
        if (isNaN(limitNumber)) {
            throw new common_1.BadRequestException('O parâmetro limit deve ser um número');
        }
        return this.dashboardService.getPassageirosMaisFrequentes(limitNumber);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('estatisticas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getEstatisticasGerais", null);
__decorate([
    (0, common_1.Get)('corridas/status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getCorridasPorStatus", null);
__decorate([
    (0, common_1.Get)('faturamento'),
    __param(0, (0, common_1.Query)('dataInicio')),
    __param(1, (0, common_1.Query)('dataFim')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getFaturamentoPorPeriodo", null);
__decorate([
    (0, common_1.Get)('motoristas/ativos'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getMotoristasMaisAtivos", null);
__decorate([
    (0, common_1.Get)('passageiros/frequentes'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getPassageirosMaisFrequentes", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map