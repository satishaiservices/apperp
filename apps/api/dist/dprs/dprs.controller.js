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
exports.DprsController = void 0;
const common_1 = require("@nestjs/common");
const dprs_service_1 = require("./dprs.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../rbac/permissions.guard");
const permissions_decorator_1 = require("../rbac/permissions.decorator");
const dpr_dto_1 = require("./dto/dpr.dto");
let DprsController = class DprsController {
    dprsService;
    constructor(dprsService) {
        this.dprsService = dprsService;
    }
    create(req, projectId, body) {
        return this.dprsService.create(req.user, projectId, body);
    }
    findAll(req, projectId) {
        return this.dprsService.findAll(req.user, projectId);
    }
    findOne(req, id) {
        return this.dprsService.findOne(req.user, id);
    }
    update(req, id, body) {
        return this.dprsService.update(req.user, id, body);
    }
    submit(req, id) {
        return this.dprsService.submit(req.user, id);
    }
    approve(req, id, body) {
        return this.dprsService.approve(req.user, id, body);
    }
    reject(req, id, body) {
        return this.dprsService.reject(req.user, id, body);
    }
};
exports.DprsController = DprsController;
__decorate([
    (0, common_1.Post)('projects/:projectId/dprs'),
    (0, permissions_decorator_1.RequirePermissions)('dprs.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dpr_dto_1.CreateDprDto]),
    __metadata("design:returntype", void 0)
], DprsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('projects/:projectId/dprs'),
    (0, permissions_decorator_1.RequirePermissions)('dprs.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DprsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dprs/:id'),
    (0, permissions_decorator_1.RequirePermissions)('dprs.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DprsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('dprs/:id'),
    (0, permissions_decorator_1.RequirePermissions)('dprs.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dpr_dto_1.UpdateDprDto]),
    __metadata("design:returntype", void 0)
], DprsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('dprs/:id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('dprs.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DprsController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)('dprs/:id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('dprs.review'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dpr_dto_1.ReviewDprDto]),
    __metadata("design:returntype", void 0)
], DprsController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)('dprs/:id/reject'),
    (0, permissions_decorator_1.RequirePermissions)('dprs.review'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dpr_dto_1.ReviewDprDto]),
    __metadata("design:returntype", void 0)
], DprsController.prototype, "reject", null);
exports.DprsController = DprsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [dprs_service_1.DprsService])
], DprsController);
//# sourceMappingURL=dprs.controller.js.map