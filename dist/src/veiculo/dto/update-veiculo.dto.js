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
exports.UpdateVeiculoDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const veiculo_entity_1 = require("../entities/veiculo.entity");
class UpdateVeiculoDto {
}
exports.UpdateVeiculoDto = UpdateVeiculoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVeiculoDto.prototype, "placa", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVeiculoDto.prototype, "marca", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateVeiculoDto.prototype, "ano", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVeiculoDto.prototype, "cor", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(veiculo_entity_1.VeiculoStatus, {
        message: `O status deve ser um dos seguintes valores: ${Object.values(veiculo_entity_1.VeiculoStatusLabels).join(', ')}`
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVeiculoDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateVeiculoDto.prototype, "dataUltimaManutencao", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateVeiculoDto.prototype, "dataVencimentoIPVA", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateVeiculoDto.prototype, "dataVencimentoSeguro", void 0);
//# sourceMappingURL=update-veiculo.dto.js.map