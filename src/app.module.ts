import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ProductsModule } from './products/products.module';
import { JwtService } from '@nestjs/jwt';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('user')}:${configService.get<string>('password')}@ecommerce.20uwu.mongodb.net/`,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    CartModule,
    OrderModule,
  ],
  providers: [JwtService],
})
export class AppModule {}
