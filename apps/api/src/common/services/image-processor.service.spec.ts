import { BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import { unlink, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { ImageProcessorService } from './image-processor.service';

describe('ImageProcessorService', () => {
  let service: ImageProcessorService;
  const testInputPath = resolve(process.cwd(), 'test_input.png');
  const testOutputPath = resolve(process.cwd(), 'test_output.jpg');
  const corruptInputPath = resolve(process.cwd(), 'test_corrupt.png');

  beforeEach(() => {
    service = new ImageProcessorService();
  });

  afterEach(async () => {
    if (existsSync(testInputPath)) await unlink(testInputPath).catch(() => {});
    if (existsSync(testOutputPath)) await unlink(testOutputPath).catch(() => {});
    if (existsSync(corruptInputPath)) await unlink(corruptInputPath).catch(() => {});
  });

  it('reviews and compresses an oversized image down to max dimension 1920', async () => {
    // Generate a 2400 x 1600 test image using sharp
    await sharp({
      create: {
        width: 2400,
        height: 1600,
        channels: 3,
        background: { r: 10, g: 92, b: 54 },
      },
    })
      .png()
      .toFile(testInputPath);

    const result = await service.reviewAndCompressImage(testInputPath, testOutputPath);

    expect(result.mimeType).toBe('image/jpeg');
    expect(result.width).toBe(1920);
    expect(result.height).toBe(1280);
    expect(result.fileSize).toBeGreaterThan(0);
    expect(result.compressionRatio).toBeLessThanOrEqual(1.0);
    expect(existsSync(testOutputPath)).toBe(true);

    const meta = await sharp(testOutputPath).metadata();
    expect(meta.format).toBe('jpeg');
    expect(meta.width).toBe(1920);
  });

  it('rejects corrupted or unreadable image files', async () => {
    await writeFile(corruptInputPath, Buffer.from('NOT_A_VALID_IMAGE_DATA'));

    await expect(
      service.reviewAndCompressImage(corruptInputPath, testOutputPath),
    ).rejects.toThrow(BadRequestException);
  });
});
