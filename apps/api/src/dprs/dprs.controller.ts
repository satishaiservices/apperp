import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { DprsService } from './dprs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../rbac/permissions.guard';
import { RequirePermissions } from '../rbac/permissions.decorator';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';
import { CreateDprDto, UpdateDprDto, ReviewDprDto } from './dto/dpr.dto';

@Controller()
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DprsController {
  constructor(private readonly dprsService: DprsService) {}

  @Post('projects/:projectId/dprs')
  @RequirePermissions('dprs.create')
  create(
    @Req() req: { user: AuthenticatedUser },
    @Param('projectId') projectId: string,
    @Body() body: CreateDprDto,
  ) {
    return this.dprsService.create(req.user, projectId, body);
  }

  @Get('projects/:projectId/dprs')
  @RequirePermissions('dprs.view')
  findAll(
    @Req() req: { user: AuthenticatedUser },
    @Param('projectId') projectId: string,
  ) {
    return this.dprsService.findAll(req.user, projectId);
  }

  @Get('dprs/:id')
  @RequirePermissions('dprs.view')
  findOne(@Req() req: { user: AuthenticatedUser }, @Param('id') id: string) {
    return this.dprsService.findOne(req.user, id);
  }

  @Patch('dprs/:id')
  @RequirePermissions('dprs.update')
  update(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
    @Body() body: UpdateDprDto,
  ) {
    return this.dprsService.update(req.user, id, body);
  }

  @Post('dprs/:id/submit')
  @RequirePermissions('dprs.submit')
  submit(@Req() req: { user: AuthenticatedUser }, @Param('id') id: string) {
    return this.dprsService.submit(req.user, id);
  }

  @Post('dprs/:id/approve')
  @RequirePermissions('dprs.review')
  approve(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
    @Body() body: ReviewDprDto,
  ) {
    return this.dprsService.approve(req.user, id, body);
  }

  @Post('dprs/:id/reject')
  @RequirePermissions('dprs.review')
  reject(
    @Req() req: { user: AuthenticatedUser },
    @Param('id') id: string,
    @Body() body: ReviewDprDto,
  ) {
    return this.dprsService.reject(req.user, id, body);
  }
}
