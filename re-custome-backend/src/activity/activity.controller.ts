import { Controller, Get, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async findAll() {
    return await this.activityService.findAll();
  }

  @Get(':userId')
  async findByUserId(@Param('userId') userId: number) {
    return this.activityService.findByUserId(userId);
  }
}
