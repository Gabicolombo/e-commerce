import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  nameProduct: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  status: { type: Boolean, required: true },
  price: { type: String, required: true },
});
