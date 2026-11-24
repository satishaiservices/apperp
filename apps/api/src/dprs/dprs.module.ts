import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RbacModule } from '../rbac/rbac.module';
import { DprsController } from './dprs.controller';
import { DprsService } from './dprs.service';

@Module({
  imports: [AuthModule, RbacModule],
  controllers: [DprsController],
  providers: [DprsService],
})
export class DprsModule {}
