import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './cart.schema';
import { AuthModule } from 'src/middleware/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    AuthModule,
    JwtModule,
  ],
  controllers: [CartController],
  providers: [CartRepository, CartService],
})
export class CartModule {}
