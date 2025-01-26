import { Schema } from 'mongoose';

export const CartSchema = new Schema({
  userId: {
    required: true,
    type: Schema.Types.String,
    ref: 'User',
    unique: true,
  },
  items: [
    {
      productId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, required: true },
    },
  ],
});
