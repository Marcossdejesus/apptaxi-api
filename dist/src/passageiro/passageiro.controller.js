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
exports.PassageiroController = void 0;
const common_1 = require("@nestjs/common");
const passageiro_service_1 = require("./passageiro.service");
const create_passageiro_dto_1 = require("./dto/create-passageiro.dto");
const update_passageiro_dto_1 = require("./dto/update-passageiro.dto");
let PassageiroController = class PassageiroController {
    constructor(passageiroService) {
        this.passageiroService = passageiroService;
    }
    create(createPassageiroDto) {
        return this.passageiroService.create(createPassageiroDto);
    }
    findAll() {
        return this.passageiroService.findAll();
    }
    findOne(id) {
        return this.passageiroService.findOne(+id);
    }
    update(id, updatePassageiroDto) {
        return this.passageiroService.update(+id, updatePassageiroDto);
    }
    remove(id) {
        return this.passageiroService.remove(+id);
    }
};
exports.PassageiroController = PassageiroController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_passageiro_dto_1.CreatePassageiroDto]),
    __metadata("design:returntype", void 0)
], PassageiroController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PassageiroController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PassageiroController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_passageiro_dto_1.UpdatePassageiroDto]),
    __metadata("design:returntype", void 0)
], PassageiroController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PassageiroController.prototype, "remove", null);
exports.PassageiroController = PassageiroController = __decorate([
    (0, common_1.Controller)('passageiros'),
    __metadata("design:paramtypes", [passageiro_service_1.PassageiroService])
], PassageiroController);
//# sourceMappingURL=passageiro.controller.js.map