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
exports.DprsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const ARRAY_FIELDS = [
    'labour',
    'equipment',
    'materials',
    'workProgress',
    'attachments',
];
const TEXT_FIELDS = [
    'weather',
    'siteConditions',
    'delays',
    'issues',
    'remarks',
];
let DprsService = class DprsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    parseReportDate(value) {
        if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            throw new common_1.BadRequestException('reportDate must use YYYY-MM-DD format');
        }
        const date = new Date(`${value}T00:00:00.000Z`);
        if (Number.isNaN(date.getTime()) ||
            date.toISOString().slice(0, 10) !== value) {
            throw new common_1.BadRequestException('Invalid reportDate');
        }
        return date;
    }
    validateInput(input, creating = false) {
        if (!input || typeof input !== 'object' || Array.isArray(input)) {
            throw new common_1.BadRequestException('Invalid request body');
        }
        if (creating && input.reportDate === undefined) {
            throw new common_1.BadRequestException('reportDate is required');
        }
        if (input.workforceCount !== undefined &&
            (!Number.isInteger(input.workforceCount) ||
                input.workforceCount < 0 ||
                input.workforceCount > 100000)) {
            throw new common_1.BadRequestException('workforceCount must be a non-negative integer');
        }
        for (const field of ARRAY_FIELDS) {
            if (input[field] !== undefined && !Array.isArray(input[field])) {
                throw new common_1.BadRequestException(`${field} must be an array`);
            }
        }
        for (const field of TEXT_FIELDS) {
            if (input[field] !== undefined &&
                input[field] !== null &&
                typeof input[field] !== 'string') {
                throw new common_1.BadRequestException(`${field} must be a string`);
            }
        }
        if (input.weather !== undefined &&
            typeof input.weather === 'string' &&
            input.weather.length > 120) {
            throw new common_1.BadRequestException('weather exceeds 120 characters');
        }
    }
    async getProject(auth, projectId) {
        const project = await this.prisma.project.findFirst({
            where: {
                id: projectId,
                tenantId: auth.tenantId,
                status: { not: 'ARCHIVED' },
            },
            select: { id: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project;
    }
    async create(auth, projectId, input) {
        await this.getProject(auth, projectId);
        this.validateInput(input, true);
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
            throw new common_1.ForbiddenException('Active membership required');
        }
        const data = {
            tenantId: auth.tenantId,
            projectId,
            reportDate: this.parseReportDate(input.reportDate),
            preparedByMembershipId: auth.membershipId,
            workforceCount: input.workforceCount ?? 0,
        };
        for (const field of TEXT_FIELDS) {
            if (input[field] !== undefined) {
                data[field] = input[field];
            }
        }
        for (const field of ARRAY_FIELDS) {
            if (input[field] !== undefined) {
                data[field] = input[field];
            }
        }
        try {
            return await this.prisma.dailyProgressReport.create({ data });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('A DPR already exists for this project and date');
            }
            throw error;
        }
    }
    async findAll(auth, projectId) {
        await this.getProject(auth, projectId);
        return this.prisma.dailyProgressReport.findMany({
            where: {
                tenantId: auth.tenantId,
                projectId,
            },
            include: {
                preparedBy: {
                    include: {
                        user: {
                            select: { id: true, fullName: true, email: true },
                        },
                    },
                },
                reviewedBy: {
                    include: {
                        user: {
                            select: { id: true, fullName: true, email: true },
                        },
                    },
                },
            },
            orderBy: [{ reportDate: 'desc' }, { createdAt: 'desc' }],
        });
    }
    async findOne(auth, id) {
        const report = await this.prisma.dailyProgressReport.findFirst({
            where: {
                id,
                tenantId: auth.tenantId,
            },
            include: {
                preparedBy: {
                    include: {
                        user: {
                            select: { id: true, fullName: true, email: true },
                        },
                    },
                },
                reviewedBy: {
                    include: {
                        user: {
                            select: { id: true, fullName: true, email: true },
                        },
                    },
                },
                project: {
                    select: {
                        id: true,
                        projectCode: true,
                        name: true,
                    },
                },
            },
        });
        if (!report) {
            throw new common_1.NotFoundException('DPR not found');
        }
        return report;
    }
    async update(auth, id, input) {
        this.validateInput(input);
        const existing = await this.findOne(auth, id);
        if (!['DRAFT', 'REJECTED'].includes(existing.status)) {
            throw new common_1.ConflictException('Only draft or rejected DPRs can be edited');
        }
        const data = {};
        if (input.reportDate !== undefined) {
            data.reportDate = this.parseReportDate(input.reportDate);
        }
        if (input.workforceCount !== undefined) {
            data.workforceCount = input.workforceCount;
        }
        for (const field of TEXT_FIELDS) {
            if (input[field] !== undefined) {
                data[field] = input[field];
            }
        }
        for (const field of ARRAY_FIELDS) {
            if (input[field] !== undefined) {
                data[field] = input[field];
            }
        }
        if (Object.keys(data).length === 0) {
            throw new common_1.BadRequestException('No editable fields supplied');
        }
        try {
            const result = await this.prisma.dailyProgressReport.updateMany({
                where: {
                    id,
                    tenantId: auth.tenantId,
                    status: { in: ['DRAFT', 'REJECTED'] },
                },
                data: {
                    ...data,
                    reviewedByMembershipId: null,
                    reviewedAt: null,
                    reviewRemarks: null,
                    submittedAt: null,
                },
            });
            if (!result.count) {
                throw new common_1.ConflictException('DPR status changed; reload before editing');
            }
            return this.findOne(auth, id);
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('A DPR already exists for this project and date');
            }
            throw error;
        }
    }
    async submit(auth, id) {
        await this.findOne(auth, id);
        const result = await this.prisma.dailyProgressReport.updateMany({
            where: {
                id,
                tenantId: auth.tenantId,
                status: { in: ['DRAFT', 'REJECTED'] },
            },
            data: {
                status: 'SUBMITTED',
                submittedAt: new Date(),
                reviewedByMembershipId: null,
                reviewedAt: null,
                reviewRemarks: null,
            },
        });
        if (!result.count) {
            throw new common_1.ConflictException('Only draft or rejected DPRs can be submitted');
        }
        return this.findOne(auth, id);
    }
    async approve(auth, id, input) {
        await this.findOne(auth, id);
        const reviewRemarks = input?.reviewRemarks === undefined ? null : input.reviewRemarks;
        if (reviewRemarks !== null && typeof reviewRemarks !== 'string') {
            throw new common_1.BadRequestException('reviewRemarks must be a string');
        }
        const result = await this.prisma.dailyProgressReport.updateMany({
            where: {
                id,
                tenantId: auth.tenantId,
                status: 'SUBMITTED',
            },
            data: {
                status: 'APPROVED',
                reviewedByMembershipId: auth.membershipId,
                reviewedAt: new Date(),
                reviewRemarks,
            },
        });
        if (!result.count) {
            throw new common_1.ConflictException('Only submitted DPRs can be approved');
        }
        return this.findOne(auth, id);
    }
    async reject(auth, id, input) {
        await this.findOne(auth, id);
        const rawRemarks = input?.reviewRemarks;
        if (typeof rawRemarks !== 'string' || !rawRemarks.trim()) {
            throw new common_1.BadRequestException('reviewRemarks is required when rejecting a DPR');
        }
        const reviewRemarks = rawRemarks.trim();
        const result = await this.prisma.dailyProgressReport.updateMany({
            where: {
                id,
                tenantId: auth.tenantId,
                status: 'SUBMITTED',
            },
            data: {
                status: 'REJECTED',
                reviewedByMembershipId: auth.membershipId,
                reviewedAt: new Date(),
                reviewRemarks,
            },
        });
        if (!result.count) {
            throw new common_1.ConflictException('Only submitted DPRs can be rejected');
        }
        return this.findOne(auth, id);
    }
};
exports.DprsService = DprsService;
exports.DprsService = DprsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DprsService);
//# sourceMappingURL=dprs.service.js.map