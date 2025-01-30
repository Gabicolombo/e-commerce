export class Order {
  userId: string;
  items: OrderItem[];
  status?: 'pending' | 'failed' | 'completed';
}

export class OrderItem {
  productId: string;
  nameProduct: string;
  quantity: number;
}
