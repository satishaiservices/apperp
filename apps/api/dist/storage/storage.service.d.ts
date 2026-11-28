import { IStorageService } from './storage.interface';
export declare class StorageService implements IStorageService {
    private readonly logger;
    private readonly baseDir;
    constructor();
    private getTargetDir;
    saveFile(subDir: string, filename: string, buffer: Buffer, _mimeType: string): Promise<{
        storageKey: string;
        filePath: string;
    }>;
    getFilePath(subDir: string, storageKey: string): string;
    deleteFile(subDir: string, storageKey: string): Promise<boolean>;
    exists(subDir: string, storageKey: string): boolean;
}
