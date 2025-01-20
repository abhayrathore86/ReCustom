import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async create(
    @Body() userData: { name: string; email: string; role: string },
  ) {
    return await this.userService.create(userData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: { name: string; email: string; role: string },
  ) {
    return await this.userService.update(id, userData);
  }

  @Post('login')
  async login(@Body('email') email: string) {
    return await this.userService.loginWithEmail(email);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
