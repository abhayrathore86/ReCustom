import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivityService } from 'src/activity/activity.service';
import { ActivityLog } from 'src/model/activity.model';
import { Users } from 'src/model/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    private activityService: ActivityService,
  ) {}

  async create(userData: { name: string; email: string; role: string }) {
    try {
      const user = await this.userModel.create(userData);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to create user',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.findAll();

      const usersWithActivityCounts = await Promise.all(
        users.map(async (user) => {
          const loginCount = await ActivityLog.count({
            where: { userId: user.id, activity: 'Login' },
          });

          const downloadCount = await ActivityLog.count({
            where: { userId: user.id, activity: 'Download PDF' },
          });
          console.log('loginCount, downloadCount', loginCount, downloadCount);
          return {
            ...user.toJSON(),
            activityCounts: {
              loginCount,
              downloadCount,
            },
          };
        }),
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Users retrieved successfully',
        data: usersWithActivityCounts,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve users',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userModel.findByPk(id, {
        // include: [ActivityLog],
      });

      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // Count activities by type
      const loginCount = await ActivityLog.count({
        where: { userId: id, activity: 'Login' },
      });

      const downloadCount = await ActivityLog.count({
        where: { userId: id, activity: 'Download PDF' },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'User retrieved successfully',
        data: {
          ...user.toJSON(),
          activityCounts: {
            loginCount,
            downloadCount,
          },
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    userData: { name: string; email: string; role: string },
  ) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedUser = await user.update(userData);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to update user',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await user.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginWithEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ where: { email } });
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.activityService.create(user.id, 'Login');
      return {
        statusCode: HttpStatus.OK,
        message: 'User logged in successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to log in user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
