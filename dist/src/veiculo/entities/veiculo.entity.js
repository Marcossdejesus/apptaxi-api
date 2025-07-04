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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veiculo = exports.VeiculoStatusLabels = exports.VeiculoStatus = void 0;
const typeorm_1 = require("typeorm");
const motorista_entity_1 = require("../../motorista/entities/motorista.entity");
var VeiculoStatus;
(function (VeiculoStatus) {
    VeiculoStatus["DISPONIVEL"] = "DISPONIVEL";
    VeiculoStatus["EM_MANUTENCAO"] = "EM_MANUTENCAO";
    VeiculoStatus["INDISPONIVEL"] = "INDISPONIVEL";
})(VeiculoStatus || (exports.VeiculoStatus = VeiculoStatus = {}));
exports.VeiculoStatusLabels = {
    [VeiculoStatus.DISPONIVEL]: 'Disponível',
    [VeiculoStatus.EM_MANUTENCAO]: 'Em Manutenção',
    [VeiculoStatus.INDISPONIVEL]: 'Indisponível'
};
let Veiculo = class Veiculo {
};
exports.Veiculo = Veiculo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Veiculo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Veiculo.prototype, "placa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Veiculo.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Veiculo.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Veiculo.prototype, "ano", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Veiculo.prototype, "cor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: VeiculoStatus,
        default: VeiculoStatus.DISPONIVEL
    }),
    __metadata("design:type", String)
], Veiculo.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Veiculo.prototype, "dataUltimaManutencao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Veiculo.prototype, "dataVencimentoIPVA", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Veiculo.prototype, "dataVencimentoSeguro", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => motorista_entity_1.Motorista),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", motorista_entity_1.Motorista)
], Veiculo.prototype, "motorista", void 0);
exports.Veiculo = Veiculo = __decorate([
    (0, typeorm_1.Entity)('veiculo')
], Veiculo);
//# sourceMappingURL=veiculo.entity.js.map