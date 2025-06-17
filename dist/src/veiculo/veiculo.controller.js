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
exports.VeiculoController = void 0;
const common_1 = require("@nestjs/common");
const veiculo_service_1 = require("./veiculo.service");
const create_veiculo_dto_1 = require("./dto/create-veiculo.dto");
const update_veiculo_dto_1 = require("./dto/update-veiculo.dto");
let VeiculoController = class VeiculoController {
    constructor(veiculoService) {
        this.veiculoService = veiculoService;
    }
    create(createVeiculoDto) {
        return this.veiculoService.create(createVeiculoDto);
    }
    findAll(status) {
        if (status) {
            return this.veiculoService.findByStatus(status);
        }
        return this.veiculoService.findAll();
    }
    findVeiculosParaManutencao() {
        return this.veiculoService.findVeiculosParaManutencao();
    }
    findByPlaca(placa) {
        return this.veiculoService.findByPlaca(placa);
    }
    findByStatusParam(status) {
        return this.veiculoService.findByStatus(status);
    }
    findOne(id) {
        return this.veiculoService.findOne(+id);
    }
    updatePut(id, updateVeiculoDto) {
        return this.veiculoService.update(+id, updateVeiculoDto);
    }
    update(id, updateVeiculoDto) {
        return this.veiculoService.update(+id, updateVeiculoDto);
    }
    remove(id) {
        return this.veiculoService.remove(+id);
    }
};
exports.VeiculoController = VeiculoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_veiculo_dto_1.CreateVeiculoDto]),
    __metadata("design:returntype", void 0)
], VeiculoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VeiculoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('manutencao'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VeiculoController.prototype, "findVeiculosParaManutencao", null);
__decorate([
    (0, common_1.Get)('placa/:placa'),
    __param(0, (0, common_1.Param)('placa')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VeiculoController.prototype, "findByPlaca", null);
__decorate([
    (0, common_1.Get)('status/:status'),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VeiculoController.prototype, "findByStatusParam", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VeiculoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_veiculo_dto_1.UpdateVeiculoDto]),
    __metadata("design:returntype", void 0)
], VeiculoController.prototype, "updatePut", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_veiculo_dto_1.UpdateVeiculoDto]),
    __metadata("design:returntype", void 0)
], VeiculoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VeiculoController.prototype, "remove", null);
exports.VeiculoController = VeiculoController = __decorate([
    (0, common_1.Controller)('veiculos'),
    __metadata("design:paramtypes", [veiculo_service_1.VeiculoService])
], VeiculoController);
//# sourceMappingURL=veiculo.controller.js.map