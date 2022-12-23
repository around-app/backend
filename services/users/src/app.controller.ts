import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from 'around-types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() userDto: User): Promise<Partial<User>> {
    return await this.appService.createUser(userDto);
  }
}
