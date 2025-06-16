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
exports.Corrida = void 0;
const typeorm_1 = require("typeorm");
const motorista_entity_1 = require("../motorista/motorista.entity");
const passageiro_entity_1 = require("../passageiro/passageiro.entity");
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
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Corrida.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corrida.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Corrida.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => motorista_entity_1.Motorista, motorista => motorista.corridas),
    __metadata("design:type", motorista_entity_1.Motorista)
], Corrida.prototype, "motorista", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => passageiro_entity_1.Passageiro, passageiro => passageiro.corridas),
    __metadata("design:type", passageiro_entity_1.Passageiro)
], Corrida.prototype, "passageiro", void 0);
exports.Corrida = Corrida = __decorate([
    (0, typeorm_1.Entity)()
], Corrida);
//# sourceMappingURL=corrida.entity.js.map