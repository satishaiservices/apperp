import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard, type AuthenticatedUser } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../rbac/permissions.guard';
import { RequirePermissions } from '../rbac/permissions.decorator';

@Controller('audit')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @RequirePermissions('projects.view')
  getTenantAuditLogs(
    @Req() req: { user: AuthenticatedUser },
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('action') action?: string,
  ) {
    return this.auditService.getTenantAuditLogs(req.user, {
      limit: limit ? parseInt(limit, 10) : 50,
      offset: offset ? parseInt(offset, 10) : 0,
      action,
    });
  }
}
