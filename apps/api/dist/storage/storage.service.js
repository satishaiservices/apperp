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
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
let StorageService = StorageService_1 = class StorageService {
    logger = new common_1.Logger(StorageService_1.name);
    baseDir;
    constructor() {
        this.baseDir = process.env.STORAGE_DIR
            ? (0, node_path_1.resolve)(process.env.STORAGE_DIR)
            : (0, node_path_1.resolve)(process.cwd(), 'storage');
        (0, node_fs_1.mkdirSync)(this.baseDir, { recursive: true });
        this.logger.log(`Initialized file storage engine at: ${this.baseDir}`);
    }
    getTargetDir(subDir) {
        const cleanSubDir = (0, node_path_1.basename)(subDir);
        const targetDir = (0, node_path_1.join)(this.baseDir, cleanSubDir);
        if (!(0, node_fs_1.existsSync)(targetDir)) {
            (0, node_fs_1.mkdirSync)(targetDir, { recursive: true });
        }
        return targetDir;
    }
    async saveFile(subDir, filename, buffer, _mimeType) {
        const safeFilename = (0, node_path_1.basename)(filename);
        const targetDir = this.getTargetDir(subDir);
        const filePath = (0, node_path_1.join)(targetDir, safeFilename);
        (0, node_fs_1.writeFileSync)(filePath, buffer);
        return {
            storageKey: safeFilename,
            filePath,
        };
    }
    getFilePath(subDir, storageKey) {
        const safeKey = (0, node_path_1.basename)(storageKey);
        const targetDir = this.getTargetDir(subDir);
        const filePath = (0, node_path_1.join)(targetDir, safeKey);
        if (!(0, node_fs_1.existsSync)(filePath) || !filePath.startsWith(this.baseDir)) {
            throw new common_1.NotFoundException('Requested file asset not found');
        }
        return filePath;
    }
    async deleteFile(subDir, storageKey) {
        try {
            const safeKey = (0, node_path_1.basename)(storageKey);
            const targetDir = this.getTargetDir(subDir);
            const filePath = (0, node_path_1.join)(targetDir, safeKey);
            if ((0, node_fs_1.existsSync)(filePath) && filePath.startsWith(this.baseDir)) {
                (0, node_fs_1.unlinkSync)(filePath);
                return true;
            }
            return false;
        }
        catch (e) {
            this.logger.warn(`Failed to delete file asset ${storageKey}:`, e);
            return false;
        }
    }
    exists(subDir, storageKey) {
        const safeKey = (0, node_path_1.basename)(storageKey);
        const targetDir = this.getTargetDir(subDir);
        const filePath = (0, node_path_1.join)(targetDir, safeKey);
        return (0, node_fs_1.existsSync)(filePath) && filePath.startsWith(this.baseDir);
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageService);
//# sourceMappingURL=storage.service.js.map