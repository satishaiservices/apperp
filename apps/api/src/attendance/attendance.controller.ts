import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedUser } from '../auth/jwt-auth.guard';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post('check-in')
  checkIn(
    @Req() req: { user: AuthenticatedUser },
    @Body()
    body: {
      projectId: string;
      latitude?: number;
      longitude?: number;
      locationAccuracyM?: number;
      remarks?: string;
    },
  ) {
    return this.service.checkIn(req.user, body);
  }

  @Post('check-out')
  checkOut(
    @Req() req: { user: AuthenticatedUser },
    @Body()
    body: {
      sessionId?: string;
      latitude?: number;
      longitude?: number;
      locationAccuracyM?: number;
      remarks?: string;
    },
  ) {
    return this.service.checkOut(req.user, body);
  }

  @Get('current')
  getCurrentSession(@Req() req: { user: AuthenticatedUser }) {
    return this.service.getCurrentSession(req.user);
  }

  @Get('history')
  getHistory(
    @Req() req: { user: AuthenticatedUser },
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.service.getHistory(req.user, {
      limit: limit ? parseInt(limit, 10) : 50,
      offset: offset ? parseInt(offset, 10) : 0,
      projectId,
    });
  }
}
