import { Controller, UseGuards, Post, Body, Req } from '@nestjs/common';
import { AuthGuard } from '../middleware/auth/auth.guard';
import { Request } from 'express';
import { Cart } from './cart.dto';
import { CartSchema } from './cart.schema';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post('/my-cart')
  async addCart(
    @Body() payload: Cart,
    @Req() req: Request,
  ): Promise<typeof CartSchema | boolean | string> {
    try {
      const existCart = await this.cartService.cartExist(req.user['email']);
      payload.userId = req.user['email'];
      if (!existCart) {
        const newCart = await this.cartService.createCart(payload);
        return newCart;
      } else {
        return await this.cartService.addItems(payload);
      }
    } catch (err) {
      console.error(err);
      return `Error: ${err.message}`;
    }
  }
}
