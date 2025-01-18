import { Injectable } from '@nestjs/common';
import { ProductSchema } from './products.schema';
import { Product } from './products.dto';
import { ProductRepository } from './products.repository';
import { ObjectId, UpdateResult } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async create(productDto: Product): Promise<typeof ProductSchema | false> {
    return this.productRepo.createProduct(productDto);
  }

  async updateQuantity(
    productId: ObjectId,
    newQuantity: number,
  ): Promise<UpdateResult> {
    return await this.productRepo.updateProduct(productId, newQuantity);
  }
}
