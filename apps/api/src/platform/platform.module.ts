import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { PlatformGuard } from './platform.guard';
import { PrismaModule } from '../database/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PlatformController],
  providers: [PlatformService, PlatformGuard],
  exports: [PlatformService],
})
export class PlatformModule {}
