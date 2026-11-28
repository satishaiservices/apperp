import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is not set');
    }
    // MySQL 8 (caching_sha2_password) over a non-TLS localhost socket needs
    // public key retrieval; harmless on MariaDB.
    const connectionUrl = /[?&]allowPublicKeyRetrieval=/.test(url)
      ? url
      : `${url}${url.includes('?') ? '&' : '?'}allowPublicKeyRetrieval=true`;
    super({ adapter: new PrismaMariaDb(connectionUrl) });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
