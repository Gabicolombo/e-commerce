import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './cart.schema';
import { AuthModule } from 'src/middleware/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    AuthModule,
    JwtModule,
    ProductsModule,
  ],
  controllers: [CartController],
  providers: [CartRepository, CartService],
})
export class CartModule {}
