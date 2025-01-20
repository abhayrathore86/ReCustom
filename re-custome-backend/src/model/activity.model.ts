import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from './users.model';

@Table({
  timestamps: false,
})
export class ActivityLog extends Model<ActivityLog> {
  @ForeignKey(() => Users)
  @Column
  userId: number;

  @Column
  activity: string;

  @Column
  timestamp: Date;

  @BelongsTo(() => Users)
  user: Users;
}
