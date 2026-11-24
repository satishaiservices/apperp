import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard, type AuthenticatedUser } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../rbac/permissions.guard';
import { RequirePermissions } from '../rbac/permissions.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Req() req: { user: AuthenticatedUser }) {
    return this.usersService.getProfile(req.user);
  }

  @Get()
  @RequirePermissions('users.view')
  list(@Req() req: { user: AuthenticatedUser }) {
    return this.usersService.list(req.user);
  }

  @Get(':membershipId')
  @RequirePermissions('users.view')
  getMember(
    @Param('membershipId', ParseUUIDPipe) membershipId: string,
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.usersService.getMember(req.user, membershipId);
  }

  @Post('provision')
  @RequirePermissions('users.create')
  provision(
    @Body()
    body: {
      fullName: string;
      username: string;
      phone?: string;
      email?: string;
      password?: string;
      roleName?: string;
    },
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.usersService.provisionEmployee(req.user, body);
  }

  @Post(':membershipId/reset-password')
  @RequirePermissions('users.update')
  resetPassword(
    @Param('membershipId', ParseUUIDPipe) membershipId: string,
    @Body() body: { newPassword?: string },
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.usersService.resetPassword(
      req.user,
      membershipId,
      body.newPassword,
    );
  }

  @Post()
  @RequirePermissions('users.create')
  addMember(
    @Body() body: { email: string; roleIds?: string[] },
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.usersService.addMember(req.user, body);
  }

  @Post(':membershipId/deactivate')
  @RequirePermissions('users.update')
  deactivate(
    @Param('membershipId', ParseUUIDPipe) membershipId: string,
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.usersService.setMembershipStatus(
      req.user,
      membershipId,
      'INACTIVE',
    );
  }

  @Post(':membershipId/activate')
  @RequirePermissions('users.update')
  activate(
    @Param('membershipId', ParseUUIDPipe) membershipId: string,
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.usersService.setMembershipStatus(
      req.user,
      membershipId,
      'ACTIVE',
    );
  }

  @Delete(':membershipId')
  @RequirePermissions('users.delete')
  removeMember(
    @Param('membershipId', ParseUUIDPipe) membershipId: string,
    @Req() req: { user: AuthenticatedUser },
  ) {
    return this.usersService.setMembershipStatus(
      req.user,
      membershipId,
      'INACTIVE',
    );
  }
}
