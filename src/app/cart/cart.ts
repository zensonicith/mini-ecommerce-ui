import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { CartItem } from '../cart';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  router = inject(Router);
  cartItems = signal<CartItem[]>([]);
  selectedAll = signal<boolean>(false);
  selectedItems = new Map<number, boolean>();
  async ngOnInit() {
    await this.getCartItems();
  }

  selectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedAll.set(checked);
    this.selectedItems.clear();
    this.cartItems().forEach((item) => {
      this.selectedItems.set(item.productId, checked);
    });
  }

  selectItem(productId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedItems.set(productId, checked);
    const allChecked = this.cartItems().every((item) => this.selectedItems.get(item.productId));
    this.selectedAll.set(allChecked);
  }

  isItemSelected(productId: number): boolean {
    return this.selectedItems.get(productId) ?? false;
  }

  getSelectedCount(): number {
    return this.cartItems().filter((item) => this.selectedItems.get(item.productId)).length;
  }

  async getCartItems() {
    const carts = await this.cartService.getCustomerCart();
    const normalizedCarts = carts.map((cart) => ({
      ...cart,
      quantity: cart.quantity ?? 1,
    }));
    this.cartItems.set(normalizedCarts);
  }

  getCartItem(): CartItem[] {
    return this.cartItems();
  }

  increaseQuantity(index: number) {
    this.cartItems.update((items) =>
      items.map((item, currentIndex) =>
        currentIndex === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  decreaseQuantity(index: number) {
    this.cartItems.update((items) =>
      items.map((item, currentIndex) => {
        if (currentIndex !== index) {
          return item;
        }
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      })
    );
  }

  getTotalPrice(): number {
    return this.cartItems()
      .filter((item) => this.selectedItems.get(item.productId))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getSelectedItems(): CartItem[] {
    return this.cartItems().filter((item) => this.selectedItems.get(item.productId));
  }

  proceedToOrder() {
    const selectedItems = this.getSelectedItems();
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }
    this.orderService.setOrderItems(selectedItems);
    this.router.navigate(['/order']);
  }
}
