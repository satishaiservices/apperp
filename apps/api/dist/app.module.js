"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.ObserveInstrument = exports.ObserveModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const observe_1 = require("@nestjs/observe");
const storage_module_1 = require("./storage/storage.module");
const audit_module_1 = require("./audit/audit.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./database/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const projects_module_1 = require("./projects/projects.module");
const roles_module_1 = require("./roles/roles.module");
const activities_module_1 = require("./activities/activities.module");
const dprs_module_1 = require("./dprs/dprs.module");
const site_submissions_module_1 = require("./site-submissions/site-submissions.module");
const attendance_module_1 = require("./attendance/attendance.module");
const platform_module_1 = require("./platform/platform.module");
_a = (0, observe_1.createObserveModule)(), exports.ObserveModule = _a.ObserveModule, exports.ObserveInstrument = _a.ObserveInstrument;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            exports.ObserveModule.forRoot({
                appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
                appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
                serviceId: 'api',
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 120,
                },
            ]),
            storage_module_1.StorageModule,
            audit_module_1.AuditModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            projects_module_1.ProjectsModule,
            roles_module_1.RolesModule,
            activities_module_1.ActivitiesModule,
            dprs_module_1.DprsModule,
            site_submissions_module_1.SiteSubmissionsModule,
            attendance_module_1.AttendanceModule,
            platform_module_1.PlatformModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map