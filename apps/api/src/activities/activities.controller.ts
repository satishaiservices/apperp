import {
  Controller, Get, Post, Patch, Delete, Put,
  Body, Param, Req, UseGuards,
} from '@nestjs/common';

import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../rbac/permissions.guard';
import { RequirePermissions } from '../rbac/permissions.decorator';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
import {
  CreateActivityDto,
  UpdateActivityDto,
  SetAssignmentsDto,
} from './dto/activity.dto';

@Controller()
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('projects/:projectId/activities')
  @RequirePermissions('activities.create')
  create(
    @Req() req: { user: AuthenticatedUser },
    @Param('projectId') projectId: string,
    @Body() body: CreateActivityDto,
  ) {
    return this.activitiesService.create(req.user, projectId, body);
  }

  @Get('projects/:projectId/activities/tree')
  @RequirePermissions('activities.view')
  getActivityTree(@Req() req: { user: AuthenticatedUser }, @Param('projectId') projectId: string) {
    return this.activitiesService.getActivityTree(req.user, projectId);
  }

  @Get('projects/:projectId/activities')
  @RequirePermissions('activities.view')
  findAll(@Req() req: { user: AuthenticatedUser }, @Param('projectId') projectId: string) {
    return this.activitiesService.findAll(req.user, projectId);
  }

  @Get('activities/:id')
  @RequirePermissions('activities.view')
  findOne(@Req() req: { user: AuthenticatedUser }, @Param('id') id: string) {
    return this.activitiesService.findOne(req.user, id);
  }

  @Patch('activities/:id')
  @RequirePermissions('activities.update')
  update(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
    @Body() body: UpdateActivityDto,
  ) {
    return this.activitiesService.update(req.user, id, body);
  }

  @Delete('activities/:id')
  @RequirePermissions('activities.delete')
  remove(@Req() req: { user: AuthenticatedUser }, @Param('id') id: string) {
    return this.activitiesService.remove(req.user, id);
  }

  @Get('activities/:id/assignments')
  @RequirePermissions('activities.view')
  getAssignments(@Req() req: { user: AuthenticatedUser }, @Param('id') id: string) {
    return this.activitiesService.getAssignments(req.user, id);
  }

  @Put('activities/:id/assignments')
  @RequirePermissions('activities.update')
  setAssignments(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
    @Body() body: SetAssignmentsDto,
  ) {
    return this.activitiesService.setAssignments(req.user, id, body);
  }
}
