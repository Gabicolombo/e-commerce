import { Injectable } from '@nestjs/common';
import { UserSchema } from './users.schema';
import { User } from './users.dto';
import { UserRepository } from './users.repository';
import { AuthService } from '../middleware/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async create(userDto: User): Promise<typeof UserSchema | false> {
    const { email } = userDto;

    const userExist = await this.userRepo.getInfoByEmail(email);

    if (userExist) return false;

    return this.userRepo.createUser(userDto);
  }

  async login(user: User): Promise<any> {
    const { password, email } = user;

    const userExist: User = await this.userRepo.getUser(email, password);

    if (!userExist) return false;

    const token = this.authService.generateToken(userExist);

    return { accessToken: token };
  }
}
