import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService, OrderItem } from '../order.service';

interface Customer {
  name: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-order',
   imports: [FormsModule],
  templateUrl: './order.html',
  styleUrls: ['./order.scss']
})
export class OrderComponent implements OnInit {
  orderService = inject(OrderService);

  customer: Customer = {
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Nguyễn Trãi, Quận 1, TP.HCM'
  };

  orderItems: OrderItem[] = [];

  ngOnInit() {
    this.orderItems = this.orderService.getOrderItems();
    // Nếu không có items từ cart, dùng mock data
    if (this.orderItems.length === 0) {
      this.orderItems = [
        { name: 'Nike Air Max 270', unit: 1, price: 850000, productId: 1 },
        { name: 'Áo thun basic', unit: 2, price: 280000, productId: 2 },
        { name: 'Balo thời trang', unit: 1, price: 450000, productId: 3 }
      ];
    }
  }

  get total(): number {
    return this.orderItems.reduce(
      (sum, item) => sum + item.price * item.unit,
      0
    );
  }

  formatPrice(value: number): string {
    return value.toLocaleString('vi-VN') + ' ₫';
  }

  submitOrder() {
    console.log('Order:', {
      customer: this.customer,
      items: this.orderItems,
      total: this.total
    });
    // redirect to checkout
  }
}