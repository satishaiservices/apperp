import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PlatformService } from './platform.service';
import { AuditService } from '../audit/audit.service';
import { JwtAuthGuard, type AuthenticatedUser } from '../auth/jwt-auth.guard';
import { PlatformGuard } from './platform.guard';
import {
  CreateSuperadminDto,
  UpdateSuperadminDto,
  CreateTenantDto,
  UpdateTenantDto,
  AddTenantUserDto,
} from './dto/platform.dto';

@Controller('platform')
@UseGuards(JwtAuthGuard, PlatformGuard)
export class PlatformController {
  constructor(
    private readonly platformService: PlatformService,
    private readonly auditService: AuditService,
  ) {}

  @Get('audit')
  getPlatformAudit(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('tenantId') tenantId?: string,
    @Query('action') action?: string,
  ) {
    return this.auditService.getPlatformAuditLogs({
      limit: limit ? parseInt(limit, 10) : 50,
      offset: offset ? parseInt(offset, 10) : 0,
      tenantId,
      action,
    });
  }

  @Get('stats')
  getStats() {
    return this.platformService.getStats();
  }

  @Get('admins')
  getPlatformAdmins() {
    return this.platformService.listPlatformAdmins();
  }

  @Post('admins')
  createPlatformAdmin(
    @Req() req: { user: AuthenticatedUser },
    @Body() body: CreateSuperadminDto,
  ) {
    return this.platformService.createPlatformAdmin(body);
  }

  @Patch('admins/:id')
  updatePlatformAdmin(
    @Req() req: { user: AuthenticatedUser },
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateSuperadminDto,
  ) {
    return this.platformService.updatePlatformAdmin(req.user, id, body);
  }

  @Delete('admins/:id')
  deletePlatformAdmin(
    @Req() req: { user: AuthenticatedUser },
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.platformService.deletePlatformAdmin(req.user, id);
  }

  @Get('tenants')
  getTenants() {
    return this.platformService.getTenants();
  }

  @Get('tenants/:id')
  getTenantDetails(@Param('id', ParseUUIDPipe) id: string) {
    return this.platformService.getTenantDetails(id);
  }

  @Post('tenants')
  createTenant(@Body() body: CreateTenantDto) {
    return this.platformService.createTenantWithAdmin(body);
  }

  @Patch('tenants/:id')
  updateTenant(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTenantDto,
  ) {
    return this.platformService.updateTenant(id, body);
  }

  @Post('tenants/:id/users/:userId/reset-password')
  resetUserPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: { newPassword?: string },
  ) {
    return this.platformService.resetUserPassword(id, userId, body.newPassword);
  }

  @Post('tenants/:id/users')
  addUserToTenant(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: AddTenantUserDto,
  ) {
    return this.platformService.addUserToTenant(id, body);
  }
}
