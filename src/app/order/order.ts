import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Customer {
  name: string;
  phone: string;
  address: string;
}

interface OrderItem {
  name: string;
  unit: number;
  price: number;
}

@Component({
  selector: 'app-order',
   imports: [FormsModule],
  templateUrl: './order.html',
  styleUrls: ['./order.scss']
})
export class OrderComponent {

  customer: Customer = {
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Nguyễn Trãi, Quận 1, TP.HCM'
  };

  orderItems: OrderItem[] = [
    { name: 'Nike Air Max 270', unit: 1, price: 850000 },
    { name: 'Áo thun basic', unit: 2,  price: 280000 },
    { name: 'Balo thời trang', unit: 1, price: 450000 }
  ];

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