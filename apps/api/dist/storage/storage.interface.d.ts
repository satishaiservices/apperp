export interface IStorageService {
    saveFile(subDir: string, filename: string, buffer: Buffer, mimeType: string): Promise<{
        storageKey: string;
        filePath: string;
    }>;
    getFilePath(subDir: string, storageKey: string): string;
    deleteFile(subDir: string, storageKey: string): Promise<boolean>;
    exists(subDir: string, storageKey: string): boolean;
}
