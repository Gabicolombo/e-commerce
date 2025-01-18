import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: User): string {
    const payload = { username: user.name, email: user.email };
    return this.jwtService.sign(payload);
  }

  validateToken(token: string): User {
    try {
      const decoded = this.jwtService.verify(token.replace('Bearer ', ''));
      return decoded as User;
    } catch (err) {
      console.error(err);
      throw new Error('Unauthorized');
    }
  }
}
