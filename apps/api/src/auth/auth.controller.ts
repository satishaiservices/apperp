import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  RefreshTokenDto,
  ChangePasswordDto,
} from './dto/auth.dto';
import { validateImageMagicBytes } from '../common/utils/file-signature.util';
import { REFRESH_TOKEN_TTL_SECONDS } from './auth-tokens';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { AuthenticatedUser } from './jwt-auth.guard';

const REFRESH_COOKIE = 'vyhir_rt';
const REFRESH_COOKIE_PATH = '/api';

const allowedAvatarTypes: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly storage: StorageService,
  ) {}

  /**
   * Browser clients send `X-Session-Mode: cookie`: the refresh token is then put in an
   * httpOnly cookie (unreadable by page scripts) and removed from the JSON body.
   * Mobile clients keep receiving it in the body and store it in secure storage.
   */
  private wantsCookieSession(req: Request): boolean {
    return req.headers['x-session-mode'] === 'cookie';
  }

  private deliverSession<T extends { refreshToken?: string }>(
    req: Request,
    res: Response,
    session: T,
  ) {
    if (!this.wantsCookieSession(req) || !session.refreshToken) {
      return session;
    }
    res.cookie(REFRESH_COOKIE, session.refreshToken, {
      httpOnly: true,
      secure: req.secure,
      sameSite: 'strict',
      path: REFRESH_COOKIE_PATH,
      maxAge: REFRESH_TOKEN_TTL_SECONDS * 1000,
    });
    const { refreshToken: _omit, ...rest } = session;
    return rest;
  }

  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async login(
    @Body() body: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.deliverSession(req, res, await this.authService.login(body));
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(REFRESH_COOKIE, { path: REFRESH_COOKIE_PATH });
    return { success: true };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Req() req: Request & { user: AuthenticatedUser },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.deliverSession(
      req,
      res,
      await this.authService.changePassword(req.user, body),
    );
  }

  @Post('forgot-password')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Post('reset-password')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }

  @Post('refresh')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  async refresh(
    @Body() body: RefreshTokenDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = body?.refreshToken || req.cookies?.[REFRESH_COOKIE];
    return this.deliverSession(req, res, await this.authService.refresh({ refreshToken }));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: { user: AuthenticatedUser }) {
    return this.authService.getMe(req.user);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @Req() req: { user: AuthenticatedUser },
    @Body()
    body: {
      fullName?: string;
      phone?: string;
      emergencyPhone?: string;
      avatarUrl?: string;
    },
  ) {
    return this.authService.updateProfile(req.user, body);
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024, files: 1 },
      storage: memoryStorage(),
      fileFilter: (_req, file, callback) => {
        if (!allowedAvatarTypes[file.mimetype]) {
          return callback(
            new BadRequestException(
              `Unsupported file type ${file.mimetype}. Use JPEG, PNG, or WEBP.`,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadAvatar(
    @Req() req: { user: AuthenticatedUser },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Avatar image file is required');
    }

    // Trust the bytes, not the client-declared MIME type.
    if (!validateImageMagicBytes(file.buffer).valid) {
      throw new BadRequestException('Invalid image content: use a JPEG, PNG, or WEBP image');
    }

    // Re-encoding strips metadata (EXIF GPS etc.) and any payload hidden in the file.
    let normalized: Buffer;
    try {
      normalized = await sharp(file.buffer)
        .rotate()
        .resize(512, 512, { fit: 'cover' })
        .jpeg({ quality: 85 })
        .toBuffer();
    } catch {
      throw new BadRequestException('Unable to process image');
    }

    const filename = `${randomUUID()}.jpg`;
    await this.storage.saveFile('avatars', filename, normalized, 'image/jpeg');

    const avatarUrl = `/auth/avatar/${filename}`;
    const result = await this.authService.updateProfile(req.user, { avatarUrl });
    return {
      message: 'Avatar uploaded and profile updated successfully',
      avatarUrl,
      user: result.user,
    };
  }

  @Get('avatar/:filename')
  getAvatar(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = this.storage.getFilePath('avatars', filename);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.sendFile(filePath);
  }
}
