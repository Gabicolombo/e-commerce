import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { User } from 'src/users/users.dto';
import { Cart } from './cart.dto';
import { CartSchema } from './cart.schema';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async cartExist(userId: User): Promise<boolean> {
    return this.cartRepository.existCart(userId);
  }

  async createCart(cart: Cart): Promise<typeof CartSchema> {
    return this.cartRepository.createCart(cart);
  }

  async addItems(cart: Cart): Promise<boolean> {
    return this.cartRepository.addingItems(cart);
  }
}
