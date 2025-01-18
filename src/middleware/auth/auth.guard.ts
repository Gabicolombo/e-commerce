import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExecutionContext, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      return false;
    }

    try {
      const user = this.authService.validateToken(token);
      request.user = user;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
