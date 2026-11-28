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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const audit_service_1 = require("../audit/audit.service");
const STATUSES = ['NOT_STARTED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED'];
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
let ActivitiesService = class ActivitiesService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async getProject(auth, projectId) {
        const project = await this.prisma.project.findFirst({
            where: {
                id: projectId,
                tenantId: auth.tenantId,
                status: { not: 'ARCHIVED' },
            },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async create(auth, projectId, input) {
        await this.getProject(auth, projectId);
        const activityCode = input.activityCode?.trim();
        const name = input.name?.trim();
        if (!activityCode || !name) {
            throw new common_1.BadRequestException('Activity code and name are required');
        }
        if (activityCode.length > 40 || name.length > 160) {
            throw new common_1.BadRequestException('Input exceeds maximum length');
        }
        this.validate(input);
        try {
            const activity = await this.prisma.activity.create({
                data: {
                    tenantId: auth.tenantId,
                    projectId,
                    parentId: input.parentId || null,
                    activityCode,
                    name,
                    description: input.description,
                    unit: input.unit?.trim() || null,
                    status: input.status ?? 'NOT_STARTED',
                    priority: input.priority ?? 'MEDIUM',
                    progress: input.progress ?? 0,
                    startDate: input.startDate ? this.parseDate(input.startDate) : undefined,
                    dueDate: input.dueDate ? this.parseDate(input.dueDate) : undefined,
                    estimatedCost: input.estimatedCost,
                    actualCost: input.actualCost,
                },
            });
            await this.audit.log(auth, 'ACTIVITY_CREATED', 'Activity', activity.id, {
                activityCode,
                name,
                projectId,
                parentId: input.parentId || null,
            });
            return activity;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Activity code already exists in this project');
            }
            throw error;
        }
    }
    async findAll(auth, projectId) {
        await this.getProject(auth, projectId);
        const hasExplicitAssignments = await this.prisma.activityAssignment.count({
            where: {
                tenantId: auth.tenantId,
                tenantMembershipId: auth.membershipId,
            },
        });
        return this.prisma.activity.findMany({
            where: {
                tenantId: auth.tenantId,
                projectId,
                ...(auth.roles.includes('OWNER') || hasExplicitAssignments === 0
                    ? {}
                    : {
                        assignments: {
                            some: {
                                tenantId: auth.tenantId,
                                tenantMembershipId: auth.membershipId,
                            },
                        },
                    }),
            },
            select: {
                id: true,
                parentId: true,
                activityCode: true,
                name: true,
                description: true,
                unit: true,
                status: true,
                priority: true,
                progress: true,
                startDate: true,
                dueDate: true,
            },
            orderBy: { activityCode: 'asc' },
        });
    }
    async getActivityTree(auth, projectId) {
        await this.getProject(auth, projectId);
        return this.prisma.activity.findMany({
            where: {
                tenantId: auth.tenantId,
                projectId,
                parentId: null,
            },
            include: {
                subactivities: {
                    orderBy: { activityCode: 'asc' },
                },
            },
            orderBy: { activityCode: 'asc' },
        });
    }
    async findOne(auth, id) {
        const activity = await this.prisma.activity.findFirst({
            where: { id, tenantId: auth.tenantId },
            include: {
                assignments: {
                    include: {
                        membership: {
                            include: { user: { select: { id: true, fullName: true, email: true } } },
                        },
                    },
                },
            },
        });
        if (!activity)
            throw new common_1.NotFoundException('Activity not found');
        return activity;
    }
    async update(auth, id, input) {
        await this.findOne(auth, id);
        this.validate(input);
        const data = { ...input };
        delete data.id;
        delete data.tenantId;
        delete data.projectId;
        if (input.activityCode?.trim()) {
            data.activityCode = input.activityCode.trim();
        }
        else {
            delete data.activityCode;
        }
        if (input.name?.trim()) {
            data.name = input.name.trim();
        }
        if (input.unit !== undefined) {
            data.unit = input.unit?.trim() || null;
        }
        if (input.description !== undefined) {
            data.description = input.description?.trim() || null;
        }
        for (const field of ['startDate', 'dueDate']) {
            if (data[field] !== undefined) {
                data[field] = data[field] ? this.parseDate(data[field]) : null;
            }
        }
        try {
            const result = await this.prisma.activity.updateMany({
                where: { id, tenantId: auth.tenantId },
                data,
            });
            if (!result.count)
                throw new common_1.NotFoundException('Activity not found');
            const updated = await this.findOne(auth, id);
            await this.audit.log(auth, 'ACTIVITY_UPDATED', 'Activity', id, { ...data });
            return updated;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Activity code already exists in this project');
            }
            throw error;
        }
    }
    async remove(auth, id) {
        await this.findOne(auth, id);
        const children = await this.prisma.activity.findMany({
            where: { parentId: id, tenantId: auth.tenantId },
            select: { id: true },
        });
        const idsToDelete = [id, ...children.map((c) => c.id)];
        await this.prisma.activityAssignment.deleteMany({
            where: { activityId: { in: idsToDelete }, tenantId: auth.tenantId },
        });
        await this.prisma.siteSubmissionActivity.deleteMany({
            where: { activityId: { in: idsToDelete }, tenantId: auth.tenantId },
        });
        await this.prisma.activity.deleteMany({
            where: { id: { in: idsToDelete }, tenantId: auth.tenantId },
        });
        await this.audit.log(auth, 'ACTIVITY_DELETED', 'Activity', id, {
            deletedIds: idsToDelete,
        });
        return { message: 'Activity deleted successfully' };
    }
    async getAssignments(auth, id) {
        await this.findOne(auth, id);
        return this.prisma.activityAssignment.findMany({
            where: { tenantId: auth.tenantId, activityId: id },
            include: {
                membership: {
                    include: {
                        user: { select: { id: true, fullName: true, email: true } },
                    },
                },
            },
        });
    }
    async setAssignments(auth, id, input) {
        await this.findOne(auth, id);
        const membershipIds = input.membershipIds;
        if (!Array.isArray(membershipIds) ||
            membershipIds.some((item) => typeof item !== 'string') ||
            new Set(membershipIds).size !== membershipIds.length) {
            throw new common_1.BadRequestException('membershipIds must be an array of unique membership IDs');
        }
        const memberships = membershipIds.length
            ? await this.prisma.tenantMembership.findMany({
                where: {
                    tenantId: auth.tenantId,
                    id: { in: membershipIds },
                    membershipStatus: 'ACTIVE',
                    user: { status: 'ACTIVE' },
                },
                select: { id: true },
            })
            : [];
        if (memberships.length !== membershipIds.length) {
            throw new common_1.BadRequestException('One or more memberships are invalid or inactive');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.activityAssignment.deleteMany({
                where: { tenantId: auth.tenantId, activityId: id },
            });
            if (membershipIds.length) {
                await tx.activityAssignment.createMany({
                    data: membershipIds.map((tenantMembershipId) => ({
                        tenantId: auth.tenantId,
                        activityId: id,
                        tenantMembershipId,
                    })),
                });
            }
        });
        await this.audit.log(auth, 'ACTIVITY_ASSIGNMENTS_UPDATED', 'Activity', id, {
            membershipIds,
        });
        return this.getAssignments(auth, id);
    }
    validate(input) {
        if (input.status !== undefined && !STATUSES.includes(input.status)) {
            throw new common_1.BadRequestException('Invalid activity status');
        }
        if (input.priority !== undefined && !PRIORITIES.includes(input.priority)) {
            throw new common_1.BadRequestException('Invalid activity priority');
        }
        if (input.progress !== undefined &&
            (!Number.isInteger(input.progress) || input.progress < 0 || input.progress > 100)) {
            throw new common_1.BadRequestException('Progress must be an integer between 0 and 100');
        }
        for (const field of ['estimatedCost', 'actualCost']) {
            if (input[field] !== undefined &&
                (!Number.isFinite(Number(input[field])) || Number(input[field]) < 0)) {
                throw new common_1.BadRequestException(`Invalid ${field}`);
            }
        }
        for (const field of ['name', 'description']) {
            if (input[field] !== undefined && input[field] !== null && typeof input[field] !== 'string') {
                throw new common_1.BadRequestException(`Invalid ${field}`);
            }
        }
    }
    parseDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            throw new common_1.BadRequestException('Invalid date');
        }
        return date;
    }
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ActivitiesService);
//# sourceMappingURL=activities.service.js.map