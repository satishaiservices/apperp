"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessorService = void 0;
const common_1 = require("@nestjs/common");
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = require("node:fs/promises");
const node_fs_1 = require("node:fs");
let ImageProcessorService = class ImageProcessorService {
    maxPreCompressionSize = 15 * 1024 * 1024;
    maxDimension = 1920;
    jpegQuality = 82;
    async reviewAndCompressImage(filePath, targetPath) {
        const fileStats = await (0, promises_1.stat)(filePath);
        if (fileStats.size > this.maxPreCompressionSize) {
            if ((0, node_fs_1.existsSync)(filePath))
                await (0, promises_1.unlink)(filePath).catch(() => { });
            throw new common_1.BadRequestException(`Image file size exceeds maximum allowable limit of 15MB (got ${(fileStats.size / (1024 * 1024)).toFixed(1)}MB)`);
        }
        let metadata;
        try {
            metadata = await (0, sharp_1.default)(filePath).metadata();
        }
        catch (err) {
            if ((0, node_fs_1.existsSync)(filePath))
                await (0, promises_1.unlink)(filePath).catch(() => { });
            throw new common_1.BadRequestException(`Unreadable or corrupted image file: ${err.message}`);
        }
        if (!metadata.width || !metadata.height) {
            if ((0, node_fs_1.existsSync)(filePath))
                await (0, promises_1.unlink)(filePath).catch(() => { });
            throw new common_1.BadRequestException('Image lacks valid dimensions');
        }
        const transform = (0, sharp_1.default)(filePath)
            .rotate()
            .resize({
            width: this.maxDimension,
            height: this.maxDimension,
            fit: 'inside',
            withoutEnlargement: true,
        })
            .jpeg({
            quality: this.jpegQuality,
            progressive: true,
            mozjpeg: true,
        });
        await transform.toFile(targetPath);
        if (filePath !== targetPath && (0, node_fs_1.existsSync)(filePath)) {
            await (0, promises_1.unlink)(filePath).catch(() => { });
        }
        const compressedStats = await (0, promises_1.stat)(targetPath);
        const compressedMeta = await (0, sharp_1.default)(targetPath).metadata();
        const compressionRatio = fileStats.size > 0
            ? Math.round((compressedStats.size / fileStats.size) * 100) / 100
            : 1.0;
        return {
            finalPath: targetPath,
            mimeType: 'image/jpeg',
            fileSize: compressedStats.size,
            width: compressedMeta.width ?? metadata.width,
            height: compressedMeta.height ?? metadata.height,
            originalSize: fileStats.size,
            compressionRatio,
        };
    }
};
exports.ImageProcessorService = ImageProcessorService;
exports.ImageProcessorService = ImageProcessorService = __decorate([
    (0, common_1.Injectable)()
], ImageProcessorService);
//# sourceMappingURL=image-processor.service.js.map