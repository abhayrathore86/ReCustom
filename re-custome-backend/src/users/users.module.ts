import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/model/users.model';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  imports: [SequelizeModule.forFeature([Users]), ActivityModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
