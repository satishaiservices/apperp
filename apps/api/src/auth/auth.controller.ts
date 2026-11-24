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
import { diskStorage } from 'multer';
import type { Response } from 'express';
import { mkdirSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';

import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  RefreshTokenDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { AuthenticatedUser } from './jwt-auth.guard';

const avatarDir = resolve(process.cwd(), 'storage/avatars');
mkdirSync(avatarDir, { recursive: true });

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

  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
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
  refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body);
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
      limits: { fileSize: 5 * 1024 * 1024 },
      storage: diskStorage({
        destination: avatarDir,
        filename: (_req, file, callback) => {
          const extension = allowedAvatarTypes[file.mimetype] || extname(file.originalname).toLowerCase() || '.jpg';
          callback(null, `${randomUUID()}${extension}`);
        },
      }),
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

    const avatarUrl = `/auth/avatar/${file.filename}`;
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
    return res.sendFile(filePath);
  }
}
