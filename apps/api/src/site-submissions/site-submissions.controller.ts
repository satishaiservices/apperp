import {
  Controller, Get, Post, Body, Param, Query, Req, Res,
  UseGuards, UseInterceptors, UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Response } from 'express';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';

import { SiteSubmissionsService } from './site-submissions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../rbac/permissions.guard';
import { RequirePermissions } from '../rbac/permissions.decorator';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
import { readFile } from 'node:fs/promises';
import { existsSync, unlinkSync } from 'node:fs';
import { validateImageMagicBytes } from '../common/utils/file-signature.util';
import { ImageProcessorService } from '../common/services/image-processor.service';
import { CreateSubmissionDto } from './dto/submission.dto';

// Must match StorageService's base dir, which serves the photos back (STORAGE_DIR).
const uploadDir = resolve(
  process.env.STORAGE_DIR ? resolve(process.env.STORAGE_DIR) : resolve(process.cwd(), 'storage'),
  'site-submissions',
);
mkdirSync(uploadDir, { recursive: true });

const allowedTypes: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

@Controller()
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SiteSubmissionsController {
  constructor(
    private readonly service: SiteSubmissionsService,
    private readonly imageProcessor: ImageProcessorService,
  ) {}

  @Post('projects/:projectId/submissions')
  @RequirePermissions('submissions.create')
  create(
    @Req() req: { user: AuthenticatedUser },
    @Param('projectId') projectId: string,
    @Body() body: CreateSubmissionDto,
  ) {
    return this.service.create(req.user, projectId, body);
  }

  @Get('projects/:projectId/submissions')
  @RequirePermissions('submissions.view')
  findAll(
    @Req() req: { user: AuthenticatedUser },
    @Param('projectId') projectId: string,
  ) {
    return this.service.findAll(req.user, projectId);
  }

  @Get('submissions')
  @RequirePermissions('submissions.view')
  listAll(
    @Req() req: { user: AuthenticatedUser },
    @Query('projectId') projectId?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.service.listAll(req.user, {
      projectId,
      search,
      limit: limit ? parseInt(limit, 10) : 50,
      offset: offset ? parseInt(offset, 10) : 0,
    });
  }

  @Get('submissions/:id')
  @RequirePermissions('submissions.view')
  findOne(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
  ) {
    return this.service.findOne(req.user, id);
  }

  @Post('submissions/:id/photos')
  @RequirePermissions('submissions.create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadDir,
        filename: (_req, _file, callback) => {
          callback(null, `${randomUUID()}.upload`);
        },
      }),
      limits: { fileSize: 15 * 1024 * 1024, files: 1 },
      fileFilter: (_req, file, callback) => {
        const cleanMime = file.mimetype?.toLowerCase();
        if (!cleanMime || !allowedTypes[cleanMime]) {
          return callback(
            new BadRequestException(
              'Only JPEG, PNG and WebP photographs are allowed',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadPhoto(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('A photograph is required');
    const buffer = await readFile(file.path);

    const { valid, detectedFormat } = validateImageMagicBytes(buffer);

    if (!valid || !detectedFormat) {
      if (existsSync(file.path)) {
        unlinkSync(file.path);
      }
      throw new BadRequestException(
        'Invalid image content: only valid JPEG, PNG and WebP images are allowed',
      );
    }

    const finalName = `${file.filename.replace('.upload', '')}.jpg`;
    const finalPath = resolve(uploadDir, finalName);

    // Review, resize down to Full HD bounds (max 1920px), and compress uniformly to progressive JPEG
    const processed = await this.imageProcessor.reviewAndCompressImage(
      file.path,
      finalPath,
    );

    file.filename = finalName;
    file.path = finalPath;
    file.mimetype = processed.mimeType;
    file.size = processed.fileSize;

    return this.service.addPhoto(req.user, id, file);
  }

  @Get('submissions/:id/photos/:photoId')
  @RequirePermissions('submissions.view')
  async getPhoto(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
    @Param('photoId') photoId: string,
    @Res() res: Response,
  ) {
    const { photo, filePath } = await this.service.getPhoto(req.user, id, photoId);
    res.setHeader('Cache-Control', 'private, max-age=86400');
    return res.type(photo.mimeType).sendFile(filePath);
  }
}
