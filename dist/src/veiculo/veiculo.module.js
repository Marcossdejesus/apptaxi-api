"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeiculoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const veiculo_service_1 = require("./veiculo.service");
const veiculo_controller_1 = require("./veiculo.controller");
const veiculo_entity_1 = require("./entities/veiculo.entity");
const corrida_entity_1 = require("../corrida/entities/corrida.entity");
let VeiculoModule = class VeiculoModule {
};
exports.VeiculoModule = VeiculoModule;
exports.VeiculoModule = VeiculoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([veiculo_entity_1.Veiculo, corrida_entity_1.Corrida])
        ],
        controllers: [veiculo_controller_1.VeiculoController],
        providers: [veiculo_service_1.VeiculoService],
        exports: [veiculo_service_1.VeiculoService],
    })
], VeiculoModule);
//# sourceMappingURL=veiculo.module.js.map