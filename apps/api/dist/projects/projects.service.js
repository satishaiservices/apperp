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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const audit_service_1 = require("../audit/audit.service");
const STATUSES = [
    'PLANNING',
    'ACTIVE',
    'ON_HOLD',
    'COMPLETED',
    'CANCELLED',
    'ARCHIVED',
];
let ProjectsService = class ProjectsService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async create(auth, input) {
        const projectCode = input.projectCode?.trim();
        const name = input.name?.trim();
        if (!projectCode || !name) {
            throw new common_1.BadRequestException('Project code and name are required');
        }
        if (projectCode.length > 40 || name.length > 160) {
            throw new common_1.BadRequestException('Input exceeds maximum length');
        }
        if (input.status &&
            !STATUSES.includes(input.status)) {
            throw new common_1.BadRequestException('Invalid project status');
        }
        const hasBudgetValue = input.budget !== undefined &&
            input.budget !== null &&
            input.budget !== '';
        if (hasBudgetValue &&
            (!Number.isFinite(Number(input.budget)) ||
                Number(input.budget) < 0)) {
            throw new common_1.BadRequestException('Invalid project budget');
        }
        const budgetToSave = hasBudgetValue ? Number(input.budget) : null;
        try {
            const project = await this.prisma.project.create({
                data: {
                    tenantId: auth.tenantId,
                    projectCode,
                    name,
                    description: input.description,
                    clientName: input.clientName,
                    siteAddress: input.siteAddress,
                    startChainage: input.startChainage?.trim() || null,
                    endChainage: input.endChainage?.trim() || null,
                    startLatitude: input.startLatitude !== undefined && input.startLatitude !== null ? input.startLatitude : null,
                    startLongitude: input.startLongitude !== undefined && input.startLongitude !== null ? input.startLongitude : null,
                    endLatitude: input.endLatitude !== undefined && input.endLatitude !== null ? input.endLatitude : null,
                    endLongitude: input.endLongitude !== undefined && input.endLongitude !== null ? input.endLongitude : null,
                    status: input.status ?? 'PLANNING',
                    budget: budgetToSave,
                    startDate: input.startDate
                        ? this.parseDate(input.startDate)
                        : undefined,
                    endDate: input.endDate
                        ? this.parseDate(input.endDate)
                        : undefined,
                },
            });
            await this.audit.log(auth, 'PROJECT_CREATED', 'Project', project.id, {
                projectCode: project.projectCode,
                name: project.name,
            });
            return project;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Project code already exists');
            }
            throw error;
        }
    }
    async findAll(auth) {
        return this.prisma.project.findMany({
            where: {
                tenantId: auth.tenantId,
                status: { not: 'ARCHIVED' },
            },
            include: {
                _count: {
                    select: {
                        activities: true,
                        siteSubmissions: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(auth, id) {
        const project = await this.prisma.project.findFirst({
            where: {
                id,
                tenantId: auth.tenantId,
                status: { not: 'ARCHIVED' },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project;
    }
    async update(auth, id, input) {
        await this.findOne(auth, id);
        if (input.status &&
            !STATUSES.includes(input.status)) {
            throw new common_1.BadRequestException('Invalid project status');
        }
        if (input.budget !== undefined) {
            if (input.budget === null || input.budget === '') {
                input.budget = null;
            }
            else if (!Number.isFinite(Number(input.budget)) || Number(input.budget) < 0) {
                throw new common_1.BadRequestException('Invalid project budget');
            }
            else {
                input.budget = Number(input.budget);
            }
        }
        if (input.startDate !== undefined) {
            input.startDate = input.startDate
                ? this.parseDate(input.startDate)
                : null;
        }
        if (input.endDate !== undefined) {
            input.endDate = input.endDate
                ? this.parseDate(input.endDate)
                : null;
        }
        delete input.tenantId;
        delete input.id;
        try {
            const result = await this.prisma.project.updateMany({
                where: {
                    id,
                    tenantId: auth.tenantId,
                },
                data: input,
            });
            if (result.count === 0) {
                throw new common_1.NotFoundException('Project not found');
            }
            return this.findOne(auth, id);
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Project code already exists');
            }
            throw error;
        }
    }
    async archive(auth, id) {
        await this.findOne(auth, id);
        const result = await this.prisma.project.updateMany({
            where: {
                id,
                tenantId: auth.tenantId,
            },
            data: { status: 'ARCHIVED' },
        });
        if (result.count === 0) {
            throw new common_1.NotFoundException('Project not found');
        }
        return { message: 'Project archived successfully' };
    }
    async duplicate(auth, id, body) {
        const sourceProject = await this.prisma.project.findFirst({
            where: { id, tenantId: auth.tenantId },
            include: {
                activities: {
                    orderBy: { activityCode: 'asc' },
                },
            },
        });
        if (!sourceProject) {
            throw new common_1.NotFoundException('Source project not found');
        }
        const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
        const newCode = body?.projectCode?.trim() || `${sourceProject.projectCode}-COPY-${randomSuffix}`;
        const newName = body?.name?.trim() || `${sourceProject.name} (Copy)`;
        const existing = await this.prisma.project.findFirst({
            where: { tenantId: auth.tenantId, projectCode: newCode },
        });
        if (existing) {
            throw new common_1.ConflictException(`Project code "${newCode}" already exists`);
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const duplicatedProject = await tx.project.create({
                data: {
                    tenantId: auth.tenantId,
                    projectCode: newCode,
                    name: newName,
                    description: sourceProject.description,
                    clientName: sourceProject.clientName,
                    siteAddress: sourceProject.siteAddress,
                    startChainage: sourceProject.startChainage,
                    endChainage: sourceProject.endChainage,
                    startLatitude: sourceProject.startLatitude,
                    startLongitude: sourceProject.startLongitude,
                    endLatitude: sourceProject.endLatitude,
                    endLongitude: sourceProject.endLongitude,
                    budget: sourceProject.budget,
                    status: 'PLANNING',
                    startDate: new Date(),
                },
            });
            const parentActivities = sourceProject.activities.filter((a) => !a.parentId);
            const subactivities = sourceProject.activities.filter((a) => !!a.parentId);
            const oldToNewParentMap = new Map();
            for (const parent of parentActivities) {
                const newParent = await tx.activity.create({
                    data: {
                        tenantId: auth.tenantId,
                        projectId: duplicatedProject.id,
                        parentId: null,
                        activityCode: parent.activityCode,
                        name: parent.name,
                        description: parent.description,
                        unit: parent.unit,
                        status: 'NOT_STARTED',
                        priority: parent.priority,
                        progress: 0,
                    },
                });
                oldToNewParentMap.set(parent.id, newParent.id);
            }
            for (const sub of subactivities) {
                const newParentId = sub.parentId ? oldToNewParentMap.get(sub.parentId) : null;
                await tx.activity.create({
                    data: {
                        tenantId: auth.tenantId,
                        projectId: duplicatedProject.id,
                        parentId: newParentId,
                        activityCode: sub.activityCode,
                        name: sub.name,
                        description: sub.description,
                        unit: sub.unit,
                        status: 'NOT_STARTED',
                        priority: sub.priority,
                        progress: 0,
                    },
                });
            }
            return duplicatedProject;
        });
        await this.audit.log(auth, 'PROJECT_DUPLICATED', 'Project', result.id, {
            sourceProjectId: id,
            newProjectCode: result.projectCode,
            newName: result.name,
        });
        return result;
    }
    parseDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            throw new common_1.BadRequestException('Invalid date');
        }
        return date;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map