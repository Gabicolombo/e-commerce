import { Injectable } from '@nestjs/common';
import { SqsService } from 'src/aws/sqs/sqs.service';
import { OrderRepository } from './order.repository';
import { Order } from './order.dto';
import { OrderSchema } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    private readonly sqsService: SqsService,
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(order: Order): Promise<typeof OrderSchema> {
    return await this.orderRepository.createOrder(order);
  }

  async checkStatus(userId: string): Promise<typeof OrderSchema> {
    return await this.orderRepository.getOrderStatus(userId);
  }

  async sendToSQS(order: Order): Promise<boolean> {
    try {
      await this.sqsService.sendMessage(order);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
