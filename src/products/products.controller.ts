import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './products.dto';
import { ProductSchema } from './products.schema';
import { AuthGuard } from '../middleware/auth/auth.guard';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() newProduct: Product,
    @Req() req: Request,
  ): Promise<typeof ProductSchema | false> {
    
    if ('admin' in req.user && req.user['admin'])
      return this.productService.create(newProduct);
    return false;
  }
}
