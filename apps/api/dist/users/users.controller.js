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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../rbac/permissions.guard");
const permissions_decorator_1 = require("../rbac/permissions.decorator");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    getProfile(req) {
        return this.usersService.getProfile(req.user);
    }
    list(req) {
        return this.usersService.list(req.user);
    }
    getMember(membershipId, req) {
        return this.usersService.getMember(req.user, membershipId);
    }
    provision(body, req) {
        return this.usersService.provisionEmployee(req.user, body);
    }
    resetPassword(membershipId, body, req) {
        return this.usersService.resetPassword(req.user, membershipId, body.newPassword);
    }
    addMember(body, req) {
        return this.usersService.addMember(req.user, body);
    }
    deactivate(membershipId, req) {
        return this.usersService.setMembershipStatus(req.user, membershipId, 'INACTIVE');
    }
    activate(membershipId, req) {
        return this.usersService.setMembershipStatus(req.user, membershipId, 'ACTIVE');
    }
    removeMember(membershipId, req) {
        return this.usersService.setMembershipStatus(req.user, membershipId, 'INACTIVE');
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('users.view'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':membershipId'),
    (0, permissions_decorator_1.RequirePermissions)('users.view'),
    __param(0, (0, common_1.Param)('membershipId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMember", null);
__decorate([
    (0, common_1.Post)('provision'),
    (0, permissions_decorator_1.RequirePermissions)('users.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "provision", null);
__decorate([
    (0, common_1.Post)(':membershipId/reset-password'),
    (0, permissions_decorator_1.RequirePermissions)('users.update'),
    __param(0, (0, common_1.Param)('membershipId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('users.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addMember", null);
__decorate([
    (0, common_1.Post)(':membershipId/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('users.update'),
    __param(0, (0, common_1.Param)('membershipId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Post)(':membershipId/activate'),
    (0, permissions_decorator_1.RequirePermissions)('users.update'),
    __param(0, (0, common_1.Param)('membershipId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "activate", null);
__decorate([
    (0, common_1.Delete)(':membershipId'),
    (0, permissions_decorator_1.RequirePermissions)('users.delete'),
    __param(0, (0, common_1.Param)('membershipId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeMember", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map