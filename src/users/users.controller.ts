import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.dto';
import { UserSchema } from './users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() newUser: User): Promise<typeof UserSchema | false> {
    return this.usersService.create(newUser);
  }

  @Get('/login')
  async login(@Body() user: User): Promise<boolean> {
    return this.usersService.login(user);
  }
}
