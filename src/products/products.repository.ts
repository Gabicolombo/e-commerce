import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, UpdateResult } from 'mongoose';
import { Product } from './products.dto';
import { ProductSchema } from './products.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<typeof ProductSchema>,
  ) {}

  async createProduct(product: Product): Promise<typeof ProductSchema> {
    return await this.productModel.create(product);
  }

  async getProduct(productId: string): Promise<typeof ProductSchema> {
    return await this.productModel.findOne({ _id: productId });
  }

  async getProducts(): Promise<(typeof ProductSchema)[]> {
    return await this.productModel.find({});
  }

  async updateProduct(
    productId: ObjectId,
    quantity: number,
  ): Promise<UpdateResult> {
    return await this.productModel.updateOne(
      { ObjectId: productId },
      { $set: { quantity: quantity } },
    );
  }
}
