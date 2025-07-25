"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorridaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const corrida_controller_1 = require("./corrida.controller");
const corrida_service_1 = require("./corrida.service");
const corrida_entity_1 = require("./entities/corrida.entity");
const motorista_module_1 = require("../motorista/motorista.module");
const passageiro_module_1 = require("../passageiro/passageiro.module");
const veiculo_module_1 = require("../veiculo/veiculo.module");
let CorridaModule = class CorridaModule {
};
exports.CorridaModule = CorridaModule;
exports.CorridaModule = CorridaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([corrida_entity_1.Corrida]),
            motorista_module_1.MotoristaModule,
            passageiro_module_1.PassageiroModule,
            veiculo_module_1.VeiculoModule,
        ],
        controllers: [corrida_controller_1.CorridaController],
        providers: [corrida_service_1.CorridaService],
        exports: [corrida_service_1.CorridaService],
    })
], CorridaModule);
//# sourceMappingURL=corrida.module.js.map