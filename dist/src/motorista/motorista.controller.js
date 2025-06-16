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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotoristaController = void 0;
const common_1 = require("@nestjs/common");
const motorista_service_1 = require("./motorista.service");
const create_motorista_dto_1 = require("./dto/create-motorista.dto");
const update_motorista_dto_1 = require("./dto/update-motorista.dto");
let MotoristaController = class MotoristaController {
    constructor(motoristaService) {
        this.motoristaService = motoristaService;
    }
    create(createMotoristaDto) {
        return this.motoristaService.create(createMotoristaDto);
    }
    findAll() {
        return this.motoristaService.findAll();
    }
    findOne(id) {
        return this.motoristaService.findOne(+id);
    }
    update(id, updateMotoristaDto) {
        return this.motoristaService.update(+id, updateMotoristaDto);
    }
    remove(id) {
        return this.motoristaService.remove(+id);
    }
};
exports.MotoristaController = MotoristaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_motorista_dto_1.CreateMotoristaDto]),
    __metadata("design:returntype", void 0)
], MotoristaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MotoristaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MotoristaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_motorista_dto_1.UpdateMotoristaDto]),
    __metadata("design:returntype", void 0)
], MotoristaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MotoristaController.prototype, "remove", null);
exports.MotoristaController = MotoristaController = __decorate([
    (0, common_1.Controller)('motoristas'),
    __metadata("design:paramtypes", [motorista_service_1.MotoristaService])
], MotoristaController);
//# sourceMappingURL=motorista.controller.js.map