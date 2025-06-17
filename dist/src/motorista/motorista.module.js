"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotoristaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const motorista_service_1 = require("./motorista.service");
const motorista_controller_1 = require("./motorista.controller");
const motorista_entity_1 = require("./entities/motorista.entity");
const veiculo_module_1 = require("../veiculo/veiculo.module");
let MotoristaModule = class MotoristaModule {
};
exports.MotoristaModule = MotoristaModule;
exports.MotoristaModule = MotoristaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([motorista_entity_1.Motorista]),
            veiculo_module_1.VeiculoModule,
        ],
        controllers: [motorista_controller_1.MotoristaController],
        providers: [motorista_service_1.MotoristaService],
        exports: [motorista_service_1.MotoristaService],
    })
], MotoristaModule);
//# sourceMappingURL=motorista.module.js.map