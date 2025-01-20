import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivityLog } from 'src/model/activity.model';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(ActivityLog)
    private activityLogModel: typeof ActivityLog,
  ) {}

  async findAll() {
    const user = await this.activityLogModel.findAll();
    console.log(user);
    return user;
  }

  async findByUserId(userId: number) {
    return this.activityLogModel.findAll({
      where: { userId },
      order: [['timestamp', 'DESC']],
    });
  }

  async create(userId: number, activity: string) {
    return this.activityLogModel.create({
      userId,
      activity,
      timestamp: new Date(),
    });
  }
}
