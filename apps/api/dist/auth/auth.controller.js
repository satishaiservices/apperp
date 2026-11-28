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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const node_crypto_1 = require("node:crypto");
const sharp_1 = __importDefault(require("sharp"));
const throttler_1 = require("@nestjs/throttler");
const auth_service_1 = require("./auth.service");
const storage_service_1 = require("../storage/storage.service");
const auth_dto_1 = require("./dto/auth.dto");
const file_signature_util_1 = require("../common/utils/file-signature.util");
const auth_tokens_1 = require("./auth-tokens");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const REFRESH_COOKIE = 'vyhir_rt';
const REFRESH_COOKIE_PATH = '/api';
const allowedAvatarTypes = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
};
let AuthController = class AuthController {
    authService;
    storage;
    constructor(authService, storage) {
        this.authService = authService;
        this.storage = storage;
    }
    wantsCookieSession(req) {
        return req.headers['x-session-mode'] === 'cookie';
    }
    deliverSession(req, res, session) {
        if (!this.wantsCookieSession(req) || !session.refreshToken) {
            return session;
        }
        res.cookie(REFRESH_COOKIE, session.refreshToken, {
            httpOnly: true,
            secure: req.secure,
            sameSite: 'strict',
            path: REFRESH_COOKIE_PATH,
            maxAge: auth_tokens_1.REFRESH_TOKEN_TTL_SECONDS * 1000,
        });
        const { refreshToken: _omit, ...rest } = session;
        return rest;
    }
    register(body) {
        return this.authService.register(body);
    }
    async login(body, req, res) {
        return this.deliverSession(req, res, await this.authService.login(body));
    }
    logout(res) {
        res.clearCookie(REFRESH_COOKIE, { path: REFRESH_COOKIE_PATH });
        return { success: true };
    }
    async changePassword(body, req, res) {
        return this.deliverSession(req, res, await this.authService.changePassword(req.user, body));
    }
    forgotPassword(body) {
        return this.authService.forgotPassword(body);
    }
    resetPassword(body) {
        return this.authService.resetPassword(body);
    }
    async refresh(body, req, res) {
        const refreshToken = body?.refreshToken || req.cookies?.[REFRESH_COOKIE];
        return this.deliverSession(req, res, await this.authService.refresh({ refreshToken }));
    }
    getMe(req) {
        return this.authService.getMe(req.user);
    }
    updateProfile(req, body) {
        return this.authService.updateProfile(req.user, body);
    }
    async uploadAvatar(req, file) {
        if (!file) {
            throw new common_1.BadRequestException('Avatar image file is required');
        }
        if (!(0, file_signature_util_1.validateImageMagicBytes)(file.buffer).valid) {
            throw new common_1.BadRequestException('Invalid image content: use a JPEG, PNG, or WEBP image');
        }
        let normalized;
        try {
            normalized = await (0, sharp_1.default)(file.buffer)
                .rotate()
                .resize(512, 512, { fit: 'cover' })
                .jpeg({ quality: 85 })
                .toBuffer();
        }
        catch {
            throw new common_1.BadRequestException('Unable to process image');
        }
        const filename = `${(0, node_crypto_1.randomUUID)()}.jpg`;
        await this.storage.saveFile('avatars', filename, normalized, 'image/jpeg');
        const avatarUrl = `/auth/avatar/${filename}`;
        const result = await this.authService.updateProfile(req.user, { avatarUrl });
        return {
            message: 'Avatar uploaded and profile updated successfully',
            avatarUrl,
            user: result.user,
        };
    }
    getAvatar(filename, res) {
        const filePath = this.storage.getFilePath('avatars', filename);
        res.setHeader('X-Content-Type-Options', 'nosniff');
        return res.sendFile(filePath);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ChangePasswordDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, throttler_1.Throttle)({ default: { limit: 30, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RefreshTokenDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('avatar'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: { fileSize: 5 * 1024 * 1024, files: 1 },
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: (_req, file, callback) => {
            if (!allowedAvatarTypes[file.mimetype]) {
                return callback(new common_1.BadRequestException(`Unsupported file type ${file.mimetype}. Use JPEG, PNG, or WEBP.`), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Get)('avatar/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAvatar", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        storage_service_1.StorageService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map