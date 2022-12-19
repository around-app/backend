import { Observable } from 'rxjs';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'around-types';
import { UsersService } from './users.service';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 501,
    description: 'Not implemented yet.',
  })
  getUsers(): Observable<Array<User>> {
    return this.usersService.getUsers();
  }

  @ApiBody({ type: User })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  createUser(@Body() user: User): Observable<Partial<User>> {
    return this.usersService.createUser(user);
  }
}
