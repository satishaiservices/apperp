import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { resolve, basename, join } from 'node:path';
import { mkdirSync, existsSync, writeFileSync, unlinkSync } from 'node:fs';
import { IStorageService } from './storage.interface';

@Injectable()
export class StorageService implements IStorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly baseDir: string;

  constructor() {
    this.baseDir = process.env.STORAGE_DIR
      ? resolve(process.env.STORAGE_DIR)
      : resolve(process.cwd(), 'storage');

    mkdirSync(this.baseDir, { recursive: true });
    this.logger.log(`Initialized file storage engine at: ${this.baseDir}`);
  }

  private getTargetDir(subDir: string): string {
    const cleanSubDir = basename(subDir);
    const targetDir = join(this.baseDir, cleanSubDir);
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }
    return targetDir;
  }

  async saveFile(
    subDir: string,
    filename: string,
    buffer: Buffer,
    _mimeType: string,
  ): Promise<{ storageKey: string; filePath: string }> {
    const safeFilename = basename(filename);
    const targetDir = this.getTargetDir(subDir);
    const filePath = join(targetDir, safeFilename);

    writeFileSync(filePath, buffer);
    return {
      storageKey: safeFilename,
      filePath,
    };
  }

  getFilePath(subDir: string, storageKey: string): string {
    const safeKey = basename(storageKey);
    const targetDir = this.getTargetDir(subDir);
    const filePath = join(targetDir, safeKey);

    if (!existsSync(filePath) || !filePath.startsWith(this.baseDir)) {
      throw new NotFoundException('Requested file asset not found');
    }

    return filePath;
  }

  async deleteFile(subDir: string, storageKey: string): Promise<boolean> {
    try {
      const safeKey = basename(storageKey);
      const targetDir = this.getTargetDir(subDir);
      const filePath = join(targetDir, safeKey);

      if (existsSync(filePath) && filePath.startsWith(this.baseDir)) {
        unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (e) {
      this.logger.warn(`Failed to delete file asset ${storageKey}:`, e);
      return false;
    }
  }

  exists(subDir: string, storageKey: string): boolean {
    const safeKey = basename(storageKey);
    const targetDir = this.getTargetDir(subDir);
    const filePath = join(targetDir, safeKey);
    return existsSync(filePath) && filePath.startsWith(this.baseDir);
  }
}
