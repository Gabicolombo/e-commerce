import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderSchema } from './order.schema';
import { Order } from './order.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<typeof OrderSchema>,
  ) {}

  async createOrder(order: Order): Promise<typeof OrderSchema> {
    return await this.orderModel.create(order);
  }

  async getOrderStatus(userId: string): Promise<typeof OrderSchema> {
    return await this.orderModel.findOne({ userId: userId });
  }
}
