"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImageMagicBytes = validateImageMagicBytes;
function validateImageMagicBytes(buffer) {
    if (!buffer || buffer.length < 12) {
        return { valid: false, detectedFormat: null };
    }
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
        return { valid: true, detectedFormat: 'jpeg' };
    }
    if (buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47) {
        return { valid: true, detectedFormat: 'png' };
    }
    if (buffer[0] === 0x52 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46 &&
        buffer[3] === 0x46 &&
        buffer[8] === 0x57 &&
        buffer[9] === 0x45 &&
        buffer[10] === 0x42 &&
        buffer[11] === 0x50) {
        return { valid: true, detectedFormat: 'webp' };
    }
    return { valid: false, detectedFormat: null };
}
//# sourceMappingURL=file-signature.util.js.map