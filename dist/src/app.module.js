"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const motorista_module_1 = require("./motorista/motorista.module");
const passageiro_module_1 = require("./passageiro/passageiro.module");
const corrida_module_1 = require("./corrida/corrida.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const veiculo_module_1 = require("./veiculo/veiculo.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'AppTaxi',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                logging: true
            }),
            motorista_module_1.MotoristaModule,
            passageiro_module_1.PassageiroModule,
            corrida_module_1.CorridaModule,
            dashboard_module_1.DashboardModule,
            veiculo_module_1.VeiculoModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map