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
exports.CorridaController = void 0;
const common_1 = require("@nestjs/common");
const corrida_service_1 = require("./corrida.service");
const create_corrida_dto_1 = require("./dto/create-corrida.dto");
const update_corrida_dto_1 = require("./dto/update-corrida.dto");
let CorridaController = class CorridaController {
    constructor(corridaService) {
        this.corridaService = corridaService;
    }
    create(createCorridaDto) {
        return this.corridaService.create(createCorridaDto);
    }
    findAll(status) {
        if (status) {
            return this.corridaService.findByStatus(status);
        }
        return this.corridaService.findAll();
    }
    findByMotorista(id) {
        return this.corridaService.findByMotorista(+id);
    }
    findByPassageiro(id) {
        return this.corridaService.findByPassageiro(+id);
    }
    findByVeiculo(id) {
        return this.corridaService.findByVeiculo(+id);
    }
    findOne(id) {
        return this.corridaService.findOne(+id);
    }
    update(id, updateCorridaDto) {
        const corridaId = parseInt(id, 10);
        if (isNaN(corridaId)) {
            throw new common_1.BadRequestException('ID inválido');
        }
        return this.corridaService.update(corridaId, updateCorridaDto);
    }
    remove(id) {
        const corridaId = parseInt(id, 10);
        if (isNaN(corridaId)) {
            throw new common_1.BadRequestException('ID inválido');
        }
        return this.corridaService.remove(corridaId);
    }
};
exports.CorridaController = CorridaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_corrida_dto_1.CreateCorridaDto]),
    __metadata("design:returntype", void 0)
], CorridaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CorridaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('motorista/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CorridaController.prototype, "findByMotorista", null);
__decorate([
    (0, common_1.Get)('passageiro/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CorridaController.prototype, "findByPassageiro", null);
__decorate([
    (0, common_1.Get)('veiculo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CorridaController.prototype, "findByVeiculo", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CorridaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_corrida_dto_1.UpdateCorridaDto]),
    __metadata("design:returntype", void 0)
], CorridaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CorridaController.prototype, "remove", null);
exports.CorridaController = CorridaController = __decorate([
    (0, common_1.Controller)('corridas'),
    __metadata("design:paramtypes", [corrida_service_1.CorridaService])
], CorridaController);
//# sourceMappingURL=corrida.controller.js.map