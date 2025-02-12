import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.dto';
import { UserSchema } from './users.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<typeof UserSchema>,
  ) {}

  async getInfoByEmail(email: string): Promise<boolean> {
    return this.userModel.findOne({ email: email });
  }

  async getUser(email: string, password: string): Promise<User> {
    return this.userModel.findOne({ email: email, password: password });
  }

  async createUser(user: User): Promise<typeof UserSchema> {
    return await this.userModel.create(user);
  }
}
