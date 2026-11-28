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
exports.PlatformController = void 0;
const common_1 = require("@nestjs/common");
const platform_service_1 = require("./platform.service");
const audit_service_1 = require("../audit/audit.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_guard_1 = require("./platform.guard");
const platform_dto_1 = require("./dto/platform.dto");
let PlatformController = class PlatformController {
    platformService;
    auditService;
    constructor(platformService, auditService) {
        this.platformService = platformService;
        this.auditService = auditService;
    }
    getPlatformAudit(limit, offset, tenantId, action) {
        return this.auditService.getPlatformAuditLogs({
            limit: limit ? parseInt(limit, 10) : 50,
            offset: offset ? parseInt(offset, 10) : 0,
            tenantId,
            action,
        });
    }
    getStats() {
        return this.platformService.getStats();
    }
    getPlatformAdmins() {
        return this.platformService.listPlatformAdmins();
    }
    createPlatformAdmin(req, body) {
        return this.platformService.createPlatformAdmin(body);
    }
    updatePlatformAdmin(req, id, body) {
        return this.platformService.updatePlatformAdmin(req.user, id, body);
    }
    deletePlatformAdmin(req, id) {
        return this.platformService.deletePlatformAdmin(req.user, id);
    }
    getTenants() {
        return this.platformService.getTenants();
    }
    getTenantDetails(id) {
        return this.platformService.getTenantDetails(id);
    }
    createTenant(body) {
        return this.platformService.createTenantWithAdmin(body);
    }
    updateTenant(id, body) {
        return this.platformService.updateTenant(id, body);
    }
    resetUserPassword(id, userId, body) {
        return this.platformService.resetUserPassword(id, userId, body.newPassword);
    }
    addUserToTenant(id, body) {
        return this.platformService.addUserToTenant(id, body);
    }
};
exports.PlatformController = PlatformController;
__decorate([
    (0, common_1.Get)('audit'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('tenantId')),
    __param(3, (0, common_1.Query)('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "getPlatformAudit", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('admins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "getPlatformAdmins", null);
__decorate([
    (0, common_1.Post)('admins'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, platform_dto_1.CreateSuperadminDto]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "createPlatformAdmin", null);
__decorate([
    (0, common_1.Patch)('admins/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, platform_dto_1.UpdateSuperadminDto]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "updatePlatformAdmin", null);
__decorate([
    (0, common_1.Delete)('admins/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "deletePlatformAdmin", null);
__decorate([
    (0, common_1.Get)('tenants'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "getTenants", null);
__decorate([
    (0, common_1.Get)('tenants/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "getTenantDetails", null);
__decorate([
    (0, common_1.Post)('tenants'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [platform_dto_1.CreateTenantDto]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "createTenant", null);
__decorate([
    (0, common_1.Patch)('tenants/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, platform_dto_1.UpdateTenantDto]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "updateTenant", null);
__decorate([
    (0, common_1.Post)('tenants/:id/users/:userId/reset-password'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "resetUserPassword", null);
__decorate([
    (0, common_1.Post)('tenants/:id/users'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, platform_dto_1.AddTenantUserDto]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "addUserToTenant", null);
exports.PlatformController = PlatformController = __decorate([
    (0, common_1.Controller)('platform'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, platform_guard_1.PlatformGuard),
    __metadata("design:paramtypes", [platform_service_1.PlatformService,
        audit_service_1.AuditService])
], PlatformController);
//# sourceMappingURL=platform.controller.js.map