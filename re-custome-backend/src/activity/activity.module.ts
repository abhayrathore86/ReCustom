import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityLog } from 'src/model/activity.model';

@Module({
  imports: [SequelizeModule.forFeature([ActivityLog])],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})

export class ActivityModule {}