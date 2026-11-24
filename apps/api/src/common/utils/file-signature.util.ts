/**
 * Inspects a file buffer's magic bytes to verify genuine image formats.
 * Prevents file extension / MIME-type spoofing (e.g. uploading a script renamed as .jpg).
 */
export function validateImageMagicBytes(buffer: Buffer): {
  valid: boolean;
  detectedFormat: 'jpeg' | 'png' | 'webp' | null;
} {
  if (!buffer || buffer.length < 12) {
    return { valid: false, detectedFormat: null };
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, detectedFormat: 'jpeg' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { valid: true, detectedFormat: 'png' };
  }

  // WebP: RIFF .... WEBP
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, detectedFormat: 'webp' };
  }

  return { valid: false, detectedFormat: null };
}
