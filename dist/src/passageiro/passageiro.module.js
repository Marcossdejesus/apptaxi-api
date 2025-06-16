"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassageiroModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passageiro_service_1 = require("./passageiro.service");
const passageiro_controller_1 = require("./passageiro.controller");
const passageiro_entity_1 = require("./entities/passageiro.entity");
let PassageiroModule = class PassageiroModule {
};
exports.PassageiroModule = PassageiroModule;
exports.PassageiroModule = PassageiroModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([passageiro_entity_1.Passageiro])],
        controllers: [passageiro_controller_1.PassageiroController],
        providers: [passageiro_service_1.PassageiroService],
        exports: [passageiro_service_1.PassageiroService],
    })
], PassageiroModule);
//# sourceMappingURL=passageiro.module.js.map