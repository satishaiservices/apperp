"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSubmissionsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const rbac_module_1 = require("../rbac/rbac.module");
const site_submissions_controller_1 = require("./site-submissions.controller");
const site_submissions_service_1 = require("./site-submissions.service");
const image_processor_service_1 = require("../common/services/image-processor.service");
let SiteSubmissionsModule = class SiteSubmissionsModule {
};
exports.SiteSubmissionsModule = SiteSubmissionsModule;
exports.SiteSubmissionsModule = SiteSubmissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, rbac_module_1.RbacModule],
        controllers: [site_submissions_controller_1.SiteSubmissionsController],
        providers: [site_submissions_service_1.SiteSubmissionsService, image_processor_service_1.ImageProcessorService],
    })
], SiteSubmissionsModule);
//# sourceMappingURL=site-submissions.module.js.map