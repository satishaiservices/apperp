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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async verifySupervisor(auth) {
        const membership = await this.prisma.tenantMembership.findFirst({
            where: {
                id: auth.membershipId,
                tenantId: auth.tenantId,
                userId: auth.sub,
                membershipStatus: 'ACTIVE',
            },
            select: { id: true },
        });
        if (!membership) {
            throw new common_1.ForbiddenException('Active supervisor membership required');
        }
    }
    async checkIn(auth, input) {
        await this.verifySupervisor(auth);
        let projectId = input.projectId;
        if (!projectId) {
            const defaultProject = await this.prisma.project.findFirst({
                where: { tenantId: auth.tenantId, status: { not: 'ARCHIVED' } },
                select: { id: true },
            });
            if (!defaultProject) {
                throw new common_1.BadRequestException('No active project found in organization');
            }
            projectId = defaultProject.id;
        }
        const project = await this.prisma.project.findFirst({
            where: { id: projectId, tenantId: auth.tenantId, status: { not: 'ARCHIVED' } },
            select: { id: true, name: true, projectCode: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const openSession = await this.prisma.attendanceSession.findFirst({
            where: {
                tenantId: auth.tenantId,
                supervisorMembershipId: auth.membershipId,
                status: 'OPEN',
            },
            include: {
                project: { select: { id: true, projectCode: true, name: true } },
            },
        });
        if (openSession) {
            await this.prisma.attendanceSession.update({
                where: { id: openSession.id },
                data: {
                    status: 'CLOSED',
                    checkOutAt: new Date(),
                    remarks: 'Auto-closed on subsequent check-in',
                },
            });
        }
        const session = await this.prisma.attendanceSession.create({
            data: {
                tenantId: auth.tenantId,
                supervisorMembershipId: auth.membershipId,
                projectId,
                checkInAt: new Date(),
                status: 'OPEN',
                latitude: input.latitude !== undefined ? input.latitude : null,
                longitude: input.longitude !== undefined ? input.longitude : null,
                locationAccuracyM: input.locationAccuracyM !== undefined ? input.locationAccuracyM : null,
                remarks: input.remarks?.trim() || null,
            },
            include: {
                project: { select: { id: true, projectCode: true, name: true } },
                supervisor: {
                    include: {
                        user: { select: { id: true, fullName: true, email: true } },
                    },
                },
            },
        });
        return {
            message: 'Check-in recorded successfully',
            session,
        };
    }
    async checkOut(auth, input) {
        await this.verifySupervisor(auth);
        const session = await this.prisma.attendanceSession.findFirst({
            where: {
                tenantId: auth.tenantId,
                supervisorMembershipId: auth.membershipId,
                ...(input.sessionId ? { id: input.sessionId } : { status: 'OPEN' }),
            },
            include: {
                project: { select: { id: true, projectCode: true, name: true } },
            },
            orderBy: { checkInAt: 'desc' },
        });
        if (!session || session.status === 'CLOSED') {
            throw new common_1.BadRequestException('No active open check-in session found to punch out');
        }
        const checkOutAt = new Date();
        const durationMs = checkOutAt.getTime() - session.checkInAt.getTime();
        const durationMinutes = Math.max(1, Math.round(durationMs / (1000 * 60)));
        const updated = await this.prisma.attendanceSession.update({
            where: { id: session.id },
            data: {
                status: 'CLOSED',
                checkOutAt,
                checkOutLatitude: input.latitude !== undefined ? input.latitude : null,
                checkOutLongitude: input.longitude !== undefined ? input.longitude : null,
                checkOutAccuracyM: input.locationAccuracyM !== undefined ? input.locationAccuracyM : null,
                remarks: input.remarks?.trim() || session.remarks,
            },
            include: {
                project: { select: { id: true, projectCode: true, name: true } },
                supervisor: {
                    include: {
                        user: { select: { id: true, fullName: true, email: true } },
                    },
                },
            },
        });
        return {
            message: 'Punch-out recorded successfully',
            durationMinutes,
            session: updated,
        };
    }
    async getCurrentSession(auth) {
        await this.verifySupervisor(auth);
        const openSession = await this.prisma.attendanceSession.findFirst({
            where: {
                tenantId: auth.tenantId,
                supervisorMembershipId: auth.membershipId,
                status: 'OPEN',
            },
            include: {
                project: { select: { id: true, projectCode: true, name: true } },
                supervisor: {
                    include: {
                        user: { select: { id: true, fullName: true, email: true } },
                    },
                },
            },
        });
        if (openSession) {
            const elapsedMs = Date.now() - openSession.checkInAt.getTime();
            const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
            return {
                active: true,
                elapsedMinutes,
                session: openSession,
            };
        }
        const lastSession = await this.prisma.attendanceSession.findFirst({
            where: {
                tenantId: auth.tenantId,
                supervisorMembershipId: auth.membershipId,
            },
            include: {
                project: { select: { id: true, projectCode: true, name: true } },
                supervisor: {
                    include: {
                        user: { select: { id: true, fullName: true, email: true } },
                    },
                },
            },
            orderBy: { checkInAt: 'desc' },
        });
        let elapsedMinutes = 0;
        if (lastSession?.checkInAt && lastSession.checkOutAt) {
            elapsedMinutes = Math.round((lastSession.checkOutAt.getTime() - lastSession.checkInAt.getTime()) /
                (1000 * 60));
        }
        return {
            active: false,
            elapsedMinutes,
            session: lastSession,
        };
    }
    async getHistory(auth, options = {}) {
        await this.verifySupervisor(auth);
        const where = {
            tenantId: auth.tenantId,
        };
        const isAdmin = auth.roles?.some((r) => ['OWNER', 'ADMIN', 'ORG_ADMIN', 'PROJECT_MANAGER'].includes(r)) ||
            auth.isPlatformAdmin;
        if (!isAdmin) {
            where.supervisorMembershipId = auth.membershipId;
        }
        if (options.projectId) {
            where.projectId = options.projectId;
        }
        const [total, items] = await Promise.all([
            this.prisma.attendanceSession.count({ where }),
            this.prisma.attendanceSession.findMany({
                where,
                include: {
                    project: { select: { id: true, projectCode: true, name: true } },
                    supervisor: {
                        include: {
                            user: { select: { id: true, fullName: true, username: true, email: true, phone: true } },
                        },
                    },
                },
                orderBy: { checkInAt: 'desc' },
                take: options.limit ?? 50,
                skip: options.offset ?? 0,
            }),
        ]);
        return {
            total,
            items,
        };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map