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
exports.CreateMotoristaDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_veiculo_dto_1 = require("../../veiculo/dto/create-veiculo.dto");
class CreateMotoristaDto {
}
exports.CreateMotoristaDto = CreateMotoristaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'A CNH é obrigatória' }),
    (0, class_validator_1.IsString)({ message: 'A CNH deve ser uma string' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "cnh", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'A placa é obrigatória' }),
    (0, class_validator_1.IsString)({ message: 'A placa deve ser uma string' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "placa", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O modelo é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'O modelo deve ser uma string' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "modelo", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'A disponibilidade deve ser um booleano' }),
    __metadata("design:type", Boolean)
], CreateMotoristaDto.prototype, "disponivel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateMotoristaDto.prototype, "ativo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_veiculo_dto_1.CreateVeiculoDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", create_veiculo_dto_1.CreateVeiculoDto)
], CreateMotoristaDto.prototype, "veiculo", void 0);
//# sourceMappingURL=create-motorista.dto.js.map