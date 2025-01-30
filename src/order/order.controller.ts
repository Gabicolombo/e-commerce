import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '../middleware/auth/auth.guard';
import { Request } from 'express';
import { OrderService } from './order.service';
import { Order } from './order.dto';
import { OrderSchema } from './order.schema';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('/submit')
  async addCart(
    @Body() payload: Order,
    @Req() req: Request,
  ): Promise<typeof OrderSchema | boolean | string> {
    try {
      payload.userId = req.user['email'];
      const saveMongo = await this.orderService.createOrder(payload);

      if (!saveMongo) {
        throw new Error('Enable to process the order');
      }

      const sendSQS = await this.orderService.sendToSQS(payload);
      if (sendSQS) return true;

      return false;
    } catch (err) {
      console.error(err);
      return `Error: ${err.message}`;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/my-order')
  async getOrder(@Param('userId') userId: string): Promise<typeof OrderSchema> {
    return this.orderService.checkStatus(userId);
  }
}
