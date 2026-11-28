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
exports.ActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const activities_service_1 = require("./activities.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../rbac/permissions.guard");
const permissions_decorator_1 = require("../rbac/permissions.decorator");
const activity_dto_1 = require("./dto/activity.dto");
let ActivitiesController = class ActivitiesController {
    activitiesService;
    constructor(activitiesService) {
        this.activitiesService = activitiesService;
    }
    create(req, projectId, body) {
        return this.activitiesService.create(req.user, projectId, body);
    }
    getActivityTree(req, projectId) {
        return this.activitiesService.getActivityTree(req.user, projectId);
    }
    findAll(req, projectId) {
        return this.activitiesService.findAll(req.user, projectId);
    }
    findOne(req, id) {
        return this.activitiesService.findOne(req.user, id);
    }
    update(req, id, body) {
        return this.activitiesService.update(req.user, id, body);
    }
    remove(req, id) {
        return this.activitiesService.remove(req.user, id);
    }
    getAssignments(req, id) {
        return this.activitiesService.getAssignments(req.user, id);
    }
    setAssignments(req, id, body) {
        return this.activitiesService.setAssignments(req.user, id, body);
    }
};
exports.ActivitiesController = ActivitiesController;
__decorate([
    (0, common_1.Post)('projects/:projectId/activities'),
    (0, permissions_decorator_1.RequirePermissions)('activities.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, activity_dto_1.CreateActivityDto]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('projects/:projectId/activities/tree'),
    (0, permissions_decorator_1.RequirePermissions)('activities.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "getActivityTree", null);
__decorate([
    (0, common_1.Get)('projects/:projectId/activities'),
    (0, permissions_decorator_1.RequirePermissions)('activities.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('activities/:id'),
    (0, permissions_decorator_1.RequirePermissions)('activities.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('activities/:id'),
    (0, permissions_decorator_1.RequirePermissions)('activities.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, activity_dto_1.UpdateActivityDto]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('activities/:id'),
    (0, permissions_decorator_1.RequirePermissions)('activities.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('activities/:id/assignments'),
    (0, permissions_decorator_1.RequirePermissions)('activities.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "getAssignments", null);
__decorate([
    (0, common_1.Put)('activities/:id/assignments'),
    (0, permissions_decorator_1.RequirePermissions)('activities.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, activity_dto_1.SetAssignmentsDto]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "setAssignments", null);
exports.ActivitiesController = ActivitiesController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [activities_service_1.ActivitiesService])
], ActivitiesController);
//# sourceMappingURL=activities.controller.js.map