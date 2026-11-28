import { PrismaService } from './prisma.service';
export declare class DatabaseHealthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkDatabase(): Promise<{
        status: string;
        database: string;
        timestamp: string;
    }>;
}
