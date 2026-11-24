import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard, type AuthenticatedUser } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../rbac/permissions.guard';
import { RequirePermissions } from '../rbac/permissions.decorator';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @RequirePermissions('roles.view')
  list(@Req() req: { user: AuthenticatedUser }) {
    return this.rolesService.list(req.user);
  }

  @Get('permissions')
  @RequirePermissions('roles.view')
  permissions() {
    return this.rolesService.listPermissions();
  }

  @Get(':id')
  @RequirePermissions('roles.view')
  get(
    @Param('id') id: string,
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.rolesService.get(req.user, id);
  }

  @Post()
  @RequirePermissions('roles.manage')
  create(
    @Body() body: { name: string; description?: string },
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.rolesService.create(req.user, body);
  }

  @Patch(':id')
  @RequirePermissions('roles.manage')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string | null },
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.rolesService.update(req.user, id, body);
  }

  @Delete(':id')
  @RequirePermissions('roles.manage')
  remove(
    @Param('id') id: string,
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.rolesService.remove(req.user, id);
  }

  @Put(':id/permissions')
  @RequirePermissions('roles.manage')
  setPermissions(
    @Param('id') id: string,
    @Body() body: { permissionKeys: string[] },
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.rolesService.setPermissions(
      req.user,
      id,
      body.permissionKeys,
    );
  }

  @Post(':id/members/:membershipId')
  @RequirePermissions('roles.manage')
  assign(
    @Param('id') id: string,
    @Param('membershipId') membershipId: string,
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.rolesService.assign(req.user, id, membershipId);
  }

  @Delete(':id/members/:membershipId')
  @RequirePermissions('roles.manage')
  revoke(
    @Param('id') id: string,
    @Param('membershipId') membershipId: string,
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.rolesService.revoke(req.user, id, membershipId);
  }
}
