import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CartItem } from './cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpClient = inject(HttpClient);

  async getCustomerCart(): Promise<CartItem[]> {
    return firstValueFrom(this.httpClient.get<CartItem[]>('api/carts'));
  }

  async addToCart(productId: number): Promise<void> {
    await firstValueFrom(this.httpClient.post('api/carts', { productId }));
  }
}
