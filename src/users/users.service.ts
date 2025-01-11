import { Injectable } from '@nestjs/common';
import { UserSchema } from './users.schema';
import { User } from './users.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(userDto: User): Promise<typeof UserSchema | false> {
    const { email } = userDto;

    const userExist = await this.userRepo.getInfoByEmail(email);

    if (userExist) return false;

    return this.userRepo.createUser(userDto);
  }
}
