import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ActivityModule } from './activity/activity.module';
import { Users } from './model/users.model';
import { ActivityLog } from './model/activity.model';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'recustom',
      password: 'recustom',
      database: 'recustom',
      models: [Users, ActivityLog],
      autoLoadModels: false,
      synchronize: true,
      logging: console.log,
    }),
    UsersModule,
    ActivityModule,
    PdfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
