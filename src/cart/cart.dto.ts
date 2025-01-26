export interface Cart {
  id: string;
  userId: string;
  items: OrderItem[];
}

interface OrderItem {
  productId: string;
  quantity: number;
}
