import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../rbac/permissions.guard';
import { RequirePermissions } from '../rbac/permissions.decorator';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
import {
  CreateProjectDto,
  UpdateProjectDto,
  DuplicateProjectDto,
} from './dto/project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @RequirePermissions('projects.create')
  create(
    @Req() req: { user: AuthenticatedUser },
    @Body() body: CreateProjectDto,
  ) {
    return this.projectsService.create(req.user, body);
  }

  @Get()
  @RequirePermissions('projects.view')
  findAll(@Req() req: { user: AuthenticatedUser }) {
    return this.projectsService.findAll(req.user);
  }

  @Get(':id')
  @RequirePermissions('projects.view')
  findOne(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
  ) {
    return this.projectsService.findOne(req.user, id);
  }

  @Patch(':id')
  @RequirePermissions('projects.update')
  update(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
    @Body() body: UpdateProjectDto,
  ) {
    return this.projectsService.update(req.user, id, body);
  }

  @Post(':id/duplicate')
  @RequirePermissions('projects.create')
  duplicate(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
    @Body() body: DuplicateProjectDto,
  ) {
    return this.projectsService.duplicate(req.user, id, body);
  }

  @Delete(':id')
  @RequirePermissions('projects.delete')
  archive(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
  ) {
    return this.projectsService.archive(req.user, id);
  }
}
