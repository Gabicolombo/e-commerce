import { Module } from '@nestjs/common';
import { AuthModule } from 'src/middleware/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.schema';
import { SqsModule } from 'src/aws/sqs/sqs.module';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    AuthModule,
    JwtModule,
    SqsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
