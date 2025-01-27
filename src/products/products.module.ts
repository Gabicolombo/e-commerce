import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductSchema } from './products.schema';
import { ProductRepository } from './products.repository';
import { ProductService } from './products.service';
import { AuthModule } from '../middleware/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    AuthModule,
    JwtModule,
  ],
  controllers: [ProductsController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductsModule {}
