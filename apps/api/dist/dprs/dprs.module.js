"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DprsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const rbac_module_1 = require("../rbac/rbac.module");
const dprs_controller_1 = require("./dprs.controller");
const dprs_service_1 = require("./dprs.service");
let DprsModule = class DprsModule {
};
exports.DprsModule = DprsModule;
exports.DprsModule = DprsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, rbac_module_1.RbacModule],
        controllers: [dprs_controller_1.DprsController],
        providers: [dprs_service_1.DprsService],
    })
], DprsModule);
//# sourceMappingURL=dprs.module.js.map