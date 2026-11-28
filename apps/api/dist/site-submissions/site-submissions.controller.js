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
exports.SiteSubmissionsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_crypto_1 = require("node:crypto");
const site_submissions_service_1 = require("./site-submissions.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../rbac/permissions.guard");
const permissions_decorator_1 = require("../rbac/permissions.decorator");
const promises_1 = require("node:fs/promises");
const node_fs_2 = require("node:fs");
const file_signature_util_1 = require("../common/utils/file-signature.util");
const image_processor_service_1 = require("../common/services/image-processor.service");
const submission_dto_1 = require("./dto/submission.dto");
const uploadDir = (0, node_path_1.resolve)(process.env.STORAGE_DIR ? (0, node_path_1.resolve)(process.env.STORAGE_DIR) : (0, node_path_1.resolve)(process.cwd(), 'storage'), 'site-submissions');
(0, node_fs_1.mkdirSync)(uploadDir, { recursive: true });
const allowedTypes = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
};
let SiteSubmissionsController = class SiteSubmissionsController {
    service;
    imageProcessor;
    constructor(service, imageProcessor) {
        this.service = service;
        this.imageProcessor = imageProcessor;
    }
    create(req, projectId, body) {
        return this.service.create(req.user, projectId, body);
    }
    findAll(req, projectId) {
        return this.service.findAll(req.user, projectId);
    }
    listAll(req, projectId, search, limit, offset) {
        return this.service.listAll(req.user, {
            projectId,
            search,
            limit: limit ? parseInt(limit, 10) : 50,
            offset: offset ? parseInt(offset, 10) : 0,
        });
    }
    findOne(req, id) {
        return this.service.findOne(req.user, id);
    }
    async uploadPhoto(req, id, file) {
        if (!file)
            throw new common_1.BadRequestException('A photograph is required');
        const buffer = await (0, promises_1.readFile)(file.path);
        const { valid, detectedFormat } = (0, file_signature_util_1.validateImageMagicBytes)(buffer);
        if (!valid || !detectedFormat) {
            if ((0, node_fs_2.existsSync)(file.path)) {
                (0, node_fs_2.unlinkSync)(file.path);
            }
            throw new common_1.BadRequestException('Invalid image content: only valid JPEG, PNG and WebP images are allowed');
        }
        const finalName = `${file.filename.replace('.upload', '')}.jpg`;
        const finalPath = (0, node_path_1.resolve)(uploadDir, finalName);
        const processed = await this.imageProcessor.reviewAndCompressImage(file.path, finalPath);
        file.filename = finalName;
        file.path = finalPath;
        file.mimetype = processed.mimeType;
        file.size = processed.fileSize;
        return this.service.addPhoto(req.user, id, file);
    }
    async getPhoto(req, id, photoId, res) {
        const { photo, filePath } = await this.service.getPhoto(req.user, id, photoId);
        res.setHeader('Cache-Control', 'private, max-age=86400');
        return res.type(photo.mimeType).sendFile(filePath);
    }
};
exports.SiteSubmissionsController = SiteSubmissionsController;
__decorate([
    (0, common_1.Post)('projects/:projectId/submissions'),
    (0, permissions_decorator_1.RequirePermissions)('submissions.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, submission_dto_1.CreateSubmissionDto]),
    __metadata("design:returntype", void 0)
], SiteSubmissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('projects/:projectId/submissions'),
    (0, permissions_decorator_1.RequirePermissions)('submissions.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SiteSubmissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('submissions'),
    (0, permissions_decorator_1.RequirePermissions)('submissions.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", void 0)
], SiteSubmissionsController.prototype, "listAll", null);
__decorate([
    (0, common_1.Get)('submissions/:id'),
    (0, permissions_decorator_1.RequirePermissions)('submissions.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SiteSubmissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('submissions/:id/photos'),
    (0, permissions_decorator_1.RequirePermissions)('submissions.create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: uploadDir,
            filename: (_req, _file, callback) => {
                callback(null, `${(0, node_crypto_1.randomUUID)()}.upload`);
            },
        }),
        limits: { fileSize: 15 * 1024 * 1024, files: 1 },
        fileFilter: (_req, file, callback) => {
            const cleanMime = file.mimetype?.toLowerCase();
            if (!cleanMime || !allowedTypes[cleanMime]) {
                return callback(new common_1.BadRequestException('Only JPEG, PNG and WebP photographs are allowed'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SiteSubmissionsController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Get)('submissions/:id/photos/:photoId'),
    (0, permissions_decorator_1.RequirePermissions)('submissions.view'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('photoId')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], SiteSubmissionsController.prototype, "getPhoto", null);
exports.SiteSubmissionsController = SiteSubmissionsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [site_submissions_service_1.SiteSubmissionsService,
        image_processor_service_1.ImageProcessorService])
], SiteSubmissionsController);
//# sourceMappingURL=site-submissions.controller.js.map