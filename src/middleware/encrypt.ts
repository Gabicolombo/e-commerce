import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class EncryptMiddleware implements NestMiddleware {
  encrypt(text: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
  }

  use(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body?.password) {
      req.body.password = this.encrypt(req.body.password);
    }
    next();
  }
}
