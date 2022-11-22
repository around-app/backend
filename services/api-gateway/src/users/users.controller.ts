import { Observable } from 'rxjs';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'around-types';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Observable<Array<User>> {
    return this.usersService.getUsers();
  }

  @Post('/users')
  createUser(@Body() user: User): Observable<Partial<User>> {
    return this.usersService.createUser(user);
  }
}
