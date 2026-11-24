import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RbacModule } from '../rbac/rbac.module';
import { SiteSubmissionsController } from './site-submissions.controller';
import { SiteSubmissionsService } from './site-submissions.service';
import { ImageProcessorService } from '../common/services/image-processor.service';

@Module({
  imports: [AuthModule, RbacModule],
  controllers: [SiteSubmissionsController],
  providers: [SiteSubmissionsService, ImageProcessorService],
})
export class SiteSubmissionsModule {}
