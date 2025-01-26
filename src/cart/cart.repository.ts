import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.dto';
import { CartSchema } from './cart.schema';
import { Cart } from './cart.dto';

@Injectable()
export class CartRepository {
  constructor(
    @InjectModel('Cart')
    private readonly cartModel: Model<typeof CartSchema>,
  ) {}

  async existCart(user: User): Promise<boolean> {
    return this.cartModel.findOne({ userId: user });
  }

  async createCart(cart: Cart): Promise<typeof CartSchema> {
    return this.cartModel.create(cart);
  }

  async addingItems(cart: Cart): Promise<boolean> {
    try {
      const { userId, items } = cart;
      if (items.length > 1) {
        await this.cartModel.updateOne(
          { userId: userId },
          { $push: { items: { $each: items } } },
        );
      } else {
        await this.cartModel
          .updateOne({ userId: userId }, { $push: { items: items } })
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      }

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
