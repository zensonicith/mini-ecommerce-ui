import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart';

export interface OrderItem {
  name: string;
  unit: number;
  price: number;
  productId: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderItems = signal<OrderItem[]>([]);

  setOrderItems(cartItems: CartItem[]) {
    const items: OrderItem[] = cartItems.map((item) => ({
      name: item.productName,
      unit: item.quantity,
      price: item.price,
      productId: item.productId,
    }));
    this.orderItems.set(items);
  }

  getOrderItems() {
    return this.orderItems();
  }

  clearOrderItems() {
    this.orderItems.set([]);
  }
}
