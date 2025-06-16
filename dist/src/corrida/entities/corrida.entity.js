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
exports.Corrida = exports.CorridaStatus = void 0;
const typeorm_1 = require("typeorm");
const motorista_entity_1 = require("../../motorista/entities/motorista.entity");
const passageiro_entity_1 = require("../../passageiro/entities/passageiro.entity");
var CorridaStatus;
(function (CorridaStatus) {
    CorridaStatus["PENDENTE"] = "PENDENTE";
    CorridaStatus["EM_ANDAMENTO"] = "EM_ANDAMENTO";
    CorridaStatus["CONCLUIDA"] = "CONCLUIDA";
    CorridaStatus["CANCELADA"] = "CANCELADA";
})(CorridaStatus || (exports.CorridaStatus = CorridaStatus = {}));
let Corrida = class Corrida {
};
exports.Corrida = Corrida;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Corrida.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corrida.prototype, "origem", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corrida.prototype, "destino", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Corrida.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CorridaStatus,
        default: CorridaStatus.PENDENTE,
    }),
    __metadata("design:type", String)
], Corrida.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Corrida.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'motoristaId', nullable: true }),
    __metadata("design:type", Number)
], Corrida.prototype, "motoristaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'passageiroId', nullable: true }),
    __metadata("design:type", Number)
], Corrida.prototype, "passageiroId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => motorista_entity_1.Motorista, motorista => motorista.corridas, {
        eager: true,
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)({ name: 'motoristaId' }),
    __metadata("design:type", motorista_entity_1.Motorista)
], Corrida.prototype, "motorista", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => passageiro_entity_1.Passageiro, passageiro => passageiro.corridas, {
        eager: true,
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)({ name: 'passageiroId' }),
    __metadata("design:type", passageiro_entity_1.Passageiro)
], Corrida.prototype, "passageiro", void 0);
exports.Corrida = Corrida = __decorate([
    (0, typeorm_1.Entity)('corrida')
], Corrida);
//# sourceMappingURL=corrida.entity.js.map