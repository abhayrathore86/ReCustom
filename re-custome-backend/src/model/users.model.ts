import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ActivityLog } from './activity.model';

@Table({ schema: 'public' })
export class Users extends Model<Users> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  role: string;

  @HasMany(() => ActivityLog)
  activityLogs: ActivityLog[];
}
