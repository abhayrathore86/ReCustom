import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { Users } from './model/users.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS
  const sequelize = app.get(Sequelize);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    const userCount = await Users.count();
    if (userCount === 0) {
      const users = [
        { name: 'John Doe', email: 'john.doe@example.com', role: 'User' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin' },
        { name: 'Sam Johnson', email: 'sam.johnson@example.com', role: 'User' },
        { name: 'Chris Lee', email: 'chris.lee@example.com', role: 'User' },
        { name: 'Alex Brown', email: 'alex.brown@example.com', role: 'Admin' },
      ];

      await Users.bulkCreate(users);
      console.log('5 users have been added successfully!');
    } else {
      console.log('Users already exist in the database.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  await app.listen(3000);
}
bootstrap();
