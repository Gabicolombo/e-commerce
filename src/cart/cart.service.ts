import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { User } from 'src/users/users.dto';
import { Cart } from './cart.dto';
import { CartSchema } from './cart.schema';
import { ProductRepository } from 'src/products/products.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async cartExist(userId: User): Promise<boolean> {
    return this.cartRepository.existCart(userId);
  }

  async createCart(cart: Cart): Promise<typeof CartSchema | string> {
    try {
      for (const item of cart.items) {
        const product = await this.productRepository.getProduct(item.productId);
        if (item.quantity > product['quantity'])
          throw Error(`Product ${item.productId} doesn't have this quantity`);
      }
      return this.cartRepository.createCart(cart);
    } catch (err) {
      return err;
    }
  }

  async addItems(cart: Cart): Promise<boolean> {
    for (const item of cart.items) {
      const product = await this.productRepository.getProduct(item.productId);
      if (item.quantity > product['quantity']) {
        throw new Error(`Product ${item.productId} doesn't have this quantity`);
      }
    }
    return await this.cartRepository.addingItems(cart);
  }
}
