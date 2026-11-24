import { Injectable, BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import { stat, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';

export interface ProcessedImageResult {
  finalPath: string;
  mimeType: string;
  fileSize: number;
  width: number;
  height: number;
  originalSize: number;
  compressionRatio: number;
}

@Injectable()
export class ImageProcessorService {
  // Max pre-compression ceiling (15 MB)
  private readonly maxPreCompressionSize = 15 * 1024 * 1024;
  // Max resolution bounds (1920px Full HD)
  private readonly maxDimension = 1920;
  // Target uniform quality
  private readonly jpegQuality = 82;

  /**
   * Reviews image integrity and dimensions, resizes down to standard bounds if needed,
   * compresses to optimized JPEG, and replaces the raw upload with the optimized file.
   */
  async reviewAndCompressImage(
    filePath: string,
    targetPath: string,
  ): Promise<ProcessedImageResult> {
    const fileStats = await stat(filePath);
    if (fileStats.size > this.maxPreCompressionSize) {
      if (existsSync(filePath)) await unlink(filePath).catch(() => {});
      throw new BadRequestException(
        `Image file size exceeds maximum allowable limit of 15MB (got ${(fileStats.size / (1024 * 1024)).toFixed(1)}MB)`,
      );
    }

    let metadata: sharp.Metadata;
    try {
      metadata = await sharp(filePath).metadata();
    } catch (err: any) {
      if (existsSync(filePath)) await unlink(filePath).catch(() => {});
      throw new BadRequestException(
        `Unreadable or corrupted image file: ${err.message}`,
      );
    }

    if (!metadata.width || !metadata.height) {
      if (existsSync(filePath)) await unlink(filePath).catch(() => {});
      throw new BadRequestException('Image lacks valid dimensions');
    }

    // Auto-orient based on EXIF, resize down to max 1920 while preserving aspect ratio,
    // and compress uniformly to progressive JPEG with mozjpeg optimization.
    const transform = sharp(filePath)
      .rotate() // auto-orient based on EXIF
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

    // Clean up temporary upload file if target is different
    if (filePath !== targetPath && existsSync(filePath)) {
      await unlink(filePath).catch(() => {});
    }

    const compressedStats = await stat(targetPath);
    const compressedMeta = await sharp(targetPath).metadata();

    const compressionRatio =
      fileStats.size > 0
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
}
