import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  userId: { type: Schema.Types.String, ref: 'User', required: true },
  items: [
    {
      productId: {
        type: Schema.Types.String,
        ref: 'Product',
        required: true,
        unique: true,
      },
      nameProduct: {
        type: Schema.Types.String,
        ref: 'Product',
        required: true,
        unique: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, default: 'pending' },
});
