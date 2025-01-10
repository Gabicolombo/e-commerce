import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
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
  ],
  providers: [UsersModule],
})
export class AppModule {}
