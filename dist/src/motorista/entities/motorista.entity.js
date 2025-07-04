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
exports.Motorista = void 0;
const typeorm_1 = require("typeorm");
const corrida_entity_1 = require("../../corrida/entities/corrida.entity");
const veiculo_entity_1 = require("../../veiculo/entities/veiculo.entity");
let Motorista = class Motorista {
};
exports.Motorista = Motorista;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Motorista.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Motorista.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Motorista.prototype, "cnh", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Motorista.prototype, "placa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Motorista.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Motorista.prototype, "disponivel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => corrida_entity_1.Corrida, corrida => corrida.motorista),
    __metadata("design:type", Array)
], Motorista.prototype, "corridas", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => veiculo_entity_1.Veiculo, veiculo => veiculo.motorista),
    __metadata("design:type", veiculo_entity_1.Veiculo)
], Motorista.prototype, "veiculo", void 0);
exports.Motorista = Motorista = __decorate([
    (0, typeorm_1.Entity)('motorista')
], Motorista);
//# sourceMappingURL=motorista.entity.js.map