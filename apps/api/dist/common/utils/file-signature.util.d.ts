export declare function validateImageMagicBytes(buffer: Buffer): {
    valid: boolean;
    detectedFormat: 'jpeg' | 'png' | 'webp' | null;
};
