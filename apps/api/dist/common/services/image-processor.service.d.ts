export interface ProcessedImageResult {
    finalPath: string;
    mimeType: string;
    fileSize: number;
    width: number;
    height: number;
    originalSize: number;
    compressionRatio: number;
}
export declare class ImageProcessorService {
    private readonly maxPreCompressionSize;
    private readonly maxDimension;
    private readonly jpegQuality;
    reviewAndCompressImage(filePath: string, targetPath: string): Promise<ProcessedImageResult>;
}
